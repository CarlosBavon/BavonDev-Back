const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Client name is required'],
            trim: true,
        },
        position: {
            type: String,
            trim: true,
        },
        company: {
            type: String,
            trim: true,
        },
        content: {
            type: String,
            required: [true, 'Testimonial content is required'],
            maxlength: [500, 'Testimonial cannot exceed 500 characters'],
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            default: 5,
        },
        avatar: String,
        isActive: {
            type: Boolean,
            default: true,
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);