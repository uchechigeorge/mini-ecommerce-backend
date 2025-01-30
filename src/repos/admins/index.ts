import create from "./create-admin.repo";
import get from "./get-admin.repo";

const adminRepo = {
  create,
  ...get,
};

export default adminRepo;
