/**
 * Created with JetBrains WebStorm.
 * User: andrey
 * Date: 09.01.14
 * Time: 13:23
 * To change this template use File | Settings | File Templates.
 */
define(["../../Collection", "./MediaModel"], function (Collection, Model) {
    var AudioCollection = Collection.extend({
        model: Model,
        $control_view: null,
        $control_model: Application.Components.Player.Model,
        /**
         *
         */
        initialize: function () {
            this.$initControls();
        },
        /**
         *
         */
        $initControls: function () {
            require(["Components/PlayerControlls/PlayerControllsModelView"], function (View) {
                this.$audio_view = new View({
                    model: this.$control_model
                });
            }.bind(this));
        },
        /**
         *
         */
        pausingPlayer: function () {
            this.$control_model.pause();
        },
        /**
         *
         */
        startPlaying: function (Model) {
            if (!this.$control_model.$$media_model || (this.$control_model.$$media_model.cid !== Model.cid)) {
                var object = Model.toJSON();
                object.player = $("audio")[0];
                this.$control_model.$$media_model = Model;
                this.$control_model.set(object);
            } else {
                this.$control_model.play();
            }

        }
    });
    return AudioCollection;
});