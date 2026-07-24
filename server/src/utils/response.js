export const sendSuccess = (res, message = 'Success', data = null, statusCode = 200, meta = undefined) => {
    const payload = {
        success: true,
        message,
        ...(data !== null && { data }),
        ...(meta !== undefined && { meta }),
    };
    return res.status(statusCode).json(payload);
};

export const sendError = (res, message = 'An error occurred', statusCode = 500, errors = null) => {
    const payload = {
        success: false,
        message,
        ...(errors !== null && { errors }),
    };
    return res.status(statusCode).json(payload);
};
