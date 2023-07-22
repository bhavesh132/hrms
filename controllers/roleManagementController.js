const RoleManagement = require("../models/roleManagementModel");
const catchAsync = require("../middlewares/catchAsync");
const CustomErrorHandler = require("../helpers/CustomErrorHandler");

exports.createRole = catchAsync(async (req, res, next)=>{
    const {role} = req.body
    
    const createdRole = await RoleManagement.create({
        role: role
    });

    res.status(200).json({
        status: "success",
        createdRole
    })
})

exports.assignRole = catchAsync(async (req,res,next)=>{
    const {role, empID} = req.body

    const appendRole = await RoleManagement.updateOne({role: role}, {$push:{AssignedEmployee: empID}});

    if(!appendRole){
        next(new CustomErrorHandler("No Role Found with the specified value!", 404))
    }

    res.status(201).json({
        status: "success",
        appendRole
    })
    
})

exports.removeRole = catchAsync(async (req, res, next)=> {
    const {role} = req.body;

    const deletedRole = await RoleManagement.deleteOne({role: role});

    if(!role){
        next(new CustomErrorHandler("Role does not exist!"))
    }
    res.status(201).json({
        success: true,
        deletedRole
    })
})

exports.unassignRole = catchAsync(async (req, res, next)=>{
    const {role, empID} = req.body

    const appendRole = await RoleManagement.updateOne({role: role}, {$pull: {AssignedEmployee: empID}});

    res.status(201).json({
        success: true,
        appendRole
    })
})

exports.getRoles = catchAsync(async (req,res,next)=>{
    const roles = await RoleManagement.find();
    const count = await RoleManagement.countDocuments();

    if(!roles){
        next(new CustomErrorHandler("No Roles Created for this system!", 404))
    }

    res.status(200).json({
        status: "success",
        roles,
        count
    })
})