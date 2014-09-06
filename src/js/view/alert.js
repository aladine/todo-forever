
define([
    'jquery',
    'underscore',
    'backbone',
    'text!tmpl/alert.handlebars',
    'handlebars',
    'common'
], function ($, _, Backbone, alertTemplate, Handlebars, Common) {
    'use strict';

    var AlertView = Backbone.View.extend({

        template: Handlebars.compile(alertTemplate),

        // The DOM events specific to an item.
        events: {
            'click .close':  'close'
        },

        initialize: function () {
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        show: function () {
            this.render();
            $(document.body).append(this.$el);

        },
        close: function(){
            this.$el.remove();
        },

    });

    return AlertView;
});