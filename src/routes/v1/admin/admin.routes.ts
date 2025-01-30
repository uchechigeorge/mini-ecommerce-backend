import adminController from "@controllers/v1/admin/admins";
import { Router } from "express";

const adminRoutes = Router();

adminRoutes.post("/", adminController.create);
adminRoutes.get("/", adminController.getAll);
adminRoutes.get("/:id", adminController.getOne);

export default adminRoutes;
