import jobModel from "../models/job.model.js"
import asyncHandler from "../middlewares/asyncHandler.middleware.js"
import ErrorHandler from "../middlewares/error.middleware.js"

const getAllJobs = asyncHandler( async(req,res, next)=>{
    const jobs = await jobModel.find({expired: false})
    if(!jobs){
        return next(new ErrorHandler("No Job is posted at present",400))
    }
    res.status(200).json({success: true,jobs})
})


const postJob = async(req,res, next)=>{
    const {role} = req.user
    if( role !== "Employer"){
        return next(new ErrorHandler("Only Employer is allowed to post a job",400))
    }
    const {title , description , category , country , city , location , fixedSalary , salaryFrom , salaryTo } = req.body

    if(!title || !description || !category || !country || !city || !location ){
        return next(new ErrorHandler("Fill up the important details",400))
    }
    if(!fixedSalary &&(!salaryFrom || !salaryTo )){
        return next(new ErrorHandler("Either provide fixed salary or ranged salary",400))
    }
    if(fixedSalary && (salaryFrom || salaryTo)){
        return next(new ErrorHandler("Either provide fixed salary or ranged salary properly",400))
    }
    const postedBy = req.user._id
    const job = await jobModel.create({title , description , category , country , city , location , fixedSalary , salaryFrom , salaryTo, postedBy})
    res.status(200).json({success: true, message: "Job posted Successfully!",job})
}


const getMyJobs = asyncHandler( async(req,res,next)=>{
    const {role} = req.user
    if( role !== "Employer"){
        return next(new ErrorHandler("Only Employers are allowed to access this resource",400))
    }
    const {_id} = req.user
    const jobs = await jobModel.find({postedBy: _id})
    if(jobs.length === 0){
        return next(new ErrorHandler("No Job is posted by You at present",400))
    }
    res.status(200).json({success: true,jobs})
})


const updateJob = asyncHandler( async(req,res,next)=>{
    const {role, _id} = req.user
    if( role !== "Employer"){
        return next(new ErrorHandler("Only Employers are allowed to access this resource",400))
    }
    const {id} = req.params

    const job = await jobModel.findByIdAndUpdate(id, req.body, 
        {new: true,
         runValidator: true,
         useFindAndModify: false}
    )
    if(!job){
        return next(new ErrorHandler("Job not found!",404))
    }
    if (job.postedBy.toString() !== _id.toString()) {
        return next(new ErrorHandler("You are not authorized to update this job", 403));
    }
    res.status(200).json({success: true, message: "Job Updated Successfully", job})
})

const deleteJob = asyncHandler( async(req,res,next)=>{
    const {role, _id} = req.user
    if( role !== "Employer"){
        return next(new ErrorHandler("Only Employers are allowed to access this resource",400))
    }
    const {id} = req.params

    const job = await jobModel.findByIdAndDelete(id)
    if(!job){
        return next(new ErrorHandler("Job not found!",404))
    }
    if (job.postedBy.toString() !== _id.toString()) {
        return next(new ErrorHandler("You are not authorized to update this job", 403));
    }
    res.status(200).json({success: true, message: "Job Deleted Successfully", })
})

const getSingleJob = asyncHandler( async(req,res,next)=>{
    const {id} = req.params
    const job = await jobModel.findById(id)
    if(!job){
        return next(new ErrorHandler("Job not found!",404))
    }
    res.status(200).json({success: true,job})
})

export {getAllJobs, postJob , getMyJobs, updateJob, deleteJob, getSingleJob}