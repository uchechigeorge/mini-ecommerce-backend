import { AdminRequest } from "@models/AdminAuthItems";
import adminService from "@services/admins";
import { Request, Response, NextFunction } from "express";

type AuthOptions = {};

/**
 * Adds middleware for admin authentication
 * @param options Authentication options
 * @returns A middleware function
 */
export const authenticate = (options?: AuthOptions) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const request = req as AdminRequest;
      const authHeader = request.header("Authorization");
      const bearerToken = authHeader && authHeader.split(" ")[1];

      // Set headers
      request.adminAuthItems = {
        loggedIn: false,
      };

      if (!bearerToken) {
        const message = "No token";
        res.status(401).json({ status: 401, message });
        // request.adminAuthItems.errorMessage = message;

        // if (!options?.ignoreAuth) {
        // res.status(401).json({ status: 401, message });
        //   return;
        // }

        // next();
        return;
      }

      // let isJwtValid: boolean = false;
      const [jwtResult, jwtError] = await adminService.auth.verifyAccessToken(
        bearerToken
      );

      if (jwtError) {
        const message = "Invalid token";
        res.status(401).json({ status: 401, message });

        // request.adminAuthItems.errorMessage = message;

        // if (!options?.ignoreAuth) {
        //   res.status(401).json({ status: 401, message });
        //   return;
        // }

        // next();
        return;
      }

      request.adminAuthItems.adminId = jwtResult.adminId;
      request.adminAuthItems.loggedIn = true;

      next();
    } catch (err) {
      next(err);
    }
  };
};
