/**
 * Created by linmin on 29/8/14.
 */
"use strict";
require.config({
    shim: {
        handlebars: {
            exports: 'Handlebars'
        }
    },
    paths: {
        jquery: [
            'http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min',
            'lib/jquery/jquery'
        ],
        underscore: [
            'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min',
            'lib/underscore/underscore'
        ],
        backbone: [
            'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min',
            'lib/backbone/backbone'
        ],
        localstorage: [
            'http://cdnjs.cloudflare.com/ajax/libs/backbone-localstorage.js/1.1.13/backbone.localStorage-min',
            'lib/backbone.localStorage/backbone.localStorage'
        ],
        text: [
            'http://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min',
            'lib/requirejs-text/text'
        ],
        handlebars: [
//            'http://cdnjs.cloudflare.com/ajax/libs/requirejs-handlebars/0.0.2/hbars.min',
            'lib/handlebars/handlebars'
        ]
    }
});

require(['backbone','view/app'], function (Backbone, AppView) {
    new AppView();
});