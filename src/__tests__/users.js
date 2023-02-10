
import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../app.js";
dotenv.config({ path: "../.env" });
/* Connecting to the database before each test. */
jest.setTimeout(200000);
beforeEach(async () => {
  await mongoose.connect(process.env.DATABASE_TEST_URL, { useNewUrlParser: true });
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("user tests", () => {
  const userData = {
    email: "jackson@ntarindwa.dev",
    password: "123456"
  }

  describe("POST /api/v1/auth/signup", () => {
    it('should respond with a 201 status code', async () => {
      const response = await request(app).post("/api/v1/auth/signup")
        .send(userData)
        console.log(response.body.data.user)
      expect(response.body.statusCode).toBe(201)
    })
  })
  describe("POST /api/v1/auth/login", () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app).post("/api/v1/auth/login")
        .send(userData)
      expect(response.statusCode).toBe(200)
    })
  })
  describe("GET /api/v1/auth", () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app).get("/api/v1/auth")
      expect(response.statusCode).toBe(200)
    })
  })
  describe("DELETE /api/v1/auth", () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app).delete("/api/v1/auth")
      expect(response.statusCode).toBe(200)
    })
  })
  
})
export default app