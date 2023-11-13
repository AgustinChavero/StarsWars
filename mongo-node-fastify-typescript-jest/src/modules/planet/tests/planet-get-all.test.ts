import axios, { AxiosResponse } from "axios";

describe("Endpoint to get all planets", () => {
  let response: AxiosResponse;

  beforeAll(async () => {
    response = await axios.get("http://localhost:3000/planet");
  }, 50000);

  it("Should return a status code 200", () => {
    expect(response.status).toBe(200);
  });

  it("Should return a body with error in false & data", () => {
    expect(typeof response.data).toBe("object");

    expect(response.data.hasOwnProperty("error")).toBe(true);
    expect(response.data.error).toBe(false);

    expect(response.data.hasOwnProperty("data")).toBe(true);
  });

  it("Data should be an object with message (string) and planets (array of objects)", () => {
    const data = response.data.data;
    expect(typeof data === "object").toBe(true);

    const message = data.message;
    const planets = data.planets;

    expect(typeof message === "string").toBe(true);
    expect(Array.isArray(planets) || typeof planets === "object").toBe(true);
  });

  it("Object of planets should be have name, rotation_period, orbital_period, diameter and population", () => {
    const planet = response.data.data.planets[0];

    expect(typeof planet === "object").toBe(true);
    expect(planet.hasOwnProperty("name")).toBe(true);
    expect(typeof planet.name === "string").toBe(true);

    expect(planet.hasOwnProperty("rotation_period")).toBe(true);
    expect(typeof planet.rotation_period === "string").toBe(true);

    expect(planet.hasOwnProperty("orbital_period")).toBe(true);
    expect(typeof planet.orbital_period === "string").toBe(true);

    expect(planet.hasOwnProperty("diameter")).toBe(true);
    expect(typeof planet.diameter === "string").toBe(true);

    expect(planet.hasOwnProperty("population")).toBe(true);
    expect(typeof planet.population === "string").toBe(true);
  });
});
