/*global define*/
define([
        'jquery',
        'config/config',
        'collections/tiles-data',
        'modules/grid-button',
        'modules/interacted-tile',
        'modules/box',
        'views/video-embed',
        'event_aggregator',
        'bootstrap_transition',    
        'bootstrap_modal',
], function ($, Config, TileData, GridButton, InteractedTile, Box, VideoEmbedView, EventAggregator) {
  'use strict';

  var _self;

  var InteractedTile = function (info) {
    _self=this;

    this.boxes = info.boxes;
    this.tileType = info.tileType;
    this.offScreenCtx = info.offScreenCtx;
      
    this.flipProgress=0;
    this.flipDirection=0;
    this.currentFace=0;
    this.flipFace=1;
    this.flippable=info.flippable;
    //this.flipClose = false;
    this.scaleProgress=0;
    this.scaleDirection=0;
    this.worldX=info.worldX;
    this.worldY=info.worldY;
    this.scale=info.scale;
    this.modelIndex=info.modelIndex;
    this.mouseIsOver=false;

    this.overTime=0;
    this.hoverScale=0;
    this.removeCounter=1;
    this.pixelSize=info.pixelSize; 
  };

  InteractedTile.constructor = InteractedTile;

  InteractedTile.prototype.mouseOver = function (x, y) { //coordinates are local to the tile
    this.removeCounter=0;
    this.mouseIsOver=true;
    this.overTime++;
    
    //if(this.scaleProgress==0 && this.flipProgress==0) {
    this.hoverScale+=(0.1-this.hoverScale)*0.05;
    if(this.hoverScale>0.045) this.hoverScale=0.05;
    //};
    if(this.tileType=="fliplink") {
      if(this.flipProgress==0) {
        if(this.boxes[this.currentFace].hitTest(x/this.scale,y/this.scale)=="button") {
          canvas.style.cursor="pointer";
        };
      };        
      if(this.flipProgress==1) {
        if(this.boxes[this.flipFace].hitTest(x/this.scale,y/this.scale)=="button") {
          canvas.style.cursor="pointer";
         } 
      };
    };

    if(this.tileType=="textlink") {
      if(this.boxes[this.currentFace].hitTest(x/this.scale,y/this.scale)=="button") {
          canvas.style.cursor="pointer";
          
          //this.boxes[this.currentFace].getBox("button").content.src=Config.REMOTE_PATH + "/images/subimage-more-hover.png";

          //console.log(this.boxes[this.currentFace].getBox("button"));
      };      
    };

    if(this.tileType=="image" || this.tileType=="video") {
      canvas.style.cursor="pointer";
    };

  };

  InteractedTile.prototype.getCurrentSize = function () {
    return this.pixelSize*(this.scale+this.scaleProgress);
  };

  // InteractedTile.prototype.getRemoveStatus = function () {
  //   return this.removeFlag;
  // };

  InteractedTile.prototype.sentClick = function (x, y) {
    //console.log(TileData.content[this.modelIndex]);
    //if(this.flippable) {
      //scan through model data and flip&scale back any others that were flipped
      if(this.tileType=="textlink") {
        if(this.boxes[this.currentFace].hitTest(x/this.scale,y/this.scale)=="button") {
          window.location=TileData.content[this.modelIndex].linkurl;
        };
      };

      if(this.tileType=="fliplink") {
        if(this.flipProgress==0) {
          if(this.boxes[this.currentFace].hitTest(x/this.scale,y/this.scale)=="button") {
            this.flipDirection = 0.027;
          };
        };
        if(this.flipProgress==1) {
          if(this.boxes[this.flipFace].hitTest(x/this.scale,y/this.scale)=="button") {
            //take us there
            window.location=TileData.content[this.modelIndex].linkurl;
          };
        };
      };


      if(this.tileType=="image") {

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
        // console.log("i:"+i+": "+"ScaleDirecshn:"+TileData.content[i].scaleDirection+" FlipDirecshn:"+TileData.content[i].flipDirection);
        // console.log("ScaleProgress:"+TileData.content[i].scaleProgress+" FlipProgress:"+TileData.content[i].scaleProgress);


        if(this.scaleProgress==1 || this.scaleDirection>0) {

          if(this.flipProgress==1 && this.scaleProgress==1) {
            //scaled and flipped

            this.flipDirection = -0.027;
            this.scaleDirection = -0.027;
            console.log("scale downward and flip back");
          } else if(this.flipProgress==0 || this.flipDirection<0) {
            //scaled or scaling & flipping back/unflipped

            if(this.boxes[this.currentFace].hitTest(x/(this.scale+this.scaleProgress),y/(this.scale+this.scaleProgress))=="cornerarrow") {
              this.scaleDirection = -0.027;
              return;
            };
            
            console.log("flip forward");
            this.flipDirection = 0.027;         
            this.actionX=this.mouseHoverWorldX;
            this.actionY=this.mouseHoverWorldY;
          };
        } else if (this.scaleProgress==0 || this.scaleDirection<0) {
          // if(this.flipProgress==1 || this.flipDirection>0) {
          //   //flipped or flipping to and unscaled or scaling down
          //   //ok to be flipped and unscaled but this situation is usually triggered automatically somewhere else
          //   //default is flip back
          //   this.flipDirection = -0.027;
          // };
          if(this.flipProgress==0 || this.flipDirection<0) {
            //unflipped or flipping from and unscaled or scaling down
            // console.log("scale upward");
            
            this.scaleDirection = 0.027;
            this.actionX=this.mouseHoverWorldX;
            this.actionY=this.mouseHoverWorldY;
          };       
        };
      };
      
      if(this.tileType=="video") {

        if(this.flipProgress==1) {
          //flipped or flipping to and scaled or scaling up
          this.flipDirection = -0.027;

        };
        if(this.flipProgress==0) {
          //unflipped or flipping from and scaled or scaling up
          this.flipDirection = 0.027;         

          // this.dragDisabled=36;
          // this.centering=36;
          // this.centerSize=500;
          // this.centerZoom=this.centerSize/(TileData.content[i].scale*this.squareWidth);

          // this.centerX=this.mouseHoverWorldX;//+TileData.content[i].scale*this.squareWidth*0.5;
          // this.centerY=this.mouseHoverWorldY;//+TileData.content[i].scale*this.squareHeight*0.5;
          
        };
        
      };
      // for(var j=0;j<TileData.contentLength;j++){
      //   if(j!=i) {
      //     if(TileData.content[j].scaleProgress>0) TileData.content[j].scaleDirection = -0.027;
      //     if(TileData.content[j].flipProgress>0) TileData.content[j].flipDirection = -0.027;
      //   };
      // };
   // };
  };

  InteractedTile.prototype.onScale = function() {

  };

  InteractedTile.prototype.onUnScale = function() {

  };

  InteractedTile.prototype.onFlip = function() {
    if(this.tileType=="video") {
      if(this.flipProgress==1) {

        EventAggregator.publish('grid.pause');

        $('body').append(new VideoEmbedView({
          modal : true,
          video_id : TileData.content[this.modelIndex].videoid
        }).render().el);
      }
      //if(this.currentFace==1) this.flipFace=0;
      //if(this.currentFace==0) this.flipFace=1;
      //this.renderDisabled=true;

    };
    if(this.tileType=="image") {
      //if(this.currentFace==1) this.flipFace=0;
      //if(this.currentFace==0) this.flipFace=1;
    };

  };

  InteractedTile.prototype.process = function () {
    this.scaleProgress+=this.scaleDirection;
    if(this.scaleProgress>1) {
      this.scaleProgress=1;
      this.scaleDirection=0;
      this.onScale();
    };
    if(this.scaleProgress<0) {
      this.scaleProgress=0;
      this.scaleDirection=0;
      this.onUnScale();
    };
    this.flipProgress+=this.flipDirection;
    if(this.flipProgress>1) {
      this.flipProgress=1;
      this.flipDirection=0;
      //this.currentFace=this.flipFace;
      this.onFlip();
    };
    if(this.flipProgress<0) {
      this.flipProgress=0;
      this.flipDirection=0;
    //  this.currentFace=this.flipFace;
      // this.onUnFlip();
    };

    if(!this.mouseIsOver) {
      this.hoverScale-=this.hoverScale*0.1;
      if(this.hoverScale<0.0045) this.hoverScale=0;
      if(this.hoverScale==0 && this.scaleProgress==0 && this.flipProgress==0) {
        //if(this.removeCounter=59) console.log("about to destroy");
        this.removeCounter++;
      };
    };

    if(this.tileType=="image") {
      this.boxes[this.currentFace].getBox("cornerarrow").visible=this.scaleProgress>0?true:false;
      this.boxes[this.currentFace].getBox("overlay").visible=false;
       
    };

  };

  InteractedTile.prototype.render = function (ctx, drawx, drawy, drawScale) {
    
    var hoverOffset=this.pixelSize*drawScale*this.hoverScale*0.5;//this.pixelSize*(this.scale+this.scaleProgress)*this.hoverScale*0.5*drawScale;
    ctx.strokeStyle="#FFFFFF";
    ctx.lineWidth=1;
    if(this.flipProgress>0 && this.flipProgress<1){
      if(this.flipProgress<0.5) {
          //render the front side to offscreen buffer
        // this.boxes[this.currentFace].render(this.offScreenCtx,drawx,drawy,this.scale);
        this.boxes[this.currentFace].render(this.offScreenCtx, 0, 0, this.scale);
      } else {
        //render the back side to offscreen buffer
        this.boxes[this.flipFace].render(this.offScreenCtx, 0, 0, this.scale);
      };
      this.drawImagePerspective(this.offScreenCtx,this.pixelSize*this.scale,this.pixelSize*this.scale,ctx,drawx-hoverOffset,drawy-hoverOffset,drawScale*(1+this.scaleProgress+this.hoverScale),this.flipProgress*180);
      //this.scale*drawScale*(1+this.scaleProgress+this.hoverScale)
      
      var xskew = -this.pixelSize*this.scale*0.5*Math.cos(this.flipProgress*Math.PI);
      var yskew = -this.pixelSize*this.scale*0.13*Math.sin(this.flipProgress*Math.PI);
      // var x=drawx+(this.pixelSize*this.scale*0.5-xskew)*drawScale*(1+this.scaleProgress+this.hoverScale);
      // var y=dstDrawY-(yskew*drawScale*(1+this.scaleProgress+this.hoverScale));

      //var ph=(this.pixelSize*this.scale+yskew)this.pixelSize*tscale;
//drawx-hoverOffset,drawy-hoverOffset,this.pixelSize*drawScale*(this.scale+this.scaleProgress+this.hoverScale)
      // ctx.beginPath();
      // ctx.moveTo(drawx-hoverOffset+(this.pixelSize*this.scale*0.5+xskew)*drawScale*(1+this.scaleProgress+this.hoverScale),drawy-hoverOffset+(yskew*drawScale*(1+this.scaleProgress+this.hoverScale)));
      // ctx.lineTo(drawx+hoverOffset+(this.pixelSize*this.scale*0.5-xskew)*drawScale*(1+this.scaleProgress+this.hoverScale),drawy-hoverOffset-(yskew*drawScale*(1+this.scaleProgress+this.hoverScale)));
      // ctx.lineTo(drawx+hoverOffset+(this.pixelSize*this.scale*0.5-xskew)*drawScale*(1+this.scaleProgress+this.hoverScale),drawy+hoverOffset+(this.pixelSize*this.scale*drawScale+(yskew*drawScale*(1+this.scaleProgress+this.hoverScale)));
      // ctx.lineTo(drawx-hoverOffset+(this.pixelSize*this.scale*0.5+xskew)*drawScale*(1+this.scaleProgress+this.hoverScale),drawy+hoverOffset+this.pixelSize*this.scale*drawScale-(yskew*drawScale*(1+this.scaleProgress+this.hoverScale)));
      // ctx.lineTo(drawx-hoverOffset+(this.pixelSize*this.scale*0.5+xskew)*drawScale*(1+this.scaleProgress+this.hoverScale),drawy-hoverOffset+(yskew*drawScale*(1+this.scaleProgress+this.hoverScale)));
      // ctx.stroke();
      
    //             
    };
    if(this.flipProgress==0) this.boxes[this.currentFace].render(ctx, drawx-hoverOffset, drawy-hoverOffset, drawScale*(this.scale+this.scaleProgress+this.hoverScale));
    if(this.flipProgress==1) this.boxes[this.flipFace].render(ctx, drawx-hoverOffset, drawy-hoverOffset, drawScale*(this.scale+this.scaleProgress+this.hoverScale));

    if(this.flipProgress==0 || this.flipProgress==1) ctx.strokeRect(drawx-hoverOffset,drawy-hoverOffset,this.pixelSize*drawScale*(this.scale+this.scaleProgress+this.hoverScale),this.pixelSize*drawScale*(this.scale+this.scaleProgress+this.hoverScale));
  };

  InteractedTile.prototype.drawImagePerspective = function(srcCtx,srcWidth,srcHeight,dstCtx,dstDrawX,dstDrawY,drawScale,drawAngle) {
    //dimensions to skew to by circular angle
    var xskew = -srcWidth*0.5*Math.cos(drawAngle*Math.PI/180);
    var yskew = -srcHeight*0.13*Math.sin(drawAngle*Math.PI/180);
    var blklen=Math.floor(xskew/yskew);
    if(blklen<1) blklen=1;
    if(blklen>8) blklen=8;
    
    //set up intervals
    var xint=-2*xskew*drawScale/srcWidth;
    var yint=-2*drawScale*yskew/srcWidth;
    var hint=-2*yint;

    if(xskew<0) {
      xint=-xint;
      yint=-yint;
      hint=-hint;
      var x=dstDrawX+(srcWidth*0.5-xskew)*drawScale;
      var y=dstDrawY-(yskew*drawScale);
      var h=(srcHeight+2*yskew)*drawScale;
    } else {
          //set up starting coordinates and height
      var x=dstDrawX+(srcWidth*0.5+xskew)*drawScale;
      var y=dstDrawY+(yskew*drawScale);
      var h=(srcHeight-2*yskew)*drawScale;
    };
    xint*=blklen;
    yint*=blklen;
    hint*=blklen;


    //loop through each source column
    for(var i=0;i<srcWidth;i+=blklen) {
      //take a pixel-wide strip from the source, scale and position it on the destination buffer
      //shorthand if reverses source to prevent image being drawn backwards
      //Math.ceil(drawScale) draws wider bands if greater scaling is necessary
      // dstCtx.drawImage(srcCtx.canvas, xint>0 ? i : srcWidth-i-blklen, 0, blklen, srcHeight-1, Math.floor(x), Math.floor(y), Math.ceil(drawScale)*blklen, h);

      dstCtx.drawImage(srcCtx.canvas, xint>0 ? i : srcWidth-i, 0, Math.ceil(blklen), srcHeight-1, Math.floor(x), Math.floor(y), Math.ceil(drawScale*blklen), h);
      x+=xint;
      y+=yint;
      h+=hint;

    };
  };
 
  return InteractedTile;
});
