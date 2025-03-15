import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    // Convert Vite `~/` paths to Jest-compatible paths
    "^~/(.*)$": "<rootDir>/app/$1",
  },
};

export default config;
