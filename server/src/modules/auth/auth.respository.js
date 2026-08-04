import { User } from "./auth.model.js";
import { Organization } from "../organization/organization.model.js";

export const AuthRepository = {
    async findByEmail(email, includePassword = false) {
        if (includePassword) {
            return User.findOne({ email }).select('+password');
        }
        return User.findOne({ email }).populate('organizationId', 'name slug');
    },

    async findById(id) {
        return User.findById(id).populate('organizationId', 'name slug');
    },

    async createUser(userData) {
        const user = new User(userData);
        return user.save();
    },

    async countUsers() {
        return User.countDocuments();
    },

    async getOrganization(organizationId) {
        return Organization.findById(organizationId);
    }
};
