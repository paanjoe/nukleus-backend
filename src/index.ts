import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

// Import Routers
import { entitycontactRouter } from "./routes/entitycontact.router";
import { entityroleRouter } from "./routes/entityrole.router";
import { entityUserRouter } from "./routes/entityuser.router";
import { inventoryRouter } from "./routes/inventory.router";
import { productRouter } from "./routes/product.router";

// Configuration Setup Area
dotenv.config();

// Validation Area
if (!process.env.PORT) {
  process.exit(1);
}

// Settings / Config Area
export const app = express();

// Initialize Area
app.use(cors());
app.use(express.json());

// Router Area
app.use("/api/entitycontact", entitycontactRouter);
app.use("/api/entityrole", entityroleRouter);
app.use("/api/entityuser", entityUserRouter);
app.use("/api/inventory", inventoryRouter);
app.use("/api/product", productRouter);

// Start the server
// We shall add more try catch and error handling later
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
