/**
 * Created by linmin on 30/8/14.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!tmpl/item.handlebars',
    'handlebars',
    'common'
], function ($, _, Backbone, todosTemplate, Handlebars, Common) {
    'use strict';

    var TodoView = Backbone.View.extend({

        tagName:  'li',

        template: Handlebars.compile(todosTemplate),

        // The DOM events specific to an item.
        events: {
            'click .toggle':	'toggleDone',
            'dblclick label':	'edit',
            'click .destroy':	'clear',
            'keypress .edit':	'updateOnEnter',
            'keydown .edit':	'revertOnEscape',
            'click .js_save':	'save',
            'click .js_cancel':  'close'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.model, 'visible', this.toggleVisible);

            this.registerHandlebarsPlugins();
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.toggleClass('done', this.model.get('done'));

            this.toggleVisible();
            this.$input = this.$('.edit');
            this.$textarea = this.$('.edit_desc');
            return this;
        },

        registerHandlebarsPlugins : function() {
            Handlebars.registerHelper('ifCond', function(v1, v2, options) {
                if(v1 === v2) {
                    return options.fn(this);
                }
                return options.inverse(this);
            });

            Handlebars.registerHelper('dateFormat', function(timestamp) {
                return (""+new Date(timestamp)).substring(4,24);
            });
        },

        toggleVisible: function () {
            this.$el.toggleClass('hidden',  this.isHidden());
        },

        isHidden: function () {
            var isCompleted = this.model.get('done');
            return (// hidden cases only
                (!isCompleted && Common.TodoFilter === 'done') ||
                    (isCompleted && Common.TodoFilter === 'active')
                );
        },

        toggleDone: function () {
            this.model.toggle();
        },

        edit: function () {
            this.$el.addClass('editing');
            this.$textarea.val(this.$textarea.data('desc'));
            this.$input.focus();
        },

        save: function () {
            var value = this.$input.val();
            var trimmedValue = value.trim();
            var descValue = this.sanitize(this.$textarea.val());
            
            if (trimmedValue) {
                this.model.save({ 
                    title: trimmedValue ,
                    desc : descValue
                });

                if (value !== trimmedValue) {
                    this.model.trigger('change');
                }
            } else {
                this.clear();
            }
            this.close();
        },

        close: function(){
            this.$el.removeClass('editing');
        },

        updateOnEnter: function (e) {
            if (e.keyCode === Common.ENTER_KEY) {
                this.save();
            }
        },

        revertOnEscape: function (e) {
            if (e.which === Common.ESCAPE_KEY) {
                this.$el.removeClass('editing');
                this.$input.val(this.model.get('title'));
            }
        },

        clear: function () {
            if(!this.model.get('done')) {
                Common.alert('This task should be marked completed before deleting.');
            }
            else {
                this.model.destroy();
            }
        },

        sanitize: function(str){
          // this function will truncate extra white spaces  and trim each words maximum 30 chars
          return str.replace(/\s+/g," ").split(" ").map(function(e,i){return e.substring(0,30);}).join(" ");
        }
    });

    return TodoView;
});