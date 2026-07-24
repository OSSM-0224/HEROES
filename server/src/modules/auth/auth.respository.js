import { User } from "./auth.models.js";

export const AuthRepository = {
    async findByEmail(email, includePassword = false) {
        if (includePassword) {
            return User.findOne({ email }).select('+password');
        }
        return User.findOne({ email });
    },

    async findById(id) {
        return User.findById(id);
    },

    async createUser(userData) {
        const user = new User(userData);
        return user.save();
    },

    async countUsers() {
        return User.countDocuments();
    }
};
