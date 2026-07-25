import { User } from '../modules/auth/auth.model.js';
import { logger } from '../utils/logger.js';

export async function seedDatabase() {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
        logger.info('Database already seeded, skipping...');
        return;
    }

    logger.info('Seeding database with demo users...');

    await User.create([
        { name: 'Admin User', email: 'admin@heroes.com', password: 'password123', role: 'ADMIN', status: 'ACTIVE' },
        { name: 'Sarah Member', email: 'sarah@heroes.com', password: 'password123', role: 'MEMBER', status: 'ACTIVE' },
    ]);

    logger.info('Database seeded successfully');
}
