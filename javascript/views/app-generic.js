/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'views/video-embed',
    'match_media',
    'flippy',
    'polyfiller'
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

            $(window).on('resize' , _self.resize )
                .on('load', _self.match_row_height );

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

        flip_toggle : function (e) {
            var $target = $(e.currentTarget),
                $flip_target = $($target.data('flip-target')),
                $front, $back;

            e.preventDefault();

            if (Modernizr.csstransforms3d) {
                $flip_target.toggleClass('flip')
            }
            else {
                $front = $flip_target.find('.front').filter(':first');
                $back = $flip_target.find('.back').filter(':first');

                if (MatchMedia.tablet()) {
                    $flip_target.toggleClass('flip');
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
                            onFinish: function () {
                                _self.$el.updatePolyfill();
                            }
                        });  
                    }                    
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
            var video_id = $(e.target).data('video-id'),
                view = new VideoEmbedView({
                id : 'video-id-'+video_id,
                modal : false,
                video_id : video_id
            });
            _self.$content.find($(e.target).data('video-target')).append(view.render().el);
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