define([
    'jquery',
    'underscore',
    'backbone',
    'collection/todos',
    'view/todo',
    'text!tmpl/stat.handlebars',
    'handlebars',
    'common'
], function ($, _, Backbone, Todos, TodoView, statsTemplate, Handlebars, Common) {
    'use strict';

    var AppView = Backbone.View.extend({

        el: '#todoapp',

        template: Handlebars.compile(statsTemplate),

        events: {
            'keypress #new-todo':       'createOnEnter',
            'keypress #new-search':		'search',
            'click #clear-completed':	'clearDone',
            'click #toggle-all':		'toggleAllComplete'
        },

        initialize: function () {
            this.allCheckbox = this.$('#toggle-all')[0];
            this.$input = this.$('#new-todo');
            this.$search = this.$('#new-search');
            this.$footer = this.$('#footer');
            this.$main = this.$('#main');
            this.$todoList = this.$('#todo-list');

            this.listenTo(Todos, 'add', this.addOne);
            this.listenTo(Todos, 'reset', this.addAll);
            this.listenTo(Todos, 'change:done', this.filterOne);
            this.listenTo(Todos, 'filter', this.filterAll);
            this.listenTo(Todos, 'all', this.render);

            this.registerHandlebarsPlugins();
            Todos.fetch({reset:true});
        },

        // Re-rendering the App just means refreshing the statistics -- the rest
        // of the app doesn't change.
        render: function () {
            var collection = this.filtered || Todos;
            var done = collection.done().length;
            var remaining = collection.remaining().length;

            if (collection.length) {
                this.$main.show();
                this.$footer.show();

                this.$footer.html(this.template({
                    done: done,
                    remaining: remaining
                }));

                this.$('#filters li a')
                    .removeClass('selected')
                    .filter('[href="#/' + (Common.TodoFilter || '') + '"]')
                    .addClass('selected');
            } else {
                this.$main.hide();
                this.$footer.hide();
            }

            this.allCheckbox.checked = !remaining;
        },

        registerHandlebarsPlugins : function() {
            Handlebars.registerHelper('ifCond', function(v1, v2, options) {
                if(v1 === v2) {
                    return options.fn(this);
                }
                return options.inverse(this);
            });
        },

        addOne: function (todo) {
            var view = new TodoView({ model: todo });
            this.$todoList.append(view.render().el);
        },

        addAll: function () {
            var collection = this.filtered || Todos;
            this.$todoList.empty();
            collection.each(this.addOne, this);
        },

        filterOne: function (todo) {
            todo.trigger('visible');
        },

        filterAll: function () {
            var collection = this.filtered || Todos;
            collection.each(this.filterOne, this);
        },

        newAttributes: function () {
            return {
                title: this.$input.val().trim(),
                desc: '',
                order: Todos.nextOrder(),
                done: false,
                created:new Date(),
                updated: new Date()
            };
        },

        createOnEnter: function (e) {
            if (e.which !== Common.ENTER_KEY || !this.$input.val().trim()) {
                return;
            }
            
            Todos.create(this.newAttributes());
            Todos.sort();
            this.$search.val('');
            this.$input.val('');
            this.search();
        },

        search: function (e) {
            var word = this.$search.val().trim();
            //only search if there are more than 3 chars
            if(!word || word.length < 2){
                this.filtered = null;
            }else{
                this.filtered = Todos.search(word);
                // console.log('filter');
            }
            this.addAll();
            this.render();
        },

        clearDone: function () {
            _.invoke(Todos.done(), 'destroy');
            return false;
        },

        toggleAllComplete: function () {
            var done = this.allCheckbox.checked;

            Todos.each(function (todo) {
                todo.save({
                    done: done
                });
            });
        }
    });

    return AppView;
});