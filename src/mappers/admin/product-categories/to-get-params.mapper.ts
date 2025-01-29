import {
  GetAllProductCategoriesQuery,
  GetOneProductCategoryParams,
} from "@dtos/v1/admin/product-categories/get-product-category-params";
import { GetProductCategoryParams } from "@services/product-categories/types";

export const mapGetAllQueryToGetParams = (
  query: GetAllProductCategoriesQuery
) => {
  const params: GetProductCategoryParams = {
    ...query,
  };

  return params;
};

export const mapGetOneQueryToGetParams = (
  params: GetOneProductCategoryParams
) => {
  const getParams: GetProductCategoryParams = {
    id: params.id,
  };

  return getParams;
};
