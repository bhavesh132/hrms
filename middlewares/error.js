const ErrorHandler = require('../helpers/errorHandler');

module.exports = (err, req, res, next) => {
    err.status = err.status || 500;
    err.message = err.message || "Internal Server Error"

    res.status = (err.status).json({
        sucess: false,
        message: err.message
    })
}