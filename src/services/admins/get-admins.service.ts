import { getOrder, getSort } from "@helpers/query-helpers";
import { isNullOrWhitespace } from "@helpers/type-helpers";
import { GetAdminParams } from "./types";
import { Admin } from "@entities/admin.entity";

// Sort column options
const sortColumns = [
  { key: "name", value: "full_name" },
  { key: "dateModified", value: "date_modified" },
  { key: "dateCreated", value: "date_created" },
];

export const getAdmins = async (params: GetAdminParams) => {
  const { page, pageSize, order, sort, id, searchString } = params;

  const query = Admin.createQueryBuilder("e");

  // Filter by id
  if (id != null) {
    query.andWhere("e.id = :id", { id });
  }

  // Filter(search) by name
  if (!isNullOrWhitespace(searchString)) {
    query.andWhere("(e.fullName LIKE :searchString)", {
      searchString: `%${searchString}%`,
    });
  }

  // Add pagination
  query.skip(((page || 1) - 1) * (pageSize || 50)).take(pageSize || 50);

  // Add sort
  query.orderBy(getSort(sort ?? "", sortColumns), getOrder(order));

  return await query.getManyAndCount();
};
