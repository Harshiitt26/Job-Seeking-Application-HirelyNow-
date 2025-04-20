import express from "express"
import {getAllJobs, postJob , getMyJobs, updateJob, deleteJob, getSingleJob} from "../controllers/job.controllers.js"
import isAuthorized from "../middlewares/auth.middleware.js"
const router = express.Router()

router.route("/getall").get(getAllJobs)
router.route("/post").post(isAuthorized, postJob)
router.route("/getmyjobs").get(isAuthorized , getMyJobs)
router.route("/update/:id").put(isAuthorized , updateJob)
router.route("/delete/:id").delete(isAuthorized , deleteJob)
router.route("/:id").get(isAuthorized, getSingleJob)

export default router