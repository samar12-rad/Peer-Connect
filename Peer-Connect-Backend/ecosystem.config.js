// PM2 ecosystem configuration for production deployment on EC2
module.exports = {
  apps: [
    {
      name: 'peer-connect-backend',
      script: 'index.js',
      instances: 'max', // Use all available CPU cores
      exec_mode: 'cluster', // Run in cluster mode for load balancing
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      autorestart: true,
      max_memory_restart: '1G',
      watch: false, // Don't watch files in production
      // Graceful shutdown
      kill_timeout: 5000,
      listen_timeout: 8000,
      // Auto-restart on errors
      min_uptime: '10s',
      max_restarts: 10,
    },
  ],
};
