const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const UserController = require('../controllers/user');

router.post('/signup', UserController.userSignup);

router.post('/login', UserController.userLogin);

router.delete('/:id', checkAuth, UserController.userDelete);

module.exports = router;