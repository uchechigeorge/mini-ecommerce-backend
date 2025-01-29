import { Router } from "express";
import productRoutes from "./product.routes";
import productCategoryRoutes from "./product-category.routes";

const adminRoutes = Router();

adminRoutes.use("/products", productRoutes);
adminRoutes.use("/product-categories", productCategoryRoutes);

export default adminRoutes;
