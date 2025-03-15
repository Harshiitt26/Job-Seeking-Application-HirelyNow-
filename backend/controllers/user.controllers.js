import userModel from "../models/user.model.js"
import ErrorHandler from "../middlewares/error.middleware.js"
import asyncHandler from "../middlewares/asyncHandler.middleware.js"
import setToken from "../utils/setToken.js"

const register = asyncHandler(async(req,res,next)=>{
    const {name, email, phone, password, role} = req.body
    if(!name || !email || !phone || !password || !role){
        return next( new ErrorHandler("All Fields are Mandatory!"))
    }
    const checkEmail = await userModel.findOne({email})
    if(checkEmail){
        return next( new ErrorHandler("User Already Registered"))
    }
    const user = await userModel.create({name, email, phone, password, role})
    setToken(user, 201 , res , "User Registered Successfully!")
    
})


const login = asyncHandler(async(req,res,next)=>{
    const {email , password , role} = req.body
    if(!email || !password || !role){
        return next( new ErrorHandler("All Fields are Mandatory!"))
    }
    const user = await userModel.findOne({email}).select("+password")
    if(!user){
        return next( new ErrorHandler("Invalid email or password!"))
    }
    const isPasswordMatched = await user.comparePassword(password) 
    if(!isPasswordMatched){
        return next( new ErrorHandler("Invalid email or password!"))
    }
    if(user.role !== role){
        return next( new ErrorHandler("User with this role not found!")) 
    }
    setToken(user, 200 , res , "User LoggedIn Successfully!")
})


const logout = asyncHandler(async(req,res,next)=>{
    res.status(201)
    .cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    .json({
        success: true,
        message: "User Logged out Successfully"
    })
})


const getUser = asyncHandler(async(req,res)=>{

})

export {register, login , logout , getUser}


