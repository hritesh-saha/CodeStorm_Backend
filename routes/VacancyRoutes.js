import express from "express";
import { AddVacancy,UpdateVacancy,DeleteVacancy,GetVacancy } from "../Controllers/VacancyController.js";

const route=express.Router();

route.get("/get-vacancy",GetVacancy);
route.post("/add-vacancy",AddVacancy);
route.put("/update-vacancy/:id",UpdateVacancy);
route.delete("/delete-vacancy/:id",DeleteVacancy);

export default route;