import app from './app';

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});

const gracefulShutdownHandler = () => {
    console.log(`Gracefully shutting down`);
  
    setTimeout(() => {
        console.log('Shutting down application');
        server.close(() => {
            console.log('All requests stopped, shutting down');
            process.exit();
        });
    }, 0);
};

// The SIGTERM signal is sent to a process to request its termination.
process.on('SIGTERM', gracefulShutdownHandler);
process.on('SIGINT', gracefulShutdownHandler);