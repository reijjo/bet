module.exports = {
  apps: [
    {
      name: "api-server",
      script: "bun",
      args: "run src/index.ts",
      cwd: "/home/ec2-user/bet/server",
      env: {
        NODE_ENV: "production",
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
    },
  ],
};
