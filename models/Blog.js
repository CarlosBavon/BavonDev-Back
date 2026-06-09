const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Blog title is required'],
            trim: true,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
        },
        excerpt: {
            type: String,
            required: [true, 'Excerpt is required'],
            maxlength: [300, 'Excerpt cannot exceed 300 characters'],
        },
        content: {
            type: String,
            required: [true, 'Content is required'],
        },
        category: {
            type: String,
            required: true,
            enum: ['Development', 'Design', 'Technology', 'Business', 'Tutorial', 'Career', 'Other'],
        },
        tags: [String],
        coverImage: String,
        readTime: Number,
        isPublished: {
            type: Boolean,
            default: false,
        },
        publishedAt: Date,
        views: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

blogSchema.pre('save', function (next) {
    if (this.isModified('title')) {
        this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    if (this.isModified('content')) {
        const wordsPerMinute = 200;
        const wordCount = this.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
        this.readTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
    }
    next();
});

module.exports = mongoose.model('Blog', blogSchema);