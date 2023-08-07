const CustomErrorHandler = require("../helpers/CustomErrorHandler");
const catchAsync = require("./catchAsync");
const Employee = require('../models/employeeModel');
const jwt = require('jsonwebtoken');
const RoleManagement = require("../models/roleManagementModel");

exports.isAuthenticated = catchAsync(async (req, res, next) =>{
    const {token} = req.cookies;

    if(!token){
        return next(new CustomErrorHandler("Please login to access this resource!", 401))
    }

    const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.employee = await Employee.findById(decodedData.id);

    next();
})


exports.authorizeRoles = (...roles)=> {
    return async (req, res, next) => {
        const empID = req.employee._id
        const empRole = await RoleManagement.findOne({AssignedEmployee: {$in: [empID]}})
        if(empRole !== null){
            if (roles.includes(empRole.role)===false){
                next(new CustomErrorHandler(`Role: ${empRole.role} is not allowed to access this resource!`, 401))
            }
            next();
        }else{
            next();
        }
    }
}