/*global define*/
define([
	'jquery'
], function ($) {

      var Config = {

            isMobile : false, //window.mobilecheck(),

            REMOTE_PATH : "http://localhost.anz-netball/",

            mouse : {
                  x: 0,
                  y: 0,
                  button: false
            },
            track : {
                  x: 0,
                  y: 0
            },
            downAt : {
                  x: 0,
                  y: 0
            }            
      };

      return Config;
});