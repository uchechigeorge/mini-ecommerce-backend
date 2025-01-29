import {
  updateProductDtoSchema,
  updateProductParamSchema,
} from "@dtos/v1/admin/products/update-product.dto";
import { NextFunction, Request, Response } from "express";
import productRepo from "@repos/products";
import productMapper from "@mappers/admin/products";

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get path params
    const params = updateProductParamSchema.parse(req.params);
    // Get body
    const body = updateProductDtoSchema.parse(req.body);
    const productId = params.id;

    // Check if product exists
    const product = await productRepo.getById(productId);
    if (!product) {
      res.status(400).json({ status: 400, message: "Invalid product" });
      return;
    }

    // Get update params
    const updateParams = productMapper.mapUpdateDtoToEntity(body);
    // Update record
    await productRepo.update(product, updateParams);

    res.status(200).json({ status: 200, message: "Ok" });
  } catch (err) {
    next(err);
  }
};

export default update;
