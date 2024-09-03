const express = require('express');

const { createStudent, getStudents, deleteStudent } = require('../controllers/StudentController');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

//require routes
//create user
router.post('/createstudent',createStudent)
//get users
router.post('/allstudents',getStudents)
//delete user
router.delete('/deletestudent/:id', deleteStudent)

module.exports = router;