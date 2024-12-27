import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const signup= async (req,res)=>{
    try{
        const {fullName,email,password}=req.body;

        if(!fullName || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }
        if (password.length<8){
            return res.status(400).json({message:"Password must be at least 8 characters"})
        }
        const UserExists= await User.findOne({email});
        if(UserExists){
            return res.status(400).json({message:"Email already exists"})
        }

        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);
        const newuser= new User({
            fullName:fullName,
            email: email,
            password:hashedPassword
        })
        if (newuser){
            //generate JWT token
            generateToken(newuser._id,res);
            await newuser.save();

            return res.status(201).json({
                _id:newuser._id,
                fullName:newuser.fullName,
                email:newuser.email,
                profilepic:newuser.profilepic,
            })
        }else{
            return res.status(400).json({message:"Invalid User Data"})
        }
    }catch(error){
        console.log("error in SignupCOntroller",error)
        res.status(500).json({message:"Internal Server Error"})
    }
}
export const Login= (req,res)=>{
    res.send('Login Done')
}
export const Logout= (req,res)=>{
    res.send('Logout Done')
}