/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/images',
    'collections/gallery-slides',
    'views/video-embed',
    'views/outter-tile',
    'views/gallery',
    'modules/loader-screen',
    'match_media',
    'bootstrap_transition',    
    'bootstrap_collapse',
    'bootstrap_modal',
    'bootstrap_carousel'
], function ($, _, Backbone, ImageCollection, GallerySlidesCollection, VideoEmbedView, OutterTile, GalleryView, LoaderScreen, MatchMedia) {

    var _self;

    var AppView = Backbone.View.extend({

        el : 'body',

        events : {
            'change.checkbox.update input[type="checkbox"]' : 'update_checkbox',
            'change.select.update .selectbox' : 'update_selectbox',
            'click.slide [data-slide="toggle"]' : 'slide_toggle',
            'click.accordian [data-toggle="collapse"]' : 'accordian_toggle',
            'click.display.gallery [data-gallery="toggle"]' : 'display_gallery'
            // 'change.fileupload-update input[type="file"]' : 'patch_file_upload'
        },

        initialize : function () {
            _self = this;

            // Detecting IE
            var ie_9 = $('html').hasClass('ie9'),
                ie_old = $('html').hasClass('lt-ie9');

            _self.$content = _self.$el.find('.content');
            _self.$forms = _self.$content.find('form');
            _self.$grids = _self.$content.find('.grid');
            _self.$cols = _self.$content.find('.col');

            _self.outter_columns = [];
            _self.outter_rows = [];

            _self.defaults = {
                max_width : parseInt(_self.$content.css('maxWidth'), 10), //CSS max-width of grid (configurable in styles)
                max_height : parseInt(_self.$content.css('maxHeight'), 10), //CSS max-height of grid (configurable in styles)
                image_width : 16.66667 //Width of an image that gets appended to maintain aspect radio. This number matches the CSS grid style of .col-lg-2
            };

            _self.resize_timer;

            _self.update_checkbox();
            _self.build_selectbox();
            _self.preload_tiles(_self.$el.find('.image-wrap, .ambassador-video-tile'));

            //Don't start rendering the outter grid until a promise is returned from the server letting us know the model data has loaded.
            $.when(ImageCollection.fetch())
                .done(function () {
                    _self.loaderScreen = new LoaderScreen();
                    _self.render_outter_grid();
                }
            );

            $(window).on('resize' , _self.resize );

            //@TODO: We are not able to correclty calculate grid dimensions until images have finished loading. IE Fires its resize event early which breaks the layout on initial render.
            //Other browsers layouts break slightly if resized before the images have finished loading. Possible solution is to apply a page loader that masks content until page has finished rendering to avoid FOUCs
            if (ie_9 || ie_old) {
                $(window).on('load', function() {
                    $(this).trigger('resize');
                });
            }
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

        resize : function () {
            console.log('resizing');
            _self.resizing = true;
            clearTimeout(_self.resize_timer);
            _self.resize_timer = setTimeout(function() {
                _self.render_outter_grid();
            }, 100);
        },

        build_selectbox : function (e) {
            //@TODO: Move this into a new view with a template

            _self.$forms.find('.selectbox').each(function () {
                $(this).wrap('<div class="select-wrapper"></div>');
                $(this).after('<div class="holder"></div><div class="angle-down-box"><i class="fa fa-angle-down"></i></div>');
            });
            _self.update_selectbox();
        },

        display_gallery : function (e) {
            var gallery_id = $(e.target).data('gallery-id'), 
                $gallery_target = $($(e.target).data('gallery-target')),
                view, model, gallery_slides_render = [], gallery_slides;

            _self.gallery_slides = [];

            if (!$gallery_target.data('rendered')) {
                $.when(GallerySlidesCollection.fetch())
                    .done(function () {
                        var model = GallerySlidesCollection.find(function(model) { return model.get('id') == gallery_id; });
                        _.each(model.toJSON().slides, function (slide) {
                            gallery_slides = new GalleryView({
                                parent : _self,
                                slide : slide,
                                target : $gallery_target
                            });
                            _self.gallery_slides.push(gallery_slides);
                            gallery_slides_render.push(gallery_slides.render().el);                        
                        });

                        $gallery_target.find('.item')
                            .after(gallery_slides_render)
                            .end()
                            .carousel('next')
                            .data('rendered', true);
                        
                        _.each(_self.gallery_slides, function (view) {
                            view.preload_tiles();
                        });
                    }
                );
            }
        },

        update_selectbox : function (e) {
            //@TODO: Move this into a new view with a template

            var $selectbox;

            if (e) { $selectbox = $(e.currentTarget); }
            else { $selectbox = _self.$forms.find('.selectbox'); }

            $.each($selectbox, function () {
                var $holder = $(this).next('.holder');

                if (this.selectedIndex === 0) { $holder.addClass('first-option'); }
                else { $holder.removeClass('first-option'); }
                
                $holder.text($(this).find(':selected').text());    
            });
        },

        preload_tiles : function ($tiles) {
            if (!MatchMedia.mobile()) {
                $.each($tiles, function ($el) {
                    var $image = $(this).find('img');

                    $image.css({'visibility' : 'hidden', 'opacity' : 0 })
                        .on('load', _self.stop_loader);
                    
                    _self.start_loader($(this), $image);
                });
            }
        },

        start_loader : function ($el, $image) {
            var $loader;

            $el.append('<span class="loader"></span>');
            $loader = $el.find('.loader');

            var animate_rotate = function (d) {
                $({deg: 0}).animate({deg: 360}, {
                    duration: 1000,
                    easing: 'linear',
                    step: function(now, fx) {
                        $loader.css({
                             transform: "rotate(" + now + "deg)"
                        });
                    },
                    complete: function() {
                        if (!$image[0].complete) {
                            animate_rotate(360);
                        }
                    }
                });
            };

            animate_rotate(360);
        },

        stop_loader : function (e) {
            $(this).siblings('.loader').remove()
                .end()
                .css({ 'visibility' : 'visible' })
                .animate({ 'opacity' : 1 }, 700);
        },

        accordian_toggle : function (e) {
            $(e.currentTarget).closest('ul').find('a').removeClass('active');
            $(e.currentTarget).addClass('active');
        },

        slide_toggle : function (e) {
            var $slide_target = $($(e.currentTarget).data('slide-target')),
                properties;

            e.preventDefault();

            //@TODO: Build this so it supports transitions (this can be the no transitions fallback)

            if ($slide_target.hasClass('active')) { 
                properties = { 
                    grids : { start_left : '', position : '' },
                    cols : { start_left : '-100%', end_left : '' }
                }
            }
            else { 
                properties = {
                    grids : { start_left : '-100%', position : 'static' },
                    cols : { start_left : '100%', end_left : '' }
                }
            }

            if (MatchMedia.tablet()) {
                $slide_target.toggleClass('active inactive'); 
                _self.$grids.not($slide_target.find(_self.$grids)).fadeToggle({ 'complete' : function () {
                    $slide_target.css({ 'position' : properties.grids.position }); 
                } });
            }
            else {
                _self.$grids.not($slide_target.find(_self.$grids)).toggleClass('active inactive').each(function(i) {
                    $(this).animate({ 'left' : properties.grids.start_left });
                });

                $slide_target.toggleClass('active inactive');                 
            }
               
        },

        // animate_grid : function () {

        //     var effect_off = { 'position' : 'relative', 'top' : 0, 'left' : 0, 'width' : '' },
        //         effect_on = { 'position' : 'absolute', 'top' : '25%', 'left' : '25%', 'width' : '' };

        //     if (MatchMedia.tablet()) {
        //         _self.$grids.css(effect_off);
        //         _self.$cols.css(effect_off);
        //     }
        //     else {
        //         _self.$cols.css(effect_on);

        //         $.each(_self.$grids, function () {
        //             $(this).css({ 'top' : 0, 'left' : 0 });

        //             $.each(_self.$cols, function () {
        //                 var left_position = 0;

        //                 if ($(this).prev('.col').length > 0) { 
        //                     $.each($(this).prevAll(), function () {
        //                         left_position += $(this).outerWidth();
        //                     });
        //                     $(this).css({ 'left' :  left_position+'px', 'top': 0 });                        
        //                 }
        //             else {
        //                 $(this).css({ 'left' : 0, 'top': 0 });
        //             }
        //             });
        //         });
        //     }

        //     $('.col, .grid').animate({ opacity: 1 });
        // },

        render_outter_grid : function () {
            var window_width = $(window).width(),
                window_height = $(window).height(),
                head_height, foot_height;

            if (MatchMedia.tablet()) {
                _self.$content.css({ 'width' : '', 'height' : '' });
                _self.loaderScreen.onIntroComplete(); //Remove the loader
            }
            else {
                //Remove all the previously rendered columns before continuing (for re-rendering)
                _.each([_self.outter_columns, _self.outter_rows], function (child) {
                    _.each(child, function (view) {
                        view.remove();
                    });
                });

                //Render columns
                if (window_width > _self.defaults.max_width) {
                    _self.equalize_columns(window_width, window_width - _self.defaults.max_width); //Start appending columns to the grid to maintain aspect ratio
                }
                else {
                    _self.set_outter_grid_defaults('width');
                }

                //Render rows
                if (window_height > _self.defaults.max_height) {
                    head_height = parseInt(_self.$el.find('.master-head').height(), 10);
                    foot_height = parseInt(_self.$el.find('.master-foot').height(), 10);

                    _self.equalize_rows(window_height, (window_height - _self.defaults.max_height) - head_height - foot_height, head_height); //Start appending rows. Height column gap must take into account the head and foot
                }
                else {
                    _self.set_outter_grid_defaults('height');
                }

                //After all methods have finished the heights and widths of the rows/columns may not not be correct, fix them now. Also add tiles to rows if required
                _.each([_self.outter_columns, _self.outter_rows], function (child) {
                    _.each(child, function (view) {
                        // console.log(view);
                        view.append_tiles();
                        view.update_values();
                        view.preload_tiles();
                    });
                });

                 _self.loaderScreen.onIntroComplete(); //Remove the loader
                
            }
        },        

        equalize_columns : function (window_width, dimension_gap) {
            _self.outter_columns = [];

            _self.set_outter_grid_defaults('width');

            var container_dimension = _self.$content.width(),
                container_height = _self.$content.height(),
                new_container_dimension = container_dimension,
                image_width = (container_dimension / 100) * _self.defaults.image_width,
                num_cols_to_generate = Math.ceil(dimension_gap / image_width),
                outter_columns_render = [], outter_columns;

            while ((new_container_dimension / 100) * _self.defaults.image_width >= dimension_gap / num_cols_to_generate) {
                new_container_dimension--;
                dimension_gap++;
                new_container_dimension = new_container_dimension;
            }

            _self.$content.css({ 'width' : new_container_dimension+'px' });

            for (var i = 0; i<num_cols_to_generate; i++) {
                outter_columns = new OutterTile({
                    parent : _self,
                    collection : ImageCollection,
                    type : 'column',
                    className: 'appended-tiles appended-col',
                    styles : {
                        width : ((window_width-new_container_dimension)/num_cols_to_generate)+'px', 
                        left : new_container_dimension+((new_container_dimension / 100) * _self.defaults.image_width)*(i)+'px' 
                    }
                });  
                _self.outter_columns.push( outter_columns );
                outter_columns_render.push( outter_columns.render().el );
            }

            _self.$content.after(outter_columns_render);
        },

        equalize_rows : function (window_height, dimension_gap, head_height) {
            _self.outter_rows = [];

            _self.set_outter_grid_defaults('height');

            //Hold on to your butts, it's about to get mathy
            var container_dimension = _self.$content.height(),
                container_width = _self.$content.width(),
                new_container_dimension = container_dimension,
                image_height = ((container_dimension / 100) * 50) / 2,
                num_rows_to_generate = Math.ceil(dimension_gap / image_height),
                outter_rows_render = [], outter_rows;

            while (((new_container_dimension / 100) * 50) / 2 >= dimension_gap / num_rows_to_generate) {
                new_container_dimension--;
                dimension_gap++;
                new_container_dimension = new_container_dimension;
            }

            _self.$content.css({ 'height' : new_container_dimension+'px' });

            for (var i = 0; i<num_rows_to_generate; i++) {
                outter_rows = new OutterTile({
                    parent : _self,
                    collection : ImageCollection,
                    type : 'row',
                    className: 'appended-tiles appended-row',
                    styles : {
                        height : (((new_container_dimension / 100) * 50) / 2)+'px', 
                        // top : new_container_dimension+head_height*(i+1)+'px' 
                        top : (new_container_dimension+head_height) + ((((new_container_dimension / 100) * 50) / 2) * (i))+'px' 
                    }                   
                });
                _self.outter_rows.push( outter_rows );
                outter_rows_render.push( outter_rows.render().el );
            }

            _self.$content.after(outter_rows_render);
        },

        set_outter_grid_defaults : function (property) {
            var object = {};
            object[property] = '';
            _self.$content.css(object);
        }

        // patch_file_upload : function (e) {
        //     $('#apply-for-grant-image-notify').val($(e.currentTarget).val());
        // },

    });

    return AppView;

});