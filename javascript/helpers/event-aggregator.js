/*global define*/
define([
	'underscore',
	'backbone'
], function (_, Backbone) {
	'use strict';

	var EventAggregator = {};
	_.extend(EventAggregator, Backbone.Events);

	return EventAggregator;
});
