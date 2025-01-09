import express from 'express';
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import dotenv from 'dotenv';
import { ConnectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
dotenv.config();

app.use('/auth',authRoutes)
app.use('/message',messageRoutes)

const port=process.env.PORT;


app.listen(port,()=>{
    console.log('server is running on port: '+ port)
    ConnectDB();
})