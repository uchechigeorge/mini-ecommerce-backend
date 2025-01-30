import auth from "./auth-helpers.service";
import { getAdmins } from "./get-admins.service";

const adminService = {
  auth,
  getAdmins,
};

export default adminService;
