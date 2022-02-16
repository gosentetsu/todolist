const withImages = require("next-images");

const withTM = require("next-transpile-modules")(["antd-mobile", "react-vant"]);

module.exports = withTM(
  withImages({
    // other Next.js configuration in your project
  })
);
