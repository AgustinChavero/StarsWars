const { default: axios } = require("axios");

describe("Endpoint to get all starships", () => {
  let response;

  beforeAll(async () => {
    const axiosResponse = await axios.get("http://localhost:3000/starship/");

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

  it("Data should be an object with message (string) and starships (array of objects)", () => {
    const data = response.body.data;
    expect(typeof data === "object").toBe(true);

    const message = data.message;
    const starships = data.starships;

    expect(typeof message === "string").toBe(true);
    expect(Array.isArray(starships) || typeof starships === "object").toBe(true);
  });

  it("Object of starships should be have name, model, cost_in_credits, passengers and consumables", () => {
    const starship = response.body.data.starships[0];

    const name = starship.name;
    const model = starship.model;
    const cost_in_credits = starship.cost_in_credits;
    const passengers = starship.passengers;
    const consumables = starship.consumables;

    expect(typeof name === "string").toBe(true);
    expect(typeof model === "string").toBe(true);
    expect(typeof cost_in_credits === "string").toBe(true);
    expect(typeof passengers === "string").toBe(true);
    expect(typeof consumables === "string").toBe(true);
  });
});
