/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}]
  },
  testTimeout: 30000, // Aumentar el tiempo de espera a 30s
};