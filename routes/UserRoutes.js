const express = require('express');
const { createUser, getUsers, deleteUser } = require('../controllers/UserController');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

//require routes
//create user
router.post('/createuser',createUser)
//get users
router.post('/allusers',getUsers)
//delete user
router.delete('/deleteuser/:id', deleteUser)

module.exports = router;