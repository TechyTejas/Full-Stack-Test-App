const express = require('express');
const router = express.Router();

//controllers
const userController = require('../controllers/userController');

router.post('/', userController.createTestUser);
router.get('/', userController.getUsers);
router.delete('/:id', userController.deleteUser);

module.exports = router;