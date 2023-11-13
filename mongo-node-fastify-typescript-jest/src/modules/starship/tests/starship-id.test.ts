import axios, { AxiosResponse } from "axios";

describe("Endpoint to get all starships", () => {
  let response: AxiosResponse;
  let unit: AxiosResponse;

  beforeAll(async () => {
    response = await axios.get("http://localhost:3000/starship");
    unit = await axios.get(
      `http://localhost:3000/starship/${response.data.data.starships[0]._id}`
    );
  }, 50000);

  it("Should return a status code 200", () => {
    expect(unit.status).toBe(200);
  });

  it("Data should be an object with message (string) and starships (array of objects)", () => {
    const data = unit.data.data;
    expect(typeof data === "object").toBe(true);

    const message = data.message;
    const starship = data.starship;

    expect(typeof message === "string").toBe(true);
    expect(typeof starship === "object").toBe(true);
  });

  it("Starship should be have name, cost_in_credits, passengers and consumables", () => {
    const starship = unit.data.data.starship;

    expect(typeof starship === "object").toBe(true);
    expect(starship.hasOwnProperty("name")).toBe(true);
    expect(typeof starship.name === "string").toBe(true);

    expect(starship.hasOwnProperty("cost_in_credits")).toBe(true);
    expect(typeof starship.cost_in_credits === "string").toBe(true);

    expect(starship.hasOwnProperty("passengers")).toBe(true);
    expect(typeof starship.passengers === "string").toBe(true);

    expect(starship.hasOwnProperty("consumables")).toBe(true);
    expect(typeof starship.consumables === "string").toBe(true);
  });
});
