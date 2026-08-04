import { verifyToken } from '../config/jwt.js';
import { UnauthorizedError, ForbiddenError } from '../utils/errors.js';
import { User } from '../modules/auth/auth.model.js';

const extractToken = (req) => {
    const fromCookie = req.cookies?.token;
    if (fromCookie) return fromCookie;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
};

export const authenticate = async (req, res, next) => {
    try {
        const token = extractToken(req);
        if (!token) {
            throw new UnauthorizedError('Authentication token missing or invalid');
        }

        const decoded = verifyToken(token);
        if (!decoded?.id) {
            throw new UnauthorizedError('Invalid token payload');
        }

        // Load the freshest user record so role/status changes take effect
        // immediately and deactivated accounts can no longer use old tokens.
        const user = await User.findById(decoded.id).select('+password').lean();
        if (!user) {
            throw new UnauthorizedError('Account no longer exists');
        }
        if (user.status !== 'ACTIVE') {
            throw new UnauthorizedError('Account is inactive. Please contact an admin.');
        }
        if (!user.organizationId) {
            throw new ForbiddenError('No organization is associated with this account');
        }

        req.user = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
            organizationId: user.organizationId.toString(),
        };
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            next(new UnauthorizedError('Session expired or invalid token'));
        } else {
            next(error);
        }
    }
};

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new UnauthorizedError('Authentication required'));
        }
        if (!roles.includes(req.user.role)) {
            return next(new ForbiddenError('You do not have permission to perform this action'));
        }
        next();
    };
};
