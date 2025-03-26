import express from "express"
import {postApplication, employerGetAllApplication, jobseekerGetAllApplication , jobseekerDeleteApplication} from "../controllers/application.controllers.js"
import isAuthorized from "../middlewares/auth.middleware.js"
const router = express.Router()

router.route("/post").post(isAuthorized, postApplication)
router.route("/employer/getall").get(isAuthorized, employerGetAllApplication)
router.route("/jobseeker/getall").get(isAuthorized, jobseekerGetAllApplication)
router.route("/delete/:id").delete(isAuthorized, jobseekerDeleteApplication)

export default router