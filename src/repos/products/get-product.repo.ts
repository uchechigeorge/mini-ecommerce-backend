import { Product } from "@entities/product.entity";

const getById = async (id: number) => {
  return await Product.findOneBy({ id });
};

const get = {
  getById,
};

export default get;
