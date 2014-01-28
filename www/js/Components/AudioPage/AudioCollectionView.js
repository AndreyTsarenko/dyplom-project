/**
 * Created with JetBrains WebStorm.
 * User: andrey
 * Date: 09.01.14
 * Time: 13:23
 * To change this template use File | Settings | File Templates.
 */
define(["../../AbstractClases/Media/MediaCollectionView", "./AudioModelView", "text!./template.xml"], function(View, ModelView, Template) {
    var NavView = View.extend({
        $items_view: [],
        $audio_container: null,
        $audio_player: null,
        $ModelView: ModelView,
        template: Template,
        containerId: ".audio-container",
        playerId: "audio"
        /**
         *
         */
    });
    return NavView;
});