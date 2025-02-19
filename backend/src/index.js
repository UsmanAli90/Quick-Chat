import express from 'express';
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import dotenv from 'dotenv';
import { ConnectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { app, server } from './lib/socket.js'
import path from "path";
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
dotenv.config();

app.use('/auth', authRoutes)
app.use('/message', messageRoutes)

const port = process.env.PORT || 5001;
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}


server.listen(port, () => {
    console.log('server is running on port: ' + port)
    ConnectDB();
})