import express from "express";
import type { Request, Response } from "express";
import { body, check, validationResult } from "express-validator";
import * as EntityUserService from "./entityuser.service";

export const entityUserRouter = express.Router();

entityUserRouter.get("/", async (req: Request, res: Response) => {
  try {
    const { id, email, type } = req.query;

    const entityUsers = await EntityUserService.listAllUsers(
      id as string,
      email as string,
      type as string
    );

    return res.status(200).json({
      total: entityUsers.length,
      data: entityUsers,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});
