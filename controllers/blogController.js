const Blog = require('../models/Blog');

exports.getBlogs = async (req, res, next) => {
    try {
        const { category, search, tag } = req.query;
        const filter = { isPublished: true };
        if (category) filter.category = category;
        if (tag) filter.tags = { $in: [tag] };
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { excerpt: { $regex: search, $options: 'i' } },
            ];
        }
        const blogs = await Blog.find(filter).sort({ publishedAt: -1 }).select('-content');
        res.status(200).json({ success: true, count: blogs.length, data: blogs });
    } catch (error) {
        next(error);
    }
};

exports.getBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true });
        if (!blog) return res.status(404).json({ success: false, message: 'Blog post not found' });
        // Increment view count (non-blocking)
        Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } }).exec();
        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        next(error);
    }
};

exports.createBlog = async (req, res, next) => {
    try {
        const blog = await Blog.create(req.body);
        res.status(201).json({ success: true, data: blog });
    } catch (error) {
        next(error);
    }
};

exports.updateBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!blog) return res.status(404).json({ success: false, message: 'Blog post not found' });
        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        next(error);
    }
};

exports.deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) return res.status(404).json({ success: false, message: 'Blog post not found' });
        res.status(200).json({ success: true, message: 'Blog deleted' });
    } catch (error) {
        next(error);
    }
};