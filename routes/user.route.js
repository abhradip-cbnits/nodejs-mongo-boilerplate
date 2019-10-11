const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const user_controller = require('../controllers/user.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', user_controller.test);
// creating a new user record
router.post('/signUp', user_controller.createUser);
router.post('/signIn', user_controller.loginUser);



module.exports = router;