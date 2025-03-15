import bcrypt from "bcrypt";
import HospitalStaff from "../models/HospitalStaff.js";
import { isValidEmail } from "../utilities/utility.js";

export const HospitalStaffSignup = async (req, res) => {
    try {
        const { name, email, password, role, hospital } = req.body;

        if (!name || !email || !password || !role || !hospital) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        if(!isValidEmail(email)){
            return res.status(400).json({ message: "Invalid email!" });
        }

        const existingUser = await HospitalStaff.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists!" });
        }

        const validateRoles=["Doctor", "Nurse", "Admin"];
        if(!validateRoles.includes(role)){
            return res.status(400).json({ message: "Invalid role!" });
        }

        const salt =await bcrypt.genSalt(10);
        const hashedPass =await bcrypt.hash(password,salt);

        const newStaff = new HospitalStaff({ name, email, password: hashedPass, role, hospital });
        await newStaff.save();

        res.status(201).json({ message: "Hospital staff registered successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const HospitalStaffLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required!" });
        }

        if(!isValidEmail(email)){
            return res.status(400).json({ message: "Invalid email!" });
        }

        const staff = await HospitalStaff.findOne({ email });
        if (!staff) {
            return res.status(404).json({ message: "Hospital staff not found!" });
        }

        const isMatch = await bcrypt.compare(password, staff.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials!" });
        }

        res.status(200).json({ message: "Login successful!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};