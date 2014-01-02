/*global define*/
define([
	'jquery',
	'config/config',
	'models/tile',
	'modules/grid-button',
	'modules/double-spring',
], function ($, Config, model, GridButton, DoubleSpring) {
	'use strict';

	var Grid = function (a, b) {
		console.log("Grid"),
	    this.textCanvas = document.createElement("canvas"), 
	    this.textCanvas.width = 500, 
	    this.textCanvas.height = 100, 
	    this.textCanvas.context = this.textCanvas.getContext("2d"), 
	    this.textCanvas.context.fillStyle = "yellow", 
	    this.textCanvas.context.fillRect(0, 0, this.textCanvas.width, this.textCanvas.height), 
	    
	    this.camera = {
	        x: 0,
	        y: 0
	    },

	    this.squareWidth = 350,
	    this.squareHeight = 350,
	    this.locked = 1, 
	    this.startZoom = .5, 
	    this.resize(a, b),

	    this.fliptile = {
	    	x: 0,
	    	y: 0,
	    	xi: 1,
	    	yi: 1,
	    	angle: 0
	    }
	};

	Grid.constructor = Grid;

	Grid.prototype.resize = function (a, b) {
		console.log("Grid.resize " + a + "x" + b),
	    this.width = a,
	    this.height = b
	};

	Grid.prototype.render = function (a) {
	    console.log("render");
	    a.save();
	    
	    this.fliptile.x += this.fliptile.xi;
	    this.fliptile.y += this.fliptile.yi;
	    if(this.fliptile.x<=this.squareWidth/2) this.fliptile.xi=1;
	    if(this.fliptile.y<=0) this.fliptile.yi=1;
	    if(this.fliptile.x>=canvas.width-(this.squareWidth/2)) this.fliptile.xi=-1;
	    if(this.fliptile.y>=canvas.height-this.squareHeight) this.fliptile.yi=-1;

	    this.fliptile.angle+=3;
	    this.fliptile.angle%=360;

	    var textlength = 0,
	        message = "Hello";
	    var scalex, overcolor, opacity;

	    scalex = Math.abs(Math.cos(this.fliptile.angle*.01745329252));

	    if((this.fliptile.angle % 180) <90) {
	        overcolor="0,0,0";
	    } else {
            overcolor="255,255,255";
	    };
	    opacity = 1-scalex;
	    opacity*=.5;

            a.fillStyle="black";
            a.fillRect(0,0,canvas.width,canvas.height);

	        if(this.fliptile.angle<90 || this.fliptile.angle>=270) {
//frontside
                a.drawImage(model.content[2].image,this.fliptile.x-this.squareWidth*scalex*.5,this.fliptile.y,this.squareWidth*scalex,this.squareHeight);
	        } else {
//backside    
                a.fillStyle = model.content[2].backcolour;
                a.fillRect(this.fliptile.x-this.squareWidth*scalex*.5,this.fliptile.y,this.squareWidth*scalex,this.squareHeight);

                a.font="20pt Arial";
                textlength = a.measureText(message).width;
                a.fillStyle = "white";
                if(scalex>.01) { 
                    a.scale(scalex,1);
                    a.fillText(message, (this.fliptile.x-(textlength*.5*scalex))/scalex, this.fliptile.y+.5*this.squareHeight+10);
                    a.scale(1/scalex,1);
                };

	        };
            a.fillStyle="rgba("+overcolor+","+opacity+")";
            a.fillRect(this.fliptile.x-this.squareWidth*scalex*.5,this.fliptile.y,this.squareWidth*scalex,this.squareHeight);




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
	      
	    a.restore();
	};

	return Grid;
});