import { Product } from "@entities/product.entity";

export type CreateProductParams = {
  name: string;
  price: number;
  description?: string;
  stockQuantity: number;
  imageUrl?: string;
  productCategoryId?: number;
};

export type UpdateProductParams = {
  name: string;
  price: number;
  description?: string;
  stockQuantity: number;
  productCategoryId?: number;
};

export type UpdateProductResponse = Promise<[Product, null] | [null, Error]>;
export type DeleteProductResponse = Promise<[true, null] | [false, Error]>;
