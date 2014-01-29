/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',    
    'config/config',
    'modules/asset-loader',
    // 'models/tile',
    'collections/tiles-data',
    'match_media',
], function ($, _, Backbone, Config, AssetLoader, TileData, MatchMedia) {
    'use strict';

    var _self = this;

    var LoaderScreen = function () {
        _self = this;
        
        var imagelist = [], imgpath;
        var nextpos = {x:0, y:0};
        var checkpos, collision;
        var tilescale;

        this.assetLoader = new AssetLoader;
        this.assetLoader.onLoadComplete = this.onInitialLoadComplete.bind(this);

        this.createLoader();

        for (var i = 0; i < TileData.content.length; i++) {
            tilescale = 1;
            switch(TileData.content[i].tiletype) {
                case "text":
                case "textlink":
                    TileData.content[i].image = new Image;
                    TileData.content[i].image.src = Config.REMOTE_PATH + TileData.content[i].subimageurl;
                    imagelist.push(Config.REMOTE_PATH + TileData.content[i].subimageurl);
                break;
                case "image":
                    TileData.content[i].image = new Image;
                    TileData.content[i].image.src = Config.REMOTE_PATH + TileData.content[i].imageurl;
                    imagelist.push(Config.REMOTE_PATH + TileData.content[i].imageurl);
                    TileData.content[i].storyimage = new Image;
                    TileData.content[i].storyimage.src = Config.REMOTE_PATH + TileData.content[i].storyimageurl;
                    imagelist.push(Config.REMOTE_PATH + TileData.content[i].storyimageurl);
                break;
                case "video":
                    tilescale = 2;
                    TileData.content[i].image = new Image;
                    TileData.content[i].image.src = Config.REMOTE_PATH + TileData.content[i].imageurl;
                    imagelist.push(Config.REMOTE_PATH + TileData.content[i].imageurl);
                    //// small extra image for videos
                    TileData.content[i].subimage = new Image;
                    TileData.content[i].subimage.src = Config.REMOTE_PATH + TileData.content[i].subimageurl;
                    imagelist.push(Config.REMOTE_PATH + TileData.content[i].subimageurl);
            };

            TileData.content[i].scale = tilescale;

            checkpos = {x:0, y:0};
            do {
                collision = false;
                //make sure none is hanging over the edge of the world
                if((checkpos.x + TileData.content[i].scale - 1)>=TileData.worldWidth) collision = true;
                //Dont bother checking other locations if part of it is already hanging over
                //if(!collision) {
                    //for all the previously arranged positions
                    for(var j = 0;j < i; j++) {
                        //collision check x
                        if((checkpos.x >= TileData.content[j].position.x) && (checkpos.x <= (TileData.content[j].position.x + TileData.content[j].scale - 1))) {
                            //collision check y
                            if ((checkpos.y >= TileData.content[j].position.y) && (checkpos.y <= (TileData.content[j].position.y + TileData.content[j].scale - 1))) collision = true;                        
                        };
                    };
                //};
                if(!collision) TileData.content[i].position = {x:checkpos.x, y:checkpos.y}; // = checkpos; maybe?
                
                checkpos.x+=1;
                if(checkpos.x >= TileData.worldWidth) {
                    checkpos.x=0;
                    checkpos.y+=1;
                };
                //console.log("checking "+checkpos.x+","+checkpos.y);

            } while(collision && checkpos.y<100 && checkpos.x < 100); //end if there is a mistake and this lasts too long
            //console.log(imgpath);
                       //imagelist.push("http://lorempixel.com/300/300/sports/");
        };

        _self.assetLoader.addImages(imagelist);
        _self.assetLoader.load();                   
    };

    LoaderScreen.constructor = LoaderScreen;

    LoaderScreen.prototype.createLoader = function () {
        this.overlay = document.createElement("div");
        this.overlay.className = 'loading-overlay';
        this.spinner = document.createElement("div");
        this.spinner.className = 'loader';

        this.overlay.appendChild(this.spinner);
       
        document.body.appendChild(this.overlay);

        this.updatePoller.apply(this);
    };

    LoaderScreen.prototype.updatePoller = function () {
        this.$spinner = $(this.spinner);

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

    LoaderScreen.prototype.onFaded = function () {}, LoaderScreen.prototype.onZoomStart = function () {}, LoaderScreen.prototype.onIntroComplete = function () {
       this.onComplete();
       $(this.overlay).fadeOut();
    };

    LoaderScreen.prototype.onInitialLoad = function () {};

    LoaderScreen.prototype.resize = function () {};

    LoaderScreen.prototype.destroy = function () {};

    return LoaderScreen;
});





// /*global define*/
// define([
//     'jquery',
//     'underscore',
//     'backbone',    
//     'config/config',
//     'modules/asset-loader',
//     'models/tile',
//     // 'collections/tiles',
//     'match_media',
// ], function ($, _, Backbone, Config, AssetLoader, model, MatchMedia) {
//     'use strict';

//     var _self = this;

//     var LoaderScreen = function () {
//         _self = this;
        
