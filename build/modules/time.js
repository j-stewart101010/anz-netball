define(["jquery","config/config"],function(e,t){var n=function(){this.DELTA_TIME=1,this.lastTime=Date.now(),this.frames=0,this.speed=1};return n.constructor=n,n.prototype.update=function(){this.frames++;var e=Date.now();this.frames=0;var t=e,n=t-this.lastTime;this.DELTA_TIME=.06*n,this.DELTA_TIME*=this.speed,this.DELTA_TIME>2.3&&(this.DELTA_TIME=2.3),this.lastTime=t},n});