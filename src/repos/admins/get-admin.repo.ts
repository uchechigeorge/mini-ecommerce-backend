import { Admin } from "@entities/admin.entity";
import bcryptjs from "bcryptjs";

const getByEmailAndPassword = async (email: string, password: string) => {
  const admin = await Admin.findOneBy({ email });
  if (!admin) return null;

  const isValidPassword = await bcryptjs.compare(password, admin.password);
  if (!isValidPassword) return null;

  return admin;
};

const get = {
  getByEmailAndPassword,
};

export default get;
