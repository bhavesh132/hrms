const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const EmployeeSchema = new mongoose.Schema({
    emp_no:{
        type: Number,
        required: true, 
        unique: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    firstName:{
        type: String,
        required: true,
        length: 20
    },
    lastName: {
        type: String,
        length: 20
    },
    userName: {
        type: String,
        required: true,
        length: 45,
        unique: true
    },
    email: {
        type: String,
        length: 50,
        required: true,
        unique: true,
        validate: {
            validator: (value) => {validator.isEmail(value)},
            message: `Invalid Email Address`
        }
    },
    password: {
        type: String,
        required: true,
        min: [8, 'Enter at least 8 Characters'],
        select: false
    },
    avatar: {
        public_id:{
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        required: true,
        default: "user"
    },
    dateOfBirth: {type: Date},
    department: {type: String},
    position: {type: String},
    supervisor: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Employee'
    },
    address: {
        street: {type: String},
        city: {type: String},
        state: {type: String}
    },
    nationality: {type: String},
    location: {type: String},
    dateOfJoining: {type: Date},
    status: {
        type: String,
        enum: ['Full-Time', 'Part-Time']
    },
}, {timestamps: true});

EmployeeSchema.pre('save', async function(next){

    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
});

EmployeeSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id},process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

EmployeeSchema.methods.comparePassword = async function(password){
        return await bcrypt.compare(password, this.password); 
}


const Employee = mongoose.model('Employee', EmployeeSchema);


module.exports = Employee;

