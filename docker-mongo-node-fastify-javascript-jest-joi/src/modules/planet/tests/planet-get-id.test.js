const { default: axios } = require("axios");

describe("Endpoint to get all planets", () => {
  let response;

  beforeAll(async () => {
    const axiosResponse = await axios.get("http://localhost:3000/planet/");

    const statusCode = axiosResponse.status;
    const body = axiosResponse.data;

    response = { statusCode, body };
  }, 20000);

  beforeAll(async () => {
    const axiosResponse = await axios.get(
      `http://localhost:3000/planet/${response.body.data.planets[1]._id}`
    );

    const statusCode = axiosResponse.status;
    const body = axiosResponse.data;

    response = { statusCode, body };
  }, 20000);

  it("Should return a status code 200", () => {
    expect(response.statusCode).toBe(200);
  });

  it("Data should be an object with message (string) and planets (array of objects)", () => {
    const data = response.body.data;
    expect(typeof data === "object").toBe(true);

    const message = data.message;
    const planet = data.planet;

    expect(typeof message === "string").toBe(true);
    expect(typeof planet === "object").toBe(true);
  });

  it("Planet should be have name, rotation_period, orbital_period, diameter and population", () => {
    const planet = response.body.data.planet;

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
