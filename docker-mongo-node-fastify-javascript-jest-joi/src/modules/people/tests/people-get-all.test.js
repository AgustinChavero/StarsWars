const { default: axios } = require("axios");

describe("Endpoint to get all peoples", () => {
  let response;

  beforeAll(async () => {
    const axiosResponse = await axios.get("http://localhost:3000/people/");

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

  it("Data should be an object with message (string) and peoples (array of objects)", () => {
    const data = response.body.data;
    expect(typeof data === "object").toBe(true);

    const message = data.message;
    const peoples = data.people;

    expect(typeof message === "string").toBe(true);
    expect(Array.isArray(peoples) || typeof peoples === "object").toBe(true);
  });

  it("Object of peoples should be have name, height, eye_color, birth_year and gender", () => {
    const people = response.body.data.people[0];

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
