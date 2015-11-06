var config = require( '../config' ),
	runkeeper = require( 'runkeeper-js' ),
	moment = require( 'moment' ),
	client = new runkeeper.HealthGraph( config.runkeeper ),
	wp = require( './wp' );

function metersToMiles( meters ) {
	return Math.round( ( meters * 0.000621371 ) * 100 ) / 100;
}

function processRunkeeper() {
	client.fitnessActivityFeed( function( error, response ) {
		var endOfDay = moment().endOf( 'day' ),
			startOfDay = moment().startOf( 'day' );

		response.items.forEach( function( item ) {
			var activityDate = moment( item.start_time, 'ddd, D MMM YYYY HH:mm:ss' );

			if ( endOfDay.isAfter( activityDate ) && startOfDay.isBefore( activityDate ) ) {
				var activity = item.type === 'Running' ? 'Ran' : 'Walked';
				wp.addPost( {
					title: 'You ' + activity + ' ' + metersToMiles( item.total_distance ) + ' Miles',
					categories: [ config.wpcom.categories.power ]
				} );
			}
		} );
	} );
}

module.exports = {
	run: function() {
		processRunkeeper();
	}
}
