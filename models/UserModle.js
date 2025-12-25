import mongoose from "mongoose"
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true,
    },
    email:{
        type:String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
});

UserSchema.pre('save' , async function(next){
    if(!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
        next();
    } catch (error) {
      console.log(error)
        
    }
});

UserSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
};

const User = mongoose.model("User", UserSchema)

export default User;