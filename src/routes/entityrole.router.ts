import express from "express";
import type { Request, Response } from "express";
import { body, check, validationResult } from "express-validator";
import * as EntityRoleService from "../services/entityrole.service";

export const entityroleRouter = express.Router();

// Get /api/entityrole
entityroleRouter.get(
  "/",
  [
    check("userid")
      .isString()
      .notEmpty()
      .withMessage("Parameter: userid is required."),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { userid, role } = req.query;

      const entityRoles = await EntityRoleService.listRolesByEntity(
        userid as string,
        role as string
      );

      return res.status(200).json({
        total: entityRoles.length,
        data: entityRoles,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
);
