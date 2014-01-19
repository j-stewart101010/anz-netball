/*global define*/
define([
        'jquery',
        'config/config',
        'models/tile',
        'modules/grid-button',
        'modules/double-spring',
], function ($, Config, model, GridButton, DoubleSpring) {
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

    this.zoom = 1;
    this.lastButton = 0;
    this.mouseHover = -1;

    this.offScreen = document.createElement("canvas"); 
    this.offScreen.width = this.squareWidth; 
    this.offScreen.height = this.squareHeight;
    this.offScreenCtx = this.offScreen.getContext("2d");

    this.titleFont = Math.round(this.squareHeight*0.10)+"px Helvetica"; //10%
    this.subTextFont = Math.round(this.squareHeight*0.043)+"px Helvetica"; //4.3%

    console.log("titleFont="+this.titleFont);
    console.log("subTextFont="+this.subTextFont);


    for(var i=0;i<model.content.length;i++) {
      switch(model.content[i].tiletype) {
        case "text":
        case "textlink":
          this.offScreenCtx.font = this.titleFont;
          model.content[i].titlesplit = this.splitText(this.offScreenCtx,this.squareWidth*0.86,model.content[i].title);
          this.offScreenCtx.font = this.subTextFont
          model.content[i].subtextsplit = this.splitText(this.offScreenCtx,this.squareWidth*0.86,model.content[i].subtext);
        break;
        case "image":
        break;
        case "video":
        this.offScreenCtx.font = Math.round(this.squareHeight*0.0625)+"px Helvetica"; //6.25%;

        model.content[i].textsubjectsplit = this.splitText(this.offScreenCtx,this.squareWidth*model.content[i].scale*0.75,model.content[i].textsubject);
        console.log(model.content[i].textsubjectsplit);
      };
    
      if(model.content[i].flippable) {
        switch(model.content[i].backtype) {
          case "text":
            this.offScreenCtx.font = this.titleFont;
            model.content[i].backtitlesplit = this.splitText(this.offScreenCtx,this.squareWidth*0.86,model.content[i].backtitle);
            this.offScreenCtx.font = this.subTextFont;
            model.content[i].backsubtextsplit = this.splitText(this.offScreenCtx,this.squareWidth*0.86,model.content[i].backsubtext);
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

	Grid.prototype.splitText = function (context, maxLength, theText) {

    var words=theText.split(" "),
        lines=[],
        prevText=words[0],
        prevLength=context.measureText(words[0]).width,
        currLength=0;

    for (var i=1;i<words.length;i++) { //last loop is never reached
      if(words[i].length>0){
        
        currLength=context.measureText(prevText+words[i]).width;
        if (currLength<maxLength) {
            prevText+=(" "+words[i]);
            prevLength=currLength;
        } else {
            lines.push({width:prevLength,
                        text:prevText});
            prevText=words[i];
            prevLength=context.measureText(words[i]).width;
        };
        if (i==words.length-1) { //this prevents execution of the last loop
            lines.push({width:prevLength,
                        text:prevText});
            break;
        };
      };
    };
    if(words.length<=1) {  //this executes if there is only one word (the for loop doesn't execute)
      prevLength=context.measureText(words[0]).width;
      lines.push({width:prevLength,
                        text:words[0]});
    };
    return lines;
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
          ctx.fillStyle=model.content[modelIndex].colour;
          ctx.fillRect(drawx,drawy,sizex,sizey);
          cy=drawy+this.squareHeight*0.27*tScale;  //27% down the height of the tile
          ctx.font=this.titleFont;
          ctx.fillStyle = "white";
          if(tScale>.01) { 
            if(tScale!=1) ctx.scale(tScale,tScale);
            for(var i=0;i<model.content[modelIndex].titlesplit.length;i++) {
              cx=drawx+(this.squareWidth-model.content[modelIndex].titlesplit[i].width)*0.5*tScale; //centre the text
              ctx.fillText(model.content[modelIndex].titlesplit[i].text, cx/tScale, cy/tScale);
              cy+=this.squareHeight*0.137*tScale;
            };
            cy+=this.squareHeight*0.042*tScale;
            
            ctx.font=this.subTextFont;
            for(var i=0;i<model.content[modelIndex].subtextsplit.length;i++) {
              cx=drawx+(this.squareWidth-model.content[modelIndex].subtextsplit[i].width)*0.5*tScale; //centre the text
              ctx.fillText(model.content[modelIndex].subtextsplit[i].text, cx/tScale, cy/tScale);
              cy+=this.squareHeight*0.085*tScale;
            };
            if(tScale!=1) ctx.scale(1/tScale,1/tScale);
          };
          cx=drawx+(this.squareWidth-model.content[modelIndex].image.width)*0.5*tScale; //centre the image
          ctx.drawImage(model.content[modelIndex].image,cx,cy,model.content[modelIndex].image.width*tScale,model.content[modelIndex].image.height*tScale);

        break;
        case "image":
          ctx.drawImage(model.content[modelIndex].image,drawx,drawy,sizex,sizey);
        break;
        case "video":
          ctx.drawImage(model.content[modelIndex].image,drawx,drawy,sizex,sizey);
          //TODO:add text and overlays
          ctx.fillStyle="rgba(70,145,185,0.5)"; //full overlay
          ctx.fillRect(drawx,drawy,sizex,sizey);
          ctx.fillStyle="rgba(0,0,0,0.5)"; //dark overlays for text
          
          ctx.font = "bold "+ Math.round(this.squareHeight*0.024)+"px Helvetica"; //2.4% bold
          cx = ctx.measureText("VIDEO "+model.content[modelIndex].textname).width;//+sizex*0.16; //16% padding for text, cx used as width in this case
          cx*=tScale;
          cx+=sizex*0.10;
          ctx.fillRect(drawx+sizex*0.085,drawy+sizey*0.10,cx,sizey*0.065);
          cx=0;
          for(var i=0;i<model.content[modelIndex].textsubjectsplit.length;i++) { //find greatest width of the rows
            if(model.content[modelIndex].textsubjectsplit[i].width>cx) cx=model.content[modelIndex].textsubjectsplit[i].width;
          };
          cx*=tScale;
          cx+=sizex*0.10; //8% padding also
          ctx.fillRect(drawx+sizex*0.085,drawy+sizey*0.175,cx,model.content[modelIndex].textsubjectsplit.length*0.12*sizey);

          if(tScale>.01) {
            ctx.fillStyle="white";
            if(tScale!=1) ctx.scale(tScale,tScale);
            cx=drawx+sizex*0.125;
            cy=drawy+sizey*0.144;
            ctx.fillText("VIDEO", cx/tScale, cy/tScale);

            ctx.font = Math.round(this.squareHeight*0.024)+"px Helvetica"; //2.4% not bold
            cx=drawx+sizex*0.23;
            ctx.fillText(model.content[modelIndex].textname, cx/tScale, cy/tScale);

            ctx.font = Math.round(this.squareHeight*0.0625)+"px Helvetica"; //6.25%
            cx=drawx+sizex*0.125;
            cy=drawy+sizey*0.26;
            for(i=0;i<model.content[modelIndex].textsubjectsplit.length;i++) {
              ctx.fillText(model.content[modelIndex].textsubjectsplit[i].text, cx/tScale, cy/tScale);
              cy+=sizey*0.085;
            };
            
            if(tScale!=1) ctx.scale(1/tScale,1/tScale);
          };
          cx=drawx+sizex*0.08;
          cy=drawy+sizey*0.75;
          ctx.drawImage(model.content[modelIndex].subimage,cx,cy,model.content[modelIndex].subimage.width*tScale,model.content[modelIndex].subimage.height*tScale);
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
		
		this.camera.x += this.camera.momentumx;
        this.camera.y += this.camera.momentumy;

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
      this.lastButton = Config.mouse.button


	    // this.fliptile.x += this.fliptile.xi;
	    // this.fliptile.y += this.fliptile.yi;
	    // if(this.fliptile.x<=0) this.fliptile.xi=1;
	    // if(this.fliptile.y<=0) this.fliptile.yi=1;
	    // if(this.fliptile.x>=canvas.width-this.squareWidth) this.fliptile.xi=-1;
	    // if(this.fliptile.y>=canvas.height-this.squareHeight) this.fliptile.yi=-1;

	    // this.fliptile.angle+=1;
	    // this.fliptile.angle%=360;

	    // var textlength = 0,
	    //     message = "Tile";
	    // var scalex, scaley, overcolor, opacity;

	    // scalex = Math.abs(Math.cos(this.fliptile.angle*.01745329252));
	    // scaley = scalex
	    // opacity = 1-scalex;
	    //opacity*=.9;
            //console.log(canvas.width+"x"+canvas.height);
            ctx.fillStyle="#004165";
            ctx.fillRect(0,0,canvas.width,canvas.height);


//// FLIPPING HORIZONTAL
//                 if(this.fliptile.angle<90 || this.fliptile.angle>=270) {
// //frontside
//                 a.drawImage(model.content[2].image,this.fliptile.x+(1-scalex)*this.squareWidth*.5,this.fliptile.y,this.squareWidth*scalex,this.squareHeight);
//                 } else {
// //backside    
//                 a.fillStyle = model.content[2].backcolour;
//                 a.fillRect(this.fliptile.x+(1-scalex)*this.squareWidth*.5,this.fliptile.y,this.squareWidth*scalex,this.squareHeight);

//                 a.font="60px Arial";
//                 textlength = a.measureText(message).width;
//                 a.fillStyle = "white";
//                 if(scalex>.01) { 
//                     a.scale(scalex,1);
//                     a.fillText(message, (this.fliptile.x+this.squareWidth*.5-(textlength*.5*scalex))/scalex, this.fliptile.y+.5*this.squareHeight+30);
//                     a.scale(1/scalex,1);
//                 };

//                 };
//             a.fillStyle="rgba(0,0,0,"+opacity+")";
//             a.fillRect(this.fliptile.x+(1-scalex)*this.squareWidth*.5,this.fliptile.y,this.squareWidth*scalex,this.squareHeight);



// //// FLIPPING VERTICAL
//                 if(this.fliptile.angle<90 || this.fliptile.angle>=270) {
// //frontside
//                 a.drawImage(model.content[2].image,this.fliptile.x,this.fliptile.y+(1-scaley)*this.squareHeight*.5,this.squareWidth,this.squareHeight*scaley);
//                 } else {
// //backside    
//                 a.fillStyle = model.content[2].backcolour;
//                 a.fillRect(this.fliptile.x,this.fliptile.y+(1-scaley)*this.squareHeight*.5,this.squareWidth,this.squareHeight*scaley);

//                 a.font="60px Arial";
//                 textlength = a.measureText(message).width;
//                 a.fillStyle = "white";
//                 if(scaley>.01) { 
//                     a.scale(1,scaley);
//                     a.fillText(message, this.fliptile.x+(this.squareWidth-textlength)*.5, (this.fliptile.y+.5*this.squareHeight+30*scaley)/scaley);
//                     a.scale(1,1/scaley);
//                 };

//                 };
//             a.fillStyle="rgba(0,0,0,"+opacity+")";
//             a.fillRect(this.fliptile.x,this.fliptile.y+(1-scaley)*this.squareHeight*.5,this.squareWidth,this.squareHeight*scaley);

//         a.font="16px Arial";
//         a.fillStyle = "white";
//         a.fillText("Config: mousexy="+Config.mouse.x+","+Config.mouse.y+"  trackxy="+Config.track.x+","+Config.track.y+"  downAtxy="+Config.downAt.x+","+Config.downAt.y, 5,21);

//Draw a grid in place of the tiles
// a.strokeStyle = "white";
// var gl=349-(this.camera.x % 350);
// do{
//   a.beginPath();
//   a.moveTo(gl,0);
//   a.lineTo(gl,canvas.height);
//   a.stroke();
//   gl+=350;
// } while(gl<canvas.width);

// gl=349-(this.camera.y % 350);
// do{
//   a.beginPath();
//   a.moveTo(0,gl);
//   a.lineTo(canvas.width,gl);
//   a.stroke();
//   gl+=350;
// } while(gl<canvas.height);
  this.fliptile.angle++;
  this.fliptile.angle%=360;

var x,y;
var totalWorldWidth=model.worldWidth*this.squareWidth;
var totalWorldHeight=5*this.squareHeight; //todo: make this dynamic later

for(var i=0; i<model.content.length; i++) {
  x=Math.round(model.content[i].position.x*this.squareWidth-this.camera.x);
  y=Math.round(model.content[i].position.y*this.squareHeight-this.camera.y);

  // do {
  //   if(x<=(-model.content[i].scale*this.squareWidth)) x+=totalWorldWidth;
  //   if(x>=(totalWorldWidth-model.content[i].scale*this.squareWidth)) x-=totalWorldWidth;
  // } while(x<(-model.content[i].scale*this.squareWidth) || x>(totalWorldWidth-model.content[i].scale*this.squareWidth));
  
  // do {
  //   if(y<=(-model.content[i].scale*this.squareHeight)) y+=totalWorldHeight;
  //   if(y>=(totalWorldHeight-model.content[i].scale*this.squareHeight)) y-=totalWorldHeight;
  // } while(y<(-model.content[i].scale*this.squareHeight) || y>(totalWorldHeight-model.content[i].scale*this.squareHeight));

  x%=totalWorldWidth;
  if(x<0) x+=totalWorldWidth;
  if(x>=(totalWorldWidth-model.content[i].scale*this.squareWidth)) x-=totalWorldWidth;

  y%=totalWorldHeight;
  if(y<0) y+=totalWorldHeight;
  if(y>=(totalWorldHeight-model.content[i].scale*this.squareHeight)) y-=totalWorldHeight;


  //collision with screen. whether it's worth drawing or not
  if(x>(-model.content[i].scale*this.squareWidth) && x<canvas.width && y>(-model.content[i].scale*this.squareHeight) && y<canvas.height){
    //what to draw depending on data
      //this.renderTile(ctx,x,y,.6+0.4*Math.sin(this.fliptile.angle*0.01745329252),i);// = function (ctx, drawx, drawy, drawScale, modelIndex)
      this.renderTile(ctx,x,y,1,i);// = function (ctx, drawx, drawy, drawScale, modelIndex)

  };
  //collision with mouse
  if(Config.mouse.x>=x && Config.mouse.x<(x+model.content[i].scale*this.squareWidth) && (Config.mouse.y-this.canvasOffset)>=y && (Config.mouse.y-this.canvasOffset)<(y+model.content[i].scale*this.squareHeight)) {
  	//a little darker overlay
  	ctx.fillStyle="rgba(0,0,0,.35)";
  	ctx.fillRect(x,y,model.content[i].scale*this.squareWidth,model.content[i].scale*this.squareWidth);
    this.mouseHover = i;
  };
};


// var x, y, sx, sy;
// a.font="20px Arial";
// for(var i=0; i<model.content.length; i++) {
//   x=model.content[i].position.x*this.squareWidth/4;
//   y=model.content[i].position.y*this.squareHeight/4+30;
//   sx=model.content[i].scale*(this.squareWidth/4)-10;
//   sy=model.content[i].scale*(this.squareWidth/4)-10;

//   a.fillRect(x,y,sx,sy);
//   a.fillStyle="black";
//   a.fillText(i,x+30,y+30);

// };

 	// ctx.fillStyle="white";
  // 	ctx.fillText("Config: mousexy="+Config.mouse.x+","+Config.mouse.y+"  trackxy="+Config.track.x+","+Config.track.y+"  downAtxy="+Config.downAt.x+","+Config.downAt.y, 5,21);
  //   ctx.fillText("Grid: cameraxy= "+this.camera.x+", "+this.camera.y, 5,41);

                // a.scale(.5+Math.random()*2,.5+Math.random()*2);
                // a.font = "20pt Arial";
                // textlength = a.measureText(message).width;
                // a.fillStyle = "rgba(64,64,192,.75)"
                // a.fillRect(x,y-20,textlength,20);

                // a.fillStyle = "white";
                // a.fillText(message, x, y);

                // a.lineWidth = 2;
                // a.strokeStyle = "white"
                // a.beginPath();
                // a.moveTo(x,y);
                // a.lineTo(x+textlength,y);
                // a.stroke();

            // i = Math.floor(Math.random()*model.content.length)
            // if(model.content[i].image) {
            //     a.drawImage(model.content[i].image,Math.floor(Math.random()*canvas.width),Math.floor(Math.random()*canvas.height),50,50);
            // };
              
            ctx.restore();
        };

        return Grid;
});