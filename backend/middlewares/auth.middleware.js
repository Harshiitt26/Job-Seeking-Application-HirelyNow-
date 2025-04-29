import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js"
import asyncHandler from "./asyncHandler.middleware.js"
import ErrorHandler from "./error.middleware.js"

const isAuthorized = asyncHandler( async(req,res,next)=>{
    const {token} = req.cookies
    if(!token){
        return next( new ErrorHandler("Unauthorized User!", 401))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = await userModel.findById(decoded.id)
    next()
})

export default isAuthorized
