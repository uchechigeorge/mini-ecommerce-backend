import { Product } from "@entities/product.entity";
import { UpdateProductParams, UpdateProductResponse } from "./types";

function update(id: number, params: UpdateProductParams): UpdateProductResponse;
function update(
  entity: Product,
  params: UpdateProductParams
): UpdateProductResponse;
async function update(
  source: number | Product,
  params: UpdateProductParams
): UpdateProductResponse {
  let product: Product | null;

  if (typeof source == "number") {
    product = await Product.findOneBy({ id: source });
  } else {
    product = source;
  }

  if (!product) {
    return [null, Error("Invalid product")];
  }

  product.name = params.name;
  product.price = params.price;
  product.stockQuantity = params.stockQuantity;
  product.description = params.description!;
  product.productCategoryId = params.productCategoryId!;

  await product.save();
  return [product, null];
}

export default update;
