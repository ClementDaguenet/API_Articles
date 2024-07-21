module.exports = {
  apps: [
    {
      name: "app",
      script: "./www/app.js",
      env_production: {
        NODE_ENV: "production",
      },
      log_file: "logs/err.log",
      error_file: "logs/err.log",
      max_memory: "200M"
    },
  ],
};
