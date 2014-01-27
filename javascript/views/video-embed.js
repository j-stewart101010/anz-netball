/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/video-modal.html',
    'text!templates/video-embed.html'
], function ($, _, Backbone, VideoModalTemplate, VideoEmbedTemplate) {

    var _self;

    var VideoModalView = Backbone.View.extend({

        tagName: 'div',

        defaults : {
            top: '50%',
            left: '50%',
            width: 500,
            height: 500,
            // marginTop: -250,
            // marginLeft: -250
        },

        className : 'loading',

        events : {
            'click.video.close [data-video="close"]' : 'close'
        },

        initialize : function () {
            _self = this;

            _self.set_options();

            // Listen for messages from the player
            if (window.addEventListener){ window.addEventListener('message', _self.on_message_received, false); }
            else { window.attachEvent('onmessage', _self.on_message_received, false); }
        },

        // Handle messages received from the player
        on_message_received : function (e) {
            var data = JSON.parse(e.data);

            switch (data.event) {
                case 'ready':
                    break;
            }
        },

        set_options : function () {
            //If video id option is defined
            if (!this.options.video_id) { console.log('You must define a video id.'); return; }

            //If we are rendering a video to be used in a modal
            if (this.options.modal) {
                // this.className = 'append';
                this.view_style_options = $.extend({}, this.defaults, this.options);
                this._template_result = _.template(VideoModalTemplate, this.options.video_id, {variable : 'data'});

                this.$el
                    .css(this.view_style_options)
                    .addClass('modal fade')
                    .attr({ 'tabindex' : -1, 'role' : 'dialog', 'aria-hidden' : 'true'})
                    .modal('show');

                this.$el.on('hidden.bs.modal', _self.close);
                $(window).on('resize scroll', _self.resize);
            }
            //Else we are just returning a result that contains the embedded video iframe
            else {
                this._template_result = _.template(VideoEmbedTemplate, this.options.video_id, {variable : 'data'});
                this.$el.addClass('video-pane');
            }
        },

        resize : function () {
            console.log(_self.view_style_options);
            _self.$el.css({
                marginTop : '-'+_self.view_style_options.height / 2+'px',
                marginLeft : '-'+_self.view_style_options.width / 2+'px'
            });
        },

        close : function (e) {
            setTimeout(function() { _self.$el.remove(); }, 400);
        },

        render : function () {
            this.$el.html(this._template_result);
            _self.resize();
            return this;
        }
    });

    return VideoModalView;

});

