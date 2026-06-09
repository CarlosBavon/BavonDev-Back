const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Project title is required'],
            trim: true,
            maxlength: [100, 'Title cannot exceed 100 characters'],
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
        },
        category: {
            type: String,
            enum: ['React', 'Node', 'Mobile', 'SaaS', 'UI/UX', 'E-commerce', 'Dashboard', 'Full Stack'],
            required: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            maxlength: [500, 'Description cannot exceed 500 characters'],
        },
        longDescription: {
            type: String,
            maxlength: [5000, 'Long description cannot exceed 5000 characters'],
        },
        features: [String],
        technologies: [String],
        imageUrl: String,
        liveUrl: String,
        githubUrl: String,
        isFeatured: {
            type: Boolean,
            default: false,
        },
        order: {
            type: Number,
            default: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

projectSchema.pre('save', function (next) {
    if (this.isModified('title')) {
        this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    next();
});

module.exports = mongoose.model('Project', projectSchema);