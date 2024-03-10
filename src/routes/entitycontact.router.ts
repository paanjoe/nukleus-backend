import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as EntityContactService from "../services/entitycontact.service";
import {
  authMiddleware,
  authorizeMiddleware,
} from "../middleware/authMiddleware";

export const entitycontactRouter = express.Router();

// Get /api/entitycontact
entitycontactRouter.get(
  "/",
  // authMiddleware,
  // authorizeMiddleware(["Read"]),
  async (req: Request, res: Response) => {
    try {
      // Extract user ID from the authenticated user
      const userId = req.user?.Id;

      const { type, id, userid, take, skip, order, direction } = req.query;

      // const rolesArray = Array.isArray(roles) ? roles : [roles];

      // // Check if roles are provided in the request query
      // if (!rolesArray || !Array.isArray(rolesArray)) {
      //   return res.status(400).json({ error: "Roles are required" });
      // }

      // // Convert roles to lowercase to ensure consistency
      // const lowercaseRoles = rolesArray.map((role: string) =>
      //   role.toLowerCase()
      // );

      // // Check if user has permission to access this route
      // await authorizeMiddleware(lowercaseRoles)(req, res, () => {});

      const entityContacts = await EntityContactService.listEntityContact(
        type as string,
        id as string,
        userid as string,
        take as string,
        skip as string,
        order as string,
        direction as string
      );

      const totalCount = await EntityContactService.getEntityContactCount();

      return res.status(200).json({
        count: entityContacts.length,
        total: totalCount,
        data: entityContacts,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
);
