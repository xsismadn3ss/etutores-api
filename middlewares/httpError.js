function httpErrorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        error: {
            message,
            status
        },
        succes:false
    });
}

module.exports = httpErrorHandler;