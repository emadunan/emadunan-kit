const path = require("path");

const rootDir = path.resolve(__dirname, "../..");

module.exports = {
  apps: [
    {
      name: "emadunan",
      cwd: rootDir,
      script: "sh",
      args: "-c 'npm run start --workspace=website'",
      env: {
        NODE_ENV: "production",
        PORT: 3030,
      },
    },
  ],
};
