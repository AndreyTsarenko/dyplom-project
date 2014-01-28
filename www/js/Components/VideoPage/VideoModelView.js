/**
 * Created with JetBrains WebStorm.
 * User: andrey
 * Date: 09.01.14
 * Time: 13:24
 * To change this template use File | Settings | File Templates.
 */
define(["../../View", "text!./track_template.xml"], function (View, Template) {
    var ModelView = View.extend({
        /**
         *
         */
        template: _.template(Template),
        video_player_container: null,
        /**
         *
         */
        initialize: function () {
            this.$renderPage();
            this.video_player_container = Application.Components.VideoPage.View.$el.find(".video-player-container");
            this.initializeModelEvents();
            this.$el.find(".video_image").on("click", function () {
                if (!this.model.get("active")) {
                    this.model.setActive();
                } else {
                    this.model.disActive();
                }
            }.bind(this))
        },
        /**
         *
         */
        initializeModelEvents: function () {
            this.model.on("change:active", function (Model) {
                if (Model.get("active") === true) {
                    this.$el.attr("active", "true");
                    this.video_player_container.attr('src', Model.get("player"));
                } else {
                    this.$el.attr("active","false");
                }
            }.bind(this));
        },
        /**
         *
         */
        $renderPage: function () {
            var data = this.model.toJSON();
            if (data.player) {
                this.$el = $(this.template(data));
            }
        }
        /**
         *
         */
    });
    return ModelView;
});