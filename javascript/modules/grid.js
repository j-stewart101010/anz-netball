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
	    this.resize(a, b)
	};

	Grid.constructor = Grid;

	Grid.prototype.resize = function (a, b) {
		console.log("Grid.resize " + a + "x" + b),
	    this.width = a,
	    this.height = b
	};

	Grid.prototype.render = function (a) {
	    console.log("render");
	    var i;
	    a.save();
	    i = Math.floor(Math.random()*model.content.length)
	    if(model.content[i].image) {
	        a.drawImage(model.content[i].image,Math.floor(Math.random()*canvas.width),Math.floor(Math.random()*canvas.height));
	    };
	    a.restore();
	};

	return Grid;
});