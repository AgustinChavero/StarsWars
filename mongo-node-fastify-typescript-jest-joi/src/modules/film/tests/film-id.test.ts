import axios, { AxiosResponse } from "axios";

describe("Endpoint to get all films", () => {
  let response: AxiosResponse;
  let unit: AxiosResponse;

  beforeAll(async () => {
    response = await axios.get("http://localhost:3000/film");
    unit = await axios.get(
      `http://localhost:3000/film/${response.data.data.films[0]._id}`
    );
  }, 50000);

  it("Should return a status code 200", () => {
    expect(unit.status).toBe(200);
  });

  it("Data should be an object with message (string) and films (array of objects)", () => {
    const data = unit.data.data;
    expect(typeof data === "object").toBe(true);

    const message = data.message;
    const film = data.film;

    expect(typeof message === "string").toBe(true);
    expect(typeof film === "object").toBe(true);
  });

  it("Film should have title, episode_id, director, producer, and release_date", () => {
    const film = unit.data.data.film;

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
