const CustomErrorHandler = require('../helpers/CustomErrorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Some error Occured"

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
};
