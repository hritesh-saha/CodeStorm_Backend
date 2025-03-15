import mongoose from "mongoose";

const HospitalStaffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Doctor", "Nurse", "Admin"], required: true },
    hospital: { type: String, required: true },
}, { timestamps: true });

const HospitalStaff = mongoose.model("Hospital Staff",HospitalStaffSchema);

export default HospitalStaff;