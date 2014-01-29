/*global define*/
define([
	'underscore',
	'backbone',
	'models/tile',
], function (_, Backbone, TileModel) {
	'use strict';

	var TilesCollection = Backbone.Collection.extend({

		model: TileModel,

        //Change this to alter the endpoint of the model data
        url: '/javascript/data/tile-data.json',
        
		// url: "https://graph.facebook.com/btaylor",
        // url: "http://anznetballnation.elrancho.com.au/tile/getTiles",        

		initialize: function() {

		}

	});

	return new TilesCollection();

});