import { AuthRepository } from './auth.respository.js';
import { generateToken } from '../../config/jwt.js';
import { BadRequestError, UnauthorizedError, NotFoundError } from '../../utils/errors.js';

export const AuthService = {
    async register({ name, email, password, role }) {
        const existing = await AuthRepository.findByEmail(email);
        if (existing) {
            throw new BadRequestError('User with this email already exists');
        }

        const totalCount = await AuthRepository.countUsers();
        // First registered user is automatically ADMIN
        const assignedRole = totalCount === 0 ? 'ADMIN' : (role || 'MEMBER');

        const user = await AuthRepository.createUser({
            name,
            email,
            password,
            role: assignedRole,
        });

        const token = generateToken({
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
        });

        return {
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status,
            },
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
        });

        return {
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status,
            },
            token,
        };
    },
    async getCurrentUser(userId) {
        const user = await AuthRepository.findById(userId);
        if (!user) {
            throw new NotFoundError('User not found');
        }

        return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
        };
    },
};
