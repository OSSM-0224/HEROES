import app from './app.js';
import { config } from './config/env.js';
import { connectDatabase } from './config/db.js';
import { seedDatabase } from './database/seed.js';
import { runMigrations } from './database/migrate.js';
import { logger } from './utils/logger.js';

async function startServer() {
    try {
        await connectDatabase();
        await seedDatabase();
        await runMigrations();

        app.listen(config.port, '0.0.0.0', () => {
            logger.info(`HEROES Backend running on http://0.0.0.0:${config.port} in ${config.nodeEnv} mode`);
        });
    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
