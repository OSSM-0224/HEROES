import { logger } from '../utils/logger.js';
import { sendError } from '../utils/response.js';

export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    const errors = err.errors || null;

    if (statusCode >= 500) {
        logger.error(`${req.method} ${req.url} - Error: ${err.message}`, err.stack);
    } else {
        logger.warn(`${req.method} ${req.url} - ${statusCode} ${err.message}`);
    }

    return sendError(res, message, statusCode, errors);
};
