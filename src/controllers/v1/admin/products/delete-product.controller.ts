import { deleteProductParamSchema } from "@dtos/v1/admin/products/delete-product.dto";
import { NextFunction, Request, Response } from "express";
import productRepo from "@repos/products";

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const params = deleteProductParamSchema.parse(req.params);
    const productId = params.id;

    const product = await productRepo.getById(productId);
    if (!product) {
      res.status(400).json({ status: 400, message: "Invalid product" });
      return;
    }

    await productRepo.delete(product);

    res.status(200).json({ status: 200, message: "Ok" });
  } catch (err) {
    next(err);
  }
};

export default deleteProduct;
