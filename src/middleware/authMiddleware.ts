// middleware/authMiddleware.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { createClient } from "@supabase/supabase-js";
import {
  PrismaClient,
  entity_role_role_enum,
  entity_user,
} from "@prisma/client";

const prisma = new PrismaClient();

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get the token from request headers
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    // Verify the token
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );

    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    if (data === null) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    // const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET);
    // const userId = decodedToken.userId;

    // // Fetch user details from the database
    // const user = await prisma.entity_user.findUnique({
    //   where: { Id: userId },
    //   include: { entity_role: true }, // Include roles associated with the user
    // });

    // if (!user) {
    //   return res.status(401).json({ error: "Unauthorized: No user found" });
    // }

    // Attach user object to request for use in subsequent middleware or route handlers
    // req.user = user;

    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

export const authorizeMiddleware = (allowedRoles: string[]) => {
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
      .then((roles) => roles.map((role) => mapStringToEnum(role.Role))); // Convert enum values to numbers

    // Check if any of the user's roles are included in the allowed roles
    const isAuthorized = allowedRoles.some((role: entity_role_role_enum) =>
      userRoles.includes(role)
    );

    if (!isAuthorized) {
      return res.status(403).json({
        error: "Forbidden: You do not have permission to access this resource",
      });
    }

    next();
  };
};

function mapStringToEnum(value: string): entity_role_role_enum {
  switch (value) {
    case "1":
      return entity_role_role_enum.Create;
    case "2":
      return entity_role_role_enum.Read;
    case "3":
      return entity_role_role_enum.Update;
    case "4":
      return entity_role_role_enum.Delete;
    default:
      throw new Error(`Invalid RoleType: ${value}`);
  }
}
