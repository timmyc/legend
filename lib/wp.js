var config = require( '../config' ),
	wpcom = require( 'wpcom' )( config.wpcom.token ),
	noop = require( 'lodash/utility/noop' ),
	site = wpcom.site( config.wpcom.site );

module.exports = {
	addPost: function( options, cb ) {
		var callback = cb || noop;
		console.log( 'wp#addPost', options );
		
		site.addPost( options, callback );
	}
}
