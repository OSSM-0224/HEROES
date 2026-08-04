import { OrganizationRepository } from './organization.repository.js';

const slugify = (name) =>
    String(name || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 60);

const generateUniqueSlug = async (name) => {
    const base = slugify(name) || 'workspace';
    let slug = base;
    let suffix = 2;
    while (await OrganizationRepository.findBySlug(slug)) {
        slug = `${base}-${suffix}`;
        suffix += 1;
    }
    return slug;
};

export const OrganizationService = {
    async create({ name, createdBy = null }) {
        const slug = await generateUniqueSlug(name);
        return OrganizationRepository.create({ name, slug, createdBy });
    },

    async findBySlug(slug) {
        return OrganizationRepository.findBySlug(slug);
    },

    async ensure({ name, slug }) {
        let organization = await OrganizationRepository.findBySlug(slug);
        if (!organization) {
            organization = await OrganizationRepository.create({ name, slug });
        }
        return organization;
    },
};
