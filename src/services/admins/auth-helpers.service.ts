import { Admin } from "@entities/admin.entity";
import { verifyJwt } from "@helpers/jwt-helpers";
import { AdminJwtResult } from "@models/AdminJwtResult";
import jwt from "jsonwebtoken";
import ms from "ms";

/**
 * Generates access token for admin login
 * @param admin The admin
 * @param deviceLogin The current device
 * @returns Generated jwt token
 */
export const generateAccessToken = (admin: Admin) => {
  const payload = {
    adminId: admin.id,
  };

  const { JWT_ADMIN_ACCESS_SECRET, JWT_ADMIN_ACCESS_EXPIRATION } = process.env;

  if (!JWT_ADMIN_ACCESS_SECRET || !JWT_ADMIN_ACCESS_EXPIRATION) {
    throw new Error("Jwt settings not set");
  }

  // Generate jwt token based on admin details
  const jwtToken = jwt.sign(payload, JWT_ADMIN_ACCESS_SECRET, {
    expiresIn: (JWT_ADMIN_ACCESS_EXPIRATION || "7d") as ms.StringValue,
    issuer: process.env.HOST ?? "",
  });

  return jwtToken;
};

export const verifyAccessToken = async (token: string) => {
  return await verifyJwt<AdminJwtResult>(
    token,
    process.env.JWT_ADMIN_ACCESS_SECRET ?? ""
  );
};

const auth = {
  generateAccessToken,
  verifyAccessToken,
};

export default auth;
