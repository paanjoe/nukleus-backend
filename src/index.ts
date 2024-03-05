import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { entitycontactRouter } from "./entitycontact/entitycontact.router";

// Configuration Setup Area
dotenv.config();

// Validation Area
if (!process.env.PORT) {
  console.log("There is no port defined in the .env file");
  process.exit(1);
}

// Settings / Config Area
const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();

// Initialize Area
app.use(cors());
app.use(express.json());

// Router Area
app.use("/api/entitycontact", entitycontactRouter);

// Start the server
// We shall add more try catch and error handling later
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
