/*global define*/
define([
	'jquery',
], function ($) {

      var Config = {

            isMobile : window.mobilecheck(),

            REMOTE_PATH : "http://gbd.abulia.org.uk/",

            REMOTE_PATH_2 : "http://localhost.anz-netball/",

            mouse : {
                  x: 0,
                  y: 0
            },
            track : {
                  x: 0,
                  y: 0
            },
            downTarget : {
                  x: 0,
                  y: 0
            }            
      };

      return Config;
});