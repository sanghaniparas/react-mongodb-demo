import express from 'express'
import * as authController from '../controllers/auth.controller.mjs'



const authRouter = express.Router();

authRouter.post('/registration', authController.registration)
authRouter.post('/login', authController.login)
export default authRouter
