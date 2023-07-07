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

exports.getAllEmployees = catchAsync(async (req, res, next)=>{
    const resultPerPage = 15

    const count = await Employee.countDocuments();

    const api = new ApiFeatures(Employee.find(), req.query).search().filter().pagination(resultPerPage);
    const employees = await api.query
    res.status(201).json({
        success: true,
        employees,
        count
    })

})

exports.getEmployeeDetails = catchAsync(async (req,res,next)=>{
    const employee = await Employee.findById(req.params.id);

    if (!employee){
        return next(new ErrorHandler("Employee Does not Exists", 404));
    }

    res.status(200).json({
        success:true,
        employee
    })
})