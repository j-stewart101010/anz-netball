/*global define*/
define([
	'jquery',
	'config/config'
], function ($, Config) {
	'use strict';

var Trackpad = function (a) {
    this.target = a, this.value = 0, this.easingValue = 0, this.dragOffset = 0, this.dragging, this.speed = 0, this.prevPosition = 0, this.valueY = 0, this.easingValueY = 0, this.dragOffsetY = 0, this.speedY = 0, this.prevPositionY = 0;
    // var b = 1500;
    // this.xmasBounds = {
    //     minX: 0,
    //     maxX: b,
    //     minY: -b,
    //     maxY: 0
    // }, 
    $(this.target).mousedown(this.onMouseDown.bind(this)), this.target.onmousewheel = this.onMouseWheel.bind(this), document.ontouchstart = this.onTouchStart.bind(this), $(document).keydown(this.onArrow.bind(this))
};

Trackpad.constructor = Trackpad, Trackpad.prototype.unlock = function () {
    this.locked = !1, this.speed = 0, this.easingValue = this.value, this.target.focus(), this.target.onmousewheel = this.onMouseWheel.bind(this)
}, Trackpad.prototype.lock = function () {
    this.locked = !0
}, Trackpad.prototype.update = function () {
    if (this.value = this.easingValue, this.valueY = this.easingValueY, this.dragging) {
        var a = this.easingValue - this.prevPosition;
        a *= .7, this.speed += .5 * (a - this.speed), this.prevPosition = this.easingValue;
        var b = this.easingValueY - this.prevPositionY;
        b *= .7, this.speedY += .5 * (b - this.speedY), this.prevPositionY = this.easingValueY
    } else this.speed *= .95, this.speedY *= .95, this.easingValue += this.speed, this.easingValueY += this.speedY
}, Trackpad.prototype.onArrow = function (a) {
    return 38 == a.keyCode ? (this.speed = 4, !1) : 40 == a.keyCode ? (this.speed -= 4, !1) : void 0
}, Trackpad.prototype.setPosition = function (a, b) {
    this.value = this.easingValue = a, this.valueY = this.easingValueY = b
}, Trackpad.prototype.onMouseWheel = function (a) {
    a.preventDefault ? a.preventDefault() : a.returnValue = !1, this.dragging = !1, this.locked || (this.speed = .15 * a.wheelDeltaX, this.speedY = .15 * a.wheelDeltaY)
}, Trackpad.prototype.startDrag = function (a, b) {
    this.locked || (this.dragging = !0, this.dragOffset = a - this.value, this.dragOffsetY = b - this.valueY)
}, Trackpad.prototype.endDrag = function () {
    this.locked || (this.dragging = !1)
}, Trackpad.prototype.updateDrag = function (a, b) {
    this.locked || (this.easingValue = a - this.dragOffset, this.easingValueY = b - this.dragOffsetY)
}, Trackpad.prototype.onMouseDown = function (a) {
    if (!this.locked) {
        a && a.preventDefault(), a && a.preventDefault();
        var b = a || window.event;
        b.returnValue = !1, $(document).mousemove($.proxy(this.onMouseMove, this)), $(document).mouseup($.proxy(this.onMouseUp, this)), this.startDrag(a.clientX, a.clientY)
    }
}, Trackpad.prototype.onMouseMove = function (a) {
    a && a.preventDefault();
    var b = a || window.event;
    this.updateDrag(b.clientX, b.clientY)
}, Trackpad.prototype.onMouseUp = function () {
    $(document).unbind("mousemove", $.proxy(this.onMouseMove, this)), $(document).unbind("mouseup", $.proxy(this.onMouseUp, this)), this.endDrag()
}, Trackpad.prototype.onTouchStart = function (a) {
    console.log("TOUCH START"), document.ontouchmove = this.onTouchMove.bind(this), document.ontouchend = this.onTouchEnd.bind(this), this.startDrag(a.touches[0].clientX, a.touches[0].clientY)
}, Trackpad.prototype.onTouchMove = function (a) {
    console.log("TOUCH MOVE" + a.touches[0].clientX + " : " + a.touches[0].clientY), a.preventDefault(), this.updateDrag(a.touches[0].clientX, a.touches[0].clientY)
}, Trackpad.prototype.onTouchEnd = function () {
    console.log("TOUCH END"), document.ontouchmove = null, document.ontouchend = null, this.endDrag()
};

	return Trackpad;
});
