import app from "./src/app.js";
import { config } from "./src/config/env.js";
import { connectDatabase } from "./src/config/db.js";
import { logger } from "./src/utils/logger.js";

async function startServer() {
    try {
        await connectDatabase();

        app.listen(config.port, () => {
            logger.info(
                `HEROES Backend running on http://localhost:${config.port}`
            );
        });
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
}

startServer();