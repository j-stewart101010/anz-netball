/*global define*/
define([
      'jquery',
], function ($) {

var model = {

//
   content:[{
      tiletype:"text",
      colour:"#5397be",
      title:"NAVIGATE",
      subtext:"Drag and drop to navigate your way around Netball Nation!",
      subimageurl:"images/subimage-dragdrop.png",
      flippable:false},

     {tiletype:"text",
      colour:"#65b3e4",
      title:"DISCOVER",
      subtext:"Click an image to discover how netball is enriching lives",
      subimageurl:"images/subimage-click.png",
      flippable:false},

     {tiletype:"image",
      imageurl:"images/001.jpg",
      flippable:true,
      backtype:"text",
      backcolour:"#ff8877",
      backtitle:"BACKSIDE 1",
      backsubtext:"This is the back of the tile"},

     {tiletype:"image",
      imageurl:"images/002.jpg",
      flippable:true,
      backtype:"text",
      backcolour:"#ff8877",
      backtitle:"BACKSIDE 2",
      backsubtext:"This is the back of the tile"},

     {tiletype:"image",
      imageurl:"images/003.jpg",
      flippable:true,
      backtype:"text",
      backcolour:"#ff8877",
      backtitle:"BACKSIDE 3",
      backsubtext:"This is the back of the tile"},

     {tiletype:"textlink",
      colour:"#65b3e4",
      title:"COMMUNITY GRANTS",
      subtext:"Netball is a ball sport played by two teams of seven players.",
      subimageurl:"images/subimage-more.png",
      linkurl:"http://localhost.anz-netball/Community-Grants"},

     {tiletype:"video",
      imageurl:"images/video001.jpg",
      textname:"SHARELLE MCMAHON",
      textsubject:"TALKS NETBALL NATION",
      linkurl:"http://youtube.com/watch?anznbn-sharelletalks"},

     {tiletype:"image",
      imageurl:"images/004.jpg",
      flippable:true,
      backtype:"text",
      backcolour:"#ff8877",
      backtitle:"BACKSIDE 4",
      backsubtext:"This is the back of the tile"},

     {tiletype:"textlink",
      colour:"#65b3e4",
      title:"ANZ NetSetGo",
      subtext:"Netball is a ball sport played by two teams of seven players.",
      subimageurl:"images/subimage-more.png",
      linkurl:"http://localhost.anz-netball/ANZ-NetSetGo"},

     {tiletype:"image",
      imageurl:"images/005.jpg",
      flippable:true,
      backtype:"text",
      backcolour:"#ff8877",
      backtitle:"BACKSIDE 5",
      backsubtext:"This is the back of the tile"},

     {tiletype:"image",
      imageurl:"images/006.jpg",
      flippable:true,
      backtype:"text",
      backcolour:"#ff8877",
      backtitle:"BACKSIDE 6",
      backsubtext:"This is the back of the tile"},

     {tiletype:"image",
      imageurl:"images/007.jpg",
      flippable:true,
      backtype:"text",
      backcolour:"#ff8877",
      backtitle:"BACKSIDE 7",
      backsubtext:"This is the back of the tile"},

     {tiletype:"image",
      imageurl:"images/008.jpg",
      flippable:true,
      backtype:"text",
      backcolour:"#ff8877",
      backtitle:"BACKSIDE 8",
      backsubtext:"This is the back of the tile"},

     {tiletype:"image",
      imageurl:"images/009.jpg",
      flippable:true,
      backtype:"text",
      backcolour:"#ff8877",
      backtitle:"BACKSIDE 9",
      backsubtext:"This is the back of the tile"},

     {tiletype:"image",
      imageurl:"images/010.jpg",
      flippable:true,
      backtype:"text",
      backcolour:"#ff8877",
      backtitle:"BACKSIDE 10",
      backsubtext:"This is the back of the tile"},

     {tiletype:"image",
      imageurl:"images/011.jpg",
      flippable:true,
      backtype:"text",
      backcolour:"#ff8877",
      backtitle:"BACKSIDE 11",
      backsubtext:"This is the back of the tile"},

     {tiletype:"image",
      imageurl:"images/012.jpg",
      flippable:true,
      backtype:"text",
      backcolour:"#ff8877",
      backtitle:"BACKSIDE 12",
      backsubtext:"This is the back of the tile"},

     {tiletype:"image",
      imageurl:"images/013.jpg",
      flippable:true,
      backtype:"text",
      backcolour:"#ff8877",
      backtitle:"BACKSIDE 13",
      backsubtext:"This is the back of the tile"},

     {tiletype:"image",
      imageurl:"images/014.jpg",
      flippable:true,
      backtype:"text",
      backcolour:"#ff8877",
      backtitle:"BACKSIDE 14",
      backsubtext:"This is the back of the tile"},

     {tiletype:"image",
      imageurl:"images/015.jpg",
      flippable:true,
      backtype:"text",
      backcolour:"#ff8877",
      backtitle:"BACKSIDE 15",
      backsubtext:"This is the back of the tile"},

     {tiletype:"image",
      imageurl:"images/016.jpg",
      flippable:true,
      backtype:"text",
      backcolour:"#ff8877",
      backtitle:"BACKSIDE 16",
      backsubtext:"This is the back of the tile"}]
  
}

return model;

});