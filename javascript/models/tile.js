/*global define*/
define([
      'jquery',
], function ($) {

var model = {

//
   content:[{
      tiletype:"text",
      title:"NAVIGATE",
      subtext:"Drag and drop to navigate your way around Netball Nation!"
      subimageurl:"images/drag-and-drop.png"
      flippable:"no"},

     {tiletype:"text",
      title:"DISCOVER",
      subtext:"Click an image to discover how netball is enriching lives",
      subimageurl:"images/click.png"
      flippable:"no"},

     {tiletype:"image",
      imageurl:"images/001.png",
      flippable:"yes",
      backtype:"text",
      backtitle:"BACKSIDE",
      backsubtext:"This is the back of the tile"}]
}

return model;

});