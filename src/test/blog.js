import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../index";
import {expect, jest, test} from '@jest/globals';
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

describe("blog tests", () => {
  const blogData = {
    title:"first",
    description:"new"
  }
  describe("GET /api/v1/blogs", () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app).get("/api/v1/blogs")
      expect(response.statusCode).toBe(200)
    })
  })
  describe("POST /api/v1/blogs", () => {
    it('Should respond with a 201 status code', async () => {
      const response = await request(app).post("/api/v1/blogs")
        .send(blogData)
       .set("Authorization",'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzc5YzIzOTI3OThlMGEyN2M3NmE0YSIsImlhdCI6MTY3NDAyNjAyMywiZXhwIjoxNjgxODAyMDIzfQ.ppRQTBMG3U6gNudviKJSGieDQLwexa8nvUA5Jmrwprg')

      expect(response.body.statusCode).toBe(201)
    })
  })
 
  describe("GET /api/v1/blogs/:id", () => {
    it('should respond with a 200 status code', async () => {
      const response = await request(app).get("/api/v1/blogs/63c79a9151a613066c95744c")
      expect(response.statusCode).toBe(200)
    })
  }) 
  describe("UPDATE /api/v1/blogs/:id", () => {
    it('should respond with a 200 status code', async () => {
      const response = await request(app).patch("/api/v1/blogs/63c79a9151a613066c95744c")
      .send(blogData)
      .set("Authorization",'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzc5YzIzOTI3OThlMGEyN2M3NmE0YSIsImlhdCI6MTY3NDAyNjAyMywiZXhwIjoxNjgxODAyMDIzfQ.ppRQTBMG3U6gNudviKJSGieDQLwexa8nvUA5Jmrwprg')
      expect(response.statusCode).toBe(200)
      
    })
  }) 
  describe("DELETE /api/v1/blogs/:id", () => {
    it("should respond with a 200 status code", async () => {
      const response = await request(app).delete("/api/v1/blogs/63bea167706be404409ed3ea")
      .set("Authorization",'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzc5YzIzOTI3OThlMGEyN2M3NmE0YSIsImlhdCI6MTY3NDAyNjAyMywiZXhwIjoxNjgxODAyMDIzfQ.ppRQTBMG3U6gNudviKJSGieDQLwexa8nvUA5Jmrwprg')
      expect(response.statusCode).toBe(200);
    })
  })
  
})