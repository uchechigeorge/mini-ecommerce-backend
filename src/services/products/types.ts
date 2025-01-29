import { BaseGetParams } from "@dtos/shared/base-get-params";

export type GetProductParams = BaseGetParams & {
  productCategoryId?: number;
};
