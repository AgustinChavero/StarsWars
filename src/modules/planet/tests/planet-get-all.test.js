const { default: axios } = require("axios");

describe("Endpoint to get all planets", () => {
  let response;

  beforeAll(async () => {
    const axiosResponse = await axios.get("http://localhost:3000/planet/");

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

  it("Data should be an object with message (string) and planets (array of objects)", () => {
    const data = response.body.data;
    expect(typeof data === "object").toBe(true);

    const message = data.message;
    const planets = data.planets;

    expect(typeof message === "string").toBe(true);
    expect(Array.isArray(planets) || typeof planets === "object").toBe(true);
  });

  it("Object of planets should be have name, rotation_period, orbital_period, diameter and population", () => {
    const planet = response.body.data.planets[0];

    const name = planet.name;
    const rotation_period = planet.rotation_period;
    const orbital_period = planet.orbital_period;
    const diameter = planet.diameter;
    const population = planet.population;

    expect(typeof name === "string").toBe(true);
    expect(typeof rotation_period === "string").toBe(true);
    expect(typeof orbital_period === "string").toBe(true);
    expect(typeof diameter === "string").toBe(true);
    expect(typeof population === "string").toBe(true);
  });
});
