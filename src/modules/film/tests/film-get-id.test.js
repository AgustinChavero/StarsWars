const request = require("supertest");
const app = require("../../app");

describe("Endpoint to get a film by ID", () => {
  it("Should return a status code 200 and a film", async () => {
    const filmId = "tu_id_valido_de_pelicula";

    const response = await request(app).get(`/api/film/${filmId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({ title: "Star Wars: Episode IV - A New Hope" })
    );
  });

  it("Should return a 404 status code if the ID does not exist", async () => {
    const nonExistentId = "tu_id_inexistente";

    const response = await request(app).get(`/api/film/${nonExistentId}`);

    expect(response.statusCode).toBe(404);
  });
});
