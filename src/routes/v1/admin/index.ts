import { Router } from "express";
import aRoutes from "./admin.routes";
import productRoutes from "./product.routes";
import productCategoryRoutes from "./product-category.routes";
import authRoutes from "./auth.routes";

const adminRoutes = Router();

adminRoutes.use("/auth", authRoutes);
adminRoutes.use("/admins", aRoutes);
adminRoutes.use("/products", productRoutes);
adminRoutes.use("/product-categories", productCategoryRoutes);

export default adminRoutes;
