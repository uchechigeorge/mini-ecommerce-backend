import { ProductCategory } from "@entities/product-category.entity";

const getById = async (id: number) => {
  return await ProductCategory.findOneBy({ id });
};

const get = {
  getById,
};

export default get;
