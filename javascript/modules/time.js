/*global define*/
define([
	'jquery',
	'config/config'
], function ($, Config) {
	'use strict';

	var Time = function () {
	    this.DELTA_TIME = 1, this.lastTime = Date.now(), this.frames = 0, this.speed = 1
	};

	Time.constructor = Time;

	Time.prototype.update = function () {
	    this.frames++;
	    var a = Date.now();
	    this.frames = 0;
	    var b = a,
	        c = b - this.lastTime;
			this.DELTA_TIME = .06 * c, this.DELTA_TIME *= this.speed, this.DELTA_TIME > 2.3 && (this.DELTA_TIME = 2.3), this.lastTime = b
	};

	return Time;
});
