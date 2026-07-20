// require("dotenv").config();

import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import {DB_NAME} from "./constants.js";
import connectDB from "./db/index.js"

dotenv.config({
    path: "./.env"
});

const app = express();
connectDB ()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })
}

)
.catch((err)=>{
    console.log("MONGODB CONNECTION Failed: ",err);
})








/*
import express from "express";

const app = express();   


const connectDB = async()=>{
    try{
       await  mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
       app.on("error",(err)=>{
        console.log("ERROR:  ",err);
        throw err;
       })

       app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
       })
    }catch(error){
        console.log("ERROR:  ",error);
        throw error;
    }
}
    */