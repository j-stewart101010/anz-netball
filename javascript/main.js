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
		tween_lite : {
			exports: 'TweenLite'
		},
		expo : {
			exports: 'Expo'
		},
		console_log : {
			exports: 'console.log'
		},
		request_anim_frame : {
			exports : 'requestAnimFrame'
		},
		mobile_check : {
			exports : 'mobilecheck'
		}
	},
	paths: {
		jquery: '../bower_components/jquery/jquery',
		underscore: '../bower_components/underscore/underscore',
		backbone: '../bower_components/backbone/backbone',
		text: '../bower_components/requirejs-text/text',
		tween_lite: 'vendor/TweenLite.min',
		expo: 'vendor/EasePack.min',
		console_log: 'helpers/console-log',
		request_anim_frame: 'helpers/request-anim-frame',
		mobile_check: 'helpers/mobile-check'
	}
});

require([
	'views/app',
	'console_log',
	'request_anim_frame',
	'mobile_check',
	'tween_lite',
	'expo'
], function (AppView) {
	/*jshint nonew:false*/

	// Initialize the application view
	console.log("New AppView");
	new AppView();
});
