import express from "express"
import {register, login , logout, getUser} from "../controllers/user.controllers.js"
const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/getuser").get(getUser)

export default router