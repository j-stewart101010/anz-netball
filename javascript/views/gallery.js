/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/gallery-slide.html'
], function ($, _, Backbone, GallerySlideTemplate) {

    var _self;

    var VideoModalView = Backbone.View.extend({

        tagName: 'div',

        className : 'item shade-fourteen gallery-slide',

        initialize : function () {
            _self = this;
        },

        render : function () {
            var data = {
                slide : this.options.slide,
                target : this.options.target.selector
            };
            this.$el.html(_.template(GallerySlideTemplate, data, {variable : 'data'}));
            return this;
        }
    });

    return VideoModalView;

});

