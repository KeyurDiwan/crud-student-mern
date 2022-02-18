const express = require( "express" );
const { getAllStudents, createNewStudents, updateStudentById, deleteStudentById } = require( "../controllers/student.controller" );
const router = express.Router();


// @routes  GET api/v1/student
router.route( '/' ).get(getAllStudents).post(createNewStudents);


// @routes   api/v1/student/:id
router.route( '/:id' ).put(updateStudentById).delete(deleteStudentById);

module.exports = router;
