const CustomErrorHandler = require('../helpers/CustomErrorHandler');

module.exports = (err, req, res, next) => {
    if (err instanceof CustomErrorHandler) {
        res.status(err.statusCode).json({  
            sucess: false,
            message: err.message });
    } else {
        // Handle other types of errors or fallback
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
