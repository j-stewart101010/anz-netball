define(["jquery","underscore","backbone","config/config","text!templates/gallery-slide.html"],function(e,t,n,r,i){var s,o=n.View.extend({tagName:"div",className:"item shade-fourteen gallery-slide",initialize:function(){s=this},preload_tiles:function(){this.options.parent.preload_tiles(this.$el.find(".image-wrap"))},render:function(){var e={slide:this.options.slide,target:this.options.target.selector};return this.$el.html(t.template(i,e,{variable:"data"})),this}});return o});