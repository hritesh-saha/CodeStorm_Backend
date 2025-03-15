import mongoose from "mongoose";

const HospitalVacancySchema = new mongoose.Schema({
    hospitalName: { type: String, required: true },
    address: { type: String, required: true },
    contactNumber: { type: String, required: true },
    availableBeds: { type: Number, required: true },
    availableICUBeds: { type: Number, required: true },
    availableVentilators: { type: Number, required: true },
    oxygenSupplyAvailable: { type: Boolean, default: true },
    lastUpdated: { type: Date, default: Date.now }
});

const HospitalVacancy = mongoose.model("HospitalVacancy", HospitalVacancySchema);

export default HospitalVacancy;
