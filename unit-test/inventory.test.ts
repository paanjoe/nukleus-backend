import request from "supertest";
import { app } from "../src/index"; // Change to named import

describe("Inventory API Tests", () => {
  let server: any;

  beforeAll(() => {
    server = app.listen(4001); // Start the server on a different port for testing
  });

  afterAll((done) => {
    server.close(done);
  }, 5000); // Increase timeout to 5 seconds

  // Test for GET /api/inventory endpoint
  it("GET /api/inventory returns 200 OK status", async () => {
    const response = await request(app).get("/api/inventory");
    expect(response.status).toBe(200);
  });

  // Test for GET /api/inventory/:productId endpoint
  it("GET /api/inventory/:inventoryId returns 200 OK status", async () => {
    const inventoryId = "340ab25a-07f7-4c4d-8534-0b67e8281f38"; // Replace with an existing product ID
    const response = await request(app).get(`/api/inventory/${inventoryId}`);
    expect(response.status).toBe(200);
  });
});
