export default {
  preset: "ts-jest",
  testMatch: ["<rootDir>/src/tests/*.test.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testEnvironment: "node",
  collectCoverage: false,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  maxWorkers: 1,
};
