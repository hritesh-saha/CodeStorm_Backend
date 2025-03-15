import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
}, { timestamps: true });

const PatientDetails = mongoose.model("Patient_Details",PatientSchema);

export default PatientDetails;