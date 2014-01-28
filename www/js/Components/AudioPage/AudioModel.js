/**
 * Created with JetBrains WebStorm.
 * User: andrey
 * Date: 09.01.14
 * Time: 13:24
 * To change this template use File | Settings | File Templates.
 */
define(["../../AbstractClases/Media/MediaModel"], function (Model) {
    var NavModel = Model.extend({
        defaults: {
            artist: "",
            duration: "",
            genre: "",
            owner_id: "",
            title: "",
            url: "",
            track_time: 0
        }
    });
    return NavModel;
});