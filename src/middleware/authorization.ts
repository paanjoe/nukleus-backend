// middleware/authorization.ts

import { Request, Response, NextFunction } from "express";
import { PrismaClient, entity_user } from "@prisma/client";

const prisma = new PrismaClient();

export const authorizeMiddleware = (allowedRoles: number[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const getUser = req.user as entity_user;
    const userRoles = await prisma.entity_role
      .findMany({
        where: {
          entityUserId: getUser.Id,
        },
        select: {
          Role: true,
        },
      })
      .then((roles) => roles.map((role) => parseInt(role.Role))); // Convert enum values to numbers

    // Check if any of the user's roles are included in the allowed roles
    const isAuthorized = allowedRoles.some((role) => userRoles.includes(role));

    if (!isAuthorized) {
      return res.status(403).json({
        error: "Forbidden: You do not have permission to access this resource",
      });
    }

    next();
  };
};
