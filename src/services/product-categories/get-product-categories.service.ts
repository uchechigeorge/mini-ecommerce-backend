import { getOrder, getSort } from "@helpers/query-helpers";
import { isNullOrWhitespace } from "@helpers/type-helpers";
import { GetProductCategoryParams } from "./types";
import { ProductCategory } from "@entities/product-category.entity";

// Sort column options
const sortColumns = ["name", "dateModified", "dateCreated"];

export const getProductCategories = async (
  params: GetProductCategoryParams
) => {
  const { page, pageSize, order, sort, id, searchString } = params;

  const query = ProductCategory.createQueryBuilder("e");

  // Filter by id
  if (id != null) {
    query.andWhere("e.id = :id", { id });
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
