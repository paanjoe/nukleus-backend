import express from "express";
import type { Request, Response } from "express";
import * as ProductService from "../services/product.service";
import {
  authMiddleware,
  authorizeMiddleware,
} from "../middleware/authMiddleware";

export const productRouter = express.Router();

// List all products
productRouter.get(
  "/",
  // authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { sortBy, sortDirection, take, skip } = req.query;
      const products = await ProductService.listAllProducts(
        sortBy as string,
        sortDirection as string,
        take as string,
        skip as string
      );

      const productsCount = await ProductService.getProductsCount();

      res.status(200).json({
        total: productsCount,
        data: products,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);
