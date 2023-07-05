import mongoose from "mongoose";

const LeaveAndAttendanceSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Employee'
    },
    date: {type: Date, required: true},
    status: {
        type: String
    },
    punchIn: {
        type: Date,
    },
    punchOut: {
        type: Date
    }
},{timestamps: true})


const LeaveAttendance = mongoose.model('LeaveAttendance', LeaveAndAttendanceSchema);

module.exports = LeaveAttendance;