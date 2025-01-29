import { getProducts } from "./get-products.service";
import { saveImage } from "./save-product-image.service";

const productService = {
  getProducts,
  saveImage,
};

export default productService;
