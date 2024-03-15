import request from "supertest";
import { app } from "../src/index";
import { createClient } from "@supabase/supabase-js";

describe("Inventory API Tests", () => {
  let server: any;
  let token: string;
  const email = process.env.USER_EMAIL || "";
  const password = process.env.USER_PASSWORD || "";

  beforeAll(async () => {
    server = app.listen(4001); // Start the server on a different port for testing

    const supabase = createClient(
      process.env.SUPABASE_URL || "",
      process.env.SUPABASE_ANON_KEY || ""
    );

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      token = data?.session?.access_token || "";
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  });

  afterAll((done) => {
    server.close(done);
  }, 5000); // Increase timeout to 5 seconds

  // Test for GET /api/inventory endpoint
  it("GET /api/inventory returns 200 OK status", async () => {
    const response = await request(app)
      .get("/api/inventory")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  // Test for GET /api/inventory/:productId endpoint
  it("GET /api/inventory/:inventoryId returns 200 OK status", async () => {
    const inventoryId = "340ab25a-07f7-4c4d-8534-0b67e8281f38"; // Replace with an existing product ID
    const response = await request(app)
      .get(`/api/inventory/${inventoryId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
