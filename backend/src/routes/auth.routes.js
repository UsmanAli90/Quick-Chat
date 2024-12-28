import express from 'express'
import { checkAuth, Login, Logout, signup, upadateProfile } from '../controllers/auth.controller.js';
import {protectRoute} from '../middleware/auth.middleware.js'
const router=express.Router();

router.post('/signup',signup)
router.post('/login',Login)
router.post('/logout',Logout)
router.put('/update-profile',protectRoute, upadateProfile) //put method as we are updating the profile
router.get('/check', protectRoute, checkAuth)

export default router