/*global define*/
define([
	'jquery',
	'config/config',
	'modules/time'
], function ($, Config, Time) {
	'use strict';

	var GridButton = function (a) {
	    this.framesIds = a, this.frames = [], this.view = document.createElement("div"), this.view.style.position = "absolute";
	    for (var b = 0; b < a.length; b++) {
	        var c = new Image;
	        c.src = Config.REMOTE_PATH + a[b], this.frames.push(c)
	    }
	    this.currentframe = 0, this.speed = .2, this.time = new Time
	}; 

	GridButton.constructor = GridButton;

	GridButton.prototype.getNextImage = function () {
	    this.time.update(), this.currentframe += this.time.DELTA_TIME * this.speed * 2;
	    var a = Math.floor(this.currentframe);
	    return this.frames[a % this.frames.length]
	};

	return GridButton;
});
