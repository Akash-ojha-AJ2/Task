import mongoose from "mongoose"

const Connectdb = () =>{
    try {
       const connect =  mongoose.connect(process.env.DBURL,{
            dbname:"server"
        })
        if(connect){
            console.log("Database is connected successfully")
        }
    } catch (error) {
        console.log("dataabse connection failed");
    }
} 

export default Connectdb;