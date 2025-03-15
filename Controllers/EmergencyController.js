import EmergencyRequest from "../models/EmergencyRequest.js";
import mongoose from "mongoose";

export const CreateEmergencyRequest = async(req,res)=>{
    const { patientName, age, condition, oxygenLevel, location, urgency, ambulanceRequested } = req.body;
    try{
        if(!patientName || !age || !condition || !oxygenLevel || !location || !urgency){
            return res.status(400).json({message: "Please fill in all fields."});
        }

        const validUrgencyLevels = ["Critical", "Moderate", "Non-Emergency"];
        if (!validUrgencyLevels.includes(urgency)) {
            return res.status(400).json({ error: "Invalid urgency level!" });
        }

        if (typeof ambulanceRequested !== "boolean") {
            return res.status(400).json({ error: "ambulanceRequested must be true or false!" });
        }
        

        const newRequest = new EmergencyRequest({
            patientName,
            age,
            condition,
            oxygenLevel,
            location,
            urgency,
            ambulanceRequested: ambulanceRequested || false,
            // requestedAt: new Date(), // Store current timestamp
        });
        await newRequest.save();

        return res.status(201).json({ message:"New Request Created", RequestDetails:newRequest });
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
}

export const GetEmergencyRequests = async(req,res)=>{
    try{
        const requests = await EmergencyRequest.find().sort({requestedAt: -1});
        return res.status(200).json({requests});
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
}

export const EmergencyByLocation = async(req,res)=>{
    try{
        const location = req.params.location;
        if(!location){
            return res.status(400).json({message: "Please provide a valid location."});
        }
        const requests = await EmergencyRequest.find({
            location: { $regex: location, $options: 'i' }  // 'i' makes it case-insensitive
        });

        return res.status(200).json({requests});
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
}

// ✅ Update Request Status (Hospital Response)
export const UpdateEmergencyRequest = async(req,res)=>{
    try{
        const { id } = req.params;
        const { status, ambulanceRequested } = req.body;

        if (!status) {
            return res.status(400).json({ error: "Status is required!" });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid request ID!" });
        }

        const updatedRequest = await EmergencyRequest.findByIdAndUpdate(
            id,
            { status, ambulanceRequested },
            { new: true, runValidators: true }
        );

        if (!updatedRequest) {
            return res.status(404).json({ error: "Emergency request not found!" });
        }

        res.status(200).json({ message: "Emergency request updated!", data: updatedRequest });
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
}