//         var imagelist = [], imgpath;
//         var nextpos = {x:0, y:0};
//         var checkpos, collision;
//         var tilescale;

//         this.assetLoader = new AssetLoader;
//         this.assetLoader.onLoadComplete = this.onInitialLoadComplete.bind(this);

//         this.createLoader();

//         for (var i = 0; i < model.content.length; i++) {
//             tilescale = 1;
//             switch(model.content[i].tiletype) {
//                 case "text":
//                 case "textlink":
//                     model.content[i].image = new Image;
//                     model.content[i].image.src = Config.REMOTE_PATH + model.content[i].subimageurl;
//                     imagelist.push(Config.REMOTE_PATH + model.content[i].subimageurl);
//                 break;
//                 case "image":
//                     model.content[i].image = new Image;
//                     model.content[i].image.src = Config.REMOTE_PATH + model.content[i].imageurl;
//                     imagelist.push(Config.REMOTE_PATH + model.content[i].imageurl);
//                     model.content[i].storyimage = new Image;
//                     model.content[i].storyimage.src = Config.REMOTE_PATH + model.content[i].storyimageurl;
//                     imagelist.push(Config.REMOTE_PATH + model.content[i].storyimageurl);
//                 break;
//                 case "video":
//                     tilescale = 2;
//                     model.content[i].image = new Image;
//                     model.content[i].image.src = Config.REMOTE_PATH + model.content[i].imageurl;
//                     imagelist.push(Config.REMOTE_PATH + model.content[i].imageurl);
//                     //// small extra image for videos
//                     model.content[i].subimage = new Image;
//                     model.content[i].subimage.src = Config.REMOTE_PATH + model.content[i].subimageurl;
//                     imagelist.push(Config.REMOTE_PATH + model.content[i].subimageurl);
//             };

//             model.content[i].scale = tilescale;

//             checkpos = {x:0, y:0};
//             do {
//                 collision = false;
//                 //make sure none is hanging over the edge of the world
//                 if((checkpos.x + model.content[i].scale - 1)>=model.worldWidth) collision = true;
//                 //Dont bother checking other locations if part of it is already hanging over
//                 //if(!collision) {
//                     //for all the previously arranged positions
//                     for(var j = 0;j < i; j++) {
//                         //collision check x
//                         if((checkpos.x >= model.content[j].position.x) && (checkpos.x <= (model.content[j].position.x + model.content[j].scale - 1))) {
//                             //collision check y
//                             if ((checkpos.y >= model.content[j].position.y) && (checkpos.y <= (model.content[j].position.y + model.content[j].scale - 1))) collision = true;                        
//                         };
//                     };
//                 //};
//                 if(!collision) model.content[i].position = {x:checkpos.x, y:checkpos.y}; // = checkpos; maybe?
                
//                 checkpos.x+=1;
//                 if(checkpos.x >= model.worldWidth) {
//                     checkpos.x=0;
//                     checkpos.y+=1;
//                 };
//                 //console.log("checking "+checkpos.x+","+checkpos.y);

//             } while(collision && checkpos.y<100 && checkpos.x < 100); //end if there is a mistake and this lasts too long
//             //console.log(imgpath);
//                        //imagelist.push("http://lorempixel.com/300/300/sports/");
//         };

//         _self.assetLoader.addImages(imagelist);
//         _self.assetLoader.load();                   
//     };

//     LoaderScreen.constructor = LoaderScreen;

//     LoaderScreen.prototype.createLoader = function () {
//         this.overlay = document.createElement("div");
//         this.overlay.className = 'loading-overlay';
//         this.spinner = document.createElement("div");
//         this.spinner.className = 'loader';

//         this.overlay.appendChild(this.spinner);
       
//         document.body.appendChild(this.overlay);

//         this.updatePoller.apply(this);
//     };

//     LoaderScreen.prototype.updatePoller = function () {
//         this.$spinner = $(this.spinner);

//         var animate_rotate = function (d) {
//             $({deg: 0}).animate({deg: 360}, {
//                 duration: 1000,
//                 easing: 'linear',
//                 step: function(now) {
//                     _self.$spinner.css({
//                          transform: "rotate(" + now + "deg)"
//                     });
//                 },
//                 complete: function() {
//                     if (!_self.loaded) {
//                         animate_rotate(360);
//                     }
//                 }
//             });
//         };

//         animate_rotate(360);
//     };

//     LoaderScreen.prototype.onInitialLoadComplete = function () {
//         this.loaded = true;
//         this.assetLoader.onLoadComplete = null;
//         this.onIntroComplete();
//     };

//     LoaderScreen.prototype.onFaded = function () {}, LoaderScreen.prototype.onZoomStart = function () {}, LoaderScreen.prototype.onIntroComplete = function () {
//        this.onComplete();
//        $(this.overlay).fadeOut();
//     };

//     LoaderScreen.prototype.onInitialLoad = function () {};

//     LoaderScreen.prototype.resize = function () {};

//     LoaderScreen.prototype.destroy = function () {};

//     return LoaderScreen;
// });
