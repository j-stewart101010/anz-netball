define(["jquery","underscore","backbone","models/image"],function(e,t,n,r){var i=n.Collection.extend({model:r,url:"/javascript/data/image-data.json",initialize:function(){}});return new i});