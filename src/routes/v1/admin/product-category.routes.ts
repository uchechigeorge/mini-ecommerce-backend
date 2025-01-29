import productCategoryController from "@controllers/v1/admin/product-categories";
import { Router } from "express";

const productCategoryRoutes = Router();

productCategoryRoutes.get("/", productCategoryController.getAll);
productCategoryRoutes.get("/:id", productCategoryController.getOne);

export default productCategoryRoutes;
