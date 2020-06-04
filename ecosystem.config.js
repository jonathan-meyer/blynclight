module.exports = {
  apps: [
    {
      name: "Blinklight Server",
      script: "./dist/index.js",
      watch: "./dist/",
      instances: 1,
      env: {
        NODE_ENV: "development",
        DEBUG: "blynclight:*,",
        PORT: 1234
      },
    },
  ],
};
