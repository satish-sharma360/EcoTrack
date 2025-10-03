import express from 'express'
import authController from '../controller/auth.controller.js'
import authMiddlaware from '../middleware/auth.middlaware.js'

const authRouter = express.Router()

authRouter.post('/signup',authController.signup)
authRouter.post('/login',authController.login)
authRouter.post('/refresh-token',authController.refreshToken)
authRouter.get('/me',authMiddlaware.authMiddleware,(req,res)=>{
    res.status(200).json({success:true,user:req.user})
})

authRouter.post('/logout',authController.logout)

export default authRouter