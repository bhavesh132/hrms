const mongoose = require("mongoose");

const RoleManagementSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        unique: true
    },
    Description: {type: String},
    AssignedEmployee: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Employee'   
        }
    ]
})


const RoleManagement = mongoose.model("RoleManagement", RoleManagementSchema)

module.exports = RoleManagement