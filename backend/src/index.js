import express from 'express';
import authRoutes from './routes/auth.routes.js'

const app=express();

app.use('/auth',authRoutes)

app.listen(5001,()=>{
    console.log('server is running')
})