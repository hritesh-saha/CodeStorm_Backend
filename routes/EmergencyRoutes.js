import express from "express";
import { CreateEmergencyRequest,GetEmergencyRequests,EmergencyByLocation,UpdateEmergencyRequest } from "../Controllers/EmergencyController.js";

const router=express.Router();

router.post("/create-request",CreateEmergencyRequest);
router.get("/get-requests",GetEmergencyRequests);
router.get("/requests/:location",EmergencyByLocation);
router.put("/update-request/:id",UpdateEmergencyRequest);

export default router;
