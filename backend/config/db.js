const mongoose = require( 'mongoose' );

const connStr = 'mongodb://localhost:27017/student-crud';

const connectDB = async () => {

    try {
        await mongoose.connect( connStr, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useCreateModify: true
        } );

        console.log( "connected to mongoDB" );
    } catch ( error ) {
        console.error( error );
        process.exit( 1 );
    }

};

module.exports = connectDB