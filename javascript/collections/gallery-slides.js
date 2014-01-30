/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'models/gallery-slide',
], function ($, _, Backbone, GallerySlideModel) {
	'use strict';

	var GallerySlideCollection = Backbone.Collection.extend({

		model: GallerySlideModel,

        //Change this to alter the endpoint of the model data
        url: '/javascript/data/gallery-data.json',
        
		// url: "https://graph.facebook.com/btaylor",
        // url: "http://anznetballnation.elrancho.com.au/tile/getTiles",        

		initialize: function() {}

	});                

	return new GallerySlideCollection();

});