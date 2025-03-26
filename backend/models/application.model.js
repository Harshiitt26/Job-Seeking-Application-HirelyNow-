import mongoose from "mongoose"
import validator from "validator"


const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Provide your name"],
        minLength: [3, "name must contain atleast 3 characters"]
    },
    email: {
        type: String,
        required: [true, "Provide your name"],
        validate: [validator.isEmail, "Please provide a valid email!"]
    },
    coverLetter: {
        type: String,
        required: [true, "Provide a cover letter"],
    },
    phone: {
        type: Number,
        required: [true, "Please enter your Phone Number!"],
    },
    address: {
        type: String,
        required: [true, "Please enter your Address!"],
    },
    resume: {
        public_id: {
          type: String, 
          required: true,
        },
        url: {
          type: String, 
          required: true,
        },
    },
    applicantID: {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          enum: ["Job Seeker"],
          required: true,
        },
    },
    employerID: {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          enum: ["Employer"],
          required: true,
        },
    },
},{timestamps: true})

const Application = new mongoose.model("Application", applicationSchema)
export default Application