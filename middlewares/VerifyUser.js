import HospitalStaff from "../models/HospitalStaff";

const VerifyHospital = async(req,res,next)=>{
    try{
        const { email }= req.params;

        if(!email){
            return res.status(400).json({message: "Email is required"});
        }
        const user= await HospitalStaff.findOne({ email });
        if(!user){
            return res.status(404).json({ error: "Access denied. Not a hospital staff member" });
        }

        req.staff = staff;
        next();
    }
    catch(error){
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}