import bcrypt from "bcrypt";
import PatientDetails from "../models/PatientDetails.js";
import { isValidEmail } from "../utilities/utility.js";

export const PatientSignUp = async(req,res)=>{
    try{
        const { name, email, password, phone } = req.body;
        if( !name || !email || !password || !phone){
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        if(!isValidEmail(email)){
            return res.status(400).json({ message: "Invalid email" });
        }

        const existingUser = await PatientDetails.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password,salt);

        const newPatient = new PatientDetails({ name, email, password: hashedPass, phone });
        await newPatient.save();

        res.status(201).json({ message: "Patient registered successfully!" });
    }
    catch(error){
        return res.status(500).json({ error:error.message })
    }
}

export const PatientLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required!" });
        }

        if(!isValidEmail(email)){
            return res.status(400).json({ message: "Invalid email" });
        }

        const patient = await PatientDetails.findOne({ email });
        if (!patient) {
            return res.status(404).json({ message: "Patient not found!" });
        }

        const isMatch = await bcrypt.compare(password, patient.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials!" });
        }

        res.status(200).json({ message: "Login successful!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};