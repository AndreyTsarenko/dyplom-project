/**
 * Created with JetBrains WebStorm.
 * User: andrey
 * Date: 09.01.14
 * Time: 13:24
 * To change this template use File | Settings | File Templates.
 */
define(["../../Model"], function (Model) {
    var NavModel = Model.extend({
        default: {
            title: "NO TITLE",
            href: "#error"
        }
    });
    return NavModel;
});