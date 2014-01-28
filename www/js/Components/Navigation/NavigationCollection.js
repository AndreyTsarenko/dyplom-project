/**
 * Created with JetBrains WebStorm.
 * User: andrey
 * Date: 09.01.14
 * Time: 13:23
 * To change this template use File | Settings | File Templates.
 */
define(["../../Collection", "./NavigationModel"], function (Collection, Model) {
    var NavCollection = Collection.extend({
        model: Model
    });
    return NavCollection;
});