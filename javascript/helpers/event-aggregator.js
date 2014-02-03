/*global define*/
define([
	'underscore',
	'backbone'
], function (_, Backbone) {
	'use strict';

	var EventAggregator = {};

	var o = $({});

	EventAggregator.subscribe = function() {
		o.on.apply(o, arguments);
	};

	EventAggregator.unsubscribe = function() {
		o.off.apply(o, arguments);
	};

	EventAggregator.publish = function() {
		o.trigger.apply(o, arguments);
	};

	return EventAggregator;
});
