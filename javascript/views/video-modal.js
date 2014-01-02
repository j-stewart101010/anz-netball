/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/video-modal.html'
], function ($, _, Backbone, VideoModalTemplate) {

    var _self;

    var VideoModalView = Backbone.View.extend({

        tagName: 'div',

        defaults : {
            top: '50%',
            left: '50%',
            width: 500,
            height: 500,
            marginTop: -250,
            marginLeft: -250
        },

        className: 'modal fade',

        initialize : function () {
            _self = this;

            this.$el.on('hidden.bs.modal', _self.close);

            $(window).on('resize', _self.resize);
            _self.set_options();
        },

        set_options : function () {
            if (this.options.cover) {
                this.className = 'cover';
                this.view_options = $.extend({}, this.defaults, _self.get_el_position(this.options.cover));
            }
            else {
                this.view_options = $.extend({}, this.defaults, this.options);
            }
        },

        resize : function () {
            this.resize_evt;
            clearTimeout(this.resize_evt);
            this.resize_evt = setTimeout(function() {
                _self.set_options();
                _self.$el.css(_self.view_options);
            }, 150);
        },

        close : function (e) {
            _self.$el.remove();
        },

        get_el_position : function ($el) {
            // console.log($el.width());
            return { width: $el.width(), height: $el.height(), top: ($el.offset().top - $(window).scrollTop()), left: $el.offset().left }; 
        },

        render : function () {
            this.$el.html(_.template(VideoModalTemplate))
                .css(this.view_options)
                .addClass(_.result(this, 'className'))
                .attr({ 'tabindex' : -1, 'role' : 'dialog', 'aria-hidden' : 'true'})
                .modal('show');
            return this;
        }

    });

    return VideoModalView;

});

