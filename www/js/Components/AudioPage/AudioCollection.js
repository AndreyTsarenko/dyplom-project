/**
 * Created with JetBrains WebStorm.
 * User: andrey
 * Date: 09.01.14
 * Time: 13:23
 * To change this template use File | Settings | File Templates.
 */
define(["../../AbstractClases/Media/MediaCollection", "./AudioModel"], function (Collection, Model) {
    var AudioCollection = Collection.extend({
        model: Model,
        $control_view: null,
        $control_model: Application.Components.Player.Model
    });
    return AudioCollection;
});