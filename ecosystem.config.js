module.exports = {
    apps: [
      {
        name: "Backend-App",           // Application name
        script: "./server.js",         // Script to execute
        // instances: "max",              // Number of instances (e.g., 1, 2, "max")
        instances: 1,              // Number of instances (e.g., 1, 2, "max")
        exec_mode: "cluster",          // Cluster or fork mode
        autorestart: true,             // Automatically restart on crash
        restart_delay: 5000,           // Delay in milliseconds before restarting (e.g., 5000ms = 5s)
        max_restarts: 10,              // Maximum number of restarts in 1 minute (set to 0 for unlimited)
        max_memory_restart: "300M",watch: false,                  // Watch for file changes (set true for development)
        ignore_watch: ["node_modules", "logs"], // Ignore these files or directories
        watch_options: {
          followSymlinks: false        // Watch options (e.g., disable symlinks)
        },
        time: true                      // Append timestamp to logs
      }
    ],
   cron_restart: "0 0 * * *"
  };
  