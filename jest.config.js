export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  "moduleNameMapper": {
    "\\.(css|scss)$": "identity-obj-proxy"
  },
};
