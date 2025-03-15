import HospitalVacancy from "../models/HospitalVacancy.js";

export const AddVacancy = async(req,res)=>{
    try{
        const { hospitalName, address, contactNumber, availableBeds, availableICUBeds, availableVentilators, oxygenSupplyAvailable } = req.body;

        if (!hospitalName || !address || !contactNumber || !availableBeds || !availableICUBeds || !availableVentilators) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const vacancy = new HospitalVacancy({
            hospitalName,
            address,
            contactNumber,
            availableBeds,
            availableICUBeds,
            availableVentilators,
            oxygenSupplyAvailable
        });

        await vacancy.save();
        res.status(201).json({ message: "Hospital vacancy added successfully", vacancy });
    }
    catch(error){
        res.status(500).json({ error: "Failed to add vacancy", details: error.message });
    }
}

export const GetVacancy = async(req,res)=>{
    try {
        const vacancies = await HospitalVacancy.find();
        res.status(200).json({ vacancies });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch vacancies", details: error.message });
    }
}

export const UpdateVacancy = async(req,res)=>{
    try {
        const {
            hospitalName,
            address,
            contactNumber,
            availableBeds,
            availableICUBeds,
            availableVentilators,
            oxygenSupplyAvailable
        } = req.body;

        if (!hospitalName || !address || !contactNumber || availableBeds === undefined || 
            availableICUBeds === undefined || availableVentilators === undefined || 
            oxygenSupplyAvailable === undefined) {
            return res.status(400).json({ error: "All fields are required for update" });
        }

        const vacancy = await HospitalVacancy.findByIdAndUpdate(
            req.params.id,
            {
                hospitalName,
                address,
                contactNumber,
                availableBeds,
                availableICUBeds,
                availableVentilators,
                oxygenSupplyAvailable,
                lastUpdated: Date.now()
            },
            { new: true }
        );

        if (!vacancy) return res.status(404).json({ error: "Vacancy not found" });

        res.status(200).json({ message: "Vacancy updated successfully", vacancy });
    } catch (error) {
        res.status(500).json({ error: "Failed to update vacancy", details: error.message });
    }
}

export const DeleteVacancy = async(req,res)=>{
    try {
        const vacancy = await HospitalVacancy.findByIdAndDelete(req.params.id);
        if (!vacancy) return res.status(404).json({ error: "Vacancy not found" });

        res.status(200).json({ message: "Vacancy deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete vacancy", details: error.message });
    }
}