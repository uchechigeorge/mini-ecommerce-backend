import productController from "@controllers/v1/admin/products";
import { Router } from "express";

const productRoutes = Router();

productRoutes.post("/", productController.create);
productRoutes.get("/", productController.getAll);
productRoutes.get("/:id", productController.getOne);
productRoutes.patch("/:id", productController.update);
productRoutes.delete("/:id", productController.delete);

export default productRoutes;
