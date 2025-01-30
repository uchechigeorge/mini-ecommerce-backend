import { getOrder, getSort } from "@helpers/query-helpers";
import { isNullOrWhitespace } from "@helpers/type-helpers";
import { GetProductParams } from "./types";
import { Product } from "@entities/product.entity";

// Sort column options
const sortColumns = [
  "name",
  "price",
  { key: "stockQuantity", value: "stock_quantity" },
  { key: "dateModified", value: "date_modified" },
  { key: "dateCreated", value: "date_created" },
];

export const getProducts = async (params: GetProductParams) => {
  const { page, pageSize, order, sort, id, searchString, productCategoryId } =
    params;

  const query = Product.createQueryBuilder("e");

  // Filter by id
  if (id != null) {
    query.andWhere("e.id = :id", { id });
  }

  // Filter by category
  if (productCategoryId != null) {
    query.andWhere("e.productCategoryId = :productCategoryId", {
      productCategoryId,
    });
  }

  // Filter(search) by name
  if (!isNullOrWhitespace(searchString)) {
    query.andWhere("(e.name LIKE :searchString)", {
      searchString: `%${searchString}%`,
    });
  }

  // Add pagination
  query.skip(((page || 1) - 1) * (pageSize || 50)).take(pageSize || 50);

  // Add sort
  query.orderBy(getSort(sort ?? "", sortColumns), getOrder(order));

  return await query.getManyAndCount();
};
