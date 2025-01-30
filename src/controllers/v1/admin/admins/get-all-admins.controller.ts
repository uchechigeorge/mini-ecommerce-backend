import { getAllAdminsQuerySchema } from "@dtos/v1/admin/admins/get-admin-params";
import adminMapper from "@mappers/admin/admins";
import adminService from "@services/admins";
import { NextFunction, Request, Response } from "express";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get query
    const query = getAllAdminsQuerySchema.parse(req.query);

    // Get params for fetching records
    const params = adminMapper.mapGetAllQueryToGetParams(query);
    // Fetch records
    const [result, total] = await adminService.getAdmins(params);

    // Map to dto
    const data = await adminMapper.mapEntitytoReadDto(result);

    res.status(200).json({ status: 200, message: "Ok", data, meta: { total } });
  } catch (err) {
    next(err);
  }
};

export default getAll;
