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

        events : {
            'click.bs.modal.data-api [data-toggle="modal"]' : 'show_modal'
        },

        initialize : function () {
            _self = this;
            _self.set_grid();

            // this.resize_evt;
            $(window).resize(function() {            
            //     clearTimeout(this.resize_evt);
            //     this.resize_evt = setTimeout(function() {
                    _self.set_grid();
            //     }, 150);
            });
        },

        set_grid : function (e) {
            //TODO: Update to work on resize correctly
            // _self.$el.find('.outter-tile').css({height : ''});
            // $.each(_self.$el.find('.grid'), function() {
            //     var height = 0;
            //     var $columns = $(this).find('.col');
            //     $.each($columns, function() {
            //         if ($(this).height() > height) { height = $(this).height(); }
            //     });
            //     $columns.find('.outter-tile').css({ 'height' : height });
            // });

            $.each(_self.$el.find('[data-resize-height="tile"]'), function () {
                console.log($(this));
                $(this).css({ top: ($(this).closest('.grid').height() - $(this).height()), marginTop: -($(this).closest('.grid').height() - $(this).height()) / 2 });
            });
        },

        show_modal : function (e) {
            var view = new VideoModalView({ 
                cover : $($(e.target).data('cover'))
            });
            this.$el.append(view.render().el);
            // var video_modal = new VideoModalView({ 
                // el : $(e.target),
                // cover : $($(e.relatedTarget).data('cover'))
            // }).render().el;
        }

    });

    return AppView;

});