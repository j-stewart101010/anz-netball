/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'views/video-embed',
    'match_media',
    'bootstrap_transition',    
    'bootstrap_collapse',
    'bootstrap_modal',
    'polyfiller'
], function ($, _, Backbone, VideoEmbedView, MatchMedia) {

    var _self;

    var AppView = Backbone.View.extend({

        el : '.content',

        events : {
            'click.video.embed [data-video="toggle"]' : 'show_video',
            'change.checkbox.update input[type="checkbox"]' : 'update_checkbox',
            'change.select.update .selectbox' : 'update_selectbox',
            'click.flip [data-flip="toggle"]' : 'flip_element'
            // 'change.fileupload-update input[type="file"]' : 'patch_file_upload'
        },

        initialize : function () {
            _self = this;
            _self.$forms = _self.$el.find('form');
            
            // _self.$tiles = _self.$el.find('[data-resize-height="center"]');
            // _self.center_grid_columns();
            // $(window).on('resize' , _self.center_grid_columns );

            _self.update_checkbox();
            _self.build_selectbox();

            _self.$grids = this.$el.find('.grid');
            _self.$cols = _self.$grids.find('.col');

            _self.build_grid();
            $(window).on('resize' , _self.build_grid );

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

        update_checkbox : function (e) {
            //@TODO: Move this into a new view with a template

            var $checkbox;

            if (e) { $checkbox = $(e.currentTarget); }
            else { $checkbox = _self.$forms.find('input[type="checkbox"]'); }
          
            $.each($checkbox, function() {
                $(this).parent().find('.tickbox').toggleClass('checked', $(this).is(':checked'));
            });
        },

        build_selectbox : function (e) {
            //@TODO: Move this into a new view with a template

            _self.$forms.find('.selectbox').each(function () {
                $(this).wrap('<div class="select-wrapper"></div>');
                $(this).after('<div class="holder"></div><div class="angle-down-box"><i class="fa fa-angle-down"></i></div>');
            });
            _self.update_selectbox();
        },

        update_selectbox : function (e) {
            //@TODO: Move this into a new view with a template

            var $selectbox;

            if (e) { $selectbox = $(e.currentTarget); }
            else { $selectbox = _self.$forms.find('.selectbox'); }

            $.each($selectbox, function () {
                $(this).next('.holder').text($(this).find(':selected').text());    
            });
        },

        show_video : function (e) {
            var view = new VideoEmbedView({ 
                modal : false,
                video_id : $(e.target).data('video-id')
            });
            this.$el.find($(e.target).data('video-append')).append(view.render().el);
            this.delegateEvents();
            // this.$el.append(view.render().el);
        },

        flip_element : function (e) {
            var $flip_target = $($(e.currentTarget).data('flip-target'));
            
            e.preventDefault();

            if (Modernizr.csstransforms) { $flip_target.toggleClass('flip'); }
            else { $flip_target.find('.front').toggle().end().find('.back').toggle(); }
        },

        build_grid : function () {

            // if (MatchMedia.tablet()) {
            //     _self.$grids.css({ 'position' : '', 'top' : '', 'left' : '', 'width' : '' });
            //     _self.$cols.css({ 'position' : '', 'top' : '', 'left' : '' });
            // }
            // else {
            //     _self.$grids.css({ 'position' : 'absolute', 'width' : '100%' });
            //     _self.$cols.css({ 'position' : 'absolute' });

            //     $.each(_self.$grids, function () {

            //         if ($(this).prev()) { 
            //             $(this).css({ 'top' : $(this).prev().outerHeight()+'px' });
            //         }

            //         $.each(_self.$cols, function () {
            //             var left_position = 0;

            //             if ($(this).prev()) { 
            //                 $.each($(this).prevAll(), function () {
            //                     left_position += $(this).outerWidth();
            //                 });
            //                 $(this).css({ 'left' :  left_position+'px' });                        
            //             }
            //         });
            //     });
            // }
        }

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

    });

    return AppView;

});