import { Organization } from './organization.model.js';

export const OrganizationRepository = {
    async findById(id) {
        return Organization.findById(id);
    },

    async findBySlug(slug) {
        return Organization.findOne({ slug });
    },

    async create(data) {
        const organization = new Organization(data);
        return organization.save();
    },
};
