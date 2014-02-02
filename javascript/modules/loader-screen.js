/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',    
    'config/config',
    'modules/asset-loader',
    'match_media',
], function ($, _, Backbone, Config, AssetLoader, MatchMedia) {
    'use strict';

    var _self = this;

    var LoaderScreen = function (imagelist) {
        _self = this;

        var nextpos = {x:0, y:0};
        var checkpos, collision;
        var tilescale;

        this.assetLoader = new AssetLoader;
        this.assetLoader.onLoadComplete = this.onInitialLoadComplete.bind(this);

        this.createLoader();

        if (imagelist) {
            _self.assetLoader.addImages(imagelist);
            _self.assetLoader.load();    
        }
    };

    LoaderScreen.constructor = LoaderScreen;

    LoaderScreen.prototype.createLoader = function () {
        this.$overlay = $('.loading-overlay');
        this.$spinner = $('<div class="loader" />');

        this.$overlay.append(this.$spinner);

        this.$spinner = this.$overlay.find('.loader');

        this.updatePoller.apply(this);
    };

    LoaderScreen.prototype.updatePoller = function () {
        var animate_rotate = function (d) {
            $({deg: 0}).animate({deg: 360}, {
                duration: 1000,
                easing: 'linear',
                step: function(now) {
                    _self.$spinner.css({
                         transform: "rotate(" + now + "deg)"
                    });
                },
                complete: function() {
                    if (!_self.loaded) {
                        animate_rotate(360);
                    }
                }
            });
        };

        animate_rotate(360);
    };

    LoaderScreen.prototype.onInitialLoadComplete = function () {
        this.loaded = true;
        this.assetLoader.onLoadComplete = null;
        this.onIntroComplete();
    };

    LoaderScreen.prototype.onIntroComplete = function () {
        if (this.onComplete) this.onComplete();
        this.$overlay.fadeOut(); 
        $('body, html').removeClass('loading');
    };

    LoaderScreen.prototype.onInitialLoad = function () {};

    LoaderScreen.prototype.resize = function () {};

    LoaderScreen.prototype.destroy = function () {};

    return LoaderScreen;
});
