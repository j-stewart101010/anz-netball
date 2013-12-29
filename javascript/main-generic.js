/*global require*/
'use strict';

// Require.js allows us to configure shortcut alias
require.config({
	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
        bootstrap_transition : {
			deps: [
				'jquery'
			],
			exports: '$.fn.transition'
        }, 		
        bootstrap_collapse : {
			deps: [
				'jquery'
			],
			exports: '$.fn.collapse'
        }
	},
	paths: {
		jquery: '../bower_components/jquery/jquery',
		underscore: '../bower_components/underscore/underscore',
		backbone: '../bower_components/backbone/backbone',
		bootstrap_transition : 'vendor/bootstrap-transition',		
        bootstrap_collapse : 'vendor/bootstrap-collapse',		
	}
});

require([
	'views/app-generic'
], function (AppGenericView) {
	/*jshint nonew:false*/

	// Initialize the application view
	new AppGenericView();
});
