import authController from "@controllers/v1/admin/auth";
import authLimiter from "@middlewares/auth-limiter.middleware";
import { Router } from "express";

const authRoutes = Router();

authRoutes.post("/login", authLimiter, authController.login);

export default authRoutes;
