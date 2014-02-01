/*global define*/
define([
        'jquery',
        'config/config',
        'collections/tiles-data',
        'modules/grid-button',
        'modules/box',
        'views/video-embed',
        'bootstrap_transition',    
        'bootstrap_modal',        
], function ($, Config, TileData, GridButton, Box, VideoEmbedView) {
  'use strict';

  var _self;

  var Grid = function (w, h) {
    _self=this;

    console.log("Grid");

    this.camera = {
      x: 0,
      y: 0,
      momentumx: 0,
      momentumy: 0
    };
    
    this.mousefollow = {
      x: Config.mouse.x,
      y: Config.mouse.y
    };

    this.recalculateinterval=0;
    
    this.canvasOffset = 0;
    this.squareWidth = 306;
    this.squareHeight = 306;

    this.resize(w, h);

    $(document).on('hidden.bs.modal', this.closedModal );
   
    this.offScreen = document.createElement("canvas"); 
    this.offScreen.width = this.squareWidth*2;// this.squareWidth; 
    this.offScreen.height = this.squareHeight*2;//this.squareHeight;
    this.offScreenCtx = this.offScreen.getContext("2d");

    this.zoom = 0.2;

    this.defaultZoom = 0.6 + (canvas.width / 10000);

    this.minZoom=0.3;
    this.dampZoom=0.003;
    this.zoomPos={x:canvas.width/2,y:canvas.height/2};

    _self.flippedVideoTile=0;

    this.lastButton = 0;
    this.mouseHoverIndex = -1;
    this.mouseHoverWorldX = 0;
    this.mouseHoverWorldY = 0;
    this.mouseHoverTileX = 0;
    this.mouseHoverTileY = 0;

    this.centering = 0;
    this.centerX=0;
    this.centerY=0;
    this.centerSize=0;
    this.centerZoom=1;
    this.dragDisabled=0;  //counter for disabling dragging. negative numbers disable indefinitely
    this.renderDisabled=false;


    for(var i=0;i<TileData.content.length;i++) {
      switch(TileData.content[i].tiletype) {
        case "text":
        //break;
        case "textlink":
          console.log(TileData.content[i]);
          TileData.content[i].box = new Box(this.offScreenCtx, [], {width:this.squareWidth,height:this.squareHeight,contentType:"container"});
          TileData.content[i].box.addBox(new Box(this.offScreenCtx, "", {width:100,height:100,contentType:"text",backgroundColour:TileData.content[i].colour}));
          TileData.content[i].box.addBox(new Box(this.offScreenCtx, TileData.content[i].title, {left:10,width:80,height:25,top:10,padding:0,fontSize:35,lineHeight:40,contentType:"text",align:"center"}));
          TileData.content[i].box.addBox(new Box(this.offScreenCtx, TileData.content[i].subtext, {left:10,width:80,height:25,top:35,padding:0,fontSize:15,lineHeight:17,contentType:"text",align:"center"}));
          TileData.content[i].box.calculate();
          TileData.content[i].box.addBox(new Box(this.offScreenCtx, TileData.content[i].image, {width:100,top:60,left:0,align:"center",contentType:"image",id:"button"}));
          TileData.content[i].box.calculate();
          console.log("text/textlink");
          console.log(TileData.content[i].box);
        break;
        case "image":
          TileData.content[i].box = new Box(this.offScreenCtx, [], {width:this.squareWidth,height:this.squareHeight,contentType:"container"});
          TileData.content[i].box.addBox(new Box(this.offScreenCtx, TileData.content[i].image, {width:100,height:100,contentType:"image"}));
          TileData.content[i].box.calculate();
          console.log("image");

          console.log(TileData.content[i].box);
          TileData.content[i].backbox = new Box(this.offScreenCtx, [], {width:this.squareWidth,height:this.squareHeight,contentType:"container"});
          TileData.content[i].backbox.addBox(new Box(this.offScreenCtx, "", {width:100,height:100,contentType:"text",backgroundColour:TileData.content[i].backcolour}));
          TileData.content[i].backbox.addBox(new Box(this.offScreenCtx, TileData.content[i].storyimage, {top:25,left:5,width:13,height:13,contentType:"image"}));
          TileData.content[i].backbox.addBox(new Box(this.offScreenCtx, TileData.content[i].storyusername, {top:25,left:21,width:60,height:20,textunderlay:"fit",padding:0.9,fontSize:10,fontstyle:"bold",contentType:"text",align:"left"}));
          TileData.content[i].backbox.calculate();
          TileData.content[i].backbox.addBox(new Box(this.offScreenCtx, TileData.content[i].storyfullname, {top:TileData.content[i].backbox.last().bottom,left:21,width:60,height:20,textunderlay:"fit",padding:0.9,fontSize:7,contentType:"text",align:"left"}));
          TileData.content[i].backbox.calculate();
          TileData.content[i].backbox.addBox(new Box(this.offScreenCtx, TileData.content[i].storyuserinfo, {top:TileData.content[i].backbox.last().bottom,left:21,width:60,height:20,textunderlay:"fit",padding:0.9,fontSize:7,contentType:"text",align:"left"}));
          TileData.content[i].backbox.calculate();
          TileData.content[i].backbox.addBox(new Box(this.offScreenCtx, TileData.content[i].storydescription, {top:TileData.content[i].backbox.last().bottom,left:21,width:60,height:20,textunderlay:"fit",padding:1.2,fontSize:12,contentType:"text",align:"left"}));
          TileData.content[i].backbox.calculate();
          TileData.content[i].backbox.addBox(new Box(this.offScreenCtx, TileData.content[i].storytags, {top:TileData.content[i].backbox.last().bottom,left:21,width:60,height:20,textunderlay:"fit",padding:1.2,fontSize:9,contentType:"text",align:"left"}));
          TileData.content[i].backbox.calculate();

          console.log("image backbox");
          console.log(TileData.content[i].backbox);
        break;
        case "video":

          TileData.content[i].box = new Box(this.offScreenCtx, [], {width:this.squareWidth,height:this.squareHeight,contentType:"container"});
          TileData.content[i].box.addBox(new Box(this.offScreenCtx, TileData.content[i].image, {width:100,height:100,contentType:"image"}));
          TileData.content[i].box.addBox(new Box(this.offScreenCtx, "", {width:100,height:100,contentType:"text",backgroundColour:"rgba(70,145,185,0.11)"}));
          TileData.content[i].box.addBox(new Box(this.offScreenCtx, "VIDEO", {contentType:"text",fontStyle:"bold",left:8.5,top:10,width:80,height:25,padding:2,fontSize:9,backgroundColour:"rgba(0,0,0,0.35)",textunderlay:"fit"}));
          TileData.content[i].box.calculate();
          TileData.content[i].box.addBox(new Box(this.offScreenCtx, TileData.content[i].textname, {contentType:"text",left:TileData.content[i].box.last().right,top:10,width:80,height:25,padding:2,fontSize:9,backgroundColour:"rgba(0,0,0,0.35)",textunderlay:"fit"}));
          TileData.content[i].box.addBox(new Box(this.offScreenCtx, TileData.content[i].textsubject, {contentType:"text",left:8.5,top:20,width:80,height:20,padding:2,fontSize:22,backgroundColour:"rgba(0,0,0,0.35)",textunderlay:"fit"}));
          TileData.content[i].box.addBox(new Box(this.offScreenCtx, TileData.content[i].subimage, {left:7,top:85,contentType:"image",width:20,height:8}));
          TileData.content[i].box.calculate();

          console.log("video");
          console.log(TileData.content[i].box);    
          TileData.content[i].backbox = new Box(this.offScreenCtx, [], {width:this.squareWidth,height:this.squareHeight,contentType:"container"});
          TileData.content[i].backbox.addBox(new Box(this.offScreenCtx, "", {width:100,height:100,contentType:"text",backgroundColour:"rgb(0,0,0)"}));
          TileData.content[i].backbox.calculate();
        };
    
      
        TileData.content[i].flipProgress=0;
        TileData.content[i].flipDirection=0;
        TileData.content[i].scaleProgress=0;
        TileData.content[i].scaleDirection=0;
        TileData.content[i].actionX=0;
        TileData.content[i].actionY=0;
    
    };
  };

  Grid.constructor = Grid;

  Grid.prototype.resize = function (w, h) {
    this.defaultZoom = 0.6 + (w / 10000);
    this.width = w;
    this.height = h;
    this.zoomPos={x:w/2,y:h/2};
  };

  Grid.prototype.closedModal = function() {
    //this.renderDisabled=false;
    console.log('unflipped ' + _self.flippedVideoTile);
    TileData.content[_self.flippedVideoTile].flipDirection = -0.027;
  };

  Grid.prototype.sentClick = function() {
    var i=this.mouseHoverIndex;
    if(i<0) return;
    //console.log("Clicked "+i);
    console.log(this.mouseHoverWorldX + ","+this.mouseHoverWorldY);
    
    if(TileData.content[i].flippable) {
      //scan through model data and flip&scale back any others that were flipped
      


      if(TileData.content[i].tiletype=="image") {
        // if(TileData.content[i].scaleProgress==1 || TileData.content[i].scaleDirection>0) {
        //   if(TileData.content[i].flipProgress==1 || TileData.content[i].flipDirection>0) {
        //     //flipped or flipping to and scaled or scaling up
        //     TileData.content[i].flipDirection = -0.027;
        //     TileData.content[i].scaleDirection = -0.027;
        //   };
        //   if(TileData.content[i].flipProgress==0 || TileData.content[i].flipDirection<0) {
        //     //unflipped or flipping from and scaled or scaling up
        //     TileData.content[i].flipDirection = 0.027;         
        //   };
        // };
        // if(TileData.content[i].scaleProgress==0 || TileData.content[i].scaleDirection<0) {
        //   if(TileData.content[i].flipProgress==1 || TileData.content[i].flipDirection>0) {
        //     //flipped or flipping to and unscaled or scaling down
        //     //ok to be flipped and unscaled but this situation is usually triggered automatically somewhere else
        //     //default is flip back
        //     TileData.content[i].flipDirection = -0.027;
        //   };
        //   if(TileData.content[i].flipProgress==0 || TileData.content[i].flipDirection<0) {
        //     //unflipped or flipping from and unscaled or scaling down
        //     TileData.content[i].scaleDirection = 0.027;
        //   };       
        // };
        console.log("i:"+i+": "+"ScaleDirecshn:"+TileData.content[i].scaleDirection+" FlipDirecshn:"+TileData.content[i].flipDirection);
        console.log("ScaleProgress:"+TileData.content[i].scaleProgress+" FlipProgress:"+TileData.content[i].scaleProgress);

        if(TileData.content[i].scaleProgress==1 || TileData.content[i].scaleDirection>0) {
          if(TileData.content[i].flipProgress==1 && TileData.content[i].scaleProgress==1) {
            //scaled and flipped

            TileData.content[i].flipDirection = -0.027;
            TileData.content[i].scaleDirection = -0.027;
            console.log("scale downward and flip back");
            TileData.content[i].actionX=this.mouseHoverWorldX;
            TileData.content[i].actionY=this.mouseHoverWorldY;
          } else if(TileData.content[i].flipProgress==0 || TileData.content[i].flipDirection<0) {
            //scaled or scaling & flipping back/unflipped
            console.log("flip forward");
            TileData.content[i].flipDirection = 0.027;         
            TileData.content[i].actionX=this.mouseHoverWorldX;
            TileData.content[i].actionY=this.mouseHoverWorldY;
          };
        } else if (TileData.content[i].scaleProgress==0 || TileData.content[i].scaleDirection<0) {
          // if(TileData.content[i].flipProgress==1 || TileData.content[i].flipDirection>0) {
          //   //flipped or flipping to and unscaled or scaling down
          //   //ok to be flipped and unscaled but this situation is usually triggered automatically somewhere else
          //   //default is flip back
          //   TileData.content[i].flipDirection = -0.027;
          // };
          if(TileData.content[i].flipProgress==0 || TileData.content[i].flipDirection<0) {
            //unflipped or flipping from and unscaled or scaling down
            // console.log("scale upward");
            
            TileData.content[i].scaleDirection = 0.027;
            TileData.content[i].actionX=this.mouseHoverWorldX;
            TileData.content[i].actionY=this.mouseHoverWorldY;
          };       
        };
      };

      if(TileData.content[i].tiletype=="video") {
        if(TileData.content[i].flipProgress==1 || TileData.content[i].flipDirection>0) {
          //flipped or flipping to and scaled or scaling up
          TileData.content[i].flipDirection = -0.027;
          TileData.content[i].actionX=this.mouseHoverWorldX;
          TileData.content[i].actionY=this.mouseHoverWorldY;
        };
        if(TileData.content[i].flipProgress==0 || TileData.content[i].flipDirection<0) {
          //unflipped or flipping from and scaled or scaling up
          TileData.content[i].flipDirection = 0.027;         
          TileData.content[i].actionX=this.mouseHoverWorldX;
          TileData.content[i].actionY=this.mouseHoverWorldY;
          this.dragDisabled=36;
          this.centering=36*10;
          this.centerSize=500;
          this.centerZoom=1;//this.centerSize/(TileData.content[i].scale*this.squareWidth);

          this.centerX=0;//this.mouseHoverWorldX+(TileData.content[i].scale*this.squareWidth*0.5)/this.centerZoom;
          this.centerY=0;//this.mouseHoverWorldY-this.canvasOffset+(TileData.content[i].scale*this.squareHeight*0.5)/this.centerZoom;
          
        };
        
      };
      for(var j=0;j<TileData.content.length;j++){
        if(j!=i) {
          if(TileData.content[j].scaleProgress>0) TileData.content[j].scaleDirection = -0.027*4;
          if(TileData.content[j].flipProgress>0) TileData.content[j].flipDirection = -0.027*4;
        };
      };
    };
  };

  Grid.prototype.onFlip = function(modelIndex) {
    if(TileData.content[modelIndex].tiletype=="video") {
      //this.renderDisabled=true;

      _self.flippedVideoTile=modelIndex;
      $('body').append(new VideoEmbedView({ 
        modal : true,
        video_id : TileData.content[modelIndex].videoid
      }).render().el);
    };
  };

  Grid.prototype.onUnFlip = function(modelIndex) {
  };

  Grid.prototype.onScale = function(modelIndex) {
  };

  Grid.prototype.onUnScale = function(modelIndex) {
  };

  Grid.prototype.drawImagePerspective = function(srcCtx,srcWidth,srcHeight,dstCtx,dstDrawX,dstDrawY,drawScale,drawAngle) {
    //dimensions to skew to by circular angle
    var xskew = -srcWidth*0.5*Math.cos(drawAngle*Math.PI/180);
    var yskew = -srcHeight*0.13*Math.sin(drawAngle*Math.PI/180);
    // var blklen=Math.floor(xskew/yskew);
    // if(blklen<1) blklen=1;
    
    //set up intervals
    var xint=-2*xskew*drawScale/srcWidth;
    var yint=-2*drawScale*yskew/srcWidth;
    var hint=-2*yint;

    // if(xint<0) {
    //   xint=-xint;
    //   yint=-yint;
    //   hint=-hint;
    //   var x=dstDrawX+(srcWidth*0.5-xskew)*drawScale;
    //   var y=dstDrawY-(yskew*drawScale);
    //   var h=(srcHeight+2*yskew)*drawScale;
    // } else {
    //       //set up starting coordinates and height
      var x=dstDrawX+(srcWidth*0.5+xskew)*drawScale;
      var y=dstDrawY+(yskew*drawScale);
      var h=(srcHeight-2*yskew)*drawScale;
    // };


    //loop through each source column
    for(var i=0;i<srcWidth;i++) {
      //take a pixel-wide strip from the source, scale and position it on the destination buffer
      //shorthand if reverses source to prevent image being drawn backwards
      //Math.ceil(drawScale) draws wider bands if greater scaling is necessary
      // dstCtx.drawImage(srcCtx.canvas, xint>0 ? i : srcWidth-i-blklen, 0, blklen, srcHeight-1, Math.floor(x), Math.floor(y), Math.ceil(drawScale)*blklen, h);

      dstCtx.drawImage(srcCtx.canvas, xint>0 ? i : srcWidth-i, 0, 1, srcHeight-1, Math.floor(x), Math.floor(y), Math.ceil(drawScale), h);
      x+=xint;
      y+=yint;
      h+=hint;

    };
  };

  Grid.prototype.render = function (ctx) {
    //console.log("render");
    ctx.save();

    this.recalculateinterval++;
    this.recalculateinterval%=360;
    if(this.recalculateinterval==0) {
      // console.log("recalculate");
      for(var i=0;i<TileData.content.length;i++) {
         TileData.content[i].box.calculate();
      };
    };

    this.mousefollow.x+=(Config.mouse.x-this.mousefollow.x)*0.4;
    this.mousefollow.y+=(Config.mouse.y-this.mousefollow.y)*0.4;
    
  //use the difference to move the camera when holding
    if(!this.dragDisabled && Config.mouse.button) {
    	this.camera.momentumx = (this.mousefollow.x-Config.mouse.x)*0.4;
    	this.camera.momentumy = (this.mousefollow.y-Config.mouse.y)*0.4;       	
    };
    if(this.dragDisabled>0) this.dragDisabled--;

    this.camera.x += this.camera.momentumx/this.zoom;
    this.camera.y += this.camera.momentumy/this.zoom;
      
    // if(Math.abs(this.camera.momentumx)<0.3) {
    //   this.camera.momentumx = 0;
    //   this.camera.x = Math.round(this.camera.x);  //Don't use Math.floor here. It causes weird behaviour. 
    // };
    // if(Math.abs(this.camera.momentumy)<0.3) {
    //   this.camera.momentumy = 0;
    //   this.camera.y = Math.round(this.camera.y);          
    // };

    var desiredZoom;
    if(this.centering>0) {
      this.centering--;
      //var blah math to do zooming and centering 
      desiredZoom=this.centerZoom;
      var cameraPropX=this.centerX-((window.innerWidth || document.documentElement.clientWidth)*0.5)/this.centerZoom;
      var cameraPropY=this.centerY-((window.innerHeight || document.documentElement.clientHeight)*0.37)/this.centerZoom;
        console.log(cameraPropX + "->"+this.camera.x+"   "+cameraPropY+"->"+this.camera.y);
      this.camera.x+=(cameraPropX-this.camera.x)*0.08;
      this.camera.y+=(cameraPropY-this.camera.y)*0.08;
    } else {
      desiredZoom=this.defaultZoom-Math.pow(this.camera.momentumx*this.camera.momentumx+this.camera.momentumy*this.camera.momentumy,0.4)/70;

    };
      this.camera.momentumx *= 0.97;
      this.camera.momentumy *= 0.97;


    // if(this.lastButton!=Config.mouse.button && Config.mouse.button!=0){
    //   console.log("Index: "+this.mouseHover);
    //   console.log(TileData.content[this.mouseHover].titlesplit);
    //   console.log(TileData.content[this.mouseHover].subtextsplit);
    // };

    if(desiredZoom<0.2) desiredZoom=0.2;
    this.zoom+=(desiredZoom-this.zoom)*this.dampZoom;
    this.dampZoom+=0.004;
    if(this.dampZoom>0.2) this.dampZoom=0.2;
    if(Math.abs(1-this.zoom)<0.01) this.zoom=1;

    // if(!Config.mouse.button) {
    //   this.zoomPos.x+=((canvas.width/2)-this.zoomPos.x)*0.3;
    //   this.zoomPos.y+=((canvas.height/2)-this.zoomPos.y)*0.3;
    // } else {
    //   this.zoomPos.x+=(Config.mouse.x-this.zoomPos.x)*0.3;
    //   this.zoomPos.y+=(Config.mouse.y-this.zoomPos.y)*0.3;
    // };

    this.lastButton = Config.mouse.button;

    var x,y,wtx,wty;
    var totalWorldWidth=TileData.worldWidth*this.squareWidth;
    var totalWorldHeight=5*this.squareHeight; //todo: make this dynamic later

    ctx.fillStyle = "#004165"
    ctx.fillRect(0,0,canvas.width, canvas.height);

    for(i=0; i<TileData.content.length; i++) {
      TileData.content[i].scaleProgress+=TileData.content[i].scaleDirection;
      if(TileData.content[i].scaleProgress>1) {
        TileData.content[i].scaleProgress=1;
        TileData.content[i].scaleDirection=0;
        this.onScale(i);
      };
      if(TileData.content[i].scaleProgress<0) {
        TileData.content[i].scaleProgress=0;
        TileData.content[i].scaleDirection=0;
        this.onUnScale(i);
      };
      TileData.content[i].flipProgress+=TileData.content[i].flipDirection;
      if(TileData.content[i].flipProgress>1) {
        TileData.content[i].flipProgress=1;
        TileData.content[i].flipDirection=0;
        // console.log(this.camera.x, this.camera.y);
        // sqwidth * scale * zoom
        // console.log(TileData.content[i]);
        // console.log(TileData.content[i].scale * this.squareWidth * this.zoom);
        this.onFlip(i);
      };
      if(TileData.content[i].flipProgress<0) {
        TileData.content[i].flipProgress=0;
        TileData.content[i].flipDirection=0;
        this.onUnFlip(i)
      };

      x=-Math.floor(this.camera.x);
      wtx=Math.floor(Math.floor(this.camera.x)/totalWorldWidth)*totalWorldWidth;
      if(x>0) wtx+=totalWorldWidth;
      x%=totalWorldWidth;
      x-=totalWorldWidth*Math.ceil(canvas.width/(totalWorldWidth*this.zoom*2));
      wtx-=totalWorldWidth*Math.ceil(canvas.width/(totalWorldWidth+this.squareWidth*this.zoom*2));
      x+=TileData.content[i].position.x*this.squareWidth;
      wtx+=TileData.content[i].position.x*this.squareWidth;

      y=-Math.floor(this.camera.y);
      wty=Math.floor(Math.floor(this.camera.y)/totalWorldHeight)*totalWorldHeight;
      if(y>0) wty+=totalWorldHeight;
      y%=totalWorldHeight;
      y-=totalWorldHeight*Math.ceil(canvas.height/(totalWorldHeight*this.zoom*2));
      wty-=totalWorldHeight*Math.ceil(canvas.height/(totalWorldHeight*this.zoom*2));
      y+=TileData.content[i].position.y*this.squareHeight;
      wty+=TileData.content[i].position.y*this.squareHeight;

      var repeatx,repeaty=(y-(this.zoomPos.y))*this.zoom+this.zoomPos.y, drawAngle;
      var repeatwtx,repeatwty=wty;
      do {
        repeatx=(x-(this.zoomPos.x))*this.zoom+this.zoomPos.x;
        repeatwtx=wtx;
        do {
      //collision with screen. whether it's worth drawing or not
          //if(repeatx>(-TileData.content[i].scale*this.squareWidth*this.zoom) && repeatx<canvas.width && repeaty>(-TileData.content[i].scale*this.squareHeight*this.zoom) && repeaty<canvas.height){
            //what to draw depending on data
            // if(TileData.content[i].flipProgress>0 && TileData.content[i].flipProgress<1){
            //     if(TileData.content[i].flipProgress<0.5) {
            //       //render the front side to offscreen buffer
            //       drawAngle=TileData.content[i].flipProgress*180; //0-90 degrees
            //       TileData.content[i].box.render(this.offScreenCtx, 0, 0, TileData.content[i].scale);
            //     } else {
            //       //render the back side to offscreen buffer
            //       drawAngle=TileData.content[i].flipProgress*180+180; //90 to 180 degrees
            //       if(typeof(TileData.content[i].backbox)!="undefined") TileData.content[i].backbox.render(this.offScreenCtx, 0, 0, TileData.content[i].scale);
            //     };
            //     //perspective draw from offscreen buffer to canvas
            //     this.drawImagePerspective(this.offScreenCtx,this.squareWidth*TileData.content[i].scale,this.squareHeight*TileData.content[i].scale,ctx,repeatx,repeaty,this.zoom*(1+TileData.content[i].scaleProgress),drawAngle);
            // };

            //FIRST PASS: UNSCALED WHILE UNFLIPPED/FULLY-FLIPPED) TILES ONLY
            //if scale=0 and flipped=0 or flipped=1 or location not matching
          if(TileData.content[i].scaleProgress==0) {
            if(TileData.content[i].actionX==wtx && TileData.content[i].actionY==wty) {
              if(TileData.content[i].flipProgress==0) TileData.content[i].box.render(ctx, repeatx, repeaty, this.zoom*TileData.content[i].scale);
              if(TileData.content[i].flipProgress==1) TileData.content[i].backbox.render(ctx, repeatx, repeaty, this.zoom*TileData.content[i].scale);
            } else {
              if(TileData.content[i].flipProgress==0 || TileData.content[i].flipProgress==1) TileData.content[i].box.render(ctx, repeatx, repeaty, this.zoom*TileData.content[i].scale);
          
            };
          };

      
          //collision with mouse
          if(Config.mouse.x>=repeatx && Config.mouse.x<(repeatx+TileData.content[i].scale*this.squareWidth*this.zoom) && (Config.mouse.y-this.canvasOffset)>=repeaty && (Config.mouse.y-this.canvasOffset)<(repeaty+TileData.content[i].scale*this.squareHeight*this.zoom)) {
            //a little darker overlay
            ctx.fillStyle="rgba(0,0,0,.35)";
            ctx.fillRect(repeatx,repeaty,TileData.content[i].scale*this.squareWidth*this.zoom,TileData.content[i].scale*this.squareWidth*this.zoom);
            this.mouseHoverIndex = i;
            this.mouseHoverWorldX=repeatwtx;
            this.mouseHoverWorldY=repeatwty;
            this.mouseHoverTileX=(Config.mouse.x-repeatx)/this.zoom;
            this.mouseHoverTileY=(Config.mouse.y-this.canvasOffset-repeaty)/this.zoom;
            // ctx.fillStyle="green";
            // ctx.beginPath();
            // ctx.arc(repeatx+this.mouseHoverTileX*this.zoom, repeaty+this.mouseHoverTileY*this.zoom, 10, 0, Math.PI*2, true); 
            // ctx.closePath();
            // ctx.fill();
          };


          repeatx+=totalWorldWidth*this.zoom; //and scale
          repeatwtx+=totalWorldWidth;
        } while(repeatx<=canvas.width);
        repeaty+=totalWorldHeight*this.zoom; //and scale
        repeatwty+=totalWorldHeight;
      } while(repeaty<=canvas.height);
      // ctx.strokeStyle="red";
      // ctx.beginPath();
      // ctx.moveTo(-x*this.zoom,0);
      // ctx.lineTo(-x*this.zoom,canvas.height);
      // ctx.stroke();
    };

////  SECOND PASS: SCALED/SCALING WHILE UNFLIPPED/FULLY-FLIPPED TILES ONLY
    for(i=0; i<TileData.content.length; i++) {
      x=-Math.floor(this.camera.x);
      wtx=Math.floor(Math.floor(this.camera.x)/totalWorldWidth)*totalWorldWidth;
      if(x>0) wtx+=totalWorldWidth;
      x%=totalWorldWidth;
      x-=totalWorldWidth*Math.ceil(canvas.width/(totalWorldWidth*this.zoom*2));
      wtx-=totalWorldWidth*Math.ceil(canvas.width/(totalWorldWidth+this.squareWidth*this.zoom*2));
      x+=TileData.content[i].position.x*this.squareWidth;
      wtx+=TileData.content[i].position.x*this.squareWidth;

      y=-Math.floor(this.camera.y);
      wty=Math.floor(Math.floor(this.camera.y)/totalWorldHeight)*totalWorldHeight;
      if(y>0) wty+=totalWorldHeight;
      y%=totalWorldHeight;
      y-=totalWorldHeight*Math.ceil(canvas.height/(totalWorldHeight*this.zoom*2));
      wty-=totalWorldHeight*Math.ceil(canvas.height/(totalWorldHeight*this.zoom*2));
      y+=TileData.content[i].position.y*this.squareHeight;
      wty+=TileData.content[i].position.y*this.squareHeight;

      var repeatx,repeaty=(y-(this.zoomPos.y))*this.zoom+this.zoomPos.y, drawAngle;
      var repeatwtx,repeatwty=wty;
      do {
        repeatx=(x-(this.zoomPos.x))*this.zoom+this.zoomPos.x;
        repeatwtx=wtx;
        do {
      //collision with screen. whether it's worth drawing or not
      //    if(repeatx>(-TileData.content[i].scale*this.squareWidth*this.zoom) && repeatx<canvas.width && repeaty>(-TileData.content[i].scale*this.squareHeight*this.zoom) && repeaty<canvas.height){
          

          
          if(TileData.content[i].scaleProgress>0) {
            if(TileData.content[i].actionX==repeatwtx && TileData.content[i].actionY==repeatwty) {
              if(TileData.content[i].flipProgress==0) TileData.content[i].box.render(ctx, repeatx, repeaty, this.zoom*(TileData.content[i].scale+TileData.content[i].scaleProgress));
              if(TileData.content[i].flipProgress==1) TileData.content[i].backbox.render(ctx, repeatx, repeaty, this.zoom*(TileData.content[i].scale+TileData.content[i].scaleProgress));
            } else {
              if(TileData.content[i].flipProgress==0 || TileData.content[i].flipProgress==1) TileData.content[i].box.render(ctx, repeatx, repeaty, this.zoom*TileData.content[i].scale);
        
            };
          };
            // //what to draw depending on data
            // if(TileData.content[i].flipProgress>0 && TileData.content[i].flipProgress<1){
            //     if(TileData.content[i].flipProgress<0.5) {
            //       //render the front side to offscreen buffer
            //       drawAngle=TileData.content[i].flipProgress*180; //0-90 degrees
            //       TileData.content[i].box.render(this.offScreenCtx, 0, 0, TileData.content[i].scale);
            //     } else {
            //       //render the back side to offscreen buffer
            //       drawAngle=TileData.content[i].flipProgress*180+180; //90 to 180 degrees
            //       if(typeof(TileData.content[i].backbox)!="undefined") TileData.content[i].backbox.render(this.offScreenCtx, 0, 0, TileData.content[i].scale);
            //     };
            //     //perspective draw from offscreen buffer to canvas
            //     this.drawImagePerspective(this.offScreenCtx,this.squareWidth*TileData.content[i].scale,this.squareHeight*TileData.content[i].scale,ctx,repeatx,repeaty,this.zoom*(1+TileData.content[i].scaleProgress),drawAngle);
            // };
            // if(TileData.content[i].flipProgress<=0) TileData.content[i].box.render(ctx, repeatx, repeaty, this.zoom*(TileData.content[i].scale+TileData.content[i].scaleProgress));
            // if(TileData.content[i].flipProgress>=1) TileData.content[i].backbox.render(ctx, repeatx, repeaty, this.zoom*(TileData.content[i].scale+TileData.content[i].scaleProgress));
          //  };

          repeatx+=totalWorldWidth*this.zoom; //and scale
          repeatwtx+=totalWorldWidth;
        } while(repeatx<=canvas.width);
        repeaty+=totalWorldHeight*this.zoom; //and scale
        repeatwty+=totalWorldHeight;
      } while(repeaty<=canvas.height);

    };
    var blid;
    ////  LAST PASS: ANY SCALE WHILE FLIPPING TILES ONLY

    for(i=0; i<TileData.content.length; i++) {
      x=-Math.floor(this.camera.x);
      wtx=Math.floor(Math.floor(this.camera.x)/totalWorldWidth)*totalWorldWidth;
      if(x>0) wtx+=totalWorldWidth;
      x%=totalWorldWidth;
      x-=totalWorldWidth*Math.ceil(canvas.width/(totalWorldWidth*this.zoom*2));
      wtx-=totalWorldWidth*Math.ceil(canvas.width/(totalWorldWidth+this.squareWidth*this.zoom*2));
      x+=TileData.content[i].position.x*this.squareWidth;
      wtx+=TileData.content[i].position.x*this.squareWidth;

      y=-Math.floor(this.camera.y);
      wty=Math.floor(Math.floor(this.camera.y)/totalWorldHeight)*totalWorldHeight;
      if(y>0) wty+=totalWorldHeight;
      y%=totalWorldHeight;
      y-=totalWorldHeight*Math.ceil(canvas.height/(totalWorldHeight*this.zoom*2));
      wty-=totalWorldHeight*Math.ceil(canvas.height/(totalWorldHeight*this.zoom*2));
      y+=TileData.content[i].position.y*this.squareHeight;
      wty+=TileData.content[i].position.y*this.squareHeight;

      var repeatx,repeaty=(y-(this.zoomPos.y))*this.zoom+this.zoomPos.y, drawAngle;
      var repeatwtx,repeatwty=wty;
      do {
        repeatx=(x-(this.zoomPos.x))*this.zoom+this.zoomPos.x;
        repeatwtx=wtx;
        do {
      //collision with screen. whether it's worth drawing or not
      //    if(repeatx>(-TileData.content[i].scale*this.squareWidth*this.zoom) && repeatx<canvas.width && repeaty>(-TileData.content[i].scale*this.squareHeight*this.zoom) && repeaty<canvas.height){
            //what to draw depending on data

            if(TileData.content[i].flipProgress>0 && TileData.content[i].flipProgress<1) {
              if(TileData.content[i].actionX==repeatwtx && TileData.content[i].actionY==repeatwty) {
                if(TileData.content[i].flipProgress<0.5) {
                  //render the front side to offscreen buffer
                  drawAngle=TileData.content[i].flipProgress*180; //0-90 degrees
                  TileData.content[i].box.render(this.offScreenCtx, 0, 0, TileData.content[i].scale);
                } else {
                  //render the back side to offscreen buffer
                  drawAngle=TileData.content[i].flipProgress*180+0; //90 to 180 degrees
                  TileData.content[i].backbox.render(this.offScreenCtx, 0, 0, TileData.content[i].scale);
                };
                //perspective draw from offscreen buffer to canvas
                this.drawImagePerspective(this.offScreenCtx,this.squareWidth*TileData.content[i].scale,this.squareHeight*TileData.content[i].scale,ctx,repeatx,repeaty,this.zoom*(1+TileData.content[i].scaleProgress),drawAngle);
              } else {
                TileData.content[i].box.render(ctx, repeatx, repeaty, this.zoom*TileData.content[i].scale);
              };
            };
            // if(TileData.content[i].flipProgress<=0) TileData.content[i].box.render(ctx, repeatx, repeaty, this.zoom*(TileData.content[i].scale+TileData.content[i].scaleProgress));
            // if(TileData.content[i].flipProgress>=1) TileData.content[i].backbox.render(ctx, repeatx, repeaty, this.zoom*(TileData.content[i].scale+TileData.content[i].scaleProgress));
          //  };

          repeatx+=totalWorldWidth*this.zoom; //and scale
          repeatwtx+=totalWorldWidth;
        } while(repeatx<=canvas.width);
        repeaty+=totalWorldHeight*this.zoom; //and scale
        repeatwty+=totalWorldHeight;
      } while(repeaty<=canvas.height);

    };
    ctx.font="bold 30px Arial";
    ctx.fillStyle="white";
    ctx.fillText(Math.floor(this.camera.x)+","+Math.floor(this.camera.y),5,5);

    ctx.fillText(Math.floor(this.camera.x/totalWorldWidth),5,30);
              
    ctx.restore();
  };

  return Grid;

});
