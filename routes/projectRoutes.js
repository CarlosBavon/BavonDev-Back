const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
} = require('../controllers/projectController');
const { protect } = require('../middleware/auth');

router.get('/', getProjects);
router.get('/:slug', getProject);

router.post(
    '/',
    protect,
    [
        body('title').trim().notEmpty().withMessage('Title is required'),
        body('category').isIn(['React', 'Node', 'Mobile', 'SaaS', 'UI/UX', 'E-commerce', 'Dashboard', 'Full Stack']),
        body('description').trim().notEmpty().withMessage('Description is required'),
    ],
    createProject
);

router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;