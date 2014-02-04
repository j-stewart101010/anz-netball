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
		match_media : {
			exports : 'matchMedia'
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
        },
        bootstrap_modal : {
			deps: [
				'jquery'
			],
			exports: '$.fn.modal'
        },
        flippy : {
        	deps: [
        		'jquery'
        	],
        	exports: '$.fn.flippy'
        },
        shame : {
        	deps: [
        		'jquery'
        	],
        	exports: '$.fn.flippy'
        }
	},
	paths: {
		jquery: '../bower_components/jquery/jquery',
		underscore: '../bower_components/underscore/underscore',
		backbone: '../bower_components/backbone/backbone',
		text: '../bower_components/requirejs-text/text',
		polyfiller: '../bower_components/webshim/js-webshim/minified/polyfiller',
		match_media: 'helpers/match-media',
		bootstrap_transition : 'vendor/bootstrap-transition',
        bootstrap_collapse : 'vendor/bootstrap-collapse',
        bootstrap_modal : 'vendor/bootstrap-modal',
        flippy : 'vendor/jquery.flippy.min',
        shame : 'modules/shame'
	}
});

require([
	'views/app-generic',
], function (AppGenericView) {
	/*jshint nonew:false*/

	// Initialize the application view
	new AppGenericView();
});
