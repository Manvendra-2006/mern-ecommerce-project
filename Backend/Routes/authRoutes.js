import express from 'express'
import { signupUser } from '../controllers/authController.js'
import { loginuser } from '../controllers/authController.js'
const router = express.Router()
router.post("/signup",signupUser)
router.post("/login",loginuser)

export default router;
