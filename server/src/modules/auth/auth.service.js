import { AuthRepository } from './auth.respository.js';
import { OrganizationService } from '../organization/organization.service.js';
import { generateToken } from '../../config/jwt.js';
import { BadRequestError, UnauthorizedError, NotFoundError } from '../../utils/errors.js';

const serializeUser = (user, organization) => ({
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    organizationId: user.organizationId?.toString(),
    organization: organization
        ? {
              id: organization._id.toString(),
              name: organization.name,
              slug: organization.slug,
          }
        : null,
});

export const AuthService = {
    async register({ name, email, password, organizationName }) {
        const existing = await AuthRepository.findByEmail(email);
        if (existing) {
            throw new BadRequestError('User with this email already exists');
        }

        // Every new registration creates its own isolated organization/workspace.
        const organization = await OrganizationService.create({
            name: organizationName || `${name}'s Workspace`,
        });

        const user = await AuthRepository.createUser({
            name,
            email,
            password,
            role: 'ADMIN', // Workspace creator is always the ADMIN of their own organization
            organizationId: organization._id,
        });

        const token = generateToken({
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            organizationId: user.organizationId.toString(),
        });

        return {
            user: serializeUser(user, organization),
            token,
        };
    },

    async login({ email, password }) {
        const user = await AuthRepository.findByEmail(email, true);
        if (!user) {
            throw new UnauthorizedError('Invalid credentials');
        }

        if (user.status !== 'ACTIVE') {
            throw new UnauthorizedError('Account is inactive. Please contact an admin.');
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new UnauthorizedError('Invalid credentials');
        }

        const token = generateToken({
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            organizationId: user.organizationId.toString(),
        });

        return {
            user: serializeUser(user, await AuthRepository.getOrganization(user.organizationId)),
            token,
        };
    },

    async getCurrentUser(userId) {
        const user = await AuthRepository.findById(userId);
        if (!user) {
            throw new NotFoundError('User not found');
        }

        return serializeUser(user, user.organizationId);
    },
};
