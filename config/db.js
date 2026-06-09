const mongoose = require('mongoose');

const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error('MONGO_URI is not defined in environment variables');

    const conn = await mongoose.connect(uri, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    });

    console.log(`[DATABASE] MongoDB connected: ${conn.connection.host}`);
    return conn;
};

module.exports = connectDB;