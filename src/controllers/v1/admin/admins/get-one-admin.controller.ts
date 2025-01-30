import { getOneAdminParamSchema } from "@dtos/v1/admin/admins/get-admin-params";
import adminMapper from "@mappers/admin/admins";
import adminService from "@services/admins";
import { NextFunction, Request, Response } from "express";

const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = getOneAdminParamSchema.parse(req.params);

    const getParams = adminMapper.mapGetOneQueryToGetParams(params);
    const [result, total] = await adminService.getAdmins(getParams);

    if (total < 1) {
      res.status(404).json({ status: 404, message: "Not found" });
      return;
    }

    const data = await adminMapper.mapEntitytoReadDto(result[0]);

    res.status(200).json({ status: 200, message: "Ok", data });
  } catch (err) {
    next(err);
  }
};

export default getOne;
