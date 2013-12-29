/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap_transition',    
    'bootstrap_collapse',
], function ($, _, Backbone) {

    var _self;

    var AppView = Backbone.View.extend({

        el : 'body',

        events : {
            'click .menu-icon' : 'toggle'
        },

        initialize : function () {
            _self = this;

            // var c=document.getElementById("myCanvas");
            // var ctx=c.getContext("2d");
            // var imageObj1 = new Image();
            // var imageObj2 = new Image();
            // var imageObj3 = new Image();
            // var imageObj4 = new Image();
            // imageObj1.src = "/images/netball-grid-one.jpg";
            // imageObj2.src = "/images/netball-grid-two.jpg";
            // imageObj2.src = "/images/netball-grid-three.jpg";
            // imageObj2.src = "/images/netball-grid-four.jpg";




            // $(window).load(function() {
            //     // imageObj1.onload = function() {
            //        ctx.drawImage(imageObj1, 0, 0, 255, 252);
            //        // imageObj2.onload = function() {
            //        ctx.drawImage(imageObj2, 255, 0, 255, 252);
            //           var img = c.toDataURL("image/jpg");
            //           $('.image-canvas').append('<img src="' + img + '" >');
            //        // }
            //     // };
            // });



        },

        toggle : function () {
            // console.log('toggling');
            // $(this).collapse('toggle');
        }

    });

    return AppView;

});