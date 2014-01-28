/*global define*/
define([
	'jquery',
], function ($) {
	'use strict';

	var _self;

	var Box = function (ctx, newContent, properties) {
		_self = this;

		this.ctx;
		this.boxes=[], this.height, this.width=90, this.left=0, this.top=0, this.padding=0, this.margin=0, this.right, this.bottom;
		this.content, this.contentType="text", this.properties, this.fontStyle="normal", this.fontSize=24, this.fontName="Helvetica W01 Light";
		this.fontColour="#AADDFF", this.backgroundColour="rgba(0,0,0,0)", this.id="", this.align="left", this.textunderlay="fill";
		
		
		$.each(properties, function(key, value) {
			_self[key] = value;
		});
		if(this.contentType=="container") this.boxes = newContent;					
		if(this.contentType=="text" || this.contentType=="image") this.content = newContent;
		this.ctx=ctx;
		if(typeof(this.lineHeight)=="undefined") this.lineHeight=this.fontSize*1.1;
	};

	Box.constructor = Box;

	Box.prototype.update = function (content, properties) {
		
	//	this.calculate(this.ctx);
	};

	// Box.prototype.findById = function (id) {
	// 	if(this.contentType=="container") {
	// 		for(var i=0, found;i<boxes.length;i++) {
 //    			found = boxObj.findById(id);
 //    			if(found) return found;
	// 		};
	// 	};
	// 	if(this.id==id) return this;
	// };
	Box.prototype.last = function ()  {
		if(typeof(this.boxes)=="undefined") return {right:0,bottom:0};
		if(this.boxes.length==0) return {right:0,bottom:0};
		return {right:this.boxes[this.boxes.length-1].right, bottom:this.boxes[this.boxes.length-1].bottom};
	};

	Box.prototype.addBox = function (newBox)  {
	//	console.log(newBox);
		if(typeof(this.boxes)!="undefined") this.boxes.push(newBox);
	};

	// Box.prototype.destroyById = function (id) {
	// 	if(this.contentType=="container") {
	// 		for(var i=0, found;i<boxes.length;i++) {
	// 		found = boxObj.findById(id);
	// 	if(found) return found;
	// };
	// 	};
	// };
 	Box.prototype.splitText = function (context, maxLength, theText) {

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

	Box.prototype.render = function(ctx, drawx, drawy, drawScale) {
		var cx,cy, j;
		///woohoo its time to render
		for(var i=0;i<this.boxes.length;i++){
			if(this.boxes[i].contentType=="text") {
				ctx.fillStyle=this.boxes[i].backgroundColour;
				ctx.fillRect(drawx+this.boxes[i].boxLeft*drawScale,drawy+this.boxes[i].boxTop*drawScale,this.boxes[i].boxWidth*drawScale,this.boxes[i].boxHeight*drawScale);
				if(drawScale>.01 && this.boxes[i].content.length>0) {

					ctx.fillStyle=this.boxes[i].fontColour;
					ctx.font = this.boxes[i].fontStyle + " " + this.boxes[i].fontSize + "px " + this.boxes[i].fontName;
					ctx.textBaseline = 'top';
					cy=drawy+this.boxes[i].drawTop*drawScale;//+this.boxes[i].lineHeight;
					if(drawScale!=1) ctx.scale(drawScale,drawScale);
					for(j=0;j<this.boxes[i].splitLines.length;j++) {
						cx=drawx+(this.boxes[i].drawLeft)*drawScale; //default left justified
						if(this.boxes[i].align=="center") cx=drawx+(this.boxes[i].drawLeft+(this.boxes[i].drawWidth-this.boxes[i].splitLines[j].width)*0.5)*drawScale;
						if(this.boxes[i].align=="right") cx=drawx+(this.boxes[i].drawLeft+this.boxes[i].drawWidth-this.boxes[i].splitLines[j].width)*drawScale;
						ctx.fillText(this.boxes[i].splitLines[j].text, cx/drawScale, cy/drawScale);

						cy+=this.boxes[i].lineHeight*drawScale;
					};
					if(drawScale!=1) ctx.scale(1/drawScale,1/drawScale);
				};
			};
			if(this.boxes[i].contentType=="image") {
				ctx.fillStyle=this.boxes[i].backgroundColour;
				ctx.fillRect(drawx+this.boxes[i].boxLeft*drawScale,drawy+this.boxes[i].boxTop*drawScale,this.boxes[i].boxWidth*drawScale,this.boxes[i].boxHeight*drawScale);
				ctx.drawImage(this.boxes[i].content,drawx+this.boxes[i].drawLeft*drawScale,drawy+this.boxes[i].drawTop*drawScale,this.boxes[i].drawWidth*drawScale,this.boxes[i].drawHeight*drawScale);		
			};
		};
	};


	Box.prototype.calculate = function () {
		var apx,apy,pw,ph,mw,mh,i,j;
		var dwidth, dheight;
		if(this.contentType=="container") {
			//this. is the container
			//this.boxes[i]. is the box
			//this.boxes[i].content. is the actual element
			this.right=this.left+this.width;
			this.bottom=this.top+this.height;
		    

		    for(i=0;i<this.boxes.length;i++) {

		    	if(this.boxes[i].contentType=="image") { //if image is not supplied a size, make it same as image
					if(typeof(this.boxes[i].width)=="undefined") this.boxes[i].width=(this.boxes[i].content.width*100)/this.width;
					if(typeof(this.boxes[i].height)=="undefined") this.boxes[i].height=(this.boxes[i].content.height*100)/this.height;
					if(this.boxes[i].width=="original") this.boxes[i].width=(this.boxes[i].content.width*100)/this.width;					
					if(this.boxes[i].height=="original") this.boxes[i].height=(this.boxes[i].content.height*100)/this.height;					

					this.boxes[i].boxLeft=(this.boxes[i].margin+this.boxes[i].left)*this.width*0.01;
			    	this.boxes[i].boxTop=(this.boxes[i].margin+this.boxes[i].top)*this.height*0.01;
			    	this.boxes[i].boxWidth=(this.boxes[i].width-this.boxes[i].margin*2)*this.width*0.01;
			    	this.boxes[i].boxHeight=(this.boxes[i].height-this.boxes[i].margin*2)*this.height*0.01;

			    	var maxWidth=this.boxes[i].boxWidth-this.boxes[i].padding*this.height*0.02;
					var maxHeight=this.boxes[i].boxHeight-this.boxes[i].padding*this.height*0.02;
					var imageAspect = this.boxes[i].content.width / this.boxes[i].content.height;
    				var boundaryAspect = maxWidth / maxHeight;
    				var newWidth,newHeight;
    				if(imageAspect > boundaryAspect) {
				        // Width maxed
				        newWidth = maxWidth;
				        newHeight = newWidth / imageAspect;
				    } else {
				        // Height maxed
				        newHeight = maxHeight;
				        newWidth = imageAspect * newHeight;
 					};
 					this.boxes[i].drawHeight=newHeight;
					this.boxes[i].drawWidth=newWidth;
					this.boxes[i].drawLeft=(this.boxes[i].margin+this.boxes[i].left+this.boxes[i].padding)*this.width*0.01+(this.boxes[i].boxWidth-newWidth)/2;
					this.boxes[i].drawTop=(this.boxes[i].margin+this.boxes[i].top+this.boxes[i].padding)*this.height*0.01;

    			};
				if(this.boxes[i].contentType=="text") { //if image is not supplied a size, make it same as image
					//if(typeof(this.boxes[i].width)=="undefined") this.boxes[i].width=(this.boxes[i].content.width*100)/this.width;
					
					// this.boxes[i].drawWidth=(this.boxes[i].width-this.boxes[i].padding*2)*this.width*0.01;
					
					// this.ctx.font = this.boxes[i].fontStyle + " " + this.boxes[i].fontSize + "px " + this.boxes[i].fontName;
			  //   	this.ctx.textBaseline = 'top';
			  //   	this.boxes[i].splitLines = this.splitText(this.ctx,this.boxes[i].drawWidth,this.boxes[i].content);
					
			    	// pw=(this.boxes[i].width-this.boxes[i].padding*2)*this.width*0.01;
			    	// if(mw>pw) 
			    	//set actual text properties
			    	this.ctx.font = this.boxes[i].fontStyle + " " + this.boxes[i].fontSize + "px " + this.boxes[i].fontName;
			    	this.ctx.textBaseline = 'top';
			    	var maxWidth=(this.boxes[i].width-this.boxes[i].padding*2)*this.width*0.01;
			    	this.boxes[i].splitLines = this.splitText(this.ctx,maxWidth,this.boxes[i].content);

					this.boxes[i].boxLeft=(this.boxes[i].margin+this.boxes[i].left)*this.width*0.01;
			    	this.boxes[i].drawLeft=(this.boxes[i].margin+this.boxes[i].left+this.boxes[i].padding)*this.width*0.01;
					this.boxes[i].boxTop=(this.boxes[i].margin+this.boxes[i].top)*this.height*0.01;
					this.boxes[i].drawTop=(this.boxes[i].margin+this.boxes[i].top+this.boxes[i].padding)*this.height*0.01;
					if(this.boxes[i].textunderlay=="fill") {
						this.boxes[i].boxWidth=(this.boxes[i].width-this.boxes[i].margin*2)*this.width*0.01;
			    		this.boxes[i].boxHeight=(this.boxes[i].height-this.boxes[i].margin*2)*this.height*0.01;
						this.boxes[i].drawWidth=(this.boxes[i].width-this.boxes[i].margin*2-this.boxes[i].padding*2)*this.height*0.01;
//						this.boxes[i].drawHeight=(this.boxes[i].height-this.boxes[i].padding*2)*this.height*0.01;
					};
					if(this.boxes[i].textunderlay=="fit") {
						maxWidth=0;
						for(var j=0;j<this.boxes[i].splitLines.length;j++) {
							if(this.boxes[i].splitLines[j].width>maxWidth) maxWidth = this.boxes[i].splitLines[j].width;
						};
						this.boxes[i].boxWidth=maxWidth+this.boxes[i].padding*2*this.width*0.01+this.boxes[i].fontSize*0.3;
						this.boxes[i].drawWidth=maxWidth;
						this.boxes[i].boxHeight=this.boxes[i].padding*this.height*0.02+this.boxes[i].fontSize+this.boxes[i].lineHeight*(this.boxes[i].splitLines.length-1)+this.boxes[i].fontSize*0.1;
						
					};
				};
				
				this.boxes[i].right=(this.boxes[i].boxLeft+this.boxes[i].boxWidth)*100/this.width;
				this.boxes[i].bottom=(this.boxes[i].boxTop+this.boxes[i].boxHeight)*100/this.height;
				// this.boxes[i].boxRight=this.boxes[i].boxLeft+this.boxes[i].boxWidth;
				// this.boxes[i].boxBottom=this.boxes[i].Top+this.boxes[i].boxHeight;
								
		    };

		};

	};

	return Box;
});
