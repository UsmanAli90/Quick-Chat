import User from '../models/user.model.js';
import Message from '../models/message.model.js';

export const getUsersForSidebar =async(req,res)=>{
    try{
        const loggedinUser=req.user._id;
        const filteredUsers=await User.find({_id:{$ne:loggedinUser}}).select('-password');
    }catch{
        console.log("error in getUsersForSidebar",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

 export const getMessages=async(req,res) =>{
    try {
        const {id:userToChatId}=req.params;
        const myId=req.user._id;
        const messages=await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId}
            ]
        })
    } catch (error) {
        console.log("error in getMessages",error.message);
        res.status(500).json({message:"Internal Server Error"});
        
    }
}

export const sendMessage=async (req,res)=>{
    try {
        const {text,image}=req.body
        const {id:receiverId}=req.params;
        const senderId=req.user._id
        let imageUrl;
        if(image){
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        }

        const newMessage=new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl
        })

        await newMessage.save();

        res.status(200).json(newMessage);



    } catch (error) {
       console.log("error in sendMessage",error.message);
        res.status(500).json({message:"Internal Server Error"}); 
    }
}