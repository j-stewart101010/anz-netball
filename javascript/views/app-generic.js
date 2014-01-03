/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'views/video-modal',
    'match_media',
    'bootstrap_transition',    
    'bootstrap_collapse',
    'bootstrap_modal',
], function ($, _, Backbone, VideoModalView, MatchMedia) {

    var _self;

    var AppView = Backbone.View.extend({

        el : 'body',

        events : {
            'click.bs.modal.data-api [data-toggle="modal"]' : 'show_modal'
        },

        initialize : function () {
            _self = this;
            _self.center_grid_columns();

            $(window).on('resize' , _self.center_grid_columns );
        },

        center_grid_columns : function (e) {
            if (MatchMedia.tablet()) {
                $.each(_self.$el.find('[data-resize-height="tile"]'), function () {
                    $(this).css({ top: '', marginTop: '' });
                });
            }
            else {
                $.each(_self.$el.find('[data-resize-height="tile"]'), function () {
                    $(this).css({ top: ($(this).closest('.grid').height() - $(this).height()), marginTop: -($(this).closest('.grid').height() - $(this).height()) / 2 });
                });                
            }
        },

        show_modal : function (e) {
            var view = new VideoModalView({ 
                cover : $(e.target).data('cover'),
                id : $(e.target).data('video-id')
            });
            this.$el.append(view.render().el);
        }

    });

    return AppView;

});