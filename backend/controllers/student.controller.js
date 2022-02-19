const Student = require('../models/student.model');
const asyncHandler = require( '../middleware/asyncHandler' );
const ErrorResponse = require('../utils/errorResponse');

exports.getAllStudents = asyncHandler( async ( req, res, next ) => {
    

    // Add Filter Functionality
    let query;

    let uiValues = {
        filtering: {},
        sorting: {},
    }

    const reqQuery = { ...req.query };

    const removeFields = ['select', 'sort', 'page', 'limit'];

    
    removeFields.forEach( val => delete reqQuery[val] );

    // make an array of all the keys we receive in query
    const filterKeys = Object.keys( reqQuery );
    const filterValues = Object.values( reqQuery );

    filterKeys.forEach( ( val, idx ) => uiValues.filtering[val] = filterValues[idx] );
    

    
    let queryStr = JSON.stringify( reqQuery );

    // Create query string
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}` );

    // console.log(queryStr);


    query = Student.find( JSON.parse( queryStr ) );

    if ( req.query.sort ) {
        
        const sortByArr = req.query.sort.split( ',' );

        sortByArr.forEach( val => {
            let order;
            if ( val[0] === '-' ) {
                order = 'descending';
            } else {
                order = 'ascending';
            }

            uiValues.sorting[value.replace( '-', '' )] = order;
            
        } );
        
        const sortByStr = sortByArr.join( ' ' );
        
        query = query.sort( sortByStr );


    } else {
        query = query.sort( '-testMArk' );
    }






    /*------------------------------------------------------ */


    // Get All Students Data..!!
    const student = await query    // Student.find(JSON.parse(queryStr));

    const maxMarks = await Student.find().sort({testMark: -1}).limit(1).select("-_id testMark");

    const minMarks = await Student.find().sort({testMark: 1}).limit(1).select("-_id testMark");

    uiValues.maxMarks = maxMarks[0].testMark;
    uiValues.minMarks = minMarks[0].testMark;

    res.status( 200 ).json( {
        success: true,
        data: student,
        uiValues,
    } );
} );

exports.createNewStudents = asyncHandler( async ( req, res ) => {
  
    const student = await Student.create( req.body );

    res.status( 201 ).json( {
        success: true,
        data: student,
    } );

} );

exports.updateStudentById = asyncHandler( async ( req, res ) => {
   
    let student = await Student.findById( req.params.id )
    
    if ( !student ) {
        return next( new ErrorResponse( 'Student not found', 404 ) );
    }

    student = await Student.findByIdAndUpdate( req.params.id, req.body, { new: true, runValidators: true } );
    
    res.status( 201 ).json( {
        success: true,
        data: student,
    } );

} );

exports.deleteStudentById = asyncHandler( async ( req, res ) => {
   
     let student = await Student.findById( req.params.id )
    
    if ( !student ) {
        return next( new ErrorResponse( 'Student not found', 404 ) );
    }

   await student.remove();
    
    res.status( 200 ).json( {
        success: true,
        data: {},
    } );

} );