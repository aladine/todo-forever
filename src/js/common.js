'use strict';

define(['jquery','backbone','view/alert'], function ($, Backbone, AlertView) {
    var exports = {
        TodoFilter: '', // empty, active, completed

        ENTER_KEY: 13,
        ESCAPE_KEY: 27
    };

    exports.alert = function(content){
        var model = new Backbone.Model({content: content});
        var alert = new AlertView({model: model});
        alert.show();
    };
    return exports;
});