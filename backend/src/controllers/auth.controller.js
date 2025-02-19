import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import cloudinary from '../lib/cloudinary.js';

export const signup = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" })
        }
        const UserExists = await User.findOne({ email });
        if (UserExists) {
            return res.status(400).json({ message: "Email already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newuser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword
        })
        if (newuser) {
            //generate JWT token
            generateToken(newuser._id, res);
            await newuser.save();

            return res.status(201).json({
                _id: newuser._id,
                fullName: newuser.fullName,
                email: newuser.email,
                profilepic: newuser.profilepic,
            })
        } else {
            return res.status(400).json({ message: "Invalid User Data" })
        }
    } catch (error) {
        console.log("error in SignupCOntroller", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}


export const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const ispasswordCorrect = await bcrypt.compare(password, user.password)
        if (!ispasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        //generate JWT token
        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilepic: user.profilepic,
        })
    } catch (error) {
        console.log("error in LoginController", error.message)
        res.status(500).json({ message: "Internal Server Error" })

    }
}


export const Logout = (req, res) => {
    //We just need to clear out JWT token in Logout
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("error in LogoutController", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const upadateProfile = async (req, res) => {
    try {
        const { profilepic } = req.body;
        const userID = req.user._id; //from protectRoute middleware as we stored all info of user in req.user

        if (!profilepic) {
            return res.status(400).json({ message: "Profile pic is required" })
        }
        const uploadResponse = await cloudinary.uploader.upload(profilepic); //uploading image to cloudinary
        const upadtedUser = await User.findByIdAndUpdate(userID, { profilepic: uploadResponse.secure_url }, { new: true });
        //secure_url is given by cloudinary and new:true will return the updated document(Updated user)
        res.status(200).json(upadtedUser);

    } catch (error) {
        console.log("error in upadateProfileController", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user );
    } catch (error) {
        console.log("error in checkAuthController", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}