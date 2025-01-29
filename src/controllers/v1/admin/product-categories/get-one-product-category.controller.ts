import { getOneProductCategoryParamSchema } from "@dtos/v1/admin/product-categories/get-product-category-params";
import productCategoryMapper from "@mappers/admin/product-categories";
import productCategoryService from "@services/product-categories";
import { NextFunction, Request, Response } from "express";

const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = getOneProductCategoryParamSchema.parse(req.params);

    const getParams = productCategoryMapper.mapGetOneQueryToGetParams(params);
    const [result, total] = await productCategoryService.getProductCategories(
      getParams
    );

    if (total < 1) {
      res.status(404).json({ status: 404, message: "Not found" });
      return;
    }

    const data = await productCategoryMapper.mapEntitytoReadDto(result[0]);

    res.status(200).json({ status: 200, message: "Ok", data });
  } catch (err) {
    next(err);
  }
};

export default getOne;
