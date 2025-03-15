import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please provide your name!"],
        minLength: [3, "name must contain atleast 3 characters"]
    },
    email:{
        type: String,
        required: [true, "Please provide your email!"],
        validate: [validator.isEmail,"Please provide a valid email!"]
    },
    phone:{
        type: Number,
        required: [true, "Please provide your phone Number!"],
        match: [/^\+91[6-9]\d{9}$/, "Please enter a valid Indian phone number (+91XXXXXXXXXX)"],
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: [true, "Please provide your password!"],
        minLength: [4, "password must contain atleast 4 characters"]
    },
    role:{
        type: String,
        required: [true, "Please provide your role!"],
        enum: ["Job Seeker", "Employer"]
    }
},{timestamps: true})

// HASHING THE PASSWORD
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// COMPARING THE PASSWORD
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

// GENERATING A JWT TOKEN FOR AUTHORIZATION
userSchema.methods.getJWTToken = async function(){
    return jwt.sign(
        {id: this._id},
        process.env.JWT_SECRET_KEY,
        {expiresIn: process.env.JWT_EXPIRE}
    )
}

const User = mongoose.model("User", userSchema)
export default User