import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js';
import { getUsersForSidebar } from '../controllers/message.controller.js';
import { getMessages } from '../controllers/message.controller.js';
import { sendMessage } from '../controllers/message.controller.js';

const routes=express.Router();

routes.get('/users',protectRoute, getUsersForSidebar)
routes.get(':/id',protectRoute, getMessages)



export default routes