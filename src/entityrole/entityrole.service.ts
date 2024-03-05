import { entity_role, entity_role_role_enum } from "@prisma/client";
import { _context } from "../utils/db.server";

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

export const listRolesByEntity = async (
  userid: string,
  role: string
): Promise<entity_role[]> => {
  try {
    const roleType = role ? mapStringToEnum(role) : undefined;

    return _context.entity_role.findMany({
      where: {
        entityUserId: userid,
        Role: roleType,
      },
      orderBy: { Role: "asc" },
      take: 10, // Default to 10
    });
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};
