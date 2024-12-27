import jwt from 'jsonwebtoken';

export const generateToken=(userID,res)=>{
    const token=jwt.sign({userID},process.env.JWT_SECRET,{
        expiresIn:'7d'
    })

    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000, //should be in Milisecond so 7days into milisenconds
        httpOnly:true, //cookie cannot be accessed by JS(Prevent XSS Attacks)
        sameSite:"strict",//cookie will only be sent in a first-party context(prevent CSRF Attacks)
        secure:process.env.NODE_ENV!=='development', //cookie will only be sent in HTTPS in production(Not in development)
    })
}