import express from "express";
import type { Request, Response } from "express";
import * as InventoryService from "../services/inventory.service";
import {
  authMiddleware,
  authorizeMiddleware,
} from "../middleware/authMiddleware";

export const inventoryRouter = express.Router();

// List all products
inventoryRouter.get(
  "/",
  // authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { sortBy, sortDirection, take, skip } = req.query;
      const inventories = await InventoryService.listAllInventory(
        sortBy as string,
        sortDirection as string,
        take as string,
        skip as string
      );

      const totalInventoryCount = await InventoryService.getInventoriesCount();

      res.status(200).json({
        total: totalInventoryCount,
        data: inventories,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Get inventory by ID
inventoryRouter.get(
  "/:inventoryId",
  // authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const inventoryId = req.params.inventoryId;
      const inventory = await InventoryService.getInventoryById(inventoryId);
      res.status(200).json(inventory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Add a new product
inventoryRouter.post(
  "/add-inventory",
  // authMiddleware,
  // authorizeMiddleware(["Create"]),
  async (req: Request, res: Response) => {
    try {
      const { inventoryData } = req.body;
      // const userId = req.user?.Id;

      // Check if productId and userId are provided
      if (!inventoryData) {
        return res
          .status(400)
          .json({ error: "Product ID and user ID are required" });
      }

      const newInventoryEntry = await InventoryService.addProduct(
        inventoryData
      );
      res.status(201).json(newInventoryEntry);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Delete a product
inventoryRouter.delete(
  "/delete-inventory/:inventoryId",
  // authMiddleware,
  // authorizeMiddleware(["Delete"]),
  async (req: Request, res: Response) => {
    try {
      const inventoryId = req.params.inventoryId;
      await InventoryService.deleteInventory(inventoryId);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Update a product
inventoryRouter.put(
  "/update-inventory/:inventoryId",
  // authMiddleware,
  // authorizeMiddleware(["Update"]),
  async (req: Request, res: Response) => {
    try {
      const inventoryId = req.params.inventoryId;
      const updatedInventoryData = req.body;
      await InventoryService.updateInventory(inventoryId, updatedInventoryData);
      res.status(200).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);
