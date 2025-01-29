import {
  GetAllProductsQuery,
  GetOneProductParams,
} from "@dtos/v1/admin/products/get-product-params";
import { GetProductParams } from "@services/products/types";

export const mapGetAllQueryToGetParams = (query: GetAllProductsQuery) => {
  const params: GetProductParams = {
    ...query,
  };

  return params;
};

export const mapGetOneQueryToGetParams = (params: GetOneProductParams) => {
  const getParams: GetProductParams = {
    id: params.id,
  };

  return getParams;
};
