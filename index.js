import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./configs/db.js";

const app=express();
const port=process.env.PORT;
connectDB();
app.use(cors({
    origin: "*",
}));

app.listen(port,()=>{
    console.log("Server Running!");
})