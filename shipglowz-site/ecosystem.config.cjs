module.exports = {
  apps: [{
    name: "shipflow-site",
    cwd: "/home/claude/shipflow/shipflow-site",
    script: "bash",
    args: ["-lc", "export PORT=3015 && flox activate -- bash -lc 'pnpm dev --port 3015'"],
    env: {
      PORT: 3015
    },
    autorestart: true,
    max_restarts: 3,
    min_uptime: "10s",
    restart_delay: 2000,
    watch: false
  }]
};
