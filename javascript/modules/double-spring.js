/*global define*/
define([
	'jquery',
], function ($) {
	'use strict';

	var max = 30, damp = .85, springiness = .10, max = 36, damp = .72, springiness = .901, max = 13, damp = .63, springiness = .969;

	var DoubleSpring = function () {
		this.x = 0, this.ax = 0, this.dx = 0, this.tx = 0, this.y = 0, this.ay = 0, this.dy = 0, this.ty = 0, this.max = 30, this.damp = .85, this.springiness = .09
	};

	DoubleSpring.constructor = DoubleSpring;

	DoubleSpring.prototype.update = function () {
	    this.ax = (this.tx - this.x) * springiness, this.dx += this.ax, this.dx *= damp, this.dx < -max ? this.dx = -max : this.dx > max && (this.dx = max), this.x += this.dx, this.ay = (this.ty - this.y) * springiness, this.dy += this.ay, this.dy *= damp, this.dy < -max ? this.dy = -max : this.dy > max && (this.dy = max), this.y += this.dy
	};

	DoubleSpring.prototype.reset = function () {
	    this.x = 0, this.ax = 0, this.dx = 0, this.tx = 0, this.y = 0, this.ay = 0, this.dy = 0, this.ty = 0
	};

	return DoubleSpring;
});
