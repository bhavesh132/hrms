const sendToken = (employee, statusCode, res)=>{
    const token = employee.getJWTToken();

    // Options for Cookies
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 60 * 60 * 1000
        ),
        httpOnly: true, 
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        employee, token
    })
}


module.exports = sendToken;