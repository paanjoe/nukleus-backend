import { PrismaClient, inventory } from "@prisma/client";

const prisma = new PrismaClient();

export const listAllInventory = async (
  sortBy: string,
  sortDirection: string,
  take: string,
  skip: string
): Promise<any[]> => {
  try {
    const takeCount = take ? parseInt(take) : 20; // default to 20
    const skipCount = skip ? parseInt(skip) : undefined; // default to 0
    const orderDirection = sortDirection === "desc" ? "desc" : "asc";
    let orderBy = {};

    // Define sorting options based on sortBy parameter
    switch (sortBy) {
      case "productName":
        orderBy = { product: { ProductName: orderDirection } };
        break;
      case "productCategory":
        orderBy = {
          product: { product_category: { CategoryName: orderDirection } },
        };
        break;
      case "price":
        orderBy = { Price: orderDirection };
        break;
      case "quantity":
        orderBy = { QuantityAvailable: orderDirection };
        break;
      default:
        break;
    }

    const inventory = await prisma.inventory.findMany({
      where: {
        isDeleted: false, // Only fetch non-deleted inventory items
      },
      orderBy,
      take: takeCount,
      skip: skipCount,
      include: {
        product: {
          include: {
            product_category: true, // Include product category details
          },
        },
      },
    });

    return inventory;
  } catch (error) {
    throw new Error(`Error fetching inventory: ${error}`);
  }
};

export const getInventoriesCount = async (): Promise<any> => {
  try {
    const count = await prisma.inventory.count({
      where: {
        isDeleted: false, // Only fetch non-deleted inventory items
      },
    });

    return count;
  } catch (error) {
    throw new Error(`Error fetching product: ${error}`);
  }
};

export const getInventoryById = async (inventoryId: string): Promise<any> => {
  try {
    const inventory = await prisma.inventory.findUnique({
      where: {
        Id: inventoryId,
      },
      include: {
        product: {
          include: {
            product_category: true, // Include product category details
            product_media: true, // Include product media details
          },
        },
      },
    });

    return inventory;
  } catch (error) {
    throw new Error(`Error fetching product: ${error}`);
  }
};

export const addProduct = async (inventoryData: any): Promise<any> => {
  try {
    // Create the new inventory entry
    const newInventoryEntry = await prisma.inventory.create({
      data: {
        ...inventoryData,
      },
    });

    return newInventoryEntry;
  } catch (error) {
    throw new Error(`Error adding product: ${error}`);
  }
};

export const deleteInventory = async (inventoryId: string): Promise<void> => {
  try {
    await prisma.inventory.delete({
      where: {
        Id: inventoryId,
      },
    });
    return;
  } catch (error) {
    throw new Error(`Error deleting product: ${error}`);
  }
};

export const updateInventory = async (
  inventoryId: string,
  updatedInventoryData: any
): Promise<void> => {
  try {
    await prisma.inventory.update({
      where: {
        Id: inventoryId,
      },
      include: {
        product: true,
      },
      data: {
        Price: updatedInventoryData.Price,
        QuantityAvailable: updatedInventoryData.QuantityAvailable,
        product: {
          update: {
            ProductName: updatedInventoryData.product.ProductName,
            ProductDescription: updatedInventoryData.product.ProductDescription,
          },
        },
      },
    });
  } catch (error) {
    throw new Error(`Error updating inventory: ${error}`);
  }
};
