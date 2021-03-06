
define([
      'underscore',
      'backbone',
], function (_, Backbone) {

  var TileModel = Backbone.Model.extend({
    initialize : function () {}
  });

  return TileModel;

  // var model = {
  //    content:[{
  //       tiletype:"text",
  //       colour:"#5397be",
  //       title:"NAVIGATE",
  //       subtext:"Drag and drop to navigate your way around Netball Nation!",
  //       subimageurl:"images/subimage-dragdrop.png",
  //       flippable:false},

  //      {tiletype:"text",
  //       colour:"#65b3e4",
  //       title:"DISCOVER",
  //       subtext:"Click an image to discover how netball is enriching lives",
  //       subimageurl:"images/subimage-click.png",
  //       flippable:false},

  //      {tiletype:"image",
  //       imageurl:"images/001.jpg",
  //       flippable:true,
  //       backtype:"text",
  //       backcolour:"#007db8",
  //       storyimageurl:"images/sample-avatar-one.jpg",
  //       storyusername:"Net183",
  //       storyfullname:"Kaitlin Alves",
  //       storyuserinfo:"26 years old. Veterinary Nurse",
  //       storydescription:"Keeping Jen company at the Box Hill high courts, and giving her one or two coaching tips to share with the juniors. LOL ;)",
  //       storytags:"#netballnation #besties #nothingbutlove #iheartnetball #teamplayer"},

  //      {tiletype:"image",
  //       imageurl:"images/002.jpg",
  //       flippable:true,
  //       backtype:"text",
  //       backcolour:"#007db8",
  //       storyimageurl:"images/sample-avatar-one.jpg",
  //       storyusername:"Net183",
  //       storyfullname:"Kaitlin Alves",
  //       storyuserinfo:"26 years old. Veterinary Nurse",
  //       storydescription:"Keeping Jen company at the Box Hill high courts, and giving her one or two coaching tips to share with the juniors. LOL ;)",
  //       storytags:"#netballnation #besties #nothingbutlove #iheartnetball #teamplayer"},

  //      {tiletype:"image",
  //       imageurl:"images/003.jpg",
  //       flippable:true,
  //       backtype:"text",
  //       backcolour:"#007db8",
  //       storyimageurl:"images/sample-avatar-one.jpg",
  //       storyusername:"Net183",
  //       storyfullname:"Kaitlin Alves",
  //       storyuserinfo:"26 years old. Veterinary Nurse",
  //       storydescription:"Keeping Jen company at the Box Hill high courts, and giving her one or two coaching tips to share with the juniors. LOL ;)",
  //       storytags:"#netballnation #besties #nothingbutlove #iheartnetball #teamplayer"},

  //      {tiletype:"textlink",
  //       colour:"#65b3e4",
  //       title:"COMMUNITY GRANTS",
  //       subtext:"Netball is a ball sport played by two teams of seven players.",
  //       subimageurl:"images/subimage-more.png",
  //       linkurl:"http://localhost.anz-netball/Community-Grants"},

  //      {tiletype:"video",
  //       textsubject:"TALKS NETBALL NATION",
  //       imageurl:"images/video001.jpg",
  //       textname:"SHARELLE MCMAHON",
  //       videoid: "M7lc1UVf-VE",
  //       subimageurl:"images/subimage-play.png",
  //       flippable: true
  //     },

  //      {tiletype:"image",
  //       imageurl:"images/004.jpg",
  //       flippable:true,
  //       backtype:"text",
  //       backcolour:"#007db8",
  //       storyimageurl:"images/sample-avatar-one.jpg",
  //       storyusername:"Net183",
  //       storyfullname:"Kaitlin Alves",
  //       storyuserinfo:"26 years old. Veterinary Nurse",
  //       storydescription:"Keeping Jen company at the Box Hill high courts, and giving her one or two coaching tips to share with the juniors. LOL ;)",
  //       storytags:"#netballnation #besties #nothingbutlove #iheartnetball #teamplayer"},

  //      {tiletype:"textlink",
  //       colour:"#65b3e4",
  //       title:"ANZ NetSetGo",
  //       subtext:"Netball is a ball sport played by two teams of seven players.",
  //       subimageurl:"images/subimage-more.png",
  //       linkurl:"http://localhost.anz-netball/ANZ-NetSetGo"},

  //      {tiletype:"image",
  //       imageurl:"images/005.jpg",
  //       flippable:true,
  //       backtype:"text",
  //       backcolour:"#007db8",
  //       storyimageurl:"images/sample-avatar-one.jpg",
  //       storyusername:"Net183",
  //       storyfullname:"Kaitlin Alves",
  //       storyuserinfo:"26 years old. Veterinary Nurse",
  //       storydescription:"Keeping Jen company at the Box Hill high courts, and giving her one or two coaching tips to share with the juniors. LOL ;)",
  //       storytags:"#netballnation #besties #nothingbutlove #iheartnetball #teamplayer"},

  //      {tiletype:"image",
  //       imageurl:"images/006.jpg",
  //       flippable:true,
  //       backtype:"text",
  //      backcolour:"#007db8",
  //       storyimageurl:"images/sample-avatar-one.jpg",
  //       storyusername:"Net183",
  //       storyfullname:"Kaitlin Alves",
  //       storyuserinfo:"26 years old. Veterinary Nurse",
  //       storydescription:"Keeping Jen company at the Box Hill high courts, and giving her one or two coaching tips to share with the juniors. LOL ;)",
  //       storytags:"#netballnation #besties #nothingbutlove #iheartnetball #teamplayer"},

  //      {tiletype:"image",
  //       imageurl:"images/007.jpg",
  //       flippable:true,
  //       backtype:"text",
  //       backcolour:"#007db8",
  //       storyimageurl:"images/sample-avatar-one.jpg",
  //       storyusername:"Net183",
  //       storyfullname:"Kaitlin Alves",
  //       storyuserinfo:"26 years old. Veterinary Nurse",
  //       storydescription:"Keeping Jen company at the Box Hill high courts, and giving her one or two coaching tips to share with the juniors. LOL ;)",
  //       storytags:"#netballnation #besties #nothingbutlove #iheartnetball #teamplayer"},

  //      {tiletype:"image",
  //       imageurl:"images/008.jpg",
  //       flippable:true,
  //       backtype:"text",
  //       backcolour:"#007db8",
  //       storyimageurl:"images/sample-avatar-one.jpg",
  //       storyusername:"Net183",
  //       storyfullname:"Kaitlin Alves",
  //       storyuserinfo:"26 years old. Veterinary Nurse",
  //       storydescription:"Keeping Jen company at the Box Hill high courts, and giving her one or two coaching tips to share with the juniors. LOL ;)",
  //       storytags:"#netballnation #besties #nothingbutlove #iheartnetball #teamplayer"},

  //      {tiletype:"image",
  //       imageurl:"images/009.jpg",
  //       flippable:true,
  //       backtype:"text",
  //       backcolour:"#007db8",
  //       storyimageurl:"images/sample-avatar-one.jpg",
  //       storyusername:"Net183",
  //       storyfullname:"Kaitlin Alves",
  //       storyuserinfo:"26 years old. Veterinary Nurse",
  //       storydescription:"Keeping Jen company at the Box Hill high courts, and giving her one or two coaching tips to share with the juniors. LOL ;)",
  //       storytags:"#netballnation #besties #nothingbutlove #iheartnetball #teamplayer"},

  //      {tiletype:"image",
  //       imageurl:"images/010.jpg",
  //       flippable:true,
  //       backtype:"text",
  //       backcolour:"#007db8",
  //       storyimageurl:"images/sample-avatar-one.jpg",
  //       storyusername:"Net183",
  //       storyfullname:"Kaitlin Alves",
  //       storyuserinfo:"26 years old. Veterinary Nurse",
  //       storydescription:"Keeping Jen company at the Box Hill high courts, and giving her one or two coaching tips to share with the juniors. LOL ;)",
  //       storytags:"#netballnation #besties #nothingbutlove #iheartnetball #teamplayer"},

  //      {tiletype:"image",
  //       imageurl:"images/011.jpg",
  //       flippable:true,
  //       backtype:"text",
  //       backcolour:"#007db8",
  //       storyimageurl:"images/sample-avatar-one.jpg",
  //       storyusername:"Net183",
  //       storyfullname:"Kaitlin Alves",
  //       storyuserinfo:"26 years old. Veterinary Nurse",
  //       storydescription:"Keeping Jen company at the Box Hill high courts, and giving her one or two coaching tips to share with the juniors. LOL ;)",
  //       storytags:"#netballnation #besties #nothingbutlove #iheartnetball #teamplayer"},

  //      {tiletype:"image",
  //       imageurl:"images/012.jpg",
  //       flippable:true,
  //       backtype:"text",
  //       backcolour:"#007db8",
  //       storyimageurl:"images/sample-avatar-one.jpg",
  //       storyusername:"Net183",
  //       storyfullname:"Kaitlin Alves",
  //       storyuserinfo:"26 years old. Veterinary Nurse",
  //       storydescription:"Keeping Jen company at the Box Hill high courts, and giving her one or two coaching tips to share with the juniors. LOL ;)",
  //       storytags:"#netballnation #besties #nothingbutlove #iheartnetball #teamplayer"},

  //      {tiletype:"image",
  //       imageurl:"images/013.jpg",
  //       flippable:true,
  //       backtype:"text",
  //       backcolour:"#007db8",
  //       storyimageurl:"images/sample-avatar-one.jpg",
  //       storyusername:"Net183",
  //       storyfullname:"Kaitlin Alves",
  //       storyuserinfo:"26 years old. Veterinary Nurse",
  //       storydescription:"Keeping Jen company at the Box Hill high courts, and giving her one or two coaching tips to share with the juniors. LOL ;)",
  //       storytags:"#netballnation #besties #nothingbutlove #iheartnetball #teamplayer"},

  //      {tiletype:"image",
  //       imageurl:"images/014.jpg",
  //       flippable:true,
  //       backtype:"text",
  //       backcolour:"#007db8",
  //       storyimageurl:"images/sample-avatar-one.jpg",
  //       storyusername:"Net183",
  //       storyfullname:"Kaitlin Alves",
  //       storyuserinfo:"26 years old. Veterinary Nurse",
  //       storydescription:"Keeping Jen company at the Box Hill high courts, and giving her one or two coaching tips to share with the juniors. LOL ;)",
  //       storytags:"#netballnation #besties #nothingbutlove #iheartnetball #teamplayer"},

  //      {tiletype:"image",
  //       imageurl:"images/015.jpg",
  //       flippable:true,
  //       backtype:"text",
  //       backcolour:"#007db8",
  //       storyimageurl:"images/sample-avatar-one.jpg",
  //       storyusername:"Net183",
  //       storyfullname:"Kaitlin Alves",
  //       storyuserinfo:"26 years old. Veterinary Nurse",
  //       storydescription:"Keeping Jen company at the Box Hill high courts, and giving her one or two coaching tips to share with the juniors. LOL ;)",
  //       storytags:"#netballnation #besties #nothingbutlove #iheartnetball #teamplayer"},

  //      {tiletype:"image",
  //       imageurl:"images/016.jpg",
  //       flippable:true,
  //       backtype:"text",
  //       backcolour:"#007db8",
  //       storyimageurl:"images/sample-avatar-one.jpg",
  //       storyusername:"Net183",
  //       storyfullname:"Kaitlin Alves",
  //       storyuserinfo:"26 years old. Veterinary Nurse",
  //       storydescription:"Keeping Jen company at the Box Hill high courts, and giving her one or two coaching tips to share with the juniors. LOL ;)",
  //       storytags:"#netballnation #besties #nothingbutlove #iheartnetball #teamplayer"}],

  //    worldWidth:5
  // }

  // return model;

});