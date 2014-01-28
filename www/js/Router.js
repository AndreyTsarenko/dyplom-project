/**
 * Created with JetBrains WebStorm.
 * User: andrey
 * Date: 24.12.13
 * Time: 10:25
 * To change this template use File | Settings | File Templates.
 */
define(["ObjectListener"], function (ObjectListner) {
    var Router = Backbone.Router.extend($.extend({
        /**
         *
         * @param PATH
         */
        Components: {}
    }, ObjectListner));
    return Router;
});