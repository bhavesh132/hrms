const Employee = require('../models/employeeModel');
const CustomErrorHandler = require('../helpers/CustomErrorHandler');
const catchAsync = require('../middlewares/catchAsync');
const ApiFeatures = require('../helpers/apiFeatures');
const sendToken = require('../helpers/sendToken');
const sendEmail = require("../helpers/sendEmail")
const crypto = require("crypto")

// Add an employee
exports.createEmployee = catchAsync(async (req, res, next)=>{
        const api = new ApiFeatures(Employee.create(req.body), req.query)
        const employee = await api.query
        res.status(201).json({
            success: true,
            employee
        })
});

// Get all employees Details --Administrator
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

// Get a particular employee details --administrator
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

exports.updateEmployeeDetails = catchAsync(async (req, res, next)=> {
    const employee = await Employee.findOneAndUpdate({_id: req.params.id}, req.body);

    if(!employee){
        return next(new CustomErrorHandler("Employee Does not Exists!", 404))
    }

    res.status(200).json({
        success: true,
        employee
    })
})

// Login a user
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
})

// Logout User
exports.employeeLogout = catchAsync(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "You have been logged out successfully!"
    })
})

// Employee Profile for logged in Employee
exports.employeeProfile = catchAsync(async (req, res, next)=> {
    const employee = await Employee.findById(req.employee._id)

    if(!employee){
        next(new CustomErrorHandler("Details not found!", 404))
    }

    res.status(200).json({
        success: true,
        employee
    })

});

exports.updateProfile = catchAsync(async (req, res, next)=> {
    const employee = await Employee.findById(req.employee._id)

    if(!employee){
        next(new CustomErrorHandler("Please sign in to access this resource", 401))
    }

    const update = await Employee.updateOne({_id: req.employee.id}, req.body)

    if(update.modifiedCount === 0){
        next(new CustomErrorHandler("Unable to update Employee", 400))
    }

    res.status(200).json({
        success: true,
        employee,
        update
    })
})

// Forget Password
exports.forgotPassword = catchAsync(async (req,res,next)=>{
    const employee = await Employee.findOne({email: req.body.email})

    if(!employee){
        return next(new CustomErrorHandler("Email Does not exists!", 404))
    }

    // Get Reset Password Token
    const token = await employee.getResetPasswordToken()
    await employee.save({validateBeforeSave: false})

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/employee/password/reset/${token}`

    console.log(resetPasswordUrl)
    const message = `<h3>Hi ${employee.firstName}!</h3><p>It seems you are having trouble to sign in to your account. The below link is generated to help you reset your password. Please click on this link to reset your password:</p> 
    <a href='${resetPasswordUrl}'>Reset Your Password here</a> 
    \n\n<br>
    <strong>Note: The link will expire automatically within the next 15 minutes.</strong>`

    try{
        await sendEmail({
            email: employee.email,
            subject: `Password Recovery HRMS`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email has been successfully sent to ${employee.email}`
        })
    }
    catch (err){
        employee.resetPasswordToken = undefined
        employee.resetPasswordExpires = undefined
        await employee.save({validateBeforeSave: false})
        return next(new CustomErrorHandler(`Email could not be sent! ${err}`, 500))
    }

})

// Reset Password response
exports.resetPassword = catchAsync(async (req,res,next)=>{
    const resetToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const employee = await Employee.findOne({
        resetPasswordToken: resetToken,
        resetPasswordExpires: {$gt: Date.now()}
    });

    if(!employee){
        return next(new CustomErrorHandler("Reset Password Token is invalid or has expired!", 400))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new CustomErrorHandler("New Password and Confirm Password Does not match!"))
    }

    employee.password = req.body.password
    employee.resetPasswordToken = undefined
    employee.resetPasswordExpires = undefined
    await employee.save();

    res.status(201).json({
        success: true,
        message:"Your password has been updated successfully!"
    })

})