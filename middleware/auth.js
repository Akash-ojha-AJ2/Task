import  jwt  from "jsonwebtoken";
import {User} from "../models/UserModle"

exports.protect = async(req,res,next)=>{
    let token;

    if(req.header.authorization && req.headers.authorization.startwith(Bearer)){
        token = req.header.authorization.split(" ")[1];
    }
    if(!token){
        req.status(401).json({message : "NOT authorize no token provide"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select(-password);

        if(!req.user){
            return res.status(401).json({message: "not authorize, token invaid"})
        }
        next();
    } catch (error) {
        console.log(error)
         return res.status(401).json({message: "not authorize, token invaid"})
    }
}