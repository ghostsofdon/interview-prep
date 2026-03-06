import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export default {
  testEnvironment: "node",
  roots: ["<rootDir>/dist"],
  testMatch: ["**/tests/**/*.test.js"],
  transform: {
    ...tsJestTransformCfg,
  },
};