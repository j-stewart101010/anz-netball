/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'views/video-embed',
    'match_media',
    'flippy',
    'polyfiller',
    'shame'
], function ($, _, Backbone, VideoEmbedView, MatchMedia) {

    var _self;

    var AppView = Backbone.View.extend({

        el : 'body',

        events : {
            'click.video.embed [data-video="toggle"]' : 'show_video',            
            'click.flip [data-flip="toggle"]' : 'flip_toggle',
            'click.enlarge-image [data-enlage="toggle"]' : 'enlarge_image_toggle',
            'click.video-close [data-video="close"]' : 'close_video'
        },

        initialize : function () {
            _self = this;

            _self.$content = _self.$el.find('.content');  
            _self.$forms = _self.$content.find('form');

            _self.resize_timer;

            _self.calc_larger_flip_tile();
            _self.patch_mobile_transition_for_flip();

            $(window).on('resize' , _self.resize )
                .on('load', _self.load );

            _self.shim_forms();
        },

        shim_forms : function () {
            $.webshims.polyfill('forms');
            _self.$forms.bind('changedvalid', function(e) {
                $(e.target).parent().addClass('valid').removeClass('invalid');
            }).bind('changedinvalid', function(e) {
                $(e.target).parent().addClass('invalid').removeClass('valid');
            }).bind('firstinvalid', function(e) {
                $.webshims.validityAlert.showFor(e.target);
                return false;
            });
        },

        close_video : function (e) {
            $('#video-id-'+$(e.currentTarget).data('video-id')).trigger('click.video.close');
        },

        calc_larger_flip_tile : function () {
            if (MatchMedia.tablet()) {
                $.each(this.$el.find('.flip-container'), function () {
                    var $front = $(this).find('.front'),
                        $back = $(this).find('.back');

                    if ($front.children().height() > $back.children().height()) {
                        $(this).removeClass('back-led').addClass('front-led');
                    }
                    else {
                        $(this).removeClass('front-led').addClass('back-led'); 
                    }
                });
            }
        },

        patch_mobile_transition_for_flip : function () {
            //The mobile version of flippy will not work correctly when we are dealing with a content pane that loads dynamic content (video for instance) because of this we need to set the heights of the front faces to them selves to stop them collapsing while animating 
            $.each(this.$el.find('.flip-container'), function () {
                var $front = $(this).find('.front');
                
                // if (!Modernizr.csstransforms3d) {
                    if (MatchMedia.tablet()) {
                        if ($(this).hasClass('front-led')) {
                            $front.css({ 'height' : $front.height() });
                        }
                    }
                // }
            });
        },

        flip_toggle : function (e) {
            var $target = $(e.currentTarget),
                $flip_target = $($target.data('flip-target')),
                $front, $back, $front_height;

                $front = $flip_target.find('.front').filter(':first');
                $back = $flip_target.find('.back').filter(':first');              

            e.preventDefault();

            if (Modernizr.csstransforms3d) {
                $flip_target.toggleClass('flip');
            }
            else {
                $front = $flip_target.find('.front').filter(':first');
                $back = $flip_target.find('.back').filter(':first');

                if ($target.hasClass('btn-action')) {
                     $front.flippyReverse().parent();
                }
                else {
                    $front.flippy({
                        color_target : $back.css('backgroundColor'),
                        verso: $back.html(),
                        direction: "LEFT",
                        duration: "750",
                        onStart : function () {
                            console.log('start');
                        },
                        onFinish: function () {
                            //Toggle class and reapply webshim polfill
                            $front.parent().toggleClass('flippy');
                            _self.$el.updatePolyfill();
                        },
                        onReverseStart : function () {
                            console.log('rev');
                            //Remove appended flippy styles and toggle class
                            $front.parent().toggleClass('flippy');
                        },
                        onReverseFinish : function () {
                            $front.css({ 'position' : '' });
                        },
                        noCSS : true //Because some devices only support 2D transitions, flippy attempts to use them and thus the tile does a 360 2D rotataion.
                    });
                }                    
            }
        },

        enlarge_image_toggle : function (e) {
            var $target = $(e.currentTarget),
                $enlarge_target = $($target.data('enlarge-target')),
                $enlarge_to_target = $($target.data('enlarge-to-target'));

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
                        .css({ width : $target.width() })
                    $enlarge_target.css({ width : $enlarge_to_target.width(), height : 'auto' });
                }
                $enlarge_target.toggleClass('enlarged');
            }
            else {
                if ($enlarge_target.hasClass('enlarged')) { $enlarge_target.animate({ width : '' }); }
                else { $enlarge_target.animate({ width : $enlarge_to_target.width(), height : 'auto' }); }
                $enlarge_target.toggleClass('enlarged');
            }
        },

        scale_enlarged_images : function () {
            _self.$el.find('.enlarged').width($(window).width());
        },

        show_video : function (e) {
            var video_id = $(e.currentTarget).data('video-id'),
                view = new VideoEmbedView({
                id : 'video-id-'+video_id,
                modal : false,
                video_id : video_id
            });
            _self.$content.find($(e.currentTarget).data('video-target')).append(view.render().el);
            this.delegateEvents();
        },

        load : function () {
            _self.match_height();
        },      

        resize : function () {
            _self.resizing = true;
            clearTimeout(_self.resize_timer);
            _self.resize_timer = setTimeout(function() {
                _self.match_height();
                _self.calc_larger_flip_tile();
                _self.scale_enlarged_images();
            }, 100);
        },

        match_height : function () {
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