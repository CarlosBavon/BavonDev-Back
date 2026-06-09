const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`[SERVER] BavDev API running on port ${PORT} in ${process.env.NODE_ENV} mode`);
        });
    })
    .catch((err) => {
        console.error('[SERVER] Failed to start:', err.message);
        process.exit(1);
    });

process.on('unhandledRejection', (err) => {
    console.error('[SERVER] Unhandled Rejection:', err);
    process.exit(1);
});

process.on('uncaughtException', (err) => {
    console.error('[SERVER] Uncaught Exception:', err);
    process.exit(1);
});