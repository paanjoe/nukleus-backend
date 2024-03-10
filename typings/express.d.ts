import { entity_user } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: entity_user;
    }
  }
}
