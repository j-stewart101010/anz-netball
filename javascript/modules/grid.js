/*global define*/
define([
	'jquery',
	'underscore',
	'config/config',
	'models/tile',
	'modules/grid-button',
	'modules/double-spring',
], function ($, _, Config, model, GridButton, DoubleSpring) {
	'use strict';

	var _self;

	var Grid = function (a, b) {
		_self = this;
		// this.previouslyRendered = [];

	    this.vignetteTexture = new Image, 
	    this.vignetteTexture.src = Config.REMOTE_PATH + "img/smoothVignette.png", 
	    this.dottedLine = new Image, 
	    this.dottedLine.src = Config.REMOTE_PATH + "img/xmas/dotLine.png", 
	    this.padding = 1, 
	    this.textCanvas = document.createElement("canvas"), 
	    this.textCanvas.width = 500, 
	    this.textCanvas.height = 100, 
	    this.textCanvas.context = this.textCanvas.getContext("2d"), 
	    this.textCanvas.context.fillStyle = "red", 
	    this.textCanvas.context.fillRect(0, 0, this.textCanvas.width, this.textCanvas.height), 
	    this.button = new GridButton(["img/CTA_moment_01.png", "img/CTA_moment_02.png", "img/CTA_moment_03.png", "img/CTA_moment_04.png", "img/CTA_moment_05.png", "img/CTA_moment_06.png", "img/CTA_moment_07.png", "img/CTA_moment_08.png", "img/CTA_moment_08.png", "img/CTA_moment_07.png", "img/CTA_moment_06.png", "img/CTA_moment_05.png", "img/CTA_moment_04.png", "img/CTA_moment_03.png", "img/CTA_moment_02.png", "img/CTA_moment_01.png"]),
	    this.tellUsButton = new GridButton(["img/xmas/doorPrompts_open_01.png", "img/xmas/doorPrompts_open_02.png", "img/xmas/doorPrompts_open_03.png", "img/xmas/doorPrompts_open_04.png", "img/xmas/doorPrompts_open_05.png", "img/xmas/doorPrompts_open_06.png", "img/xmas/doorPrompts_open_07.png", "img/xmas/doorPrompts_open_08.png", "img/xmas/doorPrompts_open_08.png", "img/xmas/doorPrompts_open_07.png", "img/xmas/doorPrompts_open_06.png", "img/xmas/doorPrompts_open_05.png", "img/xmas/doorPrompts_open_04.png", "img/xmas/doorPrompts_open_03.png", "img/xmas/doorPrompts_open_02.png", "img/xmas/doorPrompts_open_01.png"]), 
	    this.tellMeMoreButton = new GridButton(["img/xmas/doorPrompts_discover_01.png", "img/xmas/doorPrompts_discover_02.png", "img/xmas/doorPrompts_discover_03.png", "img/xmas/doorPrompts_discover_04.png", "img/xmas/doorPrompts_discover_05.png", "img/xmas/doorPrompts_discover_06.png", "img/xmas/doorPrompts_discover_07.png", "img/xmas/doorPrompts_discover_08.png", "img/xmas/doorPrompts_discover_09.png", "img/xmas/doorPrompts_discover_10.png", "img/xmas/doorPrompts_discover_10.png", "img/xmas/doorPrompts_discover_09.png", "img/xmas/doorPrompts_discover_08.png", "img/xmas/doorPrompts_discover_07.png", "img/xmas/doorPrompts_discover_06.png", "img/xmas/doorPrompts_discover_05.png", "img/xmas/doorPrompts_discover_04.png", "img/xmas/doorPrompts_discover_03.png", "img/xmas/doorPrompts_discover_02.png", "img/xmas/doorPrompts_discover_01.png"]), 
	    this.lockedButton = new GridButton(["img/xmas/doorPrompts_locked.png"]), 
	    this.peelColors = {}, 
	    this.peelColors["#ffa400"] = ["img/xmas/peelBack_tab_lightBlue.png", "img/xmas/peelBack_under_lightBlue.png", "img/xmas/full_tab_lightBlue.png", "img/xmas/opened_tab_lightBlue.png", "img/xmas/stitchBorder_lightBlue.png"], 
	    this.peelColors["#78b8dd"] = ["img/xmas/peelBack_tab_lightBlue.png", "img/xmas/peelBack_under_lightBlue.png", "img/xmas/full_tab_lightBlue.png", "img/xmas/opened_tab_lightBlue.png", "img/xmas/stitchBorder_lightBlue.png"], 
	    this.peelColors["#ece7ac"] = ["img/xmas/peelBack_tab_cream.png", "img/xmas/peelBack_under_cream.png", "img/xmas/full_tab_cream.png", "img/xmas/opened_tab_cream.png", "img/xmas/stitchBorder_cream.png"], 
	    this.peelColors["#0e5433"] = ["img/xmas/peelBack_tab_green.png", "img/xmas/peelBack_under_green.png", "img/xmas/full_tab_green.png", "img/xmas/opened_tab_green.png", "img/xmas/stitchBorder_green.png"], 
	    this.peelColors["#ab1a2e"] = ["img/xmas/peelBack_tab_red.png", "img/xmas/peelBack_under_red.png", "img/xmas/full_tab_red.png", "img/xmas/opened_tab_red.png", "img/xmas/stitchBorder_red.png"], 
	    this.peelColors["#004f8b"] = ["img/xmas/peelBack_tab_darkBlue.png", "img/xmas/peelBack_under_darkBlue.png", "img/xmas/full_tab_darkBlue.png", "img/xmas/opened_tab_darkBlue.png", "img/xmas/stitchBorder_darkBlue.png"], 
	    this.peelColors["#b0c6c1"] = ["img/xmas/peelBack_tab_grey.png", "img/xmas/peelBack_under_grey.png", "img/xmas/full_tab_grey.png", "img/xmas/opened_tab_grey.png", "img/xmas/stitchBorder_grey.png"], 
	    this.peelColors["#d0d15d"] = ["img/xmas/peelBack_tab_yellow.png", "img/xmas/peelBack_under_yellow.png", "img/xmas/full_tab_yellow.png", "img/xmas/opened_tab_yellow.png", "img/xmas/stitchBorder_yellow.png"]; 
	    
	    var peelColors = this.peelColors;

	    for (var c in this.peelColors) {
	        var d = new Image;
	        d.src = Config.REMOTE_PATH + this.peelColors[c][0];
	        var e = new Image;
	        e.src = Config.REMOTE_PATH + this.peelColors[c][1];
	        var f = new Image;
	        f.src = Config.REMOTE_PATH + this.peelColors[c][2];
	        var g = new Image;
	        g.src = Config.REMOTE_PATH + this.peelColors[c][3];
	        var h = new Image;
	        h.src = Config.REMOTE_PATH + this.peelColors[c][4], 

	        this.peelColors[c][0] = d, 
	        this.peelColors[c][1] = e, 
	        this.peelColors[c][2] = f, 
	        this.peelColors[c][3] = g, 
	        this.peelColors[c][4] = h
	    }

	    this.camera = {
	        x: 0,
	        y: 0
	    },

	    this.squareWidth = 250,
	    this.nodePool = [],
	    this.points = [], 
	    this.colors = ["#b494bb", "#a2b878", "#af98ad", "#d9d3c5", "#6ca86c", "#aea677", "#4fb4c6", "#80c6e8"], 
	    this.start = !0, 
	    this.locked = !0, 
	    this.startZoom = 10, 
	    this.resize(a, b), 
	    this.zoomRatio = 0, 
	    this.startFade = 0
	};

	Grid.constructor = Grid;

	Grid.prototype.resize = function (a, b) {
	    this.width = a,
	    this.height = b,
	    this.gridWidth = Math.ceil(this.width / this.squareWidth) + 2 + this.padding + 1, 
	    this.gridHeight = Math.ceil(this.height / this.squareWidth) + 2 + this.padding + 1;
	    var c = this.gridWidth * this.gridHeight;
	    // this.odd = this.gridWidth % 2;
	    for (var d = 0; d < this.points.length; d++) { 
	    	this.nodePool.push(this.points[d]);
		}
	    this.points = [];
	    for (var d = 0; c > d; d++) {
	        var e = this.nodePool.pop();
	        e || (e = {
	            spring: new DoubleSpring,
	            alpha: 1,
	            color: this.colors[Math.round(25 * Math.random()) % 2],
	            image: new Image,
	            ratio: 0
	            // squareWidth: model.content[d].squareWidth
	        });
	        var f = d % this.gridWidth,
	            g = Math.floor(d / this.gridWidth);
	        e.x = e.xHome = f, e.y = e.yHome = g, this.points.push(e)
	    }
	    this.scale = 1;
	};

	Grid.prototype.startIntro = function () {
	    TweenLite.to(this, 2, {
	        startZoom: 1,
	        ease: Expo.easeInOut,
	        onComplete: this.onZoomedOut.bind(this)
	    }), TweenLite.to(this, .1, {
	        startFade: 1,
	        ease: Expo.easeInOut,
	        delay: 2,
	        onComplete: this.onTransitionFinished
	    })
	};

	Grid.prototype.onZoomedOut = function () {
	    this.start = !1, 
	    this.locked = !1, 
	    this.onStartComplete()
	};

	Grid.prototype.render = function (a) {
	    a.save();
	    var b = .4 * (Config.track.x - this.camera.x),
	        c = .4 * (Config.track.y - this.camera.y),
	        d = Math.sqrt(c * c + b * b),
	        e = Math.abs(d);

	    e > 40 && (e = 40), e /= 40, e *= .25;

	    var f = Math.floor((this.camera.x - this.width / 2) / this.squareWidth) + 2,
	        g = Math.floor((this.camera.y - this.height / 2 + .5 * this.squareWidth) / this.squareWidth) + 2;

	    f += 3, 
	    f %= 12, 
	    0 > f && (f += 12), 
	    f -= 3, 
	    g += 3, 
	    g %= 12, 
	    0 > g && (g += 12), 
	    g -= 3,

	    this.scale += f >= -2 && 3 > f && g >= -2 && 3 > g ? .1 * (.6 + (1 - e) - this.scale) : .1 * (1 - e - this.scale);

	    var h = 4 * e;
	    .1 > h && (h = 0),
	    h > 1 && (h = 1), 
	    this.start ? (this.scale = this.startZoom, this.camera.x = Config.track.x, this.camera.y = Config.track.y, 5 == this.scale) : (this.camera.x += b, this.camera.y += c);
	    var i = this.scale + (1 - this.scale) * this.zoomRatio;
	    a.translate(this.width / 2, this.height / 2), a.scale(i, i), a.translate(-this.squareWidth * (this.padding + 1), 1.5 * -this.squareWidth), a.translate(Math.floor(-this.width / 2), -Math.floor(this.height / 2));
	    
	    for (var j = (this.squareWidth, this.squareWidth * this.gridWidth), k = this.squareWidth * this.gridHeight, l = 0; l < this.points.length; l++) {
	        var m = this.points[l];
				// m.spring.update();
	        var n = m.x * this.squareWidth + this.camera.x,
	            o = m.y * this.squareWidth + this.camera.y,
	            p = Math.floor(n / j);
	        p *= this.gridWidth, 
	        p -= m.x;
	        var q = Math.floor(o / k);
	        if (q *= this.gridHeight, q -= m.y, m.xid != p || m.yid != q) {
	            var r = Grid.getId(p, q),
	                s = model.content[r];


	   //          var previouslyRenderedLength = _self.previouslyRendered.length - 1;
				// var indices = [];
				// var idx = model.layout.indexOf(_self.previouslyRendered[previouslyRenderedLength]);
				// while (idx != -1) {
				//     indices.push(idx);
				//     idx = model.layout.indexOf(_self.previouslyRendered[previouslyRenderedLength], idx + 1);
				// }

				// if (indices.length > 1 && !indices)
				// {
				// 	console.log(indices);
				// }

				m.moment = s, 
				m.scale = m.moment.scale ? 1 - m.moment.scale : .2, 
				m.color = m.moment.color, 
				m.isStart = !1;

	            // "share" == s.id && (s = model.share[s.visualId || 0], s.id = "share"), m.moment = s, m.scale = m.moment.scale ? 1 - m.moment.scale : .2, m.color = m.moment.color, m.isStart = !1;
	            var t = m.moment.gridImage[0];
	            m.moment.xmas === !0 && m.moment.locked && (t = m.moment.lockedImage), m.image.src = Config.REMOTE_PATH_2 + t, m.image.onerror = function () {}
	        }
	        m.xid = p;
	        m.yid = q; 
	        n %= j, 0 > n && (n += j);
	        o %= k, 0 > o && (o += k);
	        m.xReal = n;
	        m.yReal = o;
	        m.xReals = n + m.spring.x * (1 - this.zoomRatio);
	        m.yReals = o + m.spring.y * (1 - this.zoomRatio);
	        m.spring.tx = m.xHome;
	        m.spring.ty = m.yHome;
	        a.fillStyle = "black";
	        a.globalAlpha = 1
	    }

	    for (var l = 0; l < this.points.length; l++) {
	        var m = this.points[l];
	        if (m.xReal < (this.gridWidth - 1) * this.squareWidth && m.yReal < (this.gridHeight - 1) * this.squareWidth) {
	            var u = m,
	                v = this.points[this.gridWidth * (m.y % this.gridHeight) + (m.x + 1) % this.gridWidth],
	                w = this.points[this.gridWidth * ((m.y + 1) % this.gridHeight) + (m.x + 1) % this.gridWidth],
	                x = this.points[this.gridWidth * ((m.y + 1) % this.gridHeight) + m.x % this.gridWidth];
	            a.globalAlpha = 1, m.isStart && (a.globalAlpha = this.startFade), a.fillStyle = m.color, a.beginPath(), a.moveTo(u.xReals - 1, u.yReals - 1), a.lineTo(v.xReals + 1, v.yReals - 1), a.lineTo(w.xReals + 1, w.yReals + 1), a.lineTo(x.xReals - 1, x.yReals + 1), a.closePath(), a.fill(), m.moment.locked || (a.fillStyle = m.moment.colorInner, a.globalAlpha = 1, a.beginPath(), a.moveTo(u.xReals + 16, u.yReals + 16), a.lineTo(v.xReals - 16, v.yReals + 16), a.lineTo(w.xReals - 16, w.yReals - 16), a.lineTo(x.xReals + 16, x.yReals - 16), a.closePath(), a.fill(), a.globalAlpha = 1);
	            var y = (u.xReals + v.xReals + w.xReals + x.xReals) / 4,
	                z = (u.yReals + v.yReals + w.yReals + x.yReals) / 4;




	            //Dotted lines
                var A = 15;
                a.save(), a.translate(u.xReals + A, u.yReals + A);
                var B = u.xReals - v.xReals,
                    C = u.yReals - v.yReals,
                    D = Math.atan2(C, B) + Math.PI,
                    E = Math.sqrt(B * B + C * C);
                a.rotate(D), a.drawImage(this.dottedLine, 2, -5, E - 2 * A, this.dottedLine.height), a.restore(), a.save(), a.translate(u.xReals + A, u.yReals + A);
                var B = u.xReals - x.xReals,
                    C = u.yReals - x.yReals,
                    D = Math.atan2(C, B) + Math.PI,
                    E = Math.sqrt(B * B + C * C);
                a.rotate(D), a.drawImage(this.dottedLine, 2, -4, E - 2 * A, this.dottedLine.height), a.restore(), a.save(), a.translate(x.xReals + A, x.yReals - A);
                var B = x.xReals - w.xReals,
                    C = x.yReals - w.yReals,
                    D = Math.atan2(C, B) + Math.PI,
                    E = Math.sqrt(B * B + C * C);
                a.rotate(D), a.drawImage(this.dottedLine, 2, -5, E - 2 * A, this.dottedLine.height), a.restore(), a.save(), a.translate(v.xReals - A, v.yReals + A);
                var B = v.xReals - w.xReals,
                    C = v.yReals - w.yReals,
                    D = Math.atan2(C, B) + Math.PI,
                    E = Math.sqrt(B * B + C * C);
                a.rotate(D), a.drawImage(this.dottedLine, 2, -4, E - 2 * A, this.dottedLine.height), a.restore()









	            // var F = v.xReals - u.xReals,
	            //     G = w.xReals - x.xReals;
	            // var averageWidth3 = G > F ? F : G;
	            // var H = u.yReals - x.yReals,
	            //     I = v.yReals - w.yReals;
	            // var averageHeight3 = H > I ? H : I;
	            // var t = m.image,
	            //     J = averageWidth3 / this.squareWidth * 250,
	            //     K = averageHeight3 / this.squareWidth * 250;
	            // 0 > J && (J *= -1), 0 > K && (K *= -1);
	            // var L = G / F,
	            //     M = F / G;
	            // L = L > M ? L : M;
	            // var N = H / I,
	            //     O = I / H;
	            // if (N = N > O ? N : O, a.fillStyle = "#000000", 1 == m.moment.xmas)
	            //     if (m.moment.locked) {
	            //         var P = (v.xReals + w.xReals) / 2,
	            //             z = (u.yReals + v.yReals + w.yReals + x.yReals) / 4;
	            //         a.drawImage(this.peelColors[m.color][2], P - 27.5, z - 24.75, 27.5, 49.5)
	            //     } else {
	            //         var P = (v.xReals + w.xReals) / 2,
	            //             z = (u.yReals + v.yReals + w.yReals + x.yReals) / 4;
	            //         a.drawImage(this.peelColors[m.color][3], P - 27.5, z - 24.75, 27.5, 49.5)
	            //     }
	            // if (this.overCell != m) {
	            // 	// console.log('overcell');
	            //     if (m.ratio *= .9, a.globalAlpha = 1, m.isStart) a.globalAlpha = this.startFade, this.startFade < 1 && (J = 250, K = 250), a.drawImage(t, y - J / 2, z - K / 2, J, K);
	            //     else if (m.moment.locked) a.drawImage(t, y - J / 2 / 2, z - K / 2 / 2, J / 2, K / 2);
	            //     else if (a.drawImage(t, y - J / 2, z - K / 2, J, K), m.moment.xmas) {
	            //         var Q = averageWidth3 / this.squareWidth,
	            //             R = averageHeight3 / this.squareWidth;
	            //         0 > Q && (Q *= -1), 0 > R && (R *= -1);
	            //         var S = (w.yReals + x.yReals) / 2;
	            //         a.globalAlpha = 1 - m.ratio, a.drawImage(m.moment.smallNumber, y - 20, S - 60, 40 * Q, 39.5 * R)
	            //     }
	            // } else {
	            // 	console.log('overcell else');
	            //     a.globalAlpha = 1;
	            //     var T = averageWidth3 / this.squareWidth,
	            //         U = averageHeight3 / this.squareWidth;
	            //     0 > T && (T *= -1), 0 > U && (U *= -1);
	            //     var V = (u.yReals + v.yReals) / 2,
	            //         W = m.ratio,
	            //         X = 1 - .2 * W,
	            //         Y = z - K / 2,
	            //         Z = V,
	            //         $ = Y + (Z - Y) * W;
	            //     if ("share" == m.moment.id) {
	            //         var _ = 1 - W * m.scale;
	            //         $ -= 30 * W, a.drawImage(t, y - J * _ / 2, $, J * _, K * _), T *= 1 / 1.37, U *= 1 / 1.37, a.globalAlpha = this.overCell.alpha1, a.drawImage(this.andMaybeText, y - 141 * T, V + K * X + 10 * U, 282 * T, 39 * U), a.globalAlpha = this.overCell.alpha2, a.drawImage(this.tellUsButton.getNextImage(), y - 113 * T, V + K * X - 70 * U, 226 * T, 67 * U)
	            //     } else if ("startx" == m.moment.id) a.drawImage(t, y - J * X / 2, $, J * X, K * X), T *= 1 / 1.37, U *= 1 / 1.37, a.globalAlpha = this.overCell.alpha1, a.drawImage(this.tellMeMoreButton.getNextImage(), y - 113 * T, V + K * X - 35 * U, 226 * T, 67 * U);
	            //     else {
	            //         var ab = 1 - W * m.scale;
	            //         if (m.moment.locked)
	            //             if (a.drawImage(t, y - J / 2 / 2, z - K / 2 / 2, J / 2, K / 2), m.moment.superlocked) {
	            //                 a.globalAlpha = this.overCell.alpha2;
	            //                 var bb = x.yReals;
	            //                 a.drawImage(this.lockedButton.getNextImage(), y - 146 * T * .5, bb - 60 * U, 292 * T * .5, 60 * U * .5)
	            //             } else a.globalAlpha = this.overCell.alpha2, m.moment._state == a.drawImage(this.button.getNextImage(), y - 146 * T * .5, V + K * X - 10 * U, 292 * T * .5, 60 * U * .5);
	            //             else a.drawImage(t, y - J * ab / 2, $, J * ab, K * ab), m.moment.xmas ? (a.globalAlpha = this.overCell.alpha1, a.drawImage(this.textCanvas, y - 125 * T, V + K * X - 45 - 14 * U, 250 * T, 50 * U), a.globalAlpha = this.overCell.alpha2, a.drawImage(this.tellMeMoreButton.getNextImage(), y - 146 * T * .5, V + K * X - 10 * U, 292 * T * .5, 60 * U * .5)) : (a.globalAlpha = this.overCell.alpha1, a.drawImage(this.textCanvas, y - 125 * T, V + K * X - 45 * U, 250 * T, 50 * U), a.globalAlpha = this.overCell.alpha2, a.drawImage(this.button.getNextImage(), y - 100 * T, V + K * X - 0 * U, 200 * T, 40 * U));
	            //         if (m.moment.locked && !m.moment.superlocked) {
	            //             a.globalAlpha = 1;
	            //             var cb = m.alpha2;
	            //             cb *= .9;
	            //             var db = 110 - 56 * cb,
	            //                 eb = 112 - 18 * cb;
	            //             a.drawImage(this.peelColors[m.color][1], 0, 0, 1 + 40 * cb, 18, y + eb * T, V + 11.5 * U, 1 + 18 * cb * T, 226 * U), a.drawImage(this.peelColors[m.color][0], 0, 0, 1 + 90 * cb, 438, y + db * T, V + 11.5 * U - 0 * U, 1 + 40 * cb * T, 226 * U)
	            //         }
	            //     }
	            // }
	            // a.fillStyle = "#463e40", a.globalAlpha = (L + N) / 2 - 1, a.globalAlpha > 0 && (a.beginPath(), a.moveTo(u.xReals - 1, u.yReals - 1), a.lineTo(v.xReals + 1, v.yReals - 1), a.lineTo(w.xReals + 1, w.yReals + 1), a.lineTo(x.xReals - 1, x.yReals + 1), a.closePath(), a.fill())








	        }
	        m.moment._state == m.moment.locked && (a.globalAlpha = 1, a.drawImage(this.tellUsButton.getNextImage(), y - 67.25, z + 60, 146, 30))
	    }
	    if (!this.locked) {
	        var fb = this.hittest();
	        if (fb) {
	            if (fb != this.overCell && (this.overCell = fb, this.overCell.count = 0, this.overCell.ratio = 0, this.overCell.alpha1 = 0, this.overCell.alpha2 = 0), this.overCell.count++, 2 == this.overCell.count)
	                if ("share" == this.overCell.moment.id) TweenLite.to(this.overCell, .2, {
	                    ratio: 1,
	                    ease: Sine.easeInOut
	                }), TweenLite.to(this.overCell, .1, {
	                    alpha1: 1,
	                    ease: Sine.easeInOut,
	                    delay: .1
	                }), TweenLite.to(this.overCell, .3, {
	                    alpha2: 1,
	                    ease: Sine.easeInOut,
	                    delay: .2
	                });
	                else {
	                    this.textCanvas.context.fillStyle = "green", this.textCanvas.context.clearRect(0, 0, this.textCanvas.width, this.textCanvas.height), this.textCanvas.context.textBaseline = "top", this.textCanvas.context.font = "40pt Conv_Curse Casual", this.textCanvas.context.fillStyle = this.overCell.moment.textColor1 || "white";
	                    var gb = this.overCell.moment.copy,
	                        hb = this.textCanvas.context.measureText(gb).width;
	                    this.textCanvas.context.fillText(gb, this.textCanvas.width / 2 - hb / 2, 0), this.textCanvas.context.fillStyle = this.overCell.moment.textColor2 || "white", this.textCanvas.context.font = "bold 16pt Calibri, Helvetica, Arial, sans-serif";
	                    var ib = this.overCell.moment.user + ", " + this.overCell.moment.loaction,
	                        jb = this.textCanvas.context.measureText(ib).width;
	                    this.textCanvas.context.fillText(ib, this.textCanvas.width / 2 - jb / 2, 56), this.textCanvas.context.globalAlpha = 1, TweenLite.to(this.overCell, .2, {
	                        ratio: 1,
	                        ease: Sine.easeInOut
	                    }), TweenLite.to(this.overCell, .1, {
	                        alpha1: 1,
	                        ease: Sine.easeInOut,
	                        delay: .1
	                    }), TweenLite.to(this.overCell, .3, {
	                        alpha2: 1,
	                        ease: Sine.easeInOut,
	                        delay: .2
	                    })
	                }
	            this.overCell.alpha = .2;
	            var kb = this.overCell.down && !this.didMove ? -30 : 40;
	            m = this.overCell, m.moment.xmas && (kb *= .5), this.effectCell(m, kb)
	        }
	    }
	    a.restore()
	};

	Grid.prototype.effectCell = function (a, b) {
	    {
	        var c = a,
	            d = this.points[this.gridWidth * (a.y % this.gridHeight) + (a.x + 1) % this.gridWidth],
	            e = this.points[this.gridWidth * ((a.y + 1) % this.gridHeight) + (a.x + 1) % this.gridWidth],
	            f = this.points[this.gridWidth * ((a.y + 1) % this.gridHeight) + a.x % this.gridWidth];
	        Math.PI / 4
	    }
	    c.spring.tx = -b, c.spring.ty = -b, d.spring.tx = +b, d.spring.ty = -b, e.spring.tx = +b, e.spring.ty = +b, f.spring.tx = -b, f.spring.ty = +b
	};

	Grid.prototype.centerOnMoment = function () {
	    this.locked = !0, TweenLite.to(this, .4, {
	        zoomRatio: 1,
	        ease: Cubic.easeIn
	    }), this.overCell && (this.overCell.ratio = 0, this.overCell.count = 0, this.overCell.alpha1 = 0, this.overCell.alpha2 = 0)
	};

	Grid.prototype.unlock = function () {
	    this.locked = !1, TweenLite.to(this, .2, {
	        zoomRatio: 0
	    })
	};

	Grid.prototype.down = function () {
	    // this.overCell = this.hittest(), this.overCell.moment.superlocked || (this.overCell.down = !0, this.didMove = !1, this.overCell.count = 0, this.overCell.ratio = 0, this.overCell.alpha1 = 0, this.overCell.alpha2 = 0)
	};

	Grid.prototype.stabilize = function () {
	    for (var a = 0; a < this.points.length; a++) {
	        this.points[a]
	    }
	};

	Grid.prototype.hittest = function () {
	    // if (document.body.style.cursor = "default", this.overCell) {
	    //     var a = this.overCell,
	    //         b = this.points[this.gridWidth * (a.y % this.gridHeight) + (a.x + 1) % this.gridWidth],
	    //         c = this.points[this.gridWidth * ((a.y + 1) % this.gridHeight) + (a.x + 1) % this.gridWidth],
	    //         d = (this.points[this.gridWidth * ((a.y + 1) % this.gridHeight) + a.x % this.gridWidth], b.xReal - a.xReal),
	    //         e = c.yReal - a.yReal,
	    //         f = Config.mouse.x,
	    //         g = Config.mouse.y,
	    //         h = f - a.xReal + 2 * this.squareWidth,
	    //         i = g - a.yReal + 1.5 * this.squareWidth;
	    //     if (h > 0 && d > h && i > 0 && e + 40 > i) return "share" == a.moment.id ? h > 18 && d - 22 > h && i > 165 && e - 30 > i && (document.body.style.cursor = "pointer") : "startx" == a.moment.id ? h > 18 && d - 22 > h && i > 195 && e + 10 > i && (document.body.style.cursor = "pointer") : h > 5 && d - 5 > h && i > 230 && e + 24 > i && (document.body.style.cursor = "pointer"), this.overCell
	    // }
	    // var j = Config.mouse.x,
	    //     k = Config.mouse.y;
	    // j -= this.width / 2, k -= this.height / 2, j /= this.scale, k /= this.scale, j -= -this.squareWidth * (this.padding + 1), k -= 1.5 * -this.squareWidth, j += this.width / 2, k += this.height / 2;
	    // var l = this.squareWidth,
	    //     m = Math.floor((j - this.camera.x) / l),
	    //     n = Math.floor((k - this.camera.y) / l);
	    // return m %= this.gridWidth, 0 > m && (m += this.gridWidth), n %= this.gridHeight, 0 > n && (n += this.gridHeight), this.points[n % this.gridHeight * this.gridWidth + m]
	};

	Grid.prototype.up = function () {
	    // if (this.overCell.down && (this.overCell.down = !1, !this.didMove)) {
	    //     var a = this.overCell.xid;
	    //     a < -this.gridWidth && (a += this.gridWidth);
	    //     var b = this.overCell.yid;
	    //     var point = this.overCell;
	    //     var c = point,
	    //         d = this.points[this.gridWidth * (point.y % this.gridHeight) + (point.x + 1) % this.gridWidth],
	    //         e = this.points[this.gridWidth * ((point.y + 1) % this.gridHeight) + (point.x + 1) % this.gridWidth],
	    //         f = this.points[this.gridWidth * ((point.y + 1) % this.gridHeight) + point.x % this.gridWidth],
	    //         g = -this.width / 2 - this.squareWidth * (this.padding + 1),
	    //         h = -this.height / 2 - 1.5 * this.squareWidth;
	    //     this.overCell.moment.corners = [{
	    //         x: c.xReals + g,
	    //         y: c.yReals + h
	    //     }, {
	    //         x: d.xReals + g,
	    //         y: d.yReals + h
	    //     }, {
	    //         x: e.xReals + g,
	    //         y: e.yReals + h
	    //     }, {
	    //         x: f.xReals + g,
	    //         y: f.yReals + h
	    //     }], this.overCell.moment.positionX = (this.overCell.xid + 2 - .5) * this.squareWidth + this.width / 2 - this.squareWidth / 2 + 1, this.overCell.moment.positionY = (b + 1.5 - .5) * this.squareWidth + this.height / 2 - this.squareWidth / 2 + 1, this.overCell.moment.positionX = Math.floor(this.overCell.moment.positionX), this.overCell.moment.positionY = Math.floor(this.overCell.moment.positionY), 0 == this.overCell.y && (this.overCell.moment.positionY -= 2), 0 == this.overCell.x && (this.overCell.moment.positionX -= 1), this.overCell.moment.color = point.color, this.overCell.moment.image = point.image
	    // }
	};

	Grid.getId = function (a, b) {
	    var c = model.dimensions[0],
	        d = model.dimensions[1],
	        e = (a - 4) % c;
	    0 > e && (e += c);
	    var f = (b - 3) % d;
	    0 > f && (f += d);
	    var g = model.layout[f * c + e];
		// _self.previouslyRendered.push(g);
	    if (g >= model.content.length - 1) {
	        var h = g % model.content.length;
	        0 > h && (h += model.content.length);
	        var h = g % model.content.length - 25;
	        0 > h && (h += model.content.length - 25)
	    } else var h = g + 1;
	    return h
	};

	return Grid;
});
