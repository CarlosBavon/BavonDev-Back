const express = require('express');
const router = express.Router();
const { getGithubStats } = require('../controllers/githubController');

router.get('/', getGithubStats);

module.exports = router;