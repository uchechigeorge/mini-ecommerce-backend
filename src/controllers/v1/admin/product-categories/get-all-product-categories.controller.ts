import { getAllProductCategoriesQuerySchema } from "@dtos/v1/admin/product-categories/get-product-category-params";
import productCategoryMapper from "@mappers/admin/product-categories";
import productCategoryService from "@services/product-categories";
import { NextFunction, Request, Response } from "express";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get query
    const query = getAllProductCategoriesQuerySchema.parse(req.query);

    // Get params for fetching records
    const params = productCategoryMapper.mapGetAllQueryToGetParams(query);
    // Fetch records
    const [result, total] = await productCategoryService.getProductCategories(
      params
    );

    // Map to dto
    const data = await productCategoryMapper.mapEntitytoReadDto(result);

    res.status(200).json({ status: 200, message: "Ok", data, meta: { total } });
  } catch (err) {
    next(err);
  }
};

export default getAll;
