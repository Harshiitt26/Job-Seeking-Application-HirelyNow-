import express from "express"
import dotenv from "dotenv"
import cloudinary from "cloudinary"
import cors from "cors"
import userRouter from "./routes/user.route.js"
import jobRouter from "./routes/job.route.js"
import applicationRouter from "./routes/application.route.js"
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"
import connectDB from "./config/db.js"
import { errorMiddleware } from "./middlewares/error.middleware.js"


dotenv.config()
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET
})
connectDB()
const app = express()
const PORT = process.env.PORT || 8000
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))


app.use("/api/v1/user", userRouter)
app.use("/api/v1/job", jobRouter)
app.use("/api/v1/application", applicationRouter)

app.use(errorMiddleware)

app.listen(PORT, ()=>{
    console.log("Server is listening on PORT: ", PORT)
})