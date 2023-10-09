const express = require('express');
const authController = require('../controllers/authController');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/getuser',  fetchuser, authController.getuser);

module.exports = router;
