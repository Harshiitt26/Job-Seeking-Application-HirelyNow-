import applicationModel from "../models/application.model.js"
import asyncHandler from "../middlewares/asyncHandler.middleware.js"
import ErrorHandler from "../middlewares/error.middleware.js"
import cloudinary from "cloudinary"
import JobModel from "../models/job.model.js"

const postApplication = asyncHandler( async(req,res,next)=>{
    const {role} = req.user
    if(role !== "Job Seeker"){
        return next(new ErrorHandler("Only Job Seekers are allowed to post an apllication", 404))
    }
    if(!req.files || Object.keys(req.files).length === 0){
        return next (new ErrorHandler("Upload the resume File!", 404))
    }
    const {resume}= req.files
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"]
    if(!allowedFormats.includes(resume.mimetype)){
        return next(new ErrorHandler("Invalid File type , please upload resume in a PNG,JPG or WEBP Format.",404))
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(resume.tempFilePath)
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("Cloudinary Error: ", cloudinaryResponse.error || "Unknown ")
        return next(new ErrorHandler("Failed to upload Resume", 500))
    }
    const {name, email, coverLetter, phone, address, jobId} = req.body
    const applicantID = {
        user: req.user._id,
        role: "Job Seeker"
    }
    if(!jobId){
        return next(new ErrorHandler("Job not Found!", 404))
    }
    const jobDetails = await JobModel.findById(jobId)
    if(!jobDetails){
        return next(new ErrorHandler("Job not Found!", 404))
    }
    const employerID = {
        user: jobDetails.postedBy,
        role: "Employer"
    }
    if(!name || !email || !coverLetter || !phone || !address || !applicantID || !employerID || !resume){
        return next(new ErrorHandler("All Fields are Mandatory!", 404))
    }
    const application = await applicationModel.create({
        name,email,coverLetter,phone,address,applicantID,employerID,resume:{
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }
    })
    res.status(200).json({
        success: true,
        message: "Application Submitted Successfully!",
        application
    })
})


const employerGetAllApplication = asyncHandler( async(req,res,next)=>{
    const {role, _id} = req.user
    if( role !== "Employer"){
        return next(new ErrorHandler("Only Employers are allowed to access this resource",400))
    }
    const applications = await applicationModel.find({"employerID.user": _id})
    if(applications.length == 0){
        return next(new ErrorHandler("No applications are posted",400))
    }
    res.status(200).json({
        success: true,
        applications
    })
})


const jobseekerGetAllApplication = asyncHandler( async(req,res,next)=>{
    const {role, _id} = req.user
    if( role !== "Job Seeker"){
        return next(new ErrorHandler("Only Job Seekers are allowed to access this resource",400))
    }
    const applications = await applicationModel.find({"applicantID.user": _id})
    if(applications.length == 0){
        return next(new ErrorHandler("No applications are posted",400))
    }
    res.status(200).json({
        success: true,
        applications
    })
})


const jobseekerDeleteApplication = asyncHandler( async(req,res,next)=>{
    const {role} = req.user
    if( role !== "Job Seeker"){
        return next(new ErrorHandler("Only Job Seekers are allowed to access this resource",400))
    }
    const {id}= req.params
    const application = await applicationModel.findByIdAndDelete(id)
    if(!application){
        return next(new ErrorHandler("Application Not Found",404))
    }
    res.status(200).json({
        success: true,
        message: "Application Deleted Successfully!"
    })
})

export {postApplication, employerGetAllApplication, jobseekerGetAllApplication , jobseekerDeleteApplication}