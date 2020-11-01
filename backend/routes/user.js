const express = require('express');
const router = express.Router();
const path = require('path');

const UserController = require('../controllers/user');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'index.html'));
});

router.post('/signup', UserController.user_signup);

router.post('/login', UserController.user_login);

module.exports = router;
