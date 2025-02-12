module.exports = {
  apps: [
    {
      name: "Blynclight Server",
      script: "./dist/index.js",
      watch: true,
      instances: 1,
      env: {
        NODE_ENV: "development",
        DEBUG: "blynclight:*,",
        PORT: 1234
      },
    },
  ],
};
