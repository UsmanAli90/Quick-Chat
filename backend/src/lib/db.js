import mongoose from 'mongoose';

export const ConnectDB=async()=>{
    try{
        if (!process.env.MONGODB_URI) {
            throw new Error('MongoDB URI is not defined in environment variables');
        }
        const conn=await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
        return conn; 
    }catch(error){
        console.log('Error: '+error.message);
        throw error;
    }
}