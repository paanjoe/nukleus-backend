import { PrismaClient } from "@prisma/client";

let _context: PrismaClient;

declare global {
  var context: PrismaClient | undefined;
}

if (!global.context) {
  global.context = new PrismaClient();
}

_context = global.context;

export { _context };
