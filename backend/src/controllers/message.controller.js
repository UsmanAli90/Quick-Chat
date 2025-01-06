import User from '../models/user.model.js';

const getUsersForSidebar =async(req,res)=>{
    try{
        const loggedinUser=req.user._id;
        const filteredUsers=await User.find({_id:{$ne:loggedinUser}}).select('-password');
    }catch{
        console.log("error in getUsersForSidebar",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

