import mongoose from "mongoose";

const EmergencyRequestSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    age: { type: Number, required: true },
    condition: { type: String, required: true },
    oxygenLevel: { type: Number, required: false },
    urgency: { type: String, enum: ["Critical", "Moderate", "Non-Emergency"], required: true },
    location: { type: String, required: true }, // Pincode or GPS-based
    ambulanceRequested: { type: Boolean, default: false },
    status: { type: String, enum: ["Pending", "Seen", "Responded"], default: "Pending" },
    requestedAt: { type: Date, default: Date.now }
});

const EmergencyRequest = mongoose.model("EmergencyRequest",EmergencyRequestSchema);

export default EmergencyRequest;