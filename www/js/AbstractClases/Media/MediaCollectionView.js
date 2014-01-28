/**
 * Created with JetBrains WebStorm.
 * User: andrey
 * Date: 09.01.14
 * Time: 13:23
 * To change this template use File | Settings | File Templates.
 */
define(["../../View"], function(View) {
    var NavView = View.extend({
        $items_view: [],
        $audio_container: null,
        $audio_player: null,
        $ModelView: null,
        template: null,
        containerId: "",
        playerId: "",
        /**
         *
         */
        initialize: function (options) {
            this.$el = $(this.template);
            options.render_to.append(this.$el);
            this.$audio_container = this.$el.find(this.containerId);
            this.$audio_player = this.$el.find(this.playerId)[0];
            this.$addEventToCollection();
        },
        /**
         *
         */
        $addEventToCollection: function () {
            this.collection.on("add", function (model) {
                var view,
                    duration = model.get("duration"),
                    min, sec;
                if (duration) {
                    min = parseInt(duration / 60);
                    sec = duration % 60;
                    model.set("track_time", min + ":" +sec);
                }
                view = new this.$ModelView({model: model});
                this.$items_view.push(view);
                this.$audio_container.append(view.$el);
            }.bind(this));
            /**
             *
             */
            this.collection.on("remove", function () {

            }.bind(this));
        }
    });
    return NavView;
});