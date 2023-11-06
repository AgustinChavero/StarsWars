const request = require("supertest");
const app = require("../../app");

describe("Endpoint to get all films", () => {
  it("Should return a status code 200 and an array of films", async () => {
    const response = await request(app).get("/api/film");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("Should return a list of films", async () => {
    const response = await request(app).get("/api/film");

    expect(response.body.length).toBeGreaterThan(0);
  });
});
