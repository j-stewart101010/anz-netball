/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'config/config',
    'models/tile',
    'modules/grid',
    'modules/double-spring',
    'modules/box',
    'modules/grid-dom',
    'modules/trackpad',
    'modules/loader-screen',
    'match_media',
], function ($, _, Backbone, Config, model, Grid, DoubleSpring, Box, GridDom, Trackpad, LoaderScreen, MatchMedia) {

    var _self;

    var AppView = Backbone.View.extend({

        initialize : function () {
            _self = this;

            IS_IE8 = !Modernizr.canvas, IS_IE8;
            if (MatchMedia.mobile, this.load(), Config.mouse) {
                var d = window.innerWidth || document.documentElement.clientWidth,
                    e = window.innerHeight || document.documentElement.clientHeight;
                Config.mouse.x = d / 2, Config.mouse.y = e / 2
            }

        },

        load : function () {
            loaderScreen = new LoaderScreen;
            loaderScreen.onComplete = this.kickOff;
            document.body.appendChild(loaderScreen.view);
            _self.onResize();
            $(window).resize(_self.onResize);
        },

        kickOff : function() {
            loaded = true;
            holding = false;
            var a = window.innerWidth || document.documentElement.clientWidth,
                b = window.innerHeight || document.documentElement.clientHeight;
            
            if(IS_IE8) {
                grid = new GridDom(a, b);
                $(grid.domView).mousedown(onMouseDown);
                $(grid.domView).mouseup(onMouseUp);
                $(grid.domView).mousemove(onMouseMove);
                trackpad = new Trackpad(grid.domView);
            } else {
                canvas = document.createElement("canvas"); 
                canvas.width = a; 
                canvas.height = b*0.87; //100%-8%-5% 
                context = canvas.getContext("2d");
                canvas.style.position = "absolute";
                canvas.style.top = "8%";
                canvas.style.left = "0px"; 
                document.body.appendChild(canvas);
                canvas.style.display = "none"; 
                $(canvas).fadeIn("slow"); 
                $(canvas).mousedown(_self.onMouseDown);
                $(canvas).mouseup(_self.onMouseUp);
                $(canvas).mousemove(_self.onMouseMove);
                $(canvas).bind("touchstart", _self.onTouchStart);
                $(canvas).bind("touchend", _self.onTouchEnd);
                $(canvas).bind("touchmove", _self.onTouchMove);
                grid = new Grid(a, b);
                grid.canvasOffset = b*0.08; //8%
                trackpad = new Trackpad(canvas);

                // for(var i=0;i<model.content.length;i++){
                //     model.content[i].lines = grid.splitText(model.content[i].)
                // }
            };

            grid.onTransitionFinished = function () {
                loaderScreen.destroy();
                document.body.removeChild(loaderScreen.view);
            };

            browseMode = false;
            pauseGridRender = false;
            _self.onResize();
            resizeCount = 9;
            trackpad.lock();
            
            trackpad.setPosition(a / 2, b / 2);
            grid.onStartComplete = _self.onGridStartComplete;
            requestAnimFrame(_self.update);
        },

        onGridStartComplete :  function () {
            // var a, b = window.location.hash,
            //     c = b.split("=")[1];
            // if (c) {
            //     for (var d = 0; d < model.content.length; d++) {
            //         if (c == model.content[d].rfid) {
            //             a = model.content[d];
            //             break
            //         }
            //     }
            // }
            // if (a) {
            //     var e = -2,
            //         f = -2;
            //     a.positionX = (e + 2 - .5) * grid.squareWidth + grid.width / 2 - grid.squareWidth / 2 + 1;
            //     a.positionY = (f + 1.5 - .5) * grid.squareWidth + grid.height / 2 - grid.squareWidth / 2 + 1;
            // } 
            // else 
            browseMode = true, setTimeout(_self.unlock, 1000);
        },

        unlock : function () {
            //holding = false;
            trackpad.unlock();
        },

        update : function () {
            //console.log(Config.isMobile);
            Config.isMobile || resizeCount++;
            resizeCount ==10 && _self.realResize(); 
            if(loaded && browseMode) trackpad.update(); 
            if(Config.track) {
                Config.track.x = trackpad.value;
                Config.track.y = trackpad.valueY;
            };

            ////todo:put mouse status update and stuff here which would have been in grid.render()

            pauseGridRender || (IS_IE8 ? grid.render() : (grid.render(context))); 
            requestAnimFrame(_self.update);
        },

        realResize : function () {
            console.log('REAL RESIZE');
            var a = window.innerWidth || document.documentElement.clientWidth,
                b = window.innerHeight || document.documentElement.clientHeight;
            if (window.grid) {
                if(IS_IE8 || window.canvas) {
                    canvas.width = a;
                    canvas.height = b*0.87;
                    grid.canvasOffset = b*0.08;
                    //todo: change camera position based on previous size and new size
                };
                grid.resize(a, b);
                var c = {
                    x: 500,
                    y: 500
                };
                if(Config.isMobile) { 
                    c.x = a;
                    c.y = b;
                    window.usingForm ? a > 2 * b ? $(overlay).fadeIn() : $(overlay).fadeOut() : a > b ? $(overlay).fadeIn() : $(overlay).fadeOut();
                    var d = c.x / 2,
                        e = c.y / 2;
                    if(pauseGridRender) {
                        if(IS_IE8) {
                            grid.render()
                        } else {
                            grid.render(context);
                            viewer.render(context);
                        };
                        if(a != this.cacheW && b != this.cacheH) window.scrollTo(0, 0);
                        this.cacheW = a;
                        this.cacheH = b;
                        console.log("RESIZING");
                    };
                };
            };
        },

        onSwapPressed : function () {
            window.location.hash = "";
            pauseGridRender = false;
            viewer.swap();
        },

        onViewerHidden : function () {
            trackpad.unlock();
            grid.unlock();
            browseMode = true;
        },

        // resize : function () { 
        //     console.log("app.resize");
        // },

        onResize : function () {
            resizeCount = 0;
            var a = window.innerWidth || document.documentElement.clientWidth,
                b = window.innerHeight || document.documentElement.clientHeight;
            this.w = a;
            this.h = b;

            if(MatchMedia.mobile()) _self.realResize();
            if(window.tabMenu) tabMenu.resize(a, b);
            if(loaderScreen) loaderScreen.resize(a, b);
            if(window.tickerTape) tickerTape.view.style.left = a / 2 - 304 + "px";

        },

        onMouseDown : function (a) {
            a.preventDefault();
            Config.downAt.x = Config.mouse.x;
            Config.downAt.y = Config.mouse.y;
            Config.mouse.button = true;
        },

        onMouseUp : function (a) {
            a.preventDefault();
            Config.mouse.button = false;
        },

        onTouchStart : function (a) {
            a.preventDefault();
            Config.mouse.x = a.originalEvent.touches[0].clientX + document.body.scrollLeft;
            Config.mouse.y = a.originalEvent.touches[0].clientY + document.body.scrollTop;
            downAt.x = Config.mouse.x;
            downAt.y = Config.mouse.y;
        },

        onTouchEnd : function (a) {
            a.preventDefault();
        },

        onTouchMove : function(a) {
            a.preventDefault();
            Config.mouse.x = a.originalEvent.touches[0].clientX + document.body.scrollLeft;
            Config.mouse.y = a.originalEvent.touches[0].clientY + document.body.scrollTop;
            _self.testDidMove()
        },

        onMouseMove : function (a) {
            Config.mouse.x = a.clientX + document.body.scrollLeft;
            Config.mouse.y = a.clientY + document.body.scrollTop
            _self.testDidMove();
        },

        testDidMove : function () {
            var a = Config.mouse.x - Config.downAt.x,
                b = Config.mouse.y - Config.downAt.y,
                c = a * a + b * b;
            //if(c > 125) grid.didMove = true;

        }                  

    });

    return AppView;

});
