const mongoose = require("mongoose");
const RoleManagement = require("../models/roleManagementModel");
const catchAsync = require("../middlewares/catchAsync");
const CustomErrorHandler = require("../helpers/CustomErrorHandler");
const Employee = require("../models/employeeModel");

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