const allowedOrigins = [
    process.env.CLIENT_URL || 'http://localhost:3000',
    'https://bavondev-back.onrender.com',
];

const corsConfig = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    maxAge: 86400,
};

module.exports = corsConfig;