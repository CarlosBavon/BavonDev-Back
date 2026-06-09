const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        unsubscribedAt: Date,
        source: {
            type: String,
            default: 'website',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Subscriber', subscriberSchema);