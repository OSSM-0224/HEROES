import { User } from '../modules/auth/auth.model.js';
import { Lead } from '../modules/leads/lead.model.js';
import { OrganizationService } from '../modules/organization/organization.service.js';
import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';

const ORGANIZATION_MISSING = {
    $or: [{ organizationId: { $exists: false } }, { organizationId: null }],
};

export async function runMigrations() {
    // 1. Default organization: all pre-multi-tenant records are assigned here so
    //    no existing data is lost and legacy users keep their current data.
    const defaultOrganization = await OrganizationService.ensure({
        name: 'Default Organization',
        slug: 'default-organization',
    });

    // 2. Backfill existing users without an organization.
    const orphanUsers = await User.updateMany(ORGANIZATION_MISSING, {
        $set: { organizationId: defaultOrganization._id },
    });
    if (orphanUsers.modifiedCount > 0) {
        logger.info(`Migration: assigned ${orphanUsers.modifiedCount} user(s) to the default organization`);
    }

    // 3. Backfill existing leads without an organization.
    const orphanLeads = await Lead.updateMany(ORGANIZATION_MISSING, {
        $set: { organizationId: defaultOrganization._id },
    });
    if (orphanLeads.modifiedCount > 0) {
        logger.info(`Migration: assigned ${orphanLeads.modifiedCount} lead(s) to the default organization`);
    }

    // 4. Ensure the public-lead receiving organization exists.
    await OrganizationService.ensure({
        name: 'HEROES Demo',
        slug: config.publicOrgSlug,
    });

    logger.info('Migrations completed');
}
