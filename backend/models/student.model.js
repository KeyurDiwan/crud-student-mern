const mongoose = require( 'mongoose' );

const studentSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    testMark: {
        type: Number,
        required: [true, 'Testmark is required'],
    },
    testName: {
        type: String,
        required: [true, 'Course is required'],
    },

} );

const Student = mongoose.model( 'Student', studentSchema );

module.exports = Student;