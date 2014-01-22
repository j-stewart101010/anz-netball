/*global define*/
define([
	'jquery',
], function ($) {
	'use strict';

	var _self;

	var Box = function (ctx, newContent, properties) {
		_self = this;

		this.ctx;
		this.boxes=[], this.height=200, this.width=200, this.left=0, this.top=0, this.padding=0, this.margin=0, this.right, this.bottom;
		this.content, this.contentType="text", this.properties, this.fontStyle="normal", this.fontSize=36, this.fontName="Helvetica W01 Light", this.lineHeight=this.fontSize*1.2;
		this.fontColour="#AADDFF", this.backgroundColour="#555555", this.id="", this.textAlign="left";
		
		
		$.each(properties, function(key, value) {
			_self[key] = value;
		});
		if(this.contentType=="container") this.boxes = newContent;					
		if(this.contentType=="text" || this.contentType=="image") this.content = newContent;

		this.ctx=ctx;
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
		if(this.boxes.count==0) return null;
		return this.boxes.count-1;
	};

	Box.prototype.addBox = function (newBox)  {
		console.log(newBox);
		if(typeof(this.boxes)!="undefined") this.boxes.push(newBox);
		//this.calculate();
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
					cy=drawy+this.boxes[i].drawTop+this.boxes[i].fontSize;
					if(drawScale!=1) ctx.scale(drawScale,drawScale);
					for(j=0;j<this.boxes[i].splitLines.length;j++) {
						cx=drawx+this.boxes[i].drawLeft; //default left justified
						if(this.boxes[i].textAlign=="center") cx=drawx+(this.boxes[i].drawLeft+this.boxes[i].drawWidth-this.boxes[i].splitLines[j].width)*0.5;
						if(this.boxes[i].textAlign=="right") cx=drawx+this.boxes[i].drawLeft+this.boxes[i].drawWidth-this.boxes[i].splitLines[j].width;
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
		if(this.contentType=="container") {
			//this. is the container
			//this.boxes[i]. is the box
			//this.boxes[i].content. is the actual element
			this.right=this.left+this.width;
			this.bottom=this.top+this.height;
		    
		    for(i=0;i<this.boxes.length;i++) {
		    	this.boxes[i].boxLeft=(this.boxes[i].margin+this.boxes[i].left)*this.width*0.01;
		    	this.boxes[i].boxTop=(this.boxes[i].margin+this.boxes[i].top)*this.height*0.01;
		    	this.boxes[i].boxWidth=this.boxes[i].width*this.width*0.01;
		    	this.boxes[i].boxHeight=this.boxes[i].height*this.height*0.01;

		    	this.boxes[i].drawLeft=(this.boxes[i].margin+this.boxes[i].left+this.boxes[i].padding)*this.width*0.01;
				this.boxes[i].drawTop=(this.boxes[i].margin+this.boxes[i].top+this.boxes[i].padding)*this.height*0.01;
				this.boxes[i].drawWidth=(this.boxes[i].width-this.boxes[i].padding*2)*this.width*0.01;
				this.boxes[i].drawHeight=(this.boxes[i].height-this.boxes[i].padding*2)*this.height*0.01;
								
		    	if(this.boxes[i].contentType=="image") {
			    	//set actual image propeties
				};
				if(this.boxes[i].contentType=="text") {
					//set actual text properties
			    	this.ctx.font = this.boxes[i].fontStyle + " " + this.boxes[i].fontSize + "px " + this.boxes[i].fontName;
			    	this.boxes[i].splitLines = this.splitText(this.ctx,this.boxes[i].drawWidth,this.boxes[i].content);
			    	mw=0;
			    	for(j=0;j<this.boxes[i].splitLines.length;j++) {
			    		if(this.boxes[i].splitLines[j].width>mw) mw=this.boxes[i].splitLines[j].width;
			    	};
			    	this.boxes[i].splitLines.maxLength=mw;
			    	this.boxes[i].drawWidth=mw;
			    	this.boxes[i].boxWidth=mw+this.boxes[i].padding*2;
			    	
			    	mh=this.boxes[i].splitLines.length*this.boxes[i].lineHeight;
			    	this.boxes[i].drawHeight = mh;
			    	this.boxes[i].boxHeight = mh + this.boxes[i].padding*2;
				};
				
				this.boxes[i].right=this.boxes[i].margin+this.boxes[i].width;
				this.boxes[i].bottom=this.boxes[i].margin+this.boxes[i].height;				
		    };

		};

	};

	return Box;
});
