const path = require("path");

module.exports = function ({ env, paths }) {
  return {
    webpack: {
      alias: {
        environment: path.join(
          __dirname,
          "src",
          "environments",
          process.env.CLIENT_ENV
        ),
      },
      plugins: [],
      configure: {
        /* Any webpack configuration options: https://webpack.js.org/configuration */
      },
      configure: (webpackConfig, { env, paths }) => {
        return webpackConfig;
      },
    },
  };
};
