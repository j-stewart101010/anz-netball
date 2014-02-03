/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'config/config',
    'modules/grid',
    'collections/tiles',
    'collections/tiles-data',
    'modules/box',
    'modules/trackpad',
    'modules/loader-screen',
    'match_media',
    'bootstrap_transition',    
    'bootstrap_collapse'
], function ($, _, Backbone, Config, Grid, TileCollection, TileData, Box, Trackpad, LoaderScreen, MatchMedia) {

    var _self;

    var AppView = Backbone.View.extend({

        el : 'body',

        initialize : function () {
            _self = this;

            app_compatible = !Modernizr.canvas || !MatchMedia.mobile();

            this.$el.addClass('home');
            this.$master_head = this.$el.find('.master-head');
            this.$master_foot = this.$el.find('.master-foot');                 

            $.when(TileCollection.fetch())
                .done(function () {
                    TileData.content = TileCollection.toJSON();
                    _self.load();
                }
            );

            Config.mouse;
            var d = window.innerWidth || document.documentElement.clientWidth,
                e = window.innerHeight || document.documentElement.clientHeight;
            Config.mouse.x = d / 2, Config.mouse.y = e / 2;           
        },

        load : function () {
            loaderScreen = new LoaderScreen(_self.generateImages());
            loaderScreen.onComplete = this.kickOff;
            _self.onResize();
            $(window).resize(_self.onResize);
        },

        kickOff : function() {
            if (app_compatible) {
                loaded = true;
                holding = false;
                var a = window.innerWidth || document.documentElement.clientWidth,
                    b = window.innerHeight || document.documentElement.clientHeight;
                
                // if (app_compatible) {
                    canvas = document.getElementById("nbn"); 
                    canvas.width = a; 
                    canvas.height = b*0.87; //100%-8%-5% 
                    context = canvas.getContext("2d");
                    // canvas.style.position = "absolute";
                    //canvas.style.top = "20%";
                    canvas.style.left = "0px"; 
                    // document.body.appendChild(canvas);
                    canvas.style.display = "none"; 
                    $(canvas).fadeIn("slow"); 
                    $(canvas).mousedown(_self.onMouseDown);
                    $(canvas).mouseup(_self.onMouseUp);
                    $(canvas).mousemove(_self.onMouseMove);
                    $(canvas).mouseout(_self.onMouseOut);
                    $(canvas).bind("touchstart", _self.onTouchStart);
                    $(canvas).bind("touchend", _self.onTouchEnd);
                    $(canvas).bind("touchmove", _self.onTouchMove);
                    grid = new Grid(a, b);
                    grid.canvasOffset = b*0.08; //8%
                    trackpad = new Trackpad(canvas);

                grid.onTransitionFinished = function () {
                    loaderScreen.destroy();
                    document.body.removeChild(loaderScreen.view);
                };

                _self.onResize();
                _self.resizeCount = 9;

                requestAnimFrame(_self.update);
            }
        },

        generateImages : function () {
            var imagelist = [], imgpath;

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
                    case "fliplink":
                        TileData.content[i].image = new Image;
                        TileData.content[i].image.src = Config.REMOTE_PATH + TileData.content[i].imageurl;
                        imagelist.push(Config.REMOTE_PATH + TileData.content[i].imageurl);
                        TileData.content[i].subimage = new Image;
                        TileData.content[i].subimage.src = Config.REMOTE_PATH + TileData.content[i].subimageurl;
                        imagelist.push(Config.REMOTE_PATH + TileData.content[i].subimageurl);
                        TileData.content[i].subimagetwo = new Image;
                        TileData.content[i].subimagetwo.src = Config.REMOTE_PATH + TileData.content[i].subimagetwourl;
                        imagelist.push(Config.REMOTE_PATH + TileData.content[i].subimagetwourl);
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

            TileData.cornerArrow = new Image;
            TileData.cornerArrow.src = Config.REMOTE_PATH + "images/corner-arrow.png";
            imagelist.push(Config.REMOTE_PATH + "images/corner-arrow.png");


            return imagelist;
        },

        onGridStartComplete : function () {
            _self.browseMode = true, setTimeout(_self.unlock, 1000);
        },

        unlock : function () {
            //holding = false;
            trackpad.unlock();
        },

        update : function () {
            //console.log(Config.isMobile);
            _self.resizeCount++;
           _self.resizeCount ==10 && _self.realResize(); 
            
            if(!grid.renderDisabled) grid.render(context);
            requestAnimFrame(_self.update);
        },

        realResize : function () {
            console.log('REAL RESIZE');

            var h = $(window).height() - _self.$master_head.height() - _self.$master_foot.height();    
            var w = window.innerWidth || document.documentElement.clientWidth;

            if (window.grid) {
                if(window.canvas) {
                    canvas.width = w;
                    canvas.height = h;
                    grid.canvasOffset = h*0.08;
                    //todo: change camera position based on previous size and new size
                };
                grid.resize(w, h);
                var c = {
                    x: 500,
                    y: 500
                };

            };
        },

        onSwapPressed : function () {
            window.location.hash = "";
            _self.pauseGridRender = false;
            viewer.swap();
        },

        onViewerHidden : function () {
            trackpad.unlock();
            grid.unlock();
            _self.browseMode = true;
        },

        // resize : function () { 
        //     console.log("app.resize");
        // },

        onResize : function () {
            _self.resizeCount = 0;
            var a = window.innerWidth || document.documentElement.clientWidth,
                b = window.innerHeight || document.documentElement.clientHeight;
            this.w = a;
            this.h = b;

            // if(MatchMedia.mobile()) _self.realResize();
            // if(window.tabMenu) tabMenu.resize(a, b);
            // if(loaderScreen) loaderScreen.resize(a, b);
            // if(window.tickerTape) tickerTape.view.style.left = a / 2 - 304 + "px";

        },

        onMouseDown : function (a) {
            a.preventDefault();
            // Config.downAt.x = Config.mouse.x;
            // Config.downAt.y = Config.mouse.y;
            Config.mouse.button = true;
            Config.mouse.dragDistance = 0;
        },

        onMouseUp : function (a) {
            a.preventDefault();
            Config.mouse.button = false;
            if(Config.mouse.dragDistance<15) grid.sentClick();
        },

        onMouseOut : function (a) {
            a.preventDefault();
            Config.mouse.button = false;
        },

        onTouchStart : function (e) {
            e.preventDefault();
            // Config.downAt.x = e.originalEvent.touches[0].clientX + document.body.scrollLeft;
            // Config.downAt.y = e.originalEvent.touches[0].clientY + document.body.scrollTop;
            grid.mousefollow.x = e.originalEvent.touches[0].clientX;
            grid.mousefollow.y = e.originalEvent.touches[0].clientY;  
            Config.mouse.x = e.originalEvent.touches[0].clientX;
            Config.mouse.y = e.originalEvent.touches[0].clientY;           
            Config.mouse.button = true;
            Config.mouse.dragDistance = 0;

            // e.preventDefault();
            // Config.mouse.x = e.originalEvent.touches[0].clientX + document.body.scrollLeft;
            // Config.mouse.y = e.originalEvent.touches[0].clientY + document.body.scrollTop;
            // Config.mouse.button = true;
            // Config.mouse.dragDistance = 0;
        },

        onTouchEnd : function (e) {
            e.preventDefault();
            Config.mouse.button = false;
            // alert(Config.mouse.button);
            if(Config.mouse.dragDistance<15) grid.sentClick();
        },

        onTouchMove : function(e) {
            e.preventDefault();
            // //var newX = a.pageX + document.body.scrollLeft, newY = a.pageY + document.body.scrollTop;
            var newX = e.originalEvent.touches[0].clientX + document.body.scrollLeft,
                newY = e.originalEvent.touches[0].clientY + document.body.scrollTop;
                // alert(Config.mouse.dragDistance);
            var dx = Config.mouse.x - newX, dy = Config.mouse.y - newY;
            Config.mouse.dragDistance += Math.sqrt(dx*dx+dy*dy);
            //console.log(Config.mouse)
            if(Config.mouse.dragDistance>1e4) {
               Config.mouse.dragDistance=1e4; 
            } 
            Config.mouse.x = newX;
            Config.mouse.y = newY;
        },

        onMouseMove : function (a) {
            //var newX = a.pageX + document.body.scrollLeft, newY = a.pageY + document.body.scrollTop;
            var newX = a.clientX + document.body.scrollLeft, 
                newY = a.clientY + document.body.scrollTop;
            Config.newX = newX;
            var dx = Config.mouse.x - newX, dy = Config.mouse.y - newY;
            Config.mouse.dragDistance += Math.sqrt(dx*dx+dy*dy);
            //console.log(Config.mouse)
            if(Config.mouse.dragDistance>1e4) Config.mouse.dragDistance=1e4;
            Config.mouse.x = newX;
            Config.mouse.y = newY;
        }

    });

    return AppView;

});
