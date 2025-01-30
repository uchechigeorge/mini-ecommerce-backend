import { loginDtoSchema } from "@dtos/v1/admin/auth/login.dto";
import adminRepo from "@repos/admins";
import adminService from "@services/admins";
import { NextFunction, Request, Response } from "express";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = loginDtoSchema.parse(req.body);

    const admin = await adminRepo.getByEmailAndPassword(
      body.email,
      body.password
    );

    if (!admin) {
      res.status(401).json({ status: 401, message: "Invalid credentials" });
      return;
    }

    const accessToken = adminService.auth.generateAccessToken(admin);

    res.status(200).json({ status: 200, message: "Ok", data: { accessToken } });
  } catch (err) {
    next(err);
  }
};

export default login;
