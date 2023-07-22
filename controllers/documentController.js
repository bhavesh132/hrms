const Document = require('../models/documentModel')
const catchAsync = require("../middlewares/catchAsync");
const CustomErrorHandler = require("../helpers/CustomErrorHandler");

exports.createDocument = catchAsync(async (req, res, next)=> {
    const document = await Document.create(req.body);

    res.status(200).json({
        success: true,
        document
    })
})

exports.getDocuments = catchAsync(async (req, res, next)=>{
    const documents = await Document.find({employee: req.body.empID});
    const count = await Document.countDocuments();

    if(!documents){
        next(new CustomErrorHandler("No Documents added for this employee!", 404))
    }

    res.status(200).json({
        success: true,
        documents,
        count
    })
})