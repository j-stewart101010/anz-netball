/*global define*/
define([
	'underscore',
	'backbone',
	'models/tile',
], function (_, Backbone, Tile) {
	'use strict';

	var TilesCollection = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: Tile,

		url: "/javascript/data/tile-data.json"

	});

	return new TilesCollection();
});