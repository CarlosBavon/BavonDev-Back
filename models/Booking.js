const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
        },
        phone: {
            type: String,
            trim: true,
        },
        company: {
            type: String,
            trim: true,
        },
        service: {
            type: String,
            required: [true, 'Service is required'],
        },
        preferredDate: {
            type: Date,
        },
        preferredTime: {
            type: String,
        },
        timezone: {
            type: String,
            default: 'Africa/Nairobi',
        },
        meetingType: {
            type: String,
            enum: ['Google Meet', 'Zoom', 'Phone Call', 'In Person'],
            default: 'Google Meet',
        },
        message: {
            type: String,
            maxlength: [2000, 'Message cannot exceed 2000 characters'],
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'cancelled', 'completed'],
            default: 'pending',
        },
        notes: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);