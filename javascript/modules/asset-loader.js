/*global define*/
define([
	'jquery',
	'config/config'
], function ($, Config) {
	'use strict';

    var AssetLoader = function () {
        this.images = [], this.total = 0, this.position = 0, this.onLoadComplete, this.onProgress
    }; 

    AssetLoader.constructor = AssetLoader;

    AssetLoader.prototype.addImages = function (a) {
        for (var b = 0; b < a.length; b++) {
            var c = new Image;
            c.srcToLoad = a[b], this.images.push(c)
        }
        this.total = this.images.length
        console.log("batch load complete");
    };

    AssetLoader.prototype.load = function () {
        console.log("LOAD START"), this.position = 0, this.loadNext()
    };

    AssetLoader.prototype.loadNext = function () {
        var a = this.images[this.position];
        a.onload = $.proxy(this.onImageLoaded, this), a.onerror = $.proxy(this.onImageError, this), a.src = a.srcToLoad
    };

    AssetLoader.prototype.onImageError = function () {
        alert(this.images[this.position].src)
    };

    AssetLoader.prototype.onImageLoaded = function () {
        this.onProgress();
        var a = this.images[this.position];
        a.onLoad = null, this.position == this.images.length - 1 ? this.onLoadComplete && this.onLoadComplete() : (this.position++, this.loadNext())
    };

	return AssetLoader;
});
