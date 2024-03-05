import {
  entity_contact,
  entity_contact_contacttype_enum,
} from "@prisma/client";
import { _context } from "../utils/db.server";

// Function to map string to enum
function mapStringToEnum(value: string): entity_contact_contacttype_enum {
  switch (value) {
    case "1":
      return entity_contact_contacttype_enum.Address;
    case "2":
      return entity_contact_contacttype_enum.Email;
    case "3":
      return entity_contact_contacttype_enum.Phone;
    default:
      throw new Error(`Invalid ContactType: ${value}`);
  }
}

export const listEntityContact = async (
  type: string,
  id: string,
  userid: string,
  take: string,
  skip: string
): Promise<entity_contact[]> => {
  try {
    const contactType = type ? mapStringToEnum(type) : undefined;
    const skipCount = skip ? parseInt(skip) : undefined;
    const takeCount = take ? parseInt(take) : undefined;

    return _context.entity_contact.findMany({
      where: {
        ContactType: contactType,
        Id: id,
        entityUserId: userid,
      },
      skip: skipCount,
      take: takeCount,
    });
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const getEntityContactCount = async () => {
  return _context.entity_contact.count();
};
