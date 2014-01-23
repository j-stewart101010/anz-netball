/*global define*/
define([
        'jquery',
        'config/config',
        'models/tile',
        'modules/grid-button',
        'modules/double-spring',
        'modules/box',
], function ($, Config, model, GridButton, DoubleSpring, Box) {
  'use strict';
  var Grid = function (w, h) {
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
	  this.squareWidth = 350;
	  this.squareHeight = 350;

 	  this.resize(w, h);

	  this.fliptile = {
	   	x: 0,
	   	y: 0,
	   	xi: 1,
	   	yi: 1,
	   	angle: 0
	  };

    this.zoom = 0.05;
    this.lastButton = 0;
    this.mouseHover = -1;

    this.offScreen = document.createElement("canvas"); 
    this.offScreen.width = 500;// this.squareWidth; 
    this.offScreen.height = 500;//this.squareHeight;
    this.offScreenCtx = canvas.getContext("2d");//this.offScreen.getContext("2d");

    for(var i=0;i<model.content.length;i++) {
      switch(model.content[i].tiletype) {
        case "text":
        //break;
        case "textlink":
          model.content[i].box = new Box(this.offScreenCtx, [], {width:350,height:350,contentType:"container"});
          model.content[i].box.addBox(new Box(this.offScreenCtx, "", {width:100,height:100,contentType:"text",backgroundColour:model.content[i].colour}));
          model.content[i].box.addBox(new Box(this.offScreenCtx, model.content[i].title, {left:10,width:80,top:10,padding:5,fontSize:35,lineHeight:40,contentType:"text",align:"center"}));
          model.content[i].box.addBox(new Box(this.offScreenCtx, model.content[i].subtext, {left:10,width:80,top:35,padding:5,fontSize:15,lineHeight:17,contentType:"text",align:"center"}));
          model.content[i].box.calculate();
          console.log(model.content[i].box.last().bottom);
          model.content[i].box.addBox(new Box(this.offScreenCtx, model.content[i].image, {width:100,top:60,left:30,align:"center",contentType:"image"}));
          model.content[i].box.calculate();
          console.log(model.content[i].box);
          // this.offScreenCtx.font = this.titleFont;
          // model.content[i].titlesplit = this.splitText(this.offScreenCtx,this.squareWidth*0.86,model.content[i].title);
          // this.offScreenCtx.font = this.subTextFont
          // model.content[i].subtextsplit = this.splitText(this.offScreenCtx,this.squareWidth*0.86,model.content[i].subtext);
        break;
        case "image":
        model.content[i].box = new Box(this.offScreenCtx, [], {width:350,height:350,contentType:"container"});
        model.content[i].box.addBox(new Box(this.offScreenCtx, model.content[i].image, {width:100,height:100,contentType:"image"}));
        model.content[i].box.calculate();
        break;
        case "video":
        model.content[i].box = new Box(this.offScreenCtx, [], {width:350,height:350,contentType:"container"});
        model.content[i].box.addBox(new Box(this.offScreenCtx, model.content[i].image, {width:100,height:100,contentType:"image"}));
        model.content[i].box.addBox(new Box(this.offScreenCtx, "", {width:100,height:100,contentType:"text",backgroundColour:"rgba(70,145,185,0.11)"}));
        model.content[i].box.addBox(new Box(this.offScreenCtx, "VIDEO: " + model.content[i].textname, {contentType:"text",left:8.5,top:10,width:80,padding:5,fontSize:9,backgroundColour:"rgba(60,0,0,0.35)"}));
        model.content[i].box.addBox(new Box(this.offScreenCtx, model.content[i].textsubject, {contentType:"text",left:8.5,top:17.5,width:80,padding:5,fontSize:22,backgroundColour:"rgba(0,60,0,0.35)"}));
        model.content[i].box.addBox(new Box(this.offScreenCtx, model.content[i].subimage, {left:8.5,top:75,contentType:"image"}));
        console.log(model.content[i].box);
        model.content[i].box.calculate();
      };
    
      if(model.content[i].flippable) {
        switch(model.content[i].backtype) {
          case "text":
            // this.offScreenCtx.font = this.titleFont;
            // model.content[i].backtitlesplit = this.splitText(this.offScreenCtx,this.squareWidth*0.86,model.content[i].backtitle);
            // this.offScreenCtx.font = this.subTextFont;
            // model.content[i].backsubtextsplit = this.splitText(this.offScreenCtx,this.squareWidth*0.86,model.content[i].backsubtext);
          break;
          case "image":
          case "textlink":
          case "video":
            //no tiles of this type yet
        };
      };
    };
	};

	Grid.constructor = Grid;

	Grid.prototype.resize = function (w, h) {
	  console.log("Grid.resize " + w + "x" + h);
	  this.width = w;
	  this.height = h;
	};

	

  Grid.prototype.renderTile = function (ctx, drawx, drawy, drawScale, modelIndex) {
    var sizex=this.squareWidth*model.content[modelIndex].scale*drawScale,
        sizey=this.squareHeight*model.content[modelIndex].scale*drawScale,
        tScale=model.content[modelIndex].scale*drawScale;

    var cx,cy;

    if(model.content[modelIndex].flippable && model.content[modelIndex].flipped) {
    //// tile is flipped
      switch(model.content[i].backtype) {
        case "text": //

        break;
        case "image":
          //no tiles of this type yet
        break;
        case "textlink":
          //no tiles of this type yet
        break;
        case "video":
          //no tiles of this type yet
      };
    } else {
    //// tile is unflipped
      switch(model.content[modelIndex].tiletype) {
        case "text":
        case "textlink":
         model.content[modelIndex].box.render(ctx, drawx, drawy, drawScale*model.content[modelIndex].scale);

          // cx=drawx+(this.squareWidth-model.content[modelIndex].image.width)*0.5*tScale; //centre the image
          // ctx.drawImage(model.content[modelIndex].image,cx,cy,model.content[modelIndex].image.width*tScale,model.content[modelIndex].image.height*tScale);

        break;
        case "image":
          // ctx.drawImage(model.content[modelIndex].image,drawx,drawy,sizex,sizey);
          //console.log("render object index "+modelIndex);
          model.content[modelIndex].box.render(ctx, drawx, drawy, drawScale*model.content[modelIndex].scale);
        break;
        case "video":
          model.content[modelIndex].box.render(ctx, drawx, drawy, drawScale*model.content[modelIndex].scale);
       };
    };
  };

	Grid.prototype.render = function (ctx) {
    //console.log("render");
    ctx.save();
    
  //use the difference to move the camera when holding
    if(Config.mouse.button) {
    	this.camera.momentumx = (this.mousefollow.x-Config.mouse.x)*0.4;
    	this.camera.momentumy = (this.mousefollow.y-Config.mouse.y)*0.4;       	
    };

    this.recalculateinterval++;
    this.recalculateinterval%=120;
    if(this.recalculateinterval==0) {
      console.log("recalculate");
      for(var i=0;i<model.content.length;i++) {
         model.content[i].box.calculate();
      };
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

    this.mousefollow.x+=(Config.mouse.x-this.mousefollow.x)*0.4;
    this.mousefollow.y+=(Config.mouse.y-this.mousefollow.y)*0.4;

    // if(this.lastButton!=Config.mouse.button && Config.mouse.button!=0){
    //   console.log("Index: "+this.mouseHover);
    //   console.log(model.content[this.mouseHover].titlesplit);
    //   console.log(model.content[this.mouseHover].subtextsplit);
    // };

    var desiredZoom=1-Math.pow(this.camera.momentumx*this.camera.momentumx+this.camera.momentumy*this.camera.momentumy,0.4)/70;
    if(desiredZoom<.3) desiredZoom=.3;
    this.zoom+=(desiredZoom-this.zoom)*0.2;

    this.lastButton = Config.mouse.button;


    this.fliptile.angle++;
    this.fliptile.angle%=360;

    var x,y;
    var totalWorldWidth=model.worldWidth*this.squareWidth;
    var totalWorldHeight=5*this.squareHeight; //todo: make this dynamic later

    ctx.fillStyle = "#004165"
    ctx.fillRect(0,0,canvas.width, canvas.height);

    for(i=0; i<model.content.length; i++) {
      x=Math.round(model.content[i].position.x*this.squareWidth-this.camera.x);
      y=Math.round(model.content[i].position.y*this.squareHeight-this.camera.y);

      x%=totalWorldWidth;
      if(x<0) x+=totalWorldWidth;
      if(x>=(totalWorldWidth-model.content[i].scale*this.squareWidth)) x-=totalWorldWidth;
      x-=totalWorldWidth*Math.ceil(canvas.width/(totalWorldWidth*this.zoom*2));

      y%=totalWorldHeight;
      if(y<0) y+=totalWorldHeight;
      if(y>=(totalWorldHeight-model.content[i].scale*this.squareHeight)) y-=totalWorldHeight;
      y-=totalWorldHeight*Math.ceil(canvas.height/(totalWorldHeight*this.zoom*2));

      var repeatx,repeaty=(y-(canvas.height*0.5))*this.zoom+canvas.height*0.5;
      do {
        repeatx=(x-(canvas.width*0.5))*this.zoom+canvas.width*0.5;
        do {
      //collision with screen. whether it's worth drawing or not
          if(repeatx>(-model.content[i].scale*this.squareWidth*this.zoom) && repeatx<canvas.width && repeaty>(-model.content[i].scale*this.squareHeight*this.zoom) && repeaty<canvas.height){
        //what to draw depending on data
          //this.renderTile(ctx,x,y,.8+0.2*Math.sin(this.fliptile.angle*0.01745329252),i);// = function (ctx, drawx, drawy, drawScale, modelIndex)
            this.renderTile(ctx,repeatx,repeaty,this.zoom,i);// = function (ctx, drawx, drawy, drawScale, modelIndex)
          };
      
          //collision with mouse
          if(Config.mouse.x>=repeatx && Config.mouse.x<(repeatx+model.content[i].scale*this.squareWidth*this.zoom) && (Config.mouse.y-this.canvasOffset)>=repeaty && (Config.mouse.y-this.canvasOffset)<(repeaty+model.content[i].scale*this.squareHeight*this.zoom)) {
            //a little darker overlay
            ctx.fillStyle="rgba(0,0,0,.35)";
            ctx.fillRect(repeatx,repeaty,model.content[i].scale*this.squareWidth*this.zoom,model.content[i].scale*this.squareWidth*this.zoom);
            this.mouseHover = i;
          };

          repeatx+=totalWorldWidth*this.zoom; //and scale
        } while(repeatx<=canvas.width);
        repeaty+=totalWorldHeight*this.zoom; //and scale
      } while(repeaty<=canvas.height);

    };

              
    ctx.restore();
  };

  return Grid;
});