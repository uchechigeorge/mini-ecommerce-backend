import { Router } from "express";
import adminRoutes from "./admin";

const v1Routes = Router();

v1Routes.use("/admin", adminRoutes);

export default v1Routes;
