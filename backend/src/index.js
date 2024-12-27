import express from 'express';
import authRoutes from './routes/auth.routes.js'
import dotenv from 'dotenv';
import { ConnectDB } from './lib/db.js';

const app=express();
app.use(express.json());
dotenv.config();

app.use('/auth',authRoutes)

const port=process.env.PORT;


app.listen(port,()=>{
    console.log('server is running on port: '+ port)
    ConnectDB();
})