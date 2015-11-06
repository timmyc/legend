#!/usr/bin/env node
var argv = require('yargs').argv,
	moment = require( 'moment' ),
	Github = require( 'node-github' );

var runkeeper = require( './lib/runkeeper' );

if ( argv.runkeeper ) {
	runkeeper.run();
}
