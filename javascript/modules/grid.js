/*global define*/
define([
        'jquery',
        'config/config',
        'collections/tiles-data',
        'modules/grid-button',
        'modules/interacted-tile',
        'modules/box',
        'views/video-embed',
        'bootstrap_transition',    
        'bootstrap_modal',        
], function ($, Config, TileData, GridButton, InteractedTile, Box, VideoEmbedView) {
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

    // _self.flippedVideoTile=0;

    //this.lastButton = 0;
    this.mouseHoverInteract = false;
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

    this.interactingTiles=[];
    this.interactingTilesDestroyList=[];

    for(var i=0;i<TileData.content.length;i++) {
      switch(TileData.content[i].tiletype) {
        case "text":
        //break;
        case "textlink":
          TileData.content[i].box = new Box(this.offScreenCtx, [], {width:this.squareWidth,height:this.squareHeight,contentType:"container"});
          TileData.content[i].box.addBox(new Box(this.offScreenCtx, "", {width:100,height:100,contentType:"text",backgroundColour:TileData.content[i].colour}));
          TileData.content[i].box.addBox(new Box(this.offScreenCtx, TileData.content[i].title, {left:10,width:80,height:25,top:10,padding:0,fontSize:35,lineHeight:40,contentType:"text",align:"center"}));
          TileData.content[i].box.addBox(new Box(this.offScreenCtx, TileData.content[i].subtext, {left:10,width:80,height:25,top:35,padding:0,fontSize:15,lineHeight:17,contentType:"text",align:"center"}));
          TileData.content[i].box.calculate();
          TileData.content[i].box.addBox(new Box(this.offScreenCtx, TileData.content[i].image, {width:100,top:60,left:0,align:"center",contentType:"image",id:"button"}));
          TileData.content[i].box.calculate();

        case "fliplink":
          TileData.content[i].box = new Box(this.offScreenCtx, [], {width:this.squareWidth,height:this.squareHeight,contentType:"container"});
          TileData.content[i].box.addBox(new Box(this.offScreenCtx, "", {width:100,height:100,contentType:"text",backgroundColour:TileData.content[i].colour}));
          TileData.content[i].box.addBox(new Box(this.offScreenCtx, TileData.content[i].title, {left:10,width:80,height:25,top:10,padding:0,fontSize:35,lineHeight:40,contentType:"text",align:"center"}));
          TileData.content[i].box.addBox(new Box(this.offScreenCtx, TileData.content[i].subtext, {left:10,width:80,height:25,top:35,padding:0,fontSize:15,lineHeight:17,contentType:"text",align:"center"}));
          TileData.content[i].box.calculate();
          TileData.content[i].box.addBox(new Box(this.offScreenCtx, TileData.content[i].image, {width:100,top:60,left:0,align:"center",contentType:"image",id:"button"}));
          TileData.content[i].box.calculate(); 
                 
          TileData.content[i].backbox = new Box(this.offScreenCtx, [], {width:this.squareWidth,height:this.squareHeight,contentType:"container"});          
          TileData.content[i].backbox.addBox(new Box(this.offScreenCtx, "", {width:100,height:100,contentType:"text",backgroundColour:TileData.content[i].colour}));          
          TileData.content[i].backbox.calculate();
        break;
        case "image":
          TileData.content[i].box = new Box(this.offScreenCtx, [], {width:this.squareWidth,height:this.squareHeight,contentType:"container"});
          TileData.content[i].box.addBox(new Box(this.offScreenCtx, TileData.content[i].image, {width:100,height:100,contentType:"image"}));
          TileData.content[i].box.addBox(new Box(this.offScreenCtx, TileData.cornerArrow, {left:95.571,top:95.285,width:4.428,height:4.714,contentType:"image",opacity:0,visible:false,id:"cornerarrow"}));
          TileData.content[i].box.addBox(new Box(this.offScreenCtx, "", {left:95.571,top:95.285,width:4.428,height:4.714,contentType:"text",backgroundColour:"128,192,255",backgroundOpacity:1,opacity:0,visible:false,id:"cornerarrowoverlay"}));
          TileData.content[i].box.calculate();

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
        break;
        case "video":

          TileData.content[i].box = new Box(this.offScreenCtx, [], {width:this.squareWidth,height:this.squareHeight,contentType:"container"});
          TileData.content[i].box.addBox(new Box(this.offScreenCtx, TileData.content[i].image, {width:100,height:100,contentType:"image"}));
          TileData.content[i].box.addBox(new Box(this.offScreenCtx, "", {width:100,height:100,contentType:"text",backgroundColour:"70,145,185",backgroundOpacity:0.11}));
          TileData.content[i].box.addBox(new Box(this.offScreenCtx, "VIDEO: "+TileData.content[i].textname, {contentType:"text",left:8.5,top:10,width:80,height:25,padding:2,fontSize:9,backgroundColour:"0,0,0",backgroundOpacity:0.35,textunderlay:"fit"}));
          TileData.content[i].box.addBox(new Box(this.offScreenCtx, TileData.content[i].textsubject, {contentType:"text",left:8.5,top:20,width:80,height:20,padding:2,fontSize:22,backgroundColour:"0,0,0",backgroundOpacity:0.35,textunderlay:"fit"}));
          TileData.content[i].box.addBox(new Box(this.offScreenCtx, TileData.content[i].subimage, {left:7,top:85,contentType:"image",width:"original",height:"orignial"}));
          TileData.content[i].box.calculate();
   
          TileData.content[i].backbox = new Box(this.offScreenCtx, [], {width:this.squareWidth,height:this.squareHeight,contentType:"container"});
          TileData.content[i].backbox.addBox(new Box(this.offScreenCtx, "", {width:100,height:100,contentType:"text",backgroundColour:"0,0,0"}));
          TileData.content[i].backbox.calculate();
        };
    
      
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
    TileData.content[_self.flippedVideoTile].flipDirection = -0.027;
  };

  Grid.prototype.sentClick = function() {  
    var i=this.mouseHoverIndex;
    if(i<0) return;
    //console.log("Clicked "+i);
    //console.log(this.mouseHoverWorldX + ","+this.mouseHoverWorldY); 
    if(!this.mouseHoverInteract) return;
    if(this.interactingTiles[i].flippable) {     
      //scan through model data and flip&scale back any others that were flipped
      if(this.interactingTiles[i].tileType=="image" || this.interactingTiles[i].tileType=="fliplink") {
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

        // if(TileData.content[i].scaleProgress==1 || TileData.content[i].scaleDirection>0) {
        //   if(TileData.content[i].flipProgress==1 && TileData.content[i].scaleProgress==1) {
        //     //scaled and flipped

        //     TileData.content[i].flipDirection = -0.027;
        //     TileData.content[i].scaleDirection = -0.027;
        //     console.log("scale downward and flip back");
        //     TileData.content[i].actionX=this.mouseHoverWorldX;
        //     TileData.content[i].actionY=this.mouseHoverWorldY;
        //   } else if(TileData.content[i].flipProgress==0 || TileData.content[i].flipDirection<0) {
        //     //scaled or scaling & flipping back/unflipped
        //     console.log("flip forward");
        //     TileData.content[i].flipDirection = 0.027;         
        //     TileData.content[i].actionX=this.mouseHoverWorldX;
        //     TileData.content[i].actionY=this.mouseHoverWorldY;
        //   };
        // } else if (TileData.content[i].scaleProgress==0 || TileData.content[i].scaleDirection<0) {
        //   // if(TileData.content[i].flipProgress==1 || TileData.content[i].flipDirection>0) {
        //   //   //flipped or flipping to and unscaled or scaling down
        //   //   //ok to be flipped and unscaled but this situation is usually triggered automatically somewhere else
        //   //   //default is flip back
        //   //   TileData.content[i].flipDirection = -0.027;
        //   // };
        //   if(TileData.content[i].flipProgress==0 || TileData.content[i].flipDirection<0) {
        //     //unflipped or flipping from and unscaled or scaling down
        //     // console.log("scale upward");
            
        //     TileData.content[i].scaleDirection = 0.027;
        //     TileData.content[i].actionX=this.mouseHoverWorldX;
        //     TileData.content[i].actionY=this.mouseHoverWorldY;
        //   };       
        // };
        this.interactingTiles[i].sentClick(this.mouseHoverTileX,this.mouseHoverTileY);
      };

      if(this.interactingTiles[i].tileType=="video") {
          this.dragDisabled=36*2;
          this.centering=36;
          this.centerSize=500;
          this.centerZoom=this.centerSize/(this.interactingTiles[i].scale*this.squareWidth);

          this.centerX=this.mouseHoverWorldX;//+TileData.content[i].scale*this.squareWidth*0.5;
          this.centerY=this.mouseHoverWorldY;//+TileData.content[i].scale*this.squareHeight*0.5;
          this.interactingTiles[i].sentClick(this.mouseHoverTileX,this.mouseHoverTileY);
      };
      for(var j=0;j<this.interactingTiles.length;j++){
        if(j!=i) {
          if(this.interactingTiles[j].scaleProgress>0) this.interactingTiles[j].scaleDirection = -0.027;
          if(this.interactingTiles[j].flipProgress>0) this.interactingTiles[j].flipDirection = -0.027;
        };
      };
    };
  };

  // Grid.prototype.onFlip = function(modelIndex) {
  //   console.log(console.log(this.modelIndex));
  //   if(TileData.content[modelIndex].tiletype=="video") {
  //     //this.renderDisabled=true;
  //     _self.flippedVideoTile=modelIndex;
  //     $('body').append(new VideoEmbedView({ 
  //       modal : true,
  //       video_id : TileData.content[modelIndex].videoid
  //     }).render().el);
  //   };
  // };

  // Grid.prototype.onUnFlip = function(modelIndex) {
  // };

  // Grid.prototype.onScale = function(modelIndex) {
  // };

  // Grid.prototype.onUnScale = function(modelIndex) {
  // };

  Grid.prototype.render = function (ctx) {
    //console.log("render");
    ctx.save();
    var i,j;

    this.recalculateinterval++;
    this.recalculateinterval%=360;
    if(this.recalculateinterval==0) {
      // console.log("recalculate");
      for(i=0;i<TileData.content.length;i++) {
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

    this.camera.x += this.camera.momentumx/(this.zoom*0.75);
    this.camera.y += this.camera.momentumy/(this.zoom*0.75);
    
    var desiredZoom;
    if(this.centering>0) {
      this.centering--;
      //var blah math to do zooming and centering 
      desiredZoom=this.centerZoom;
      var cameraPropX=this.centerX-canvas.width*0.5+(this.centerSize*0.5)/this.centerZoom;//(-canvas.width*0.5)+this.centerX;
      var cameraPropY=this.centerY-canvas.height*0.5+(this.centerSize*0.5)/this.centerZoom+(window.innerHeight || document.documentElement.clientHeight)*0.035;
      
        //((x-(this.zoomPos.x))*this.zoom+this.zoomPos.x)
        //=current+('target'-current)*30/(ABS('target'-current)^1.615)
      this.camera.x+=(cameraPropX-this.camera.x)*.05;//30/Math.pow(Math.abs(cameraPropX-this.camera.x),1.615);///(Math.abs(cameraPropX-this.camera.x)+1);
      if(Math.abs(cameraPropX-this.camera.x)<2) this.camera.x=cameraPropX;
      this.camera.y+=(cameraPropY-this.camera.y)*.05;//30/Math.pow(Math.abs(cameraPropY-this.camera.y),1.615);///(Math.abs(cameraPropX-this.camera.x)+1);
      if(Math.abs(cameraPropY-this.camera.y)<2) this.camera.y=cameraPropY;
    } else {
      desiredZoom=this.defaultZoom-Math.pow(this.camera.momentumx*this.camera.momentumx+this.camera.momentumy*this.camera.momentumy,0.4)/70;
      if(Math.abs(this.camera.momentumx)<0.3) {
        this.camera.momentumx = 0;
        this.camera.x = Math.round(this.camera.x);  //Don't use Math.floor here. It causes weird behaviour. 
      };
      if(Math.abs(this.camera.momentumy)<0.3) {
        this.camera.momentumy = 0;
        this.camera.y = Math.round(this.camera.y);          
      };

    };
      this.camera.momentumx *= 0.97;
      this.camera.momentumy *= 0.97;

    if(desiredZoom<0.2) desiredZoom=0.2;
    this.zoom+=(desiredZoom-this.zoom)*this.dampZoom;
    this.dampZoom+=0.004;
    if(this.dampZoom>0.2) this.dampZoom=0.2;
    if(Math.abs(1-this.zoom)<0.01) this.zoom=1;


    if(!this.mouseHoverInteract && this.mouseHoverIndex>=0) {
      i=this.mouseHoverIndex;
      //well we are interacting now! create a new interacted tile and send boxes and info
      switch(TileData.content[i].tiletype) {
        case "text":
        this.interactingTiles.push(new InteractedTile({boxes:[TileData.content[i].box],
                                                       tileType:TileData.content[i].tiletype,
                                                       scale:TileData.content[i].scale,
                                                       flippable:false,
                                                       pixelSize:this.squareWidth,
                                                       offScreenCtx:this.offScreenCtx,
                                                       modelIndex:i,
                                                       worldX:this.mouseHoverWorldX,
                                                       worldY:this.mouseHoverWorldY }));
        break;
        case "textlink":
        case "fliplink":
          this.interactingTiles.push(new InteractedTile({boxes:[TileData.content[i].box,
                                                                TileData.content[i].backbox],
                                                         tileType:TileData.content[i].tiletype,
                                                         scale:TileData.content[i].scale,
                                                         flippable:TileData.content[i].flippable,
                                                         pixelSize:this.squareWidth,
                                                         offScreenCtx:this.offScreenCtx,
                                                         modelIndex:i,
                                                         worldX:this.mouseHoverWorldX,
                                                         worldY:this.mouseHoverWorldY }));        
        case "image":
        case "video":
        console.log("New tile #" + this.interactingTiles.length )

        this.interactingTiles.push(new InteractedTile({boxes:[TileData.content[i].box,
                                                              TileData.content[i].backbox],
                                                       tileType:TileData.content[i].tiletype,
                                                       scale:TileData.content[i].scale,
                                                       flippable:TileData.content[i].flippable,
                                                       pixelSize:this.squareWidth,
                                                       offScreenCtx:this.offScreenCtx,
                                                       modelIndex:i,
                                                       worldX:this.mouseHoverWorldX,
                                                       worldY:this.mouseHoverWorldY }));
      };
    };

    var x,y,wtx,wty;
    var totalWorldWidth=TileData.worldWidth*this.squareWidth;
    var totalWorldHeight=5*this.squareHeight; //todo: make this dynamic later
    var foundInteractedTile, foundInteractedTileScale;
    ctx.fillStyle = "#004165"
    ctx.fillRect(0,0,canvas.width, canvas.height);

    for(i=0; i<TileData.content.length; i++) {

      x=-Math.floor(this.camera.x);
      wtx=Math.floor(Math.floor(this.camera.x)/totalWorldWidth)*totalWorldWidth;
      if(x>0) wtx+=totalWorldWidth;
      x%=totalWorldWidth;
      x-=totalWorldWidth*Math.ceil(1+canvas.width/(totalWorldWidth*this.zoom*2));
      wtx-=totalWorldWidth*Math.ceil(1+canvas.width/(totalWorldWidth+this.squareWidth*this.zoom*2));
      x+=TileData.content[i].position.x*this.squareWidth;
      wtx+=TileData.content[i].position.x*this.squareWidth;

      y=-Math.floor(this.camera.y);
      wty=Math.floor(Math.floor(this.camera.y)/totalWorldHeight)*totalWorldHeight;
      if(y>0) wty+=totalWorldHeight;
      y%=totalWorldHeight;
      y-=totalWorldHeight*Math.ceil(1+canvas.height/(totalWorldHeight*this.zoom*2));
      wty-=totalWorldHeight*Math.ceil(1+canvas.height/(totalWorldHeight*this.zoom*2));
      y+=TileData.content[i].position.y*this.squareHeight;
      wty+=TileData.content[i].position.y*this.squareHeight;

      var repeatx,repeaty=(y-(this.zoomPos.y))*this.zoom+this.zoomPos.y, drawAngle;
      var repeatwtx,repeatwty=wty;
      do {
        repeatx=(x-(this.zoomPos.x))*this.zoom+this.zoomPos.x;
        repeatwtx=wtx;
        do {
          foundInteractedTile=false;
          for(j=0;j<this.interactingTiles.length;j++) {
            if(this.interactingTiles[j].modelIndex==i && this.interactingTiles[j].worldX==repeatwtx && this.interactingTiles[j].worldY==repeatwty) foundInteractedTile=true;
          };    //this tile is not being interacted with. draw a static tile
          
          //REMEMBER THIS IS THE FIRST PASS
          if(!foundInteractedTile) {
            TileData.content[i].box.render(ctx, repeatx, repeaty, TileData.content[i].scale*this.zoom);
            if(Config.mouse.x>=repeatx && Config.mouse.x<(repeatx+TileData.content[i].scale*this.squareWidth*this.zoom) && (Config.mouse.y-this.canvasOffset)>=repeaty && (Config.mouse.y-this.canvasOffset)<(repeaty+TileData.content[i].scale*this.squareHeight*this.zoom)) {
              this.mouseHoverInteract=false;
              this.mouseHoverIndex=i;
              this.mouseHoverWorldX=repeatwtx;
              this.mouseHoverWorldY=repeatwty;
              this.mouseHoverTileX=(Config.mouse.x-repeatx)/this.zoom;
              this.mouseHoverTileY=(Config.mouse.y-this.canvasOffset-repeaty)/this.zoom;
            };
          };

          repeatx+=totalWorldWidth*this.zoom; //and scale
          repeatwtx+=totalWorldWidth;
        } while(repeatx<=canvas.width);
        repeaty+=totalWorldHeight*this.zoom; //and scale
        repeatwty+=totalWorldHeight;
      } while(repeaty<=canvas.height);
    };

////  SECOND PASS: interactive Tiles
    for(i=0; i<TileData.content.length; i++) {
      x=-Math.floor(this.camera.x);
      wtx=Math.floor(Math.floor(this.camera.x)/totalWorldWidth)*totalWorldWidth;
      if(x>0) wtx+=totalWorldWidth;
      x%=totalWorldWidth;
      x-=totalWorldWidth*Math.ceil(1+canvas.width/(totalWorldWidth*this.zoom*2));
      wtx-=totalWorldWidth*Math.ceil(1+canvas.width/(totalWorldWidth+this.squareWidth*this.zoom*2));
      x+=TileData.content[i].position.x*this.squareWidth;
      wtx+=TileData.content[i].position.x*this.squareWidth;

      y=-Math.floor(this.camera.y);
      wty=Math.floor(Math.floor(this.camera.y)/totalWorldHeight)*totalWorldHeight;
      if(y>0) wty+=totalWorldHeight;
      y%=totalWorldHeight;
      y-=totalWorldHeight*Math.ceil(1+canvas.height/(totalWorldHeight*this.zoom*2));
      wty-=totalWorldHeight*Math.ceil(1+canvas.height/(totalWorldHeight*this.zoom*2));
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
          for(j=0;j<this.interactingTiles.length;j++) {
            if(this.interactingTiles[j].modelIndex==i && this.interactingTiles[j].worldX==repeatwtx && this.interactingTiles[j].worldY==repeatwty && this.interactingTiles[j].scaleProgress==0 && this.interactingTiles[j].flipProgress==0) {
              this.interactingTiles[j].render(ctx, repeatx, repeaty, this.zoom);
              ///REMEMBER THIS IS THE SECOND PASS
              if(Config.mouse.x>=repeatx && Config.mouse.x<(repeatx+this.interactingTiles[j].getCurrentSize()*this.zoom) && (Config.mouse.y-this.canvasOffset)>=repeaty && (Config.mouse.y-this.canvasOffset)<(repeaty+this.interactingTiles[j].getCurrentSize()*this.zoom)) {
                this.mouseHoverInteract=true;
                this.mouseHoverIndex=j;
                this.mouseHoverWorldX=repeatwtx;
                this.mouseHoverWorldY=repeatwty;
                this.mouseHoverTileX=(Config.mouse.x-repeatx)/this.zoom;
                this.mouseHoverTileY=(Config.mouse.y-this.canvasOffset-repeaty)/this.zoom;
              };
            };
          };

          
 
          repeatx+=totalWorldWidth*this.zoom; //and scale
          repeatwtx+=totalWorldWidth;
        } while(repeatx<=canvas.width);
        repeaty+=totalWorldHeight*this.zoom; //and scale
        repeatwty+=totalWorldHeight;
      } while(repeaty<=canvas.height);

    };


    for(i=0; i<TileData.content.length; i++) {
      x=-Math.floor(this.camera.x);
      wtx=Math.floor(Math.floor(this.camera.x)/totalWorldWidth)*totalWorldWidth;
      if(x>0) wtx+=totalWorldWidth;
      x%=totalWorldWidth;
      x-=totalWorldWidth*Math.ceil(1+canvas.width/(totalWorldWidth*this.zoom*2));
      wtx-=totalWorldWidth*Math.ceil(1+canvas.width/(totalWorldWidth+this.squareWidth*this.zoom*2));
      x+=TileData.content[i].position.x*this.squareWidth;
      wtx+=TileData.content[i].position.x*this.squareWidth;

      y=-Math.floor(this.camera.y);
      wty=Math.floor(Math.floor(this.camera.y)/totalWorldHeight)*totalWorldHeight;
      if(y>0) wty+=totalWorldHeight;
      y%=totalWorldHeight;
      y-=totalWorldHeight*Math.ceil(1+canvas.height/(totalWorldHeight*this.zoom*2));
      wty-=totalWorldHeight*Math.ceil(1+canvas.height/(totalWorldHeight*this.zoom*2));
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
          for(j=0;j<this.interactingTiles.length;j++) {
            if(( this.interactingTiles[j].modelIndex==i && this.interactingTiles[j].worldX==repeatwtx && this.interactingTiles[j].worldY==repeatwty ) && ( this.interactingTiles[j].scaleProgress>0 || this.interactingTiles[j].flipProgress>0 )) {
              
              this.interactingTiles[j].render(ctx, repeatx, repeaty, this.zoom);
              ///REMEMBER THIS IS THE LAST PASS
              if(Config.mouse.x>=repeatx && Config.mouse.x<(repeatx+this.interactingTiles[j].getCurrentSize()*this.zoom) && (Config.mouse.y-this.canvasOffset)>=repeaty && (Config.mouse.y-this.canvasOffset)<(repeaty+this.interactingTiles[j].getCurrentSize()*this.zoom)) {
                this.mouseHoverInteract=true;
                this.mouseHoverIndex=j;
                this.mouseHoverWorldX=repeatwtx;
                this.mouseHoverWorldY=repeatwty;
                this.mouseHoverTileX=(Config.mouse.x-repeatx)/this.zoom;
                this.mouseHoverTileY=(Config.mouse.y-this.canvasOffset-repeaty)/this.zoom;
              };
            };
          };
          repeatx+=totalWorldWidth*this.zoom; //and scale
          repeatwtx+=totalWorldWidth;
        } while(repeatx<=canvas.width);
        repeaty+=totalWorldHeight*this.zoom; //and scale
        repeatwty+=totalWorldHeight;
      } while(repeaty<=canvas.height);

    };
    
    for(i=0;i<this.interactingTiles.length;i++) {
      this.interactingTiles[i].mouseIsOver=false;
    };
    if(this.mouseHoverInteract && this.mouseHoverIndex>=0) {
      //console.log("On MouseOver for index " + this.mouseHoverIndex)
      if(typeof(this.interactingTiles[this.mouseHoverIndex])!="undefined") this.interactingTiles[this.mouseHoverIndex].mouseOver(this.mouseHoverTileX, this.mouseHoverTileY);
    };   

    this.interactingTilesDestroyList=[];
    for(i=0;i<this.interactingTiles.length;i++) {
      if(this.interactingTiles[i].removeCounter>=6) {
        //console.log("Push to destroy index "+ i);
        this.interactingTilesDestroyList.push(i);
      };
    };
    //console.log("want to destroy "+ this.interactingTilesDestroyList.length);
    for(i=0;i<this.interactingTilesDestroyList.length;i++) {
      console.log("Destroyed index "+ this.interactingTilesDestroyList[i]);
      this.interactingTiles.splice(this.interactingTilesDestroyList[i],1);
    };


    ctx.restore();
  };

  return Grid;

});



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

        // if(TileData.content[i].scaleProgress==1 || TileData.content[i].scaleDirection>0) {
        //   if(TileData.content[i].flipProgress==1 && TileData.content[i].scaleProgress==1) {
        //     //scaled and flipped

        //     TileData.content[i].flipDirection = -0.027;
        //     TileData.content[i].scaleDirection = -0.027;
        //     console.log("scale downward and flip back");
        //     TileData.content[i].actionX=this.mouseHoverWorldX;
        //     TileData.content[i].actionY=this.mouseHoverWorldY;
        //   } else if(TileData.content[i].flipProgress==0 || TileData.content[i].flipDirection<0) {
        //     //scaled or scaling & flipping back/unflipped
        //     console.log("flip forward");
        //     TileData.content[i].flipDirection = 0.027;         
        //     TileData.content[i].actionX=this.mouseHoverWorldX;
        //     TileData.content[i].actionY=this.mouseHoverWorldY;
        //   };
        // } else if (TileData.content[i].scaleProgress==0 || TileData.content[i].scaleDirection<0) {
        //   // if(TileData.content[i].flipProgress==1 || TileData.content[i].flipDirection>0) {
        //   //   //flipped or flipping to and unscaled or scaling down
        //   //   //ok to be flipped and unscaled but this situation is usually triggered automatically somewhere else
        //   //   //default is flip back
        //   //   TileData.content[i].flipDirection = -0.027;
        //   // };
        //   if(TileData.content[i].flipProgress==0 || TileData.content[i].flipDirection<0) {
        //     //unflipped or flipping from and unscaled or scaling down
        //     // console.log("scale upward");
            
        //     TileData.content[i].scaleDirection = 0.027;
        //     TileData.content[i].actionX=this.mouseHoverWorldX;
        //     TileData.content[i].actionY=this.mouseHoverWorldY;
        //   };       
        // };

                 // if(TileData.content[i].scaleProgress>0) {
          //   if(TileData.content[i].actionX==repeatwtx && TileData.content[i].actionY==repeatwty) {
          //     if(TileData.content[i].flipProgress==0) TileData.content[i].box.render(ctx, repeatx, repeaty, this.zoom*(TileData.content[i].scale+TileData.content[i].scaleProgress));
          //     if(TileData.content[i].flipProgress==1) TileData.content[i].backbox.render(ctx, repeatx, repeaty, this.zoom*(TileData.content[i].scale+TileData.content[i].scaleProgress));
          //     //collision with mouse
          //     if(Config.mouse.x>=repeatx && Config.mouse.x<(repeatx+(TileData.content[i].scale+TileData.content[i].scaleProgress)*this.squareWidth*this.zoom) && (Config.mouse.y-this.canvasOffset)>=repeaty && (Config.mouse.y-this.canvasOffset)<(repeaty+(TileData.content[i].scale+TileData.content[i].scaleProgress)*this.squareHeight*this.zoom)) {
          //       this.mouseHoverIndex = i;
          //       this.mouseHoverWorldX=repeatwtx;
          //       this.mouseHoverWorldY=repeatwty;
          //       this.mouseHoverTileX=(Config.mouse.x-repeatx)/this.zoom;
          //       this.mouseHoverTileY=(Config.mouse.y-this.canvasOffset-repeaty)/this.zoom;
          //     };

          //   };
          // };
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


    // var blid;
    // ////  LAST PASS: ANY SCALE WHILE FLIPPING TILES ONLY
    // for(i=0; i<TileData.content.length; i++) {
    //   x=-Math.floor(this.camera.x);
    //   wtx=Math.floor(Math.floor(this.camera.x)/totalWorldWidth)*totalWorldWidth;
    //   if(x>0) wtx+=totalWorldWidth;
    //   x%=totalWorldWidth;
    //   x-=totalWorldWidth*Math.ceil(canvas.width/(totalWorldWidth*this.zoom*2));
    //   wtx-=totalWorldWidth*Math.ceil(canvas.width/(totalWorldWidth+this.squareWidth*this.zoom*2));
    //   x+=TileData.content[i].position.x*this.squareWidth;
    //   wtx+=TileData.content[i].position.x*this.squareWidth;

    //   y=-Math.floor(this.camera.y);
    //   wty=Math.floor(Math.floor(this.camera.y)/totalWorldHeight)*totalWorldHeight;
    //   if(y>0) wty+=totalWorldHeight;
    //   y%=totalWorldHeight;
    //   y-=totalWorldHeight*Math.ceil(canvas.height/(totalWorldHeight*this.zoom*2));
    //   wty-=totalWorldHeight*Math.ceil(canvas.height/(totalWorldHeight*this.zoom*2));
    //   y+=TileData.content[i].position.y*this.squareHeight;
    //   wty+=TileData.content[i].position.y*this.squareHeight;

    //   var repeatx,repeaty=(y-(this.zoomPos.y))*this.zoom+this.zoomPos.y, drawAngle;
    //   var repeatwtx,repeatwty=wty;
    //   do {
    //     repeatx=(x-(this.zoomPos.x))*this.zoom+this.zoomPos.x;
    //     repeatwtx=wtx;
    //     do {
    //   //collision with screen. whether it's worth drawing or not
    //   //    if(repeatx>(-TileData.content[i].scale*this.squareWidth*this.zoom) && repeatx<canvas.width && repeaty>(-TileData.content[i].scale*this.squareHeight*this.zoom) && repeaty<canvas.height){
    //         //what to draw depending on data

    //         if(TileData.content[i].flipProgress>0 && TileData.content[i].flipProgress<1) {
    //           if(TileData.content[i].actionX==repeatwtx && TileData.content[i].actionY==repeatwty) {
    //             if(TileData.content[i].flipProgress<0.5) {
    //               //render the front side to offscreen buffer
    //               drawAngle=TileData.content[i].flipProgress*180; //0-90 degrees
    //               TileData.content[i].box.render(this.offScreenCtx, 0, 0, TileData.content[i].scale);
    //             } else {
    //               //render the back side to offscreen buffer
    //               TileData.content[i].backbox.render(this.offScreenCtx, 0, 0, TileData.content[i].scale);
    //             };
    //             //perspective draw from offscreen buffer to canvas
    //             drawAngle=TileData.content[i].flipProgress*180;
    //             this.drawImagePerspective(this.offScreenCtx,this.squareWidth*TileData.content[i].scale,this.squareHeight*TileData.content[i].scale,ctx,repeatx,repeaty,this.zoom*(1+TileData.content[i].scaleProgress),drawAngle);
    //             if(Config.mouse.x>=repeatx && Config.mouse.x<(repeatx+(TileData.content[i].scale+TileData.content[i].scaleProgress)*this.squareWidth*this.zoom) && (Config.mouse.y-this.canvasOffset)>=repeaty && (Config.mouse.y-this.canvasOffset)<(repeaty+(TileData.content[i].scale+TileData.content[i].scaleProgress)*this.squareHeight*this.zoom)) {
    //               this.mouseHoverIndex = i;
    //               this.mouseHoverWorldX=repeatwtx;
    //               this.mouseHoverWorldY=repeatwty;
    //               this.mouseHoverTileX=(Config.mouse.x-repeatx)/this.zoom;
    //               this.mouseHoverTileY=(Config.mouse.y-this.canvasOffset-repeaty)/this.zoom;
    //             };
    //           };
    //         };
    //         // if(TileData.content[i].flipProgress<=0) TileData.content[i].box.render(ctx, repeatx, repeaty, this.zoom*(TileData.content[i].scale+TileData.content[i].scaleProgress));
    //         // if(TileData.content[i].flipProgress>=1) TileData.content[i].backbox.render(ctx, repeatx, repeaty, this.zoom*(TileData.content[i].scale+TileData.content[i].scaleProgress));
    //       //  };

    //       repeatx+=totalWorldWidth*this.zoom; //and scale
    //       repeatwtx+=totalWorldWidth;
    //     } while(repeatx<=canvas.width);
    //     repeaty+=totalWorldHeight*this.zoom; //and scale
    //     repeatwty+=totalWorldHeight;
    //   } while(repeaty<=canvas.height);

    //};
    // ctx.font="bold 30px Arial";
    // ctx.fillStyle="white";
    // ctx.fillText(Math.floor(this.camera.x)+","+Math.floor(this.camera.y),5,5);

    // ctx.fillText(Math.floor(this.camera.x/totalWorldWidth),5,30);
