/**
 * Created by linmin on 30/8/14.
 */
define([
    'underscore',
    'backbone',
    'localstorage',
    'model/todo'
], function (_, Backbone, Store, Todo) {
    'use strict';

    var TodosCollection = Backbone.Collection.extend({
        model: Todo,

        localStorage: new Store('todos-backbone'),

        done: function () {
            return this.where({done: true});
        },

        remaining: function () {
            return this.where({done: false});
        },

        nextOrder: function () {
            return this.length ? this.last().get('order') + 1 : 1;
        },

        comparator: 'order'
    });

    return new TodosCollection();
});