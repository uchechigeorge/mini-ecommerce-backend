import create from "./create-product.repo";
import deleteProduct from "./delete-product.repo";
import get from "./get-product.repo";
import update from "./update-product.repo";

const productRepo = {
  create,
  ...get,
  delete: deleteProduct,
  update,
};

export default productRepo;
