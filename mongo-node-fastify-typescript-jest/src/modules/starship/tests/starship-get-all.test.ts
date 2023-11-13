import axios, { AxiosResponse } from "axios";

describe("Endpoint to get all starships", () => {
  let response: AxiosResponse;

  beforeAll(async () => {
    response = await axios.get("http://localhost:3000/starship");
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

  it("Data should be an object with message (string) and starships (array of objects)", () => {
    const data = response.data.data;
    expect(typeof data === "object").toBe(true);

    const message = data.message;
    const starships = data.starships;

    expect(typeof message === "string").toBe(true);
    expect(Array.isArray(starships) || typeof starships === "object").toBe(true);
  });

  it("Object of starships should be have name, cost_in_credits, passengers and consumables", () => {
    const starship = response.data.data.starships[0];

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
