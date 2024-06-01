const ErrorHandler = (err, req, res, next) => {
    // If the response status code is not already set, set it to 500
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

    // Set the response status code
    res.status(statusCode);

    // Send the error response
    res.json({
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
    });
};

module.exports = { ErrorHandler };
