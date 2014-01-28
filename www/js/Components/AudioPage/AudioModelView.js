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
        /**
         *
         */
        initialize: function () {
            this.$renderPage();
            this.initializeModelEvents();
            this.$el.find(".play").on("click", function () {
                if (!this.model.get("active")) {
                    this.model.setActive();
                } else {
                    this.model.disActive();
                }
            }.bind(this));
        },
        /**
         *
         */
        initializeModelEvents: function () {
            this.model.on("change:active", function (Model) {
                if (Model.get("active") === true) {
                    this.$el.attr("active", "true");
                    this.model.collection.startPlaying(this.model);
                    this.$el.append(this.model.collection.$audio_view.$el);
                    this.model.collection.$audio_view.$addListeners();
                } else {
                    this.$el.attr("active", "false");
                    this.model.collection.pausingPlayer();
                    this.model.collection.$audio_view.$el.remove();
                }
            }.bind(this));
        },
        /**
         *
         */
        $renderPage: function () {
            var data = this.model.toJSON();
            if (data.artist) {
                this.$el = $(this.template(data));
            }
        }
        /**
         *
         */
    });
    return ModelView;
});