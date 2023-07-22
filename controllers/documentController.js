const Document = require('../models/documentModel')
const catchAsync = require("../middlewares/catchAsync");
const CustomErrorHandler = require("../helpers/CustomErrorHandler");

exports.createDocument = catchAsync(async (req, res, next)=> {
    const {title, description, fileURL} = req.body

    const document = await Document.create({employee: req.employee._id, title, description, fileURL});

    res.status(200).json({
        success: true,
        document
    })
})

// To view personal Docs
exports.viewDocuments = catchAsync(async(req, res, next)=>{
    const documents = await Document.find({employee: req.employee._id})

    if(!documents){
        next(new CustomErrorHandler("No documents added yet!", 404))
    }

    res.status(200).json({
        success: true,
        documents
    })
})


// For Admin to view docs of any employee
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

exports.removeDocument = catchAsync(async(req, res, next)=>{
    const document = await Document.findByIdAndDelete(req.params.id);

    if(!document){
        next (new CustomErrorHandler("Document not found!", 404))
    }

    res.status(200).json({
        success: true,
        message: "Document deleted successfully!"
    })
})