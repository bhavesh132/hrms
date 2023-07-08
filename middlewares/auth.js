const CustomErrorHandler = require("../helpers/CustomErrorHandler");
const catchAsync = require("./catchAsync");
const Employee = require('../models/employeeModel');

exports.isAuthenticated = catchAsync(async (req, res, next) =>{
    const token = req.cookies;

    if(!token){
        return next(new CustomErrorHandler("Please login to access this resource!", 401))
    }

    const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.employee = await Employee.findById(decodedData.id);

    next();
})