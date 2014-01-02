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

    //2 != window.devicePixelRatio || isIpad ? mobilecheck() && $("meta[name=viewport]").attr("content", "width=device-width, user-scalable=no,initial-scale=1, maximum-scale=.5, minimum-scale=.5") : $("meta[name=viewport]").attr("content", "width=device-width, user-scalable=no,initial-scale=.5, maximum-scale=.5, minimum-scale=.5");
    isIpad || (window.devicePixelRatio) != 2 ? mobilecheck() && $("meta[name=viewport]").attr("content", "width=device-width, user-scalable=no,initial-scale=1, maximum-scale=.5, minimum-scale=.5") : $("meta[name=viewport]").attr("content", "width=device-width, user-scalable=no,initial-scale=.5, maximum-scale=.5, minimum-scale=.5");

    var LoaderScreen = function () {
        IS_IE8 || isIpad, this.view = document.createElement("div"), 
        this.view.style.position = "absolute", 
        this.view.style.display = "block", 
        this.assetLoader = new AssetLoader, 
        this.assetLoader.onProgress = function () {},
        this.assetLoader.onLoadComplete = this.onInitialLoadComplete.bind(this);

        var imagelist = [], imgpath;
        var nextpos = {x:0, y:0};
        var checkpos, collision;
        var tilescale;

        for (var i = 0; i < model.content.length; i++) {
            switch(model.content[i].tiletype) {
                case "text":
                    imgpath = model.content[i].subimageurl;
                    tilescale = 1;
                break;
                case "image":
                    imgpath = model.content[i].imageurl;
                    tilescale = 1;
                break;
                case "textlink":
                    imgpath = model.content[i].subimageurl;
                    tilescale = 1;
                break;
                case "video":
                    imgpath = model.content[i].imageurl;
                    tilescale = 2;                    
            }

            model.content[i].scale = tilescale;

            checkpos = {x:0, y:0};
            do {
                collision = false;
                if((checkpos.x + model.content[i].scale - 1)>=model.worldwidth) collision = true;
                for(var j = 0;j < i; j++) {                    
                    if((checkpos.x >= model.content[j].position.x) && (checkpos.x <= (model.content[j].position.x + model.content[j].scale - 1))) {
                        if ((checkpos.y >= model.content[j].position.y) && (checkpos.y <= (model.content[j].position.y + model.content[j].scale - 1))) collision = true;                        
                    };

                };
                if(!collision) model.content[i].position = {x:checkpos.x, y:checkpos.y};
                
                checkpos.x+=1;
                if(checkpos.x >= model.worldwidth) {
                    checkpos.x=0;
                    checkpos.y+=1;
                };

            } while(collision);
 
            model.content[i].image = new Image;
            model.content[i].image.src = Config.REMOTE_PATH_2 + imgpath;

           imagelist.push(Config.REMOTE_PATH_2 + imgpath);
        };
        
        this.poller = new Image, this.poller.src = IS_IE8 ? Config.REMOTE_PATH_2 + "images/IE8_polling.gif" : Config.REMOTE_PATH_2 + "images/pollingSpin.png", this.poller.style.position = "absolute", this.poller.rotation = 0;
        var m = .5;
        this.poller.style.top = "50%", this.poller.style.left = "50%"
        var m = .5;
        this.view.style.transform = this.view.style.webkitTransform = "scale(" + m + "," + m + ")"
        
        requestAnimFrame(this.updatePoller.bind(this)),
        this.assetLoader.addImages(imagelist), 
        this.assetLoader.load()
    };

    LoaderScreen.constructor = LoaderScreen;

    LoaderScreen.prototype.updatePoller = function () {
        this.poller.rotation += 5, this.poller.style.transform = "rotate(" + this.poller.rotation + "deg)", this.poller.style["-ms-transform"] = "rotate(" + this.poller.rotation + "deg)", this.poller.style["-webkit-transform"] = "rotate(" + this.poller.rotation + "deg)", this.loaded || requestAnimFrame(this.updatePoller.bind(this))
    };

    LoaderScreen.prototype.onInitialLoadComplete = function () {
        this.loaded = !0,
        $(this.poller).fadeOut(),
        //this.overlay = this.assetLoader.images[1], this.overlay = document.createElement("div"), IS_IE8 || (this.overlay.style.backgroundImage = "url('" + Config.REMOTE_PATH + "img/paperTexture_tile.png')", this.overlay.style.position = "absolute", this.overlay.style.top = "0px", this.overlay.style.left = "0px", this.overlay.style.zIndex = 300, this.overlay.style.width = "100%", this.overlay.style.height = "100%", this.overlay.style.pointerEvents = "none", document.body.appendChild(this.overlay)),
        this.assetLoader.onLoadComplete = null,
        this.onIntroComplete()
    };

    LoaderScreen.prototype.onFaded = function () {}, LoaderScreen.prototype.onZoomStart = function () {}, LoaderScreen.prototype.onIntroComplete = function () {
        this.onComplete(), $(this.overlay).fadeOut()
    };

    LoaderScreen.prototype.onInitialLoad = function () {};

    LoaderScreen.prototype.resize = function (a, b) {
        // if (this.width = a, this.height = b, this.snow) {
        //     this.snow.width = a;
        //     var c = b / 950;
        //     this.snow.style.top = b / 2 - 345 * c - (isMobile ? 0 : 36) + "px", this.snow.style.left = -a / 2 + "px", this.snow.height = 345 * c, this.container.style.webkitTransform = "scale(" + b / 840 + ")"
        // }
        // this.view.style.left = a / 2 + "px", this.view.style.top = b / 2 + "px";
        // var d = b / 2 - 230 - 35;
        // this.skipButton && (this.skipButton.style.top = 205 + d / 2 + "px")
    };

    LoaderScreen.prototype.destroy = function () {};

	return LoaderScreen;
});
