import productMapper from "@mappers/admin/products";
import productService from "@services/products";
import { createProductDtoSchema } from "@dtos/v1/admin/products/create-product.dto";
import { NextFunction, Request, Response } from "express";
import productRepo from "@repos/products";
import productCategoryRepo from "@repos/product-categories";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get request body
    const body = createProductDtoSchema.parse(req.body);

    if (body.productCategoryId) {
      const productCategory = await productCategoryRepo.getById(
        body.productCategoryId
      );
      if (!productCategory) {
        res.status(400).json({ status: 400, message: "Invalid category" });
        return;
      }
    }
    // Save image
    const imageUrl = await productService.saveImage(req);
    // Get params to create record
    const createParams = productMapper.mapCreateDtoToEntity(body, imageUrl);

    // Create new record
    const newProduct = await productRepo.create(createParams);

    // Map to dto
    const data = await productMapper.mapEntitytoReadDto(newProduct);

    res.status(201).json({ status: 201, message: "Created", data });
  } catch (err) {
    next(err);
  }
};

export default create;
