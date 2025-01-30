import { getAllIProductsQuerySchema as getAllProductsQuerySchema } from "@dtos/v1/admin/products/get-product-params";
import productMapper from "@mappers/admin/products";
import productService from "@services/products";
import { NextFunction, Request, Response } from "express";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get query params
    const query = getAllProductsQuerySchema.parse(req.query);

    // Get params for fetching records
    const params = productMapper.mapGetAllQueryToGetParams(query);
    // Fetch records
    const [result, total] = await productService.getProducts(params);

    // Map to dto
    const data = await productMapper.mapEntitytoReadDto(result);

    res.status(200).json({ status: 200, message: "Ok", data, meta: { total } });
  } catch (err) {
    next(err);
  }
};

export default getAll;
