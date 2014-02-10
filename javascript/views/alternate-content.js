/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'models/tile',
    'text!templates/outter-column.html'
], function ($, _, Backbone, TileModel, OutterColumnTemplate, OutterRowTemplate, OutterTileTemplate) {

    var _self;

    var OutterTiles = Backbone.View.extend({

        tagName: 'div',

        defaults : {
            width : '100%',
            height: '100%',
            top: 0,
            left: 0
        },

        initialize : function () {
            _self = this;

            this.options = _.extend({}, this.defaults, this.options);

            _self.image_tiles = _.filter(TileModel.content, function(model){ return _.has(model, 'imageurl'); });

            //@TODO: Update model to use a backbone model. A flat JSON file has been used as it eased development on the home page but is unnecessary now.
            //@TODO: Update these templates to output individual OutterTileTemplate views.

            switch (this.options.type) {
                case "column":
                    this._template_result = _.template(OutterColumnTemplate, _self.image_tiles, {variable : 'data'});
                    break;
                case "row":
                    this._template_result = _.template(OutterRowTemplate, _self.image_tiles, {variable : 'data'});
                    break;
                default:
                    this._template_result = _.template(OutterColumnTemplate, _self.image_tiles, {variable : 'data'});
            }

           _self.$el.css(this.options.styles);
        },

        //Render the content with the correct template when finished
        render : function () {
            this.$el.html(this._template_result);
            // this.options.parent.preload_tiles(_self.$el.find('.image-wrap')); 
            return this;
        },

        append_tiles : function () {
            if (this.options.type === 'row') {
                for (var i = 0; i < this.options.parent.outter_columns.length; i++) {
                    this.$el.find('.grid').append(_.template(OutterTileTemplate, _self.image_tiles, {variable : 'data'}));
                }
            }
        },

        update_values : function () {
            var property_type;

            //A little weird but to retain correct ratios we need to apply our dimensions differently depending on if we are resizing or not. This needs to be looked into.
            //@TODO: Figure out why calculations are different when applied after resizing. 
            
            if (this.options.parent.resizing) {
                property_type = { width : 'outerWidth', height : 'outerHeight' };
            }
            else {
                property_type = { width : 'width', height : 'height' };
            }

            if (this.options.type === 'column') {
                this.$el.find('.image-wrap')[property_type.height]((this.options.parent.$content.height() / 4) +'px');
            }
            if (this.options.type === 'row') {
                this.$el.find('.image-wrap')[property_type.width](this.options.parent.$content.width() / 6 +'px');
            }
        },

        preload_tiles : function () {
            this.options.parent.preload_tiles(this.$el.find('.image-wrap'));
        }

    });

    return OutterTiles;

});