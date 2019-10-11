const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const task_controller = require('../controllers/task.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', task_controller.test);
router.post('/create', task_controller.create);
router.post('/taskList', task_controller.showAllTasks);


router.post('/processFiles', task_controller.processFiles);
router.post('/processLogs', task_controller.processLogs);

router.get('/processExcel', task_controller.processExcel);
router.get('/getQuestion', task_controller.getQuestion);
router.post('/validateQuestion', task_controller.validateQuestion);

module.exports = router;