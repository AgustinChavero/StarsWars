const { default: axios } = require("axios");

describe("Endpoint to get all films", () => {
  let response;

  beforeAll(async () => {
    const axiosResponse = await axios.get("http://localhost:3000/film/");

    const statusCode = axiosResponse.status;
    const body = axiosResponse.data;

    response = { statusCode, body };
  }, 20000);

  it("Should return a status code 200", () => {
    expect(response.statusCode).toBe(200);
  });

  it("Should return a body with error in false & data", () => {
    expect(typeof response.body).toBe("object");

    expect(response.body.hasOwnProperty("error")).toBe(true);
    expect(response.body.error).toBe(false);

    expect(response.body.hasOwnProperty("data")).toBe(true);
  });

  it("Data should be an object with message (string) and films (array of objects)", () => {
    const data = response.body.data;
    expect(typeof data === "object").toBe(true);

    const message = data.message;
    const films = data.films;

    expect(typeof message === "string").toBe(true);
    expect(Array.isArray(films) || typeof films === "object").toBe(true);
  });

  it("Object of films should be have title, episode_id, director, producer and release_date", () => {
    const film = response.body.data.films[0];

    expect(typeof film === "object").toBe(true);
    expect(film.hasOwnProperty("title")).toBe(true);
    expect(typeof film.title === "string").toBe(true);

    expect(film.hasOwnProperty("episode_id")).toBe(true);
    expect(typeof film.episode_id === "number").toBe(true);

    expect(film.hasOwnProperty("director")).toBe(true);
    expect(typeof film.director === "string").toBe(true);

    expect(film.hasOwnProperty("producer")).toBe(true);
    expect(typeof film.producer === "string").toBe(true);

    expect(film.hasOwnProperty("release_date")).toBe(true);
    expect(typeof film.release_date === "string").toBe(true);
  });
});
