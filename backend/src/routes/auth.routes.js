import express from 'express'
import { Login, Logout, signup } from '../controllers/auth.controller.js';

const router=express.Router();

router.post('/Signup',signup)
router.post('/login',Login)
router.post('/logout',Logout)

export default router