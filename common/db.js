'use strict';

const _        = require( 'lodash' );
const config   = GLOBAL.config.db;
const settings = {
	client:	 'mysql',
	connection: _.defaults( config.global, { charset: 'utf8' }, config.knex )
};

let knex = require( 'knex' )( settings );

let bookshelf = require( 'bookshelf' )( knex );
bookshelf.plugin( 'registry' );

GLOBAL.db = module.exports = {
	Bookshelf: bookshelf,
	Knex:      knex,
	Config:    settings
};
