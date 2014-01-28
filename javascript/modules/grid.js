/*global define*/
define([
        'jquery',
        'config/config',
        'models/tile',
        'modules/grid-button',
        'modules/double-spring',
        'modules/box',
        'views/video-embed',
        'bootstrap_transition',    
        'bootstrap_modal',        
], function ($, Config, model, GridButton, DoubleSpring, Box, VideoEmbedView) {
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
    this.dampZoom=0.01;
    this.zoomPos={x:canvas.width/2,y:canvas.height/2};

    _self.flippedVideoTile=0;

    this.lastButton = 0;
    this.mouseHoverIndex = -1;
    this.mouseHoverWorldX = 0;
    this.mouseHoverWorldY = 0;
    this.mouseHoverTileX = 0;
    this.mouseHoverTileY = 0;


    for(var i=0;i<model.content.length;i++) {
      switch(model.content[i].tiletype) {
        case "text":
        //break;
        case "textlink":
          model.content[i].box = new Box(this.offScreenCtx, [], {width:this.squareWidth,height:this.squareHeight,contentType:"container"});
          model.content[i].box.addBox(new Box(this.offScreenCtx, "", {width:100,height:100,contentType:"text",backgroundColour:model.content[i].colour}));
          model.content[i].box.addBox(new Box(this.offScreenCtx, model.content[i].title, {left:10,width:80,top:10,padding:5,fontSize:35,lineHeight:40,contentType:"text",align:"center"}));
          model.content[i].box.addBox(new Box(this.offScreenCtx, model.content[i].subtext, {left:10,width:80,top:35,padding:5,fontSize:15,lineHeight:17,contentType:"text",align:"center"}));
          model.content[i].box.calculate();
          model.content[i].box.addBox(new Box(this.offScreenCtx, model.content[i].image, {width:100,top:60,left:0,align:"center",contentType:"image",id:"button"}));
          model.content[i].box.calculate();
        break;
        case "image":
          model.content[i].box = new Box(this.offScreenCtx, [], {width:this.squareWidth,height:this.squareHeight,contentType:"container"});
          model.content[i].box.addBox(new Box(this.offScreenCtx, model.content[i].image, {width:100,height:100,contentType:"image"}));
          model.content[i].box.calculate();

          model.content[i].backbox = new Box(this.offScreenCtx, [], {width:this.squareWidth,height:this.squareHeight,contentType:"container"});
          model.content[i].backbox.addBox(new Box(this.offScreenCtx, "", {width:100,height:100,contentType:"text",backgroundColour:model.content[i].backcolour}));
          model.content[i].backbox.addBox(new Box(this.offScreenCtx, model.content[i].storyimage, {top:25,left:5,width:13,height:13,contentType:"image"}));
          model.content[i].backbox.addBox(new Box(this.offScreenCtx, model.content[i].storyusername, {top:25,left:21,width:60,padding:0,fontSize:10,fontstyle:"bold",contentType:"text",align:"left"}));
          model.content[i].backbox.calculate();
          model.content[i].backbox.addBox(new Box(this.offScreenCtx, model.content[i].storyfullname, {top:model.content[i].backbox.last().bottom,left:21,width:60,padding:5,fontSize:7,lineHeight:40,contentType:"text",align:"left"}));
          model.content[i].backbox.calculate();
          model.content[i].backbox.addBox(new Box(this.offScreenCtx, model.content[i].storyuserinfo, {top:model.content[i].backbox.last().bottom,left:21,width:60,padding:5,fontSize:7,contentType:"text",align:"left"}));
          model.content[i].backbox.calculate();
          model.content[i].backbox.addBox(new Box(this.offScreenCtx, model.content[i].storydescription, {top:model.content[i].backbox.last().bottom,left:21,width:60,padding:5,fontSize:13,contentType:"text",align:"left"}));
          model.content[i].backbox.calculate();
          model.content[i].backbox.addBox(new Box(this.offScreenCtx, model.content[i].storytags, {top:model.content[i].backbox.last().bottom,left:21,width:80,padding:5,fontSize:10,contentType:"text",align:"left"}));
          model.content[i].backbox.calculate();
        break;
        case "video":
          model.content[i].box = new Box(this.offScreenCtx, [], {width:this.squareWidth,height:this.squareHeight,contentType:"container"});
          model.content[i].box.addBox(new Box(this.offScreenCtx, model.content[i].image, {width:100,height:100,contentType:"image"}));
          model.content[i].box.addBox(new Box(this.offScreenCtx, "", {width:100,height:100,contentType:"text",backgroundColour:"rgba(70,145,185,0.11)"}));
          model.content[i].box.addBox(new Box(this.offScreenCtx, "VIDEO: " + model.content[i].textname, {contentType:"text",left:8.5,top:10,width:80,padding:5,fontSize:9,backgroundColour:"rgba(60,0,0,0.35)"}));
          model.content[i].box.addBox(new Box(this.offScreenCtx, model.content[i].textsubject, {contentType:"text",left:8.5,top:17.5,width:80,height:20,padding:5,fontSize:22,backgroundColour:"rgba(0,60,0,0.35)"}));
          model.content[i].box.addBox(new Box(this.offScreenCtx, model.content[i].subimage, {left:8.5,top:75,contentType:"image"}));
          model.content[i].box.calculate();
    
          model.content[i].backbox = new Box(this.offScreenCtx, [], {width:this.squareWidth,height:this.squareHeight,contentType:"container"});
          model.content[i].backbox.addBox(new Box(this.offScreenCtx, "", {width:100,height:100,contentType:"text",backgroundColour:"rgb(0,0,0)"}));
          model.content[i].backbox.calculate();
        };
    
      
        model.content[i].flipProgress=0;
        model.content[i].flipDirection=0;
        model.content[i].scaleProgress=0;
        model.content[i].scaleDirection=0;
        model.content[i].actionX=0;
        model.content[i].actionY=0;
    
    };
	};

	Grid.constructor = Grid;

	Grid.prototype.resize = function (w, h) {
    this.defaultZoom = 0.6 + (canvas.width / 10000);
	  this.width = w;
	  this.height = h;
    this.zoomPos={x:w/2,y:h/2};
	};

  Grid.prototype.closedModal = function() {
    console.log('unflipped ' + _self.flippedVideoTile);
    model.content[_self.flippedVideoTile].flipDirection = -0.027;
  };

  Grid.prototype.sentClick = function() {
    var i=this.mouseHoverIndex;
    if(i<0) return;
    console.log("Clicked "+i);
    
    if(model.content[i].flippable) {
      //scan through model data and flip&scale back any others that were flipped
      


      if(model.content[i].tiletype=="image") {
        // if(model.content[i].scaleProgress==1 || model.content[i].scaleDirection>0) {
        //   if(model.content[i].flipProgress==1 || model.content[i].flipDirection>0) {
        //     //flipped or flipping to and scaled or scaling up
        //     model.content[i].flipDirection = -0.027;
        //     model.content[i].scaleDirection = -0.027;
        //   };
        //   if(model.content[i].flipProgress==0 || model.content[i].flipDirection<0) {
        //     //unflipped or flipping from and scaled or scaling up
        //     model.content[i].flipDirection = 0.027;         
        //   };
        // };
        // if(model.content[i].scaleProgress==0 || model.content[i].scaleDirection<0) {
        //   if(model.content[i].flipProgress==1 || model.content[i].flipDirection>0) {
        //     //flipped or flipping to and unscaled or scaling down
        //     //ok to be flipped and unscaled but this situation is usually triggered automatically somewhere else
        //     //default is flip back
        //     model.content[i].flipDirection = -0.027;
        //   };
        //   if(model.content[i].flipProgress==0 || model.content[i].flipDirection<0) {
        //     //unflipped or flipping from and unscaled or scaling down
        //     model.content[i].scaleDirection = 0.027;
        //   };       
        // };
        console.log("i:"+i+": "+"ScaleDirecshn:"+model.content[i].scaleDirection+" FlipDirecshn:"+model.content[i].flipDirection);
        console.log("ScaleProgress:"+model.content[i].scaleProgress+" FlipProgress:"+model.content[i].scaleProgress);

        if(model.content[i].scaleProgress==1 || model.content[i].scaleDirection>0) {
          if(model.content[i].flipProgress==1 && model.content[i].scaleProgress==1) {
            //scaled and flipped
            model.content[i].flipDirection = -0.027;
            model.content[i].scaleDirection = -0.027;
            console.log("scale downward and flip back");
            model.content[i].actionX=this.mouseHoverWorldX;
            model.content[i].actionY=this.mouseHoverWorldY;
          } else if(model.content[i].flipProgress==0 || model.content[i].flipDirection<0) {
            //scaled or scaling & flipping back/unflipped
            console.log("flip forward");
            model.content[i].flipDirection = 0.027;         
            model.content[i].actionX=this.mouseHoverWorldX;
            model.content[i].actionY=this.mouseHoverWorldY;
          };
        } else if (model.content[i].scaleProgress==0 || model.content[i].scaleDirection<0) {
          // if(model.content[i].flipProgress==1 || model.content[i].flipDirection>0) {
          //   //flipped or flipping to and unscaled or scaling down
          //   //ok to be flipped and unscaled but this situation is usually triggered automatically somewhere else
          //   //default is flip back
          //   model.content[i].flipDirection = -0.027;
          // };
          if(model.content[i].flipProgress==0 || model.content[i].flipDirection<0) {
            //unflipped or flipping from and unscaled or scaling down
            console.log("scale upward");
            
            model.content[i].scaleDirection = 0.027;
            model.content[i].actionX=this.mouseHoverWorldX;
            model.content[i].actionY=this.mouseHoverWorldY;
          };       
        };
      };

      if(model.content[i].tiletype=="video") {
        if(model.content[i].flipProgress==1 || model.content[i].flipDirection>0) {
          //flipped or flipping to and scaled or scaling up
          model.content[i].flipDirection = -0.027;
          model.content[i].actionX=this.mouseHoverWorldX;
          model.content[i].actionY=this.mouseHoverWorldY;
        };
        if(model.content[i].flipProgress==0 || model.content[i].flipDirection<0) {
          //unflipped or flipping from and scaled or scaling up
          model.content[i].flipDirection = 0.027;         
          model.content[i].actionX=this.mouseHoverWorldX;
          model.content[i].actionY=this.mouseHoverWorldY;

        };
        
        // _self.$content.find($(e.target).data('video-append')).append(view.render().el);
        // this.delegateEvents();

      };
      for(var j=0;j<model.content.length;j++){
        if(j!=i) {
          if(model.content[j].scaleProgress>0) model.content[j].scaleDirection = -0.027*4;
          if(model.content[j].flipProgress>0) model.content[j].flipDirection = -0.027*4;
        };
      };
    };
  };

  Grid.prototype.onFlip = function(modelIndex) {
    if(model.content[modelIndex].tiletype=="video") {

      _self.flippedVideoTile=modelIndex;
      $('body').append(new VideoEmbedView({ 
        modal : true,
        video_id : model.content[modelIndex].videoid
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
    
    //set up intervals
    var xint=-2*xskew*drawScale/srcWidth;
    var yint=-2*drawScale*yskew/srcWidth;
    var hint=-2*yint;

    //set up starting coordinates and height
    var x=dstDrawX+(srcWidth*0.5+xskew)*drawScale;
    var y=dstDrawY+(yskew*drawScale);
    var h=(srcHeight-2*yskew)*drawScale;
    //loop through each source column
    for(var i=0;i<srcWidth;i++) {
      //take a pixel-wide strip from the source, scale and position it on the destination buffer
      //shorthand if reverses source to prevent image being drawn backwards
      //Math.ceil(drawScale) draws wider bands if greater scaling is necessary
      dstCtx.drawImage(srcCtx.canvas, xint>0 ? i : srcWidth-i-1, 0, 1, srcHeight-1, x, y, Math.ceil(drawScale), h);
      //update coordinates and height
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
      console.log("recalculate");
      for(var i=0;i<model.content.length;i++) {
         model.content[i].box.calculate();
      };
    };

    this.mousefollow.x+=(Config.mouse.x-this.mousefollow.x)*0.4;
    this.mousefollow.y+=(Config.mouse.y-this.mousefollow.y)*0.4;
    
  //use the difference to move the camera when holding
    if(Config.mouse.button) {
    	this.camera.momentumx = (this.mousefollow.x-Config.mouse.x)*0.4;
    	this.camera.momentumy = (this.mousefollow.y-Config.mouse.y)*0.4;       	
    };

	  this.camera.x += this.camera.momentumx/this.zoom;
    this.camera.y += this.camera.momentumy/this.zoom;

    this.camera.momentumx *= 0.97;
	  this.camera.momentumy *= 0.97;
      
    if(Math.abs(this.camera.momentumx)<0.3) {
    	this.camera.momentumx = 0;
    	this.camera.x = Math.round(this.camera.x);	//Don't use Math.floor here. It causes weird behaviour.	
    };
    if(Math.abs(this.camera.momentumy)<0.3) {
    	this.camera.momentumy = 0;
    	this.camera.y = Math.round(this.camera.y);        	
    };


    // if(this.lastButton!=Config.mouse.button && Config.mouse.button!=0){
    //   console.log("Index: "+this.mouseHover);
    //   console.log(model.content[this.mouseHover].titlesplit);
    //   console.log(model.content[this.mouseHover].subtextsplit);
    // };

    var desiredZoom=this.defaultZoom-Math.pow(this.camera.momentumx*this.camera.momentumx+this.camera.momentumy*this.camera.momentumy,0.4)/70;
    if(desiredZoom<0.2) desiredZoom=0.2;
    this.zoom+=(desiredZoom-this.zoom)*this.dampZoom;
    this.dampZoom+=0.005;
    if(this.dampZoom>0.2) this.dampZoom=0.2;

    // if(!Config.mouse.button) {
    //   this.zoomPos.x+=((canvas.width/2)-this.zoomPos.x)*0.3;
    //   this.zoomPos.y+=((canvas.height/2)-this.zoomPos.y)*0.3;
    // } else {
    //   this.zoomPos.x+=(Config.mouse.x-this.zoomPos.x)*0.3;
    //   this.zoomPos.y+=(Config.mouse.y-this.zoomPos.y)*0.3;
    // };

    this.lastButton = Config.mouse.button;

    var x,y,wtx,wty;
    var totalWorldWidth=model.worldWidth*this.squareWidth;
    var totalWorldHeight=5*this.squareHeight; //todo: make this dynamic later

    ctx.fillStyle = "#004165"
    ctx.fillRect(0,0,canvas.width, canvas.height);

    for(i=0; i<model.content.length; i++) {
      model.content[i].scaleProgress+=model.content[i].scaleDirection;
      if(model.content[i].scaleProgress>1) {
        model.content[i].scaleProgress=1;
        model.content[i].scaleDirection=0;
        this.onScale(i);
      };
      if(model.content[i].scaleProgress<0) {
        model.content[i].scaleProgress=0;
        model.content[i].scaleDirection=0;
        this.onUnScale(i);
      };
      model.content[i].flipProgress+=model.content[i].flipDirection;
      if(model.content[i].flipProgress>1) {
        model.content[i].flipProgress=1;
        model.content[i].flipDirection=0;
        // console.log(this.camera.x, this.camera.y);
        // sqwidth * scale * zoom
        // console.log(model.content[i]);
        console.log(model.content[i].scale * this.squareWidth * this.zoom);
        this.onFlip(i);
      };
      if(model.content[i].flipProgress<0) {
        model.content[i].flipProgress=0;
        model.content[i].flipDirection=0;
        this.onUnFlip(i)
      };

      x=Math.round(model.content[i].position.x*this.squareWidth-this.camera.x);
      y=Math.round(model.content[i].position.y*this.squareHeight-this.camera.y);
      wtx=Math.floor(this.camera.x/totalWorldWidth);
      wty=Math.floor(this.camera.y/totalWorldHeight);
      
      //if(this.camera.x<0) { 
      //  wtx--;
      //};

      x%=totalWorldWidth;
      if(x<0) { 
        x+=totalWorldWidth;
      };
      if(x>=(totalWorldWidth-model.content[i].scale*this.squareWidth)) x-=totalWorldWidth;
      x-=totalWorldWidth*Math.ceil(canvas.width/(totalWorldWidth*this.zoom*2));
      //wtx-=Math.ceil(canvas.width/(totalWorldWidth*this.zoom*2));

      y%=totalWorldHeight;
      if(y<0) {
        y+=totalWorldHeight;
        wty--;
      };
      if(y>=(totalWorldHeight-model.content[i].scale*this.squareHeight)) y-=totalWorldHeight;
      y-=totalWorldHeight*Math.ceil(canvas.height/(totalWorldHeight*this.zoom*2));
      wty-=Math.ceil(canvas.height/(totalWorldHeight*this.zoom*2));
      var repeatx,repeaty=(y-(this.zoomPos.y))*this.zoom+this.zoomPos.y, drawAngle;
      var repeatwtx,repeatwty=wty;
      do {
        repeatx=(x-(this.zoomPos.x))*this.zoom+this.zoomPos.x;
        repeatwtx=wtx;
        do {
      //collision with screen. whether it's worth drawing or not
          //if(repeatx>(-model.content[i].scale*this.squareWidth*this.zoom) && repeatx<canvas.width && repeaty>(-model.content[i].scale*this.squareHeight*this.zoom) && repeaty<canvas.height){
            //what to draw depending on data
            // if(model.content[i].flipProgress>0 && model.content[i].flipProgress<1){
            //     if(model.content[i].flipProgress<0.5) {
            //       //render the front side to offscreen buffer
            //       drawAngle=model.content[i].flipProgress*180; //0-90 degrees
            //       model.content[i].box.render(this.offScreenCtx, 0, 0, model.content[i].scale);
            //     } else {
            //       //render the back side to offscreen buffer
            //       drawAngle=model.content[i].flipProgress*180+180; //90 to 180 degrees
            //       if(typeof(model.content[i].backbox)!="undefined") model.content[i].backbox.render(this.offScreenCtx, 0, 0, model.content[i].scale);
            //     };
            //     //perspective draw from offscreen buffer to canvas
            //     this.drawImagePerspective(this.offScreenCtx,this.squareWidth*model.content[i].scale,this.squareHeight*model.content[i].scale,ctx,repeatx,repeaty,this.zoom*(1+model.content[i].scaleProgress),drawAngle);
            // };

            //FIRST PASS: UNSCALED WHILE UNFLIPPED/FULLY-FLIPPED) TILES ONLY
            //if scale=0 and flipped=0 or flipped=1 or location not matching
              
          //if(model.content[i].scaleProgress==0 || model.content[i].actionX!=wtx || model.content[i].actionY!=wty) {
          if(model.content[i].scaleProgress==0) {
            if(model.content[i].flipProgress==0) model.content[i].box.render(ctx, repeatx, repeaty, this.zoom*model.content[i].scale);
            if(model.content[i].flipProgress==1) model.content[i].backbox.render(ctx, repeatx, repeaty, this.zoom*model.content[i].scale);
          };
          //};
      
          //collision with mouse
          if(Config.mouse.x>=repeatx && Config.mouse.x<(repeatx+model.content[i].scale*this.squareWidth*this.zoom) && (Config.mouse.y-this.canvasOffset)>=repeaty && (Config.mouse.y-this.canvasOffset)<(repeaty+model.content[i].scale*this.squareHeight*this.zoom)) {
            //a little darker overlay
            ctx.fillStyle="rgba(0,0,0,.35)";
            ctx.fillRect(repeatx,repeaty,model.content[i].scale*this.squareWidth*this.zoom,model.content[i].scale*this.squareWidth*this.zoom);
            this.mouseHoverIndex = i;
            this.mouseHoverWorldX=repeatwtx;
            this.mouseHoverWorldY=repeatwty;
            this.mouseHoverTileX=(Config.mouse.x-repeatx)/this.zoom;
            this.mouseHoverTileY=(Config.mouse.y-this.canvasOffset-repeaty)/this.zoom;
            ctx.fillStyle="green";
            ctx.beginPath();
            ctx.arc(repeatx+this.mouseHoverTileX*this.zoom, repeaty+this.mouseHoverTileY*this.zoom, 10, 0, Math.PI*2, true); 
            ctx.closePath();
            ctx.fill();
          };

          blid=wtx;// + model.content[i].position.x);
          //blid=model.content[i].position.x;

          ctx.font="bold 30px Arial";
          ctx.fillStyle="black";
          ctx.fillText(blid,repeatx,repeaty);


          repeatx+=totalWorldWidth*this.zoom; //and scale
          repeatwtx++;
        } while(repeatx<=canvas.width);
        repeaty+=totalWorldHeight*this.zoom; //and scale
        repeatwty++;
      } while(repeaty<=canvas.height);

    };

////  SECOND PASS: SCALED/SCALING WHILE UNFLIPPED/FULLY-FLIPPED TILES ONLY
    for(i=0; i<model.content.length; i++) {
      x=Math.round(model.content[i].position.x*this.squareWidth-this.camera.x);
      y=Math.round(model.content[i].position.y*this.squareHeight-this.camera.y);
      wtx=x;
      wty=y;

      x%=totalWorldWidth;
      if(x<0) x+=totalWorldWidth;
      if(x>=(totalWorldWidth-model.content[i].scale*this.squareWidth)) x-=totalWorldWidth;
      x-=totalWorldWidth*Math.ceil(canvas.width/(totalWorldWidth*this.zoom*2));

      y%=totalWorldHeight;
      if(y<0) y+=totalWorldHeight;
      if(y>=(totalWorldHeight-model.content[i].scale*this.squareHeight)) y-=totalWorldHeight;
      y-=totalWorldHeight*Math.ceil(canvas.height/(totalWorldHeight*this.zoom*2));

      var repeatx,repeaty=(y-(this.zoomPos.y))*this.zoom+this.zoomPos.y, drawAngle;
      do {
        repeatx=(x-(this.zoomPos.x))*this.zoom+this.zoomPos.x;
        do {
      //collision with screen. whether it's worth drawing or not
      //    if(repeatx>(-model.content[i].scale*this.squareWidth*this.zoom) && repeatx<canvas.width && repeaty>(-model.content[i].scale*this.squareHeight*this.zoom) && repeaty<canvas.height){
            
          //if(model.content[i].scaleProgress>0 && model.content[i].actionX==wtx && model.content[i].actionY==wty) {
          if(model.content[i].scaleProgress>0) {
            if(model.content[i].flipProgress==0) model.content[i].box.render(ctx, repeatx, repeaty, this.zoom*(model.content[i].scale+model.content[i].scaleProgress));
            if(model.content[i].flipProgress==1) model.content[i].backbox.render(ctx, repeatx, repeaty, this.zoom*(model.content[i].scale+model.content[i].scaleProgress));
          };
            // //what to draw depending on data
            // if(model.content[i].flipProgress>0 && model.content[i].flipProgress<1){
            //     if(model.content[i].flipProgress<0.5) {
            //       //render the front side to offscreen buffer
            //       drawAngle=model.content[i].flipProgress*180; //0-90 degrees
            //       model.content[i].box.render(this.offScreenCtx, 0, 0, model.content[i].scale);
            //     } else {
            //       //render the back side to offscreen buffer
            //       drawAngle=model.content[i].flipProgress*180+180; //90 to 180 degrees
            //       if(typeof(model.content[i].backbox)!="undefined") model.content[i].backbox.render(this.offScreenCtx, 0, 0, model.content[i].scale);
            //     };
            //     //perspective draw from offscreen buffer to canvas
            //     this.drawImagePerspective(this.offScreenCtx,this.squareWidth*model.content[i].scale,this.squareHeight*model.content[i].scale,ctx,repeatx,repeaty,this.zoom*(1+model.content[i].scaleProgress),drawAngle);
            // };
            // if(model.content[i].flipProgress<=0) model.content[i].box.render(ctx, repeatx, repeaty, this.zoom*(model.content[i].scale+model.content[i].scaleProgress));
            // if(model.content[i].flipProgress>=1) model.content[i].backbox.render(ctx, repeatx, repeaty, this.zoom*(model.content[i].scale+model.content[i].scaleProgress));
          //  };

          repeatx+=totalWorldWidth*this.zoom; //and scale
        } while(repeatx<=canvas.width);
        repeaty+=totalWorldHeight*this.zoom; //and scale
      } while(repeaty<=canvas.height);

    };
    var blid;
    ////  LAST PASS: ANY SCALE WHILE FLIPPING TILES ONLY
    for(i=0; i<model.content.length; i++) {
      x=Math.round(model.content[i].position.x*this.squareWidth-this.camera.x);
      y=Math.round(model.content[i].position.y*this.squareHeight-this.camera.y);
      wtx=x;
      wty=y;

      x%=totalWorldWidth;
      if(x<0) x+=totalWorldWidth;
      if(x>=(totalWorldWidth-model.content[i].scale*this.squareWidth)) x-=totalWorldWidth;
      x-=totalWorldWidth*Math.ceil(canvas.width/(totalWorldWidth*this.zoom*2));

      y%=totalWorldHeight;
      if(y<0) y+=totalWorldHeight;
      if(y>=(totalWorldHeight-model.content[i].scale*this.squareHeight)) y-=totalWorldHeight;
      y-=totalWorldHeight*Math.ceil(canvas.height/(totalWorldHeight*this.zoom*2));

      var repeatx,repeaty=(y-(this.zoomPos.y))*this.zoom+this.zoomPos.y, drawAngle;
      do {
        repeatx=(x-(this.zoomPos.x))*this.zoom+this.zoomPos.x;
        do {
      //collision with screen. whether it's worth drawing or not
      //    if(repeatx>(-model.content[i].scale*this.squareWidth*this.zoom) && repeatx<canvas.width && repeaty>(-model.content[i].scale*this.squareHeight*this.zoom) && repeaty<canvas.height){
            //what to draw depending on data
            if(model.content[i].flipProgress>0 && model.content[i].flipProgress<1){
                if(model.content[i].flipProgress<0.5) {
                  //render the front side to offscreen buffer
                  drawAngle=model.content[i].flipProgress*180; //0-90 degrees
                  model.content[i].box.render(this.offScreenCtx, 0, 0, model.content[i].scale);
                } else {
                  //render the back side to offscreen buffer
                  drawAngle=model.content[i].flipProgress*180+0; //90 to 180 degrees
                  model.content[i].backbox.render(this.offScreenCtx, 0, 0, model.content[i].scale);
                };
                //perspective draw from offscreen buffer to canvas
                this.drawImagePerspective(this.offScreenCtx,this.squareWidth*model.content[i].scale,this.squareHeight*model.content[i].scale,ctx,repeatx,repeaty,this.zoom*(1+model.content[i].scaleProgress),drawAngle);
            };
            // if(model.content[i].flipProgress<=0) model.content[i].box.render(ctx, repeatx, repeaty, this.zoom*(model.content[i].scale+model.content[i].scaleProgress));
            // if(model.content[i].flipProgress>=1) model.content[i].backbox.render(ctx, repeatx, repeaty, this.zoom*(model.content[i].scale+model.content[i].scaleProgress));
          //  };
          repeatx+=totalWorldWidth*this.zoom; //and scale
        } while(repeatx<=canvas.width);
        repeaty+=totalWorldHeight*this.zoom; //and scale
      } while(repeaty<=canvas.height);

    };
    ctx.font="bold 30px Arial";
    ctx.fillStyle="white";
    ctx.fillText(this.camera.x/totalWorldWidth,5,5);
              
    ctx.restore();
  };

  return Grid;
});