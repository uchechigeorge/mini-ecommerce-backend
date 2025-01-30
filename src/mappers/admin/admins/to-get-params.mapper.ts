import {
  GetAllAdminsQuery,
  GetOneAdminParams,
} from "@dtos/v1/admin/admins/get-admin-params";
import { GetAdminParams } from "@services/admins/types";

export const mapGetAllQueryToGetParams = (query: GetAllAdminsQuery) => {
  const params: GetAdminParams = {
    ...query,
  };

  return params;
};

export const mapGetOneQueryToGetParams = (params: GetOneAdminParams) => {
  const getParams: GetAdminParams = {
    id: params.id,
  };

  return getParams;
};
