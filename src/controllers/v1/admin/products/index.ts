import create from "./create-product.controller";
import deleteProduct from "./delete-product.controller";
import getAll from "./get-all-products.controller";
import getOne from "./get-one-product.controller";
import update from "./update-product.controller";

const productController = {
  create,
  delete: deleteProduct,
  getAll,
  getOne,
  update,
};

export default productController;
