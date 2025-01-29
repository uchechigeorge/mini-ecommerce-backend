import { Product } from "@entities/product.entity";
import { CreateProductParams } from "./types";

const create = async (params: CreateProductParams) => {
  const product = new Product();

  product.name = params.name;
  product.price = params.price;
  product.stockQuantity = params.stockQuantity;
  product.description = params.description!;
  product.imageUrl = params.imageUrl!;
  product.productCategoryId = params.productCategoryId!;

  return await product.save();
};

export default create;
