import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./configs/db.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import EmergencyRoutes from "./routes/EmergencyRoutes.js";
import compression from "compression";
import bodyParser from "body-parser";

const app=express();
const port=process.env.PORT;

//Connect Database
connectDB();
app.use(cors({
    origin: "*",
}));
app.use(compression());  // Enables response compression to reduce the size of the response body
app.use(bodyParser.json());

app.use("/emergency",EmergencyRoutes);
app.use("/auth",AuthRoutes);

app.listen(port,()=>{
    console.log("Server Running!");
})