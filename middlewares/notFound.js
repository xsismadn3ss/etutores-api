function notFound(req, res, next) {
    const error = new Error(`Pagina no encontrada - ${req.originalUrl}`);
    error.status = 404
    error.message = `Pagina no encontrada - ${req.originalUrl}`
    next(error);
}

module.exports = notFound;