import express from "express"
import Connectdb from "./dbconnection/db.js";
const app = express();
import userRoute from "./routes/userRoutes.js"
import cors from "cors"
import dotenv from 'dotenv'

dotenv.config();

app.use(cors({
    origin: 'http://localhost:5000'
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/api/user" , userRoute);
const PORT = process.env.PORT
app.listen(PORT , ()=>{
    console.log(`server is listeining at PORT ${PORT}`);
    Connectdb();
})