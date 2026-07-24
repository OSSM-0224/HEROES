import { AuthService } from './auth.service.js';
import { sendSuccess } from '../../utils/response.js';

export const AuthController = {
    async register(req, res, next) {
        try {
            const { user, token } = await AuthService.register(req.body);

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return sendSuccess(res, 'Registration successful', { user, token }, 201);
        } catch (error) {
            next(error);
        }
    },

    async login(req, res, next) {
        try {
            const { user, token } = await AuthService.login(req.body);

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return sendSuccess(res, 'Login successful', { user, token });
        } catch (error) {
            next(error);
        }
    },

    async me(req, res, next) {
        try {
            const user = await AuthService.getCurrentUser(req.user.id);
            return sendSuccess(res, 'User profile fetched', { user });
        } catch (error) {
            next(error);
        }
    },

    async logout(req, res) {
        res.clearCookie('token');
        return sendSuccess(res, 'Logged out successfully');
    },
};
