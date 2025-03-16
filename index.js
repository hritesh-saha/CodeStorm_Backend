import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./configs/db.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import EmergencyRoutes from "./routes/EmergencyRoutes.js";
import VacancyRoutes from "./routes/VacancyRoutes.js";
import compression from "compression";
import bodyParser from "body-parser";

const app=express();
const port=process.env.PORT;

//Connect Database
connectDB();

//Middlewares
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: "*", 
    credentials: true
}));
app.use(compression());  // Enables response compression to reduce the size of the response body
app.use(bodyParser.json());

//Routes
app.use("/emergency",EmergencyRoutes);
app.use("/auth",AuthRoutes);
app.use("/vacancy",VacancyRoutes);

app.get("/",(req,res)=>{
    return res.status(200).json({message:"Welcome to Emergency Service"});
})

app.listen(port,()=>{
    console.log("Server Running!");
})