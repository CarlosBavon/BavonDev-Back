const Project = require('../models/Project');

exports.getProjects = async (req, res, next) => {
    try {
        const { category } = req.query;
        const filter = { isActive: true };
        if (category && category !== 'All') filter.category = category;
        const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
        res.status(200).json({ success: true, count: projects.length, data: projects });
    } catch (error) {
        next(error);
    }
};

exports.getProject = async (req, res, next) => {
    try {
        const project = await Project.findOne({ slug: req.params.slug, isActive: true });
        if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
        res.status(200).json({ success: true, data: project });
    } catch (error) {
        next(error);
    }
};

exports.createProject = async (req, res, next) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json({ success: true, data: project });
    } catch (error) {
        next(error);
    }
};

exports.updateProject = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
        res.status(200).json({ success: true, data: project });
    } catch (error) {
        next(error);
    }
};

exports.deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
        res.status(200).json({ success: true, message: 'Project deleted' });
    } catch (error) {
        next(error);
    }
};