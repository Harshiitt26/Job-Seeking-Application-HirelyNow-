import express from "express"
import {register, login , logout, getUser} from "../controllers/user.controllers.js"
import isAuthorized from "../middlewares/auth.middleware.js"
const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(isAuthorized,logout)
router.route("/getuser").get(isAuthorized , getUser)

export default router