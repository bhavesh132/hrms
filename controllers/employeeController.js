const Employee = require('../models/employeeModel');
const ErrorHandler = require('../helpers/errorHandler');
const catchAsync = require('../middlewares/catchAsync');
const ApiFeatures = require('../helpers/apiFeatures');

// Add an employee

exports.createEmployee = catchAsync(async (req, res, next)=>{
        const api = new ApiFeatures(Employee.create(req.body), req.query)
    
        const employee = await api.query
        res.status(201).json({
            success: true,
            employee
        })
});

exports.signIn = async (req, res, next)=>{
    try{
        const employee = await Employee.findOne({userName: req.body.userName})
        if(!employee) return next();

        const isMatch = await employee.isValidPassword(req.body.password)

        if(!isMatch) return next();

        const accessToken = await signAccessToken(employee.id)

        res.send({
            success: true,
            employee,
            accessToken
        })

    } catch (err){
        next(err)
    }
}