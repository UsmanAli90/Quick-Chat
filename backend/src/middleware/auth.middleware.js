import jwt from 'jsonwebtoken';
import User from '../models/user.model';

const protectRoute = async (req, res, next) => {

    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized- No token found" })
        }

        const decoded= jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({message:"Unauthorized- Invalid Token"})
        }

        const user=User.findById(decoded.userID).select('-password');

        if(!user){
            return res.status(401).json({message:"Unauthorized- No user found"})
        }

        req.user=user; //setting user in req object so that we can access it in the next middleware

        next(); 
    }
    catch (error) {
        console.log("error in protectRoute", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }

}