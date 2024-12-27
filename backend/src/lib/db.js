import mongoose from 'mongoose';

export const ConnectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch{
        console.log('Error: '+error.message);
    }
}