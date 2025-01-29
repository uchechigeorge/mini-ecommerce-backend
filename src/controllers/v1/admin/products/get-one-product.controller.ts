import { getOneProductParamSchema } from "@dtos/v1/admin/products/get-product-params";
import productMapper from "@mappers/admin/products";
import productService from "@services/products";
import { NextFunction, Request, Response } from "express";

const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get path params
    const params = getOneProductParamSchema.parse(req.params);

    // Get params for fetching records
    const getParams = productMapper.mapGetOneQueryToGetParams(params);
    // Fetch records
    const [result, total] = await productService.getProducts(getParams);

    // Send 404 if no record
    if (total < 1) {
      res.status(404).json({ status: 404, message: "Not found" });
      return;
    }

    // Map to dto
    const data = await productMapper.mapEntitytoReadDto(result[0]);

    res.status(200).json({ status: 200, message: "Ok", data });
  } catch (err) {
    next(err);
  }
};

export default getOne;
