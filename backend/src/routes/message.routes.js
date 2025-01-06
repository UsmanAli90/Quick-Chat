import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js';
import { getUsersForSidebar } from '../controllers/message.controller.js';

const routes=express.Router();

routes.get('/users',protectRoute, getUsersForSidebar)



export default routes