import { Admin } from "@entities/admin.entity";
import { CreateAdminParams } from "./types";

const create = async (params: CreateAdminParams) => {
  const admin = new Admin();
  admin.email = params.email;
  admin.password = params.password;
  admin.firstName = params.firstName!;
  admin.lastName = params.lastName!;

  return await admin.save();
};

export default create;
