import express from "express";
import { HospitalStaffSignup,HospitalStaffLogin } from "../Controllers/HospitalController.js";
import { PatientLogin,PatientSignUp } from "../Controllers/PatientController.js";

const router=express.Router();

router.post("/patient/login",PatientLogin);
router.post("/patient/signup",PatientSignUp);

router.post("/HospitalStaff/login",HospitalStaffLogin);
router.post("/HospitalStaff/signup",HospitalStaffSignup);

export default router;