'use strict';

const express    = require( 'express' );
const path       = require( 'path' );
const bodyParser = require( 'body-parser' );
const helpers    = require( './helpers' );
const passport   = require( 'passport' );

const app        = express();

// Sets the main configuration options.
GLOBAL.config = require( './config' );

// Initializes helpers.
helpers.init( app );

// Middleware.
app.use( require( 'morgan' )( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( require( 'cookie-parser' )() );
app.use( require( 'passport' ).initialize() );

// Load routes.
app.use( require( './controllers' ) );

// Catch 404 and forward to error handler
app.use( ( req, res, next ) => {
	var err = new Error( 'Not Found' );
	err.status = 404;
	next( err );
});

// Error handlers

// Development error handler
// Will print stacktrace
if ( 'development' === app.get( 'env' ) ) {
	app.use( ( err, req, res, next ) => {
		res.status( err.status || 500 );
		res.json({
			message: err.message,
			status: err.status || 500
		});
	});
}

// Production error handler
// No stacktraces leaked to user
app.use( ( err, req, res, next ) => {
	res.status( err.status || 500 );
	res.json({
		message: err.message,
		status: err.status || 500
	});
});

module.exports = app;
