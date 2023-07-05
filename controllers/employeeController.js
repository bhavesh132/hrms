const Employee = require('../models/employeeModel');
const { signAccessToken } = require('../helpers/jwtHelper')

// Add an employee

exports.createEmployee = async (req, res, next)=>{
    try{
        const employee = await Employee.create(req.body);
        const accessToken = signAccessToken(employee.id)
        res.json({
            sucess:true, 
            employee,
            accessToken        
        })
    } catch (err){
        res.status(500).json({success: false, message: `Internal error ${err}`})
    }  
};

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