import express from "express"
import {postApplication, employerGetAllApplication, jobseekerGetAllApplication , jobseekerDeleteApplication} from "../controllers/application.controllers.js"
const router = express.Router()

router.route("/post").post(postApplication)
router.route("/employer/getall").post(employerGetAllApplication)
router.route("/jobseeker/getall").get(jobseekerGetAllApplication)
router.route("/delete/:id").get(jobseekerDeleteApplication)

export default router