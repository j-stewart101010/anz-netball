/*global define*/
define([
	'jquery',
	'config/config',
    'modules/asset-loader',
    'models/tile'
], function ($, Config, AssetLoader, model) {
	'use strict';

    var isIpad = null != navigator.userAgent.match(/iPad/i),
        isRetina = 2 == window.devicePixelRatio;

    2 != window.devicePixelRatio || isIpad ? mobilecheck() && $("meta[name=viewport]").attr("content", "width=device-width, user-scalable=no,initial-scale=1, maximum-scale=.5, minimum-scale=.5") : $("meta[name=viewport]").attr("content", "width=device-width, user-scalable=no,initial-scale=.5, maximum-scale=.5, minimum-scale=.5");

    var LoaderScreen = function () {
        IS_IE8 || isIpad, this.view = document.createElement("div"), 
        this.view.style.position = "absolute", 
        this.view.style.display = "block", 
        this.assetLoader = new AssetLoader, 
        this.assetLoader.onProgress = function () {},
        this.assetLoader.onLoadComplete = this.onInitialLoadComplete.bind(this);
        for (var a = [], b = 0; 30 > b; b++) a.push(Config.REMOTE_PATH_2 + "img/toast/toast_NEW00" + (10 > b ? "0" + b : b) + ".png");
        for (var c, d = IS_IE8 ? "images/100_end_IE8.png" : "images/Anim_100_logo.png", e = [Config.REMOTE_PATH_2 + d, Config.REMOTE_PATH_2 + "images/paperTexture_tile.png", Config.REMOTE_PATH_2 + "images/stitchBorder_lightBlue.png"], f = [], b = 1; 21 > b; b++) c = 10 > b ? "0" + b : b, f.push(Config.REMOTE_PATH_2 + "images/PrizeWin00" + c + ".png");
        if (e = e.concat(f), !IS_IE8);
        for (var b = 0; b < model.content.length; b++) {
            if ("share" == model.content[b].id && (model.content.splice(b, 1), b--), "true" === model.content[b].xmas) {
                model.content[b].day = b, model.content[b].locked = !0, model.content[b].smallNumber = new Image;
                var g = 10 > b ? "0" + b : b;
                model.content[b].smallNumber.src = Config.REMOTE_PATH_2 + "/images/small_" + g + ".png";
                model.content[b].locked ? e.push(Config.REMOTE_PATH_2 + model.content[b].lockedImage) : e.push(Config.REMOTE_PATH_2 + model.content[b].gridImage)
            } else 30 > b && "share" != model.content[b].id && e.push(Config.REMOTE_PATH_2 + model.content[b].gridImage);
            model.content[b].xmas = "true" === model.content[b].xmas
        }
        for (var b = 1; 100 > b; b++) var g = 10 > b ? "0" + b : b;
        this.poller = new Image, this.poller.src = IS_IE8 ? Config.REMOTE_PATH_2 + "images/IE8_polling.gif" : Config.REMOTE_PATH_2 + "images/pollingSpin.png", this.poller.style.position = "absolute", this.poller.rotation = 0;
        var m = .5;
        if (this.poller.width = 110 * m, this.poller.height = 110 * m, this.poller.style.top = -55 * m + "px", this.poller.style.left = -55 * m + "px", this.view.appendChild(this.poller), mobilecheck() && !isRetina) {
            var m = .5;
            this.view.style.transform = this.view.style.webkitTransform = "scale(" + m + "," + m + ")"
        }
        requestAnimFrame(this.updatePoller.bind(this)), this.assetLoader.addImages(e), this.assetLoader.load()
    };

    LoaderScreen.constructor = LoaderScreen;

    LoaderScreen.prototype.updatePoller = function () {
        this.poller.rotation += 5, this.poller.style.transform = "rotate(" + this.poller.rotation + "deg)", this.poller.style["-ms-transform"] = "rotate(" + this.poller.rotation + "deg)", this.poller.style["-webkit-transform"] = "rotate(" + this.poller.rotation + "deg)", this.loaded || requestAnimFrame(this.updatePoller.bind(this))
    };

    LoaderScreen.prototype.onInitialLoadComplete = function () {
        this.loaded = !0, $(this.poller).fadeOut(), this.overlay = this.assetLoader.images[1], this.overlay = document.createElement("div"), IS_IE8 || (this.overlay.style.backgroundImage = "url('" + Config.REMOTE_PATH + "img/paperTexture_tile.png')", this.overlay.style.position = "absolute", this.overlay.style.top = "0px", this.overlay.style.left = "0px", this.overlay.style.zIndex = 300, this.overlay.style.width = "100%", this.overlay.style.height = "100%", this.overlay.style.pointerEvents = "none", document.body.appendChild(this.overlay)), this.assetLoader.onLoadComplete = null, this.onIntroComplete()
    };

    LoaderScreen.prototype.onFaded = function () {}, LoaderScreen.prototype.onZoomStart = function () {}, LoaderScreen.prototype.onIntroComplete = function () {
        this.onComplete(), $(this.overlay).fadeOut()
    };

    LoaderScreen.prototype.onInitialLoad = function () {};

    LoaderScreen.prototype.resize = function (a, b) {
        if (this.width = a, this.height = b, this.snow) {
            this.snow.width = a;
            var c = b / 950;
            this.snow.style.top = b / 2 - 345 * c - (isMobile ? 0 : 36) + "px", this.snow.style.left = -a / 2 + "px", this.snow.height = 345 * c, this.container.style.webkitTransform = "scale(" + b / 840 + ")"
        }
        this.view.style.left = a / 2 + "px", this.view.style.top = b / 2 + "px";
        var d = b / 2 - 230 - 35;
        this.skipButton && (this.skipButton.style.top = 205 + d / 2 + "px")
    };

    LoaderScreen.prototype.destroy = function () {};

	return LoaderScreen;
});
