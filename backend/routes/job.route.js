import express from "express"
import {getAllJobs, postJob , getMyJobs, updateJob, deleteJob, getSingleJob} from "../controllers/job.controllers.js"
const router = express.Router()

router.route("/getall").get(getAllJobs)
router.route("/post").post(postJob)
router.route("/getmyjobs").get(getMyJobs)
router.route("/update/:id").put(updateJob)
router.route("/delete/:id").delete(deleteJob)
router.route("/:id").get(getSingleJob)

export default router