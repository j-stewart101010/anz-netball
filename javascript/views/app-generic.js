/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'views/video-embed',
    'match_media',
    'flippy'
], function ($, _, Backbone, VideoEmbedView, MatchMedia) {

    var _self;

    var AppView = Backbone.View.extend({

        el : 'body',

        events : {
            'click.video.embed [data-video="toggle"]' : 'show_video',            
            'click.flip [data-flip="toggle"]' : 'flip_toggle',
            'click.enlarge-image [data-enlage="toggle"]' : 'enlarge_image_toggle'
        },

        initialize : function () {
            _self = this;

            _self.$content = _self.$el.find('.content');      

            $(window).on('resize' , _self.resize )
                .on('load', _self.match_row_height );
        },

        flip_toggle : function (e) {
            var $target = $($(e.currentTarget)),
                $flip_target = $($target.data('flip-target')),
                $front, $back, state = {};

            e.preventDefault();

            if (Modernizr.csstransforms3d) { 
                $flip_target.toggleClass('flip');
            }
            else {
                $front = $flip_target.find('.front');
                $back = $flip_target.find('.back');

                if (MatchMedia.tablet()) {
                    console.log($flip_target);
                    $flip_target.toggleClass('flip');
                    // if ( $front.css('visibility') == 'hidden' ) { state = { active : 'visible', inactive : 'hidden' }; }
                    // else { state = { active : 'hidden', inactive : 'visible' }; }

                    // $back.css('visibility', state.active);
                    // $front.css('visibility', state.inactive);

                    // $back.fadeToggle().css({ 'visibility' : 'visible' });

                    // $flip_target.find('.front').fadeToggle().end().find('.back').fadeToggle(); 

                }
                else {

                    if ($target.hasClass('btn-action')) {
                         $front.flippyReverse();
                    }
                    else {
                        $front.flippy({
                            color_target : '#c4edf1',
                            verso: $back.html(),
                            direction: "LEFT",
                            duration: "750",
                            onReverseFinish: function () {
                                $flip_target.toggleClass('flip')
                            }
                        });                    
                    }                    
                }
            }
        },

        enlarge_image_toggle : function (e) {
            var $enlarge_target = $($(e.currentTarget).data('enlarge-target')),
                $enlarge_to_target = $($(e.currentTarget).data('enlarge-to-target')),
                $current_target = $($(e.currentTarget));

            e.preventDefault();

            if (Modernizr.csstransforms) {
                if ($enlarge_target.hasClass('enlarged')) {
                    $enlarge_target
                        .css({ width : '' })
                        .toggle();
                }
                else {
                    $enlarge_target
                        .toggle()
                        .css({ width : $current_target.width() })
                    $enlarge_target.css({ width : $enlarge_to_target.width(), height : 'auto' });
                }
            }
            else {
                if ($enlarge_target.hasClass('enlarged')) { $enlarge_target.animate({ width : '' }); }
                else { $enlarge_target.animate({ width : $enlarge_to_target.width(), height : 'auto' }); }
            } 

            $enlarge_target.toggleClass('enlarged');
        },

        scale_enlarged_images : function () {
            _self.$el.find('.enlarged').width($(window).width());
        },

        show_video : function (e) {
            var view = new VideoEmbedView({ 
                modal : false,
                video_id : $(e.target).data('video-id')
            });
            _self.$content.find($(e.target).data('video-append')).append(view.render().el);
            this.delegateEvents();
        },             

        resize : function () {
            _self.match_row_height();
            _self.scale_enlarged_images();
        },

        match_row_height : function () {
            if (MatchMedia.tablet()) {
                $.each(_self.$content.find('[data-resize-height]'), function() {
                    $(this).css({ 'height' : '' }).css({ 'height' : $($(this).data('resize-height')).height()+'px' });
                });
            }
            else {
                $.each(_self.$content.find('[data-resize-height]'), function() {
                    $(this).css({ 'height' : '' });
                });                
            }
        }        

    });

    return AppView;

});