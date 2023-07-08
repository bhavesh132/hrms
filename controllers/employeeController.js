const Employee = require('../models/employeeModel');
const CustomErrorHandler = require('../helpers/CustomErrorHandler');
const catchAsync = require('../middlewares/catchAsync');
const ApiFeatures = require('../helpers/apiFeatures');
const sendToken = require('../helpers/sendToken');

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
    res.status(200).json({
        success: true,
        employees,
        count
    })

})

exports.getEmployeeDetails = catchAsync(async (req,res,next)=>{
    const employee = await Employee.findById(req.params.id);

    if (!employee){
        return next(new CustomErrorHandler("Employee Does not Exists", 404));
    }

    res.status(200).json({
        success:true,
        employee
    })
})

exports.employeeLogin = catchAsync(async (req, res, next)=>{

    const {email, password} = req.body;

    // Validation of email and password
    if(!email || !password){
        return next(new CustomErrorHandler("Please enter Email and Password", 400))
    }

    const employee = await Employee.findOne({ email }).select("+password");

    if(!employee){
        return next(new CustomErrorHandler("Invalid Email or Password", 401))
    }
    const isPasswordMatched = await employee.comparePassword(password);

    if(!isPasswordMatched){
        return next(new CustomErrorHandler("Invalid Email or Password", 401))
    }

    sendToken(employee,200,res)
    // const token = await employee.getJWTToken();
    // res.status(200).json({
    //     success: true,
    //     token
    // })
})