import { PrismaClient, product } from "@prisma/client";

const prisma = new PrismaClient();

export const listAllProducts = async (
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
        orderBy = { ProductName: orderDirection };
        break;
      case "productCategory":
        orderBy = {
          product: { product_category: { CategoryName: orderDirection } },
        };
        break;
      default:
        break;
    }

    const inventory = await prisma.product.findMany({
      where: {
        IsActive: true, // Only fetch non-deleted inventory items
      },
      orderBy,
      take: takeCount,
      skip: skipCount,
      include: {
        product_category: true, // Include product category details
        product_media: true, // Include product media details
      },
    });

    return inventory;
  } catch (error) {
    throw new Error(`Error fetching inventory: ${error}`);
  }
};

export const getProductsCount = async (): Promise<any> => {
  try {
    const count = await prisma.product.count({
      where: {
        IsActive: true, // Only fetch non-deleted inventory items
      },
    });

    return count;
  } catch (error) {
    throw new Error(`Error fetching product: ${error}`);
  }
};
