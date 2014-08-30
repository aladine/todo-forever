/**
 * Created by linmin on 29/8/14.
 */
require.config({
    shim: {
        JQuery: {
            exports: '$'
        },
        Underscore: {
            exports: '_'
        },
        Handlebars: {
            exports: 'Handlebars'
        },
        Backbone: {
            deps: [
                'Underscore',
                'JQuery'
            ],
            exports: 'Backbone'
        },
        Storage: {
            deps: ['backbone'],
            exports: 'Storage'
        }
    },
    paths: {
        JQuery: [
            'http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min',
            'lib/jquery/jquery'
        ],
        Underscore: [
            'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min',
            'lib/underscore/underscore'
        ],
        Backbone: [
            'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min',
            'lib/backbone/backbone'
        ],
        Storage: [
            'http://cdnjs.cloudflare.com/ajax/libs/backbone-localstorage.js/1.1.13/backbone.localStorage-min',
            'lib/backbone.Localstorage/backbone.Localstorage'
        ],
        Text: [
            'http://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min',
            'lib/requirejs-text/text'
        ],
        Handlebars: [
//            'http://cdnjs.cloudflare.com/ajax/libs/requirejs-handlebars/0.0.2/hbars.min',
            'lib/handlebars/handlebars'
        ]
    }
});

require(['Backbone','Handlebars'], function (Backbone, Handlebars) {
    Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
        switch (operator) {
            case '==':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
    });
    console.log("it works!", Backbone);

});