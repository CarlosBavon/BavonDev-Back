const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxlength: [100, 'Name cannot exceed 100 characters'],
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
        service: {
            type: String,
            enum: [
                'Full Stack Development',
                'Website Development',
                'Mobile App Development',
                'UI/UX Design',
                'API Development',
                'SaaS Development',
                'E-commerce Systems',
                'Dashboard Systems',
                'Maintenance & Support',
                'Other',
            ],
        },
        budget: {
            type: String,
            enum: ['Under $1,000', '$1,000 - $5,000', '$5,000 - $10,000', '$10,000 - $25,000', '$25,000+', 'Not Sure'],
        },
        message: {
            type: String,
            required: [true, 'Message is required'],
            minlength: [10, 'Message must be at least 10 characters'],
            maxlength: [5000, 'Message cannot exceed 5000 characters'],
        },
        isRead: {
            type: Boolean,
            default: false,
        },
        replied: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);