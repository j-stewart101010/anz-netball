/*global define*/
define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {

    var _self;

    var ModalView = Backbone.View.extend({

        initialize : function () {
            _self = this;
            console.log('video mod');
        }        

    });

    return ModalView;

});

