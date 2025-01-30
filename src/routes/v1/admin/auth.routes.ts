import authController from "@controllers/v1/admin/auth";
import { Router } from "express";

const authRoutes = Router();

authRoutes.post("/login", authController.login);

export default authRoutes;
