import mongoose from "mongoose"

const jobSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Provide a title"],
        minLength: [3, "title must contain atleast 3 characters"]
    },
    description:{
        type: String,
        required: [true, "Provide a description"],
        minLength: [3, "description must contain atleast 3 characters"]
    },
    category:{
        type: String,
        required: [true, "Provide category name"],
    },
    country:{
        type: String,
        required: [true, "Provide name of country"],
    },
    city:{
        type: String,
        required: [true, "Provide name of city"],
    },
    location:{
        type: String,
        required: [true, "Provide location"],
        minLength: [4, "title must contain atleast 3 characters"]
    },
    fixedSalary:{
        type: String,
        minLength: [4, "title must contain atleast 3 characters"]
    },
    salaryFrom:{
        type: String,
        minLength: [4, "title must contain atleast 3 characters"]
    },
    salaryTo:{
        type: String,
        minLength: [4, "title must contain atleast 3 characters"]
    },
    expired:{
        type: Boolean,
        default: false
    },
    jobPostedOn:{
        type: Date,
        default: Date.now,
    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
},{timestamps: true})

const Job = mongoose.model("Job", jobSchema)
export default Job