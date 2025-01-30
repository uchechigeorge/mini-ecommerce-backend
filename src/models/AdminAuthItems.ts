import { Request } from "express";

export type AdminAuthItems = {
  loggedIn: boolean;
  adminId?: number;
};

export type AdminRequest = Request & { adminAuthItems: AdminAuthItems };
