import User from "../models/UserModle.js"
import jtw from "jsonwebtoken"

const generateToken =(id)=>{
    const expiresIn = '1m';
    return jtw.sign({id},process.env.JWT_SECRET,{
        expiresIn
    })
}

const refreshtoken = (id) =>{
     const expiresIn = '7d';
    return jtw.sign({id},process.env.JWT_REFRESH_SECRET,{
        expiresIn
    })
}


const register = async(req, res)=>{
    try {
        const {name, email, password} = req.body;

        const userExist = await User.findOne({email});

        if(userExist){
            return res.status(400).json({message:"User already  exist"});
        }
         const user = await User.create({
            name,email,password
         });

         if(user){
            res.status(201).json({
                _id : user._id,
                name: user.name,
                email: user.email,
                accesstoken: generateToken(user._id),
                refreshtoken: refreshtoken(user._id)
            })
            }else{
                res.status(400).json({message: "Invalid User"});
            }
         }
     catch (error) {
        console.log(error);
        res.status(500).json({message: 'server error :', error: error.message})
    }
}

const Login = async(req, res) => {
    try {
        
    
    const {email, password} = req.body;

    const user = await User.findOne({email})

    if(User && (await user.comparePassword(password))){
        res.json({
            _id : user._id,
            name : user.name,
            email: user.email,
            accesstoken: generateToken(user._id),
            refreshtoken: refreshtoken(user._id)
        });
    }
        else{
            res.status(401).json({message:"Invalid Email"})
        }

        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'server error :', error: error.message})
        
    }
    
}

const refreshTok = async(req, res)=>{
    const{refreshtoken} = req.body;

    if(!refreshtoken){
        return res.status(401).json({message: "No refresh token"})
    }
    try {
        const decode = jtw.verify(
            refreshtoken,
            process.env.JWT_REFRESH_SECRET
        )
        const newAccessTokne = generateToken(decode.id);
        res.json({
            accesstoken: newAccessTokne
            
        })
    } catch (error) {
        console.log(error)
        return res.status(401).json({message: "No refresh token"})
}
}


export default {register , Login, refreshTok}