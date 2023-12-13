module.exports = {
  preset: "ts-jest",
  testMatch: ["**/tests/**/*.test.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testEnvironment: "node",
  collectCoverage: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$",
  maxWorkers: 1,
};
