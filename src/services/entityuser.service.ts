import { entity_user_entitytype_enum } from "@prisma/client";
import { _context } from "../utils/db.server";

function mapStringToEnum(value: string): entity_user_entitytype_enum {
  switch (value) {
    case "1":
      return entity_user_entitytype_enum.Customer;
    case "2":
      return entity_user_entitytype_enum.Supplier;
    default:
      throw new Error(`Invalid RoleType: ${value}`);
  }
}

export const listAllUsers = async (
  id: string,
  email: string,
  type: string
): Promise<any[]> => {
  try {
    const entityType = type ? mapStringToEnum(type) : undefined;

    return _context.entity_user.findMany({
      where: {
        Id: id,
        Email: { contains: email },
        EntityType: entityType,
        IsActive: true,
      },
      select: {
        Id: true,
        Email: true,
        FirstName: true,
        LastName: true,
        ProfilePicture: true,
        IsActive: true,
        CreatedDate: true,
        UpdatedDate: true,
        EntityType: true,
        entity_contact: true,
        entity_role: true,
        PasswordSalt: false,
        PasswordHash: false,
        PasswordResetToken: false,
        PasswordResetExpires: false,
        IsAccountLocked: false,
      },
      take: 10, // default to 10
    });
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};
