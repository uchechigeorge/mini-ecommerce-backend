import productController from "@controllers/v1/admin/products";
import { authenticate } from "@middlewares/admin-auth.middleware";
import { Router } from "express";

const productRoutes = Router();

productRoutes.post("/", authenticate(), productController.create);
productRoutes.get("/", productController.getAll);
productRoutes.get("/:id", productController.getOne);
productRoutes.patch("/:id", authenticate(), productController.update);
productRoutes.delete("/:id", authenticate(), productController.delete);

export default productRoutes;
