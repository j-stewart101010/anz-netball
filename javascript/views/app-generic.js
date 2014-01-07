/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'polyfiller',
    'views/video-modal',
    'match_media',
    'bootstrap_transition',    
    'bootstrap_collapse',
    'bootstrap_modal'
], function ($, _, Backbone, H5F, VideoModalView, MatchMedia) {

    var _self;

    var AppView = Backbone.View.extend({

        el : 'body',

        events : {
            'click.bs.modal.data-api [data-toggle="modal"]' : 'show_modal',
            // 'change.fileupload-update input[type="file"]' : 'patch_file_upload'
        },

        initialize : function () {
            _self = this;
            _self.$tiles = _self.$el.find('[data-resize-height="center"]');

            // _self.center_grid_columns();

            // $.webshims.setOptions('forms', {
            //      lazyCustomMessages: true,
            //      iVal: {
            //          handleBubble: 'hide', // defaults: true. true (bubble and focus first invalid element) | false (no focus and no bubble) | 'hide' (no bubble, but focus first invalid element)
            //          fx: 'fade', //defaults 'slide' or 'fade'
            //          sel: '.ws-validate', // simple selector for the form element, setting this to false, will remove this feature
            //          fieldWrapper: ':not(span, label, em, strong, b, i, mark, p)'
            //      }
            //  });
            //  $.webshims.polyfill('forms');

    $.webshims.polyfill('forms');

    $(function() {
        $('form').bind('changedvalid', function(e) {
            $(e.target).parent().addClass('valid').removeClass('invalid');
        }).bind('changedinvalid', function(e) {
            $(e.target).parent().addClass('invalid').removeClass('valid');
        }).bind('firstinvalid', function(e) {
            $.webshims.validityAlert.showFor(e.target);
            return false;
        });

    });

            // $(window).on('resize' , _self.center_grid_columns );
        },

        // patch_file_upload : function (e) {
        //     $('#apply-for-grant-image-notify').val($(e.currentTarget).val());
        // },

        // center_grid_columns : function (e) {
        //     if (MatchMedia.tablet()) {
        //         $.each(_self.$tiles, function () {
        //             $(this).css({ position: '', top: '', marginTop: '' });
        //         });
        //     }
        //     else {
        //         console.log(_self.$tiles);
        //         $.each(_self.$tiles, function () {
        //             $(this).css({ position: 'relative', top: ($(this).closest('.grid').height() - $(this).height()), marginTop: -($(this).closest('.grid').height() - $(this).height()) / 2 });
        //         });                
        //     }
        // },

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