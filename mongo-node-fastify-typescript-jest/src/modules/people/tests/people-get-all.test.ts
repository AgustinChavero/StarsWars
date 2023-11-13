import axios, { AxiosResponse } from "axios";

describe("Endpoint to get all peoples", () => {
  let response: AxiosResponse;

  beforeAll(async () => {
    response = await axios.get("http://localhost:3000/people");
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

  it("Data should be an object with message (string) and peoples (array of objects)", () => {
    const data = response.data.data;
    expect(typeof data === "object").toBe(true);

    const message = data.message;
    const peoples = data.peoples;

    expect(typeof message === "string").toBe(true);
    expect(Array.isArray(peoples) || typeof peoples === "object").toBe(true);
  });

  it("Object of peoples should be have name, height, eye_color, birth_year and gender", () => {
    const people = response.data.data.peoples[0];

    expect(typeof people === "object").toBe(true);
    expect(people.hasOwnProperty("name")).toBe(true);
    expect(typeof people.name === "string").toBe(true);

    expect(people.hasOwnProperty("height")).toBe(true);
    expect(typeof people.height === "number").toBe(true);

    expect(people.hasOwnProperty("eye_color")).toBe(true);
    expect(typeof people.eye_color === "string").toBe(true);

    expect(people.hasOwnProperty("birth_year")).toBe(true);
    expect(typeof people.birth_year === "string").toBe(true);

    expect(people.hasOwnProperty("gender")).toBe(true);
    expect(typeof people.gender === "string").toBe(true);
  });
});
