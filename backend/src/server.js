const app = require('./app');
const connectDB = require('./config/database');
const config = require('./config/env');
const { initScheduler } = require('./utils/scheduler');

// Connect to database
connectDB();

// Initialize Scheduler
initScheduler();

// Start server
const PORT = config.PORT;

const server = app.listen(PORT, () => {
  console.log('========================================');
  console.log(`🚀 Server running in ${config.NODE_ENV} mode`);
  console.log(`📡 Port: ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log('========================================');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Handle SIGTERM
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('💤 Process terminated');
  });
});