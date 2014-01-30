/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'models/image',
], function ($, _, Backbone, ImageModel) {
	'use strict';

	var ImageCollection = Backbone.Collection.extend({

		model: ImageModel,

        //Change this to alter the endpoint of the model data
        url: '/javascript/data/image-data.json',
        
		// url: "https://graph.facebook.com/btaylor",
        // url: "http://anznetballnation.elrancho.com.au/tile/getTiles",        

		initialize: function() {}

	});                

	return new ImageCollection();

});