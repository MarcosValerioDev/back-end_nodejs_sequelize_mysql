const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const Auth = require('../auth/auth');

router.get('/getUsers', Auth.token, userController.getUsers);
router.post('/signin', Auth.token, userController.signin);
router.post('/createUser', userController.createUser);
router.post('/updateUser', Auth.token, userController.updateUser);
router.post('/deleteUser', Auth.token, userController.deleteUser);

module.exports = router;