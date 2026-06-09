const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const os = require('os');

router.get('/', (req, res) => {
    const dbState = mongoose.connection.readyState;
    const dbStatus = ['disconnected', 'connected', 'connecting', 'disconnecting'];

    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: dbStatus[dbState] || 'unknown',
        memory: {
            total: os.totalmem(),
            free: os.freemem(),
            usage: process.memoryUsage().heapUsed,
            healthy: os.freemem() > 100 * 1024 * 1024,
        },
        cpu: os.cpus().length,
        nodeVersion: process.version,
        environment: process.env.NODE_ENV,
    });
});

module.exports = router;