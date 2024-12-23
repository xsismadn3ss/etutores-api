function notFound(req, res, next) {
    res.status(404);
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.status = 404
    next(error);
}

module.exports = notFound;