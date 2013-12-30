/*global define*/
define([
	'jquery',
	'config/config',
	'models/tile',
	'modules/grid-button',
	'modules/double-spring',
	'modules/grid'
], function ($, Config, model, GridButton, DoubleSpring, Grid) {
	'use strict';

	var GridDom = function (a, b) {
	    this.domView = document.createElement("div"), this.domView.style.position = "absolute", this.domView.style.top = "0px", this.domView.style.left = "0px", this.domView.style.display = "none", document.body.appendChild(this.domView), this.vignetteTexture = new Image, this.vignetteTexture.src = Config.REMOTE_PATH + "img/smoothVignette.png", this.padding = 1, this.button = new GridButton(["img/CTA_moment_01.png", "img/CTA_moment_02.png", "img/CTA_moment_03.png", "img/CTA_moment_04.png", "img/CTA_moment_05.png", "img/CTA_moment_06.png", "img/CTA_moment_07.png", "img/CTA_moment_08.png", "img/CTA_moment_08.png", "img/CTA_moment_07.png", "img/CTA_moment_06.png", "img/CTA_moment_05.png", "img/CTA_moment_04.png", "img/CTA_moment_03.png", "img/CTA_moment_02.png", "img/CTA_moment_01.png"]), this.tellUsButton = new GridButton(["img/xmas/doorPrompts_open_01.png", "img/xmas/doorPrompts_open_02.png", "img/xmas/doorPrompts_open_03.png", "img/xmas/doorPrompts_open_04.png", "img/xmas/doorPrompts_open_05.png", "img/xmas/doorPrompts_open_06.png", "img/xmas/doorPrompts_open_07.png", "img/xmas/doorPrompts_open_08.png", "img/xmas/doorPrompts_open_08.png", "img/xmas/doorPrompts_open_07.png", "img/xmas/doorPrompts_open_06.png", "img/xmas/doorPrompts_open_05.png", "img/xmas/doorPrompts_open_04.png", "img/xmas/doorPrompts_open_03.png", "img/xmas/doorPrompts_open_02.png", "img/xmas/doorPrompts_open_01.png"]), this.tellMeMoreButton = new GridButton(["img/CTA_tellMeMore_01.png", "img/CTA_tellMeMore_02.png", "img/CTA_tellMeMore_03.png", "img/CTA_tellMeMore_04.png", "img/CTA_tellMeMore_05.png", "img/CTA_tellMeMore_06.png", "img/CTA_tellMeMore_07.png", "img/CTA_tellMeMore_08.png", "img/CTA_tellMeMore_08.png", "img/CTA_tellMeMore_07.png", "img/CTA_tellMeMore_06.png", "img/CTA_tellMeMore_05.png", "img/CTA_tellMeMore_04.png", "img/CTA_tellMeMore_03.png", "img/CTA_tellMeMore_02.png", "img/CTA_tellMeMore_01.png"]), this.andMaybeText = new Image, this.andMaybeText.src = Config.REMOTE_PATH + "img/appearHere.png", this.camera = {
	        x: 0,
	        y: 0
	    }, this.squareWidth = 250, this.nodePool = [], this.points = [], this.start = !0, this.locked = !0, this.startZoom = 5, this.resize(a, b), this.zoomRatio = 0, this.startFade = 0
	};

	GridDom.constructor = GridDom;

	GridDom.prototype.resize = function (a, b) {
	    this.domView.style.width = a + "px", this.domView.style.height = b + "px", this.width = a, this.height = b, this.gridWidth = Math.ceil(this.width / this.squareWidth) + 2 + this.padding + 1, this.gridHeight = Math.ceil(this.height / this.squareWidth) + 2 + this.padding + 1;
	    var c = this.gridWidth * this.gridHeight;
	    for (var d = 0; d < this.points.length; d++) this.nodePool.push(this.points[d]), this.domView.display = "none";
	    this.points = [];
	    for (var d = 0; c > d; d++) {
	        var e = this.nodePool.pop();
	        e || (e = {
	            spring: new DoubleSpring,
	            alpha: 1,
	            image: new Image,
	            dom: document.createElement("div"),
	            ratio: 0
	        }, e.dom.className = "domGridNode", e.image.style.position = "absolute", e.image.style.top = "0px", e.image.style.left = "0px", e.dom.appendChild(e.image), e.detail = document.createElement("div"), e.detail.innerHTML = "UP AND OVER!", e.detail.className = "detailDOMTitle", e.detail.style.display = "none", $(e.detail).css({
	            top: "145px",
	            left: "-105px"
	        }), e.dom.appendChild(e.detail), e.detailName = document.createElement("div"), e.detailName.innerHTML = "John, London", e.detailName.className = "detailDOMName", e.detailName.style.display = "none", $(e.detailName).css({
	            top: "175px",
	            left: "-105px"
	        }), e.dom.appendChild(e.detailName), e.button = new Image, e.button.src = Config.REMOTE_PATH + "img/CTA_moment_01.png", $(e.button).css({
	            position: "absolute",
	            top: "190px",
	            left: "15px"
	        }), e.button.style.display = "none", e.button.width = 228, e.button.height = 43.5, e.dom.appendChild(e.button), e.dom.node = e, e.image.width = 250, e.image.height = 250, this.domView.appendChild(e.dom)), this.domView.display = "block";
	        var f = d % this.gridWidth,
	            g = Math.floor(d / this.gridWidth);
	        e.x = e.xHome = f, e.y = e.yHome = g, this.points.push(e)
	    }
	    console.log("RESIZE"), this.scale = 1, this.domView.style.overflow = "hidden"
	};

	GridDom.prototype.startIntro = function () {
	    $(this.domView).delay("1000").fadeIn(), TweenLite.to(this, 2, {
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

	GridDom.prototype.onZoomedOut = function () {
	    this.start = !1, this.locked = !1, this.onStartComplete()
	};

	GridDom.prototype.render = function () {
	    var a = .4 * (Config.track.x - this.camera.x),
	        b = .4 * (Config.track.y - this.camera.y),
	        c = Math.sqrt(b * b + a * a),
	        d = Math.abs(c);
	    d > 40 && (d = 40), d /= 40, d *= .25, this.scale += .1 * (1 - d - this.scale), this.start ? (this.scale = this.startZoom, this.camera.x = Config.track.x, this.camera.y = Config.track.y, 5 == this.scale) : (this.camera.x += a, this.camera.y += b);
	    for (var e = (this.scale + (1 - this.scale) * this.zoomRatio, this.squareWidth, this.squareWidth * this.gridWidth), f = this.squareWidth * this.gridHeight, g = 0; g < this.points.length; g++) {
	        var h = this.points[g],
	            i = h.x * this.squareWidth + this.camera.x,
	            j = h.y * this.squareWidth + this.camera.y,
	            k = Math.floor(i / e);
	        0 > i && (k -= 1), k *= this.gridWidth, k -= h.x;
	        var l = Math.floor(j / f);
	        if (0 > j && (l -= 1), l *= this.gridHeight, l -= h.y, h.xid != k || h.yid != l) {
	            var m = Grid.getId(k, l),
	                n = model.content[m];
	            if ("share" == n.id && (n = model.share[n.visualId || 0], n.id = "share"), h.moment = n, h.isStart = !1, 0 == k && 0 == l && (h.isStart = !0), h.dom.style.backgroundColor = h.moment.color, h.button.style.display = "none", "share" == h.moment.id) h.button.src = Config.REMOTE_PATH + "img/TELLUS_01.png", h.button.width = 169.5, h.button.height = 50.25, h.button.style.left = "45px", h.button.style.top = "160px", h.detail.style.fontSize = "20px", h.detail.style.top = "215px", h.detail.innerHTML = "..and maybe it'll appear here ";
	            else if ("startx" == h.moment.id) h.button.src = Config.REMOTE_PATH + "img/CTA_tellMeMore_01.png", h.button.width = 174.75, h.button.height = 46.5, h.button.style.left = "40px", h.button.style.top = "180px";
	            else {
	                h.moment.xmas ? h.moment.locked ? (h.button.src = h.moment._state !== false ? Config.REMOTE_PATH + "img/CTA_moment_01.png" : Config.REMOTE_PATH + "img/xmas/doorPrompts_open_01.png", h.moment.superlocked && (h.button.src = Config.REMOTE_PATH + "img/xmas/doorPrompts_locked.png")) : h.button.src = Config.REMOTE_PATH + "img/CTA_moment_01.png" : h.button.src = Config.REMOTE_PATH + "img/CTA_moment_01.png", h.button.width = 228, h.button.height = 43.5, h.button.style.left = "15px", h.button.style.top = "190px", h.detail.style.fontSize = "27px", h.detail.style.top = "145px";
	                var o = h.moment.copy,
	                    p = h.moment.user + ", " + h.moment.loaction;
	                h.detail.innerHTML = o, h.detailName.innerHTML = p
	            }
	            var q = h.moment.gridImage[0];
	            h.moment.xmas === !0 && h.moment.locked && (q = h.moment.lockedImage), h.image.src = Config.REMOTE_PATH + q, h.image.width = 250, h.image.height = 250
	        }
	        h.xid = k, h.yid = l, i %= e, 0 > i && (i += e), j %= f, 0 > j && (j += f), h.xReal = i, h.yReal = j, h.xReals = i + h.spring.x * (1 - this.zoomRatio), h.yReals = j + h.spring.y * (1 - this.zoomRatio), h.spring.tx = h.xHome, h.spring.ty = h.yHome
	    }
	    for (var g = 0; g < this.points.length; g++) {
	        var h = this.points[g];
	        if (h.xReal < (this.gridWidth - 1) * this.squareWidth && h.yReal < (this.gridHeight - 1) * this.squareWidth) {
	            h.dom.style.display = "block";
	            var r = h,
	                s = this.points[this.gridWidth * (h.y % this.gridHeight) + (h.x + 1) % this.gridWidth],
	                t = this.points[this.gridWidth * ((h.y + 1) % this.gridHeight) + (h.x + 1) % this.gridWidth],
	                u = this.points[this.gridWidth * ((h.y + 1) % this.gridHeight) + h.x % this.gridWidth],
	                v = (r.xReals + s.xReals + t.xReals + u.xReals) / 4,
	                w = (r.yReals + s.yReals + t.yReals + u.yReals) / 4,
	                x = s.xReals - r.xReals,
	                y = t.xReals - u.xReals;
	            var averageWidth3 = y > x ? x : y;
	            var z = r.yReals - u.yReals,
	                A = s.yReals - t.yReals;
	            var averageHeight3 = z > A ? z : A;
	            var B = averageWidth3 / this.squareWidth * 250,
	                C = averageHeight3 / this.squareWidth * 250;
	            0 > B && (B *= -1), 0 > C && (C *= -1);
	            var D = y / x,
	                E = x / y;
	            D = D > E ? D : E;
	            var F = z / A,
	                G = A / z;
	            F = F > G ? F : G;
	            var H = -this.squareWidth * (this.padding + 1),
	                I = 1.5 * -this.squareWidth;
	            if (h.dom.style.left = v - this.squareWidth / 2 + H + "px", h.dom.style.top = w - this.squareWidth / 2 + I + "px", this.overCell != h) h.isStart && this.startFade < 1 && (B = 250, C = 250);
	            else {
	                var J = averageWidth3 / this.squareWidth,
	                    K = averageHeight3 / this.squareWidth;
	                0 > J && (J *= -1), 0 > K && (K *= -1); {
	                    (r.yReals + s.yReals) / 2, h.ratio
	                }
	            }
	        } else h.dom.style.display = "none"
	    }
	    if (!this.locked) {
	        var L = this.hittest();
	        if (L) {
	            if (L != this.overCell && (this.overCell && ($(this.overCell.detailName).fadeOut("fast"), $(this.overCell.detail).fadeOut("fast"), this.overCell.button.style.display = "none", TweenLite.to(this.overCell.image, .3, {
	                width: 250,
	                height: 250,
	                left: "0px"
	            })), this.overCell = L, this.overCell.count = 0, this.overCell.ratio = 0, this.overCell.alpha1 = 0, this.overCell.alpha2 = 0), this.overCell.count++, 2 == this.overCell.count)
	                if ("share" == this.overCell.moment.id) {
	                    $(this.overCell.detail).fadeIn("fast"), this.overCell.button.style.display = "block";
	                    var M = this.overCell.moment.scale || .8;
	                    TweenLite.to(this.overCell.image, .3, {
	                        width: 250 * M,
	                        height: 250 * M,
	                        left: 125 - 125 * M + "px",
	                        ease: Back.easeOut
	                    })
	                } else if ("startx" == this.overCell.moment.id) {
	                this.overCell.button.style.display = "block";
	                var M = this.overCell.moment.scale || .8;
	                TweenLite.to(this.overCell.image, .3, {
	                    width: 250 * M,
	                    height: 250 * M,
	                    left: 125 - 125 * M + "px",
	                    ease: Back.easeOut
	                })
	            } else {
	                this.overCell.button.style.display = "block";
	                var M = this.overCell.moment.scale || .8;
	                this.overCell.moment.locked ? (M = .8, TweenLite.to(this.overCell.image, .3, {
	                    width: 250 * M,
	                    height: 250 * M,
	                    left: 125 - 125 * M + "px",
	                    ease: Back.easeOut
	                })) : ($(this.overCell.detail).fadeIn("fast"), $(this.overCell.detailName).delay(60).fadeIn("fast"), TweenLite.to(this.overCell.image, .3, {
	                    width: 250 * M,
	                    height: 250 * M,
	                    left: 125 - 125 * M + "px",
	                    ease: Back.easeOut
	                })), TweenLite.to(this.overCell, .2, {
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
	            var N = this.overCell.down && !this.didMove ? -30 : 40;
	            h = this.overCell, this.effectCell(h, N)
	        }
	    }
	};

	GridDom.prototype.effectCell = function (a, b) {
	    {
	        var c = a,
	            d = this.points[this.gridWidth * (a.y % this.gridHeight) + (a.x + 1) % this.gridWidth],
	            e = this.points[this.gridWidth * ((a.y + 1) % this.gridHeight) + (a.x + 1) % this.gridWidth],
	            f = this.points[this.gridWidth * ((a.y + 1) % this.gridHeight) + a.x % this.gridWidth];
	        Math.PI / 4
	    }
	    c.spring.tx = -b, c.spring.ty = 1.3 * -b, d.spring.tx = 1.3 * +b, d.spring.ty = -b, e.spring.tx = +b, e.spring.ty = 1.3 * +b, f.spring.tx = -b, f.spring.ty = +b
	};

	GridDom.prototype.centerOnMoment = function () {
	    this.locked = !0, TweenLite.to(this, .4, {
	        zoomRatio: 1,
	        ease: Cubic.easeIn
	    })
	};

	GridDom.prototype.unlock = function () {
	    this.locked = !1, TweenLite.to(this, .2, {
	        zoomRatio: 0
	    })
	};

	GridDom.prototype.down = function () {
	    this.overCell = this.hittest(), this.overCell.down = !0, this.didMove = !1, this.overCell.count = 0, this.overCell.ratio = 0, this.overCell.alpha1 = 0, this.overCell.alpha2 = 0
	};

	GridDom.prototype.hittest = function () {
	    if (document.body.style.cursor = "default", this.overCell) {
	        var a = this.overCell,
	            b = this.points[this.gridWidth * (a.y % this.gridHeight) + (a.x + 1) % this.gridWidth],
	            c = this.points[this.gridWidth * ((a.y + 1) % this.gridHeight) + (a.x + 1) % this.gridWidth],
	            d = (this.points[this.gridWidth * ((a.y + 1) % this.gridHeight) + a.x % this.gridWidth], b.xReal - a.xReal),
	            e = c.yReal - a.yReal,
	            f = Config.mouse.x - a.xReal + 2 * this.squareWidth,
	            g = Config.mouse.y - a.yReal + 1.5 * this.squareWidth;
	        if (f > 0 && d > f && g > 0 && e > g) return "share" == a.moment.id ? f > 18 && d - 22 > f && g > 165 && e - 30 > g && (document.body.style.cursor = "pointer") : f > 5 && d - 5 > f && g > 230 && e + 24 > g && (document.body.style.cursor = "pointer"), this.overCell
	    }
	    var h = Math.floor((Config.mouse.x - this.camera.x) / this.squareWidth) + 2,
	        i = Math.floor((Config.mouse.y - this.camera.y + .5 * this.squareWidth) / this.squareWidth) + 1;
	    return h %= this.gridWidth, 0 > h && (h += this.gridWidth), i %= this.gridHeight, 0 > i && (i += this.gridHeight), this.points[i % this.gridHeight * this.gridWidth + h]
	};

	GridDom.prototype.up = function () {
	    if (!this.didMove) {
	        var a = this.overCell.xid;
	        a < -this.gridWidth && (a += this.gridWidth);
	        var b = this.overCell.yid;
	        if (b < -this.gridHeight && (b += this.gridHeight), point = this.overCell, point.moment.superlocked) return;
	        var c = point,
	            d = this.points[this.gridWidth * (point.y % this.gridHeight) + (point.x + 1) % this.gridWidth],
	            e = this.points[this.gridWidth * ((point.y + 1) % this.gridHeight) + (point.x + 1) % this.gridWidth],
	            f = this.points[this.gridWidth * ((point.y + 1) % this.gridHeight) + point.x % this.gridWidth],
	            g = -this.width / 2 - this.squareWidth * (this.padding + 1),
	            h = -this.height / 2 - 1.5 * this.squareWidth;
	        this.overCell.moment.corners = [{
	            x: c.xReals + g,
	            y: c.yReals + h
	        }, {
	            x: d.xReals + g,
	            y: d.yReals + h
	        }, {
	            x: e.xReals + g,
	            y: e.yReals + h
	        }, {
	            x: f.xReals + g,
	            y: f.yReals + h
	        }], this.overCell.moment.positionX = (a + 2 - .5) * this.squareWidth + this.width / 2 - this.squareWidth / 2 + 1, this.overCell.moment.positionY = (b + 1.5 - .5) * this.squareWidth + this.height / 2 - this.squareWidth / 2 + 1, this.overCell.moment.positionX = Math.floor(this.overCell.moment.positionX), this.overCell.moment.positionY = Math.floor(this.overCell.moment.positionY), this.overCell.moment.image = point.image, this.onMomentSelected(this.overCell.moment)
	    }
	};

	return GridDom;
});
