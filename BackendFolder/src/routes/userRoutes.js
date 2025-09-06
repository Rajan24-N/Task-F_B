const express = require('express');
const router = express.Router();

const { getAllUsers, getUserDetails } = require('../controllers/userController');

const { authenticate, authorizeAdmin } = require('../middleware/authWare');


router.get('/', authenticate, authorizeAdmin, getAllUsers);
router.get('/:id', authenticate, getUserDetails);

module.exports = router;
