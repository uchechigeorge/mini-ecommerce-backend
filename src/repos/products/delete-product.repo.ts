import { Product } from "@entities/product.entity";
import { DeleteProductResponse } from "./types";

function deleteProduct(id: number): DeleteProductResponse;
function deleteProduct(entity: Product): DeleteProductResponse;
async function deleteProduct(source: number | Product): DeleteProductResponse {
  let product: Product | null;

  if (typeof source == "number") {
    product = await Product.findOneBy({ id: source });
  } else {
    product = source;
  }

  if (!product) {
    return [false, new Error("Invalid product")];
  }

  await product.remove();
  return [true, null];
}

export default deleteProduct;
