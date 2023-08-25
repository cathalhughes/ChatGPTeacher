const express = require('express');
const router = express.Router();
const controller = require('./teacher.controller');

router.post('/generate-lesson', controller.generateLesson);

// Export the router instance
module.exports = router;
