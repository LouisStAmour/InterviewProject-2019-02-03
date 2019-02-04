module.exports = function(wallaby) {
  return {
    files: ["src/**/*.tsx"],

    tests: ["tests/*.tsx"],

    env: {
      type: "node",
      runner: "node"
    },

    testFramework: "jest",
    compilers: {
      "tests/*.tsx": wallaby.compilers.babel(),
      "src/**/*.tsx": wallaby.compilers.babel()
    },

    bootstrap: function(wallaby) {
      const jestConfig = require(wallaby.localProjectDir + "/jest.config.js");

      wallaby.testFramework.configure(
        Object.assign(jestConfig, {
          moduleNameMapper: {
            ".*(.scss|.svg)$": require("path").join(
              wallaby.localProjectDir,
              "tests/__mocks__/styleMock.js"
            )
          }
        })
      );
    }
  };
};
