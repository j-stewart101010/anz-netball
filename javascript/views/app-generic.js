/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'views/video-modal',
    'bootstrap_transition',    
    'bootstrap_collapse',
    'bootstrap_modal',
], function ($, _, Backbone, VideoModalView) {

    var _self;

    var AppView = Backbone.View.extend({

        el : 'body',

        initialize : function () {
            _self = this;
            this.$el.on('show.bs.modal', _self.show_modal);
        },

        show_modal : function (e) {
            e.preventDefault();
            console.log(e);
            var video_modal = new VideoModalView({ el : e.currentTarget });
        }

    });

    return AppView;

});