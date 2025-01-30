import adminMapper from "@mappers/admin/admins";
import { createAdminDtoSchema } from "@dtos/v1/admin/admins/create-admin.dto";
import { NextFunction, Request, Response } from "express";
import adminRepo from "@repos/admins";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get request body
    const body = createAdminDtoSchema.parse(req.body);

    // Get params to create record
    const createParams = await adminMapper.mapCreateDtoToEntity(body);

    // Create new record
    const newAdmin = await adminRepo.create(createParams);

    // Map to dto
    const data = await adminMapper.mapEntitytoReadDto(newAdmin);

    res.status(201).json({ status: 201, message: "Created", data });
  } catch (err) {
    next(err);
  }
};

export default create;
