/**
 * Created with JetBrains WebStorm.
 * User: andrey
 * Date: 09.01.14
 * Time: 13:24
 * To change this template use File | Settings | File Templates.
 */
define(["../../View", "text!./template.xml"], function (View, Template) {
    var ModelView = View.extend({
        /**
         *
         */
        template: _.template(Template),
        /**
         *
         */
        initialize: function (options) {
            var config = this.model.toJSON();
            config.className = options.className;
            config.render_to = options.render_to;
            this.$renderPlayer(config);
//            this.$addListeners();
            this.$addListenersModel();
        },
        /**
         *
         */
        $addListenersModel: function () {
            this.model.on("change:playing", function(model) {

                if (model.get("playing")) {
                    this.$el.attr("play", "true");
                } else {
                    this.$el.attr("play", "false");
                }
            }.bind(this));
            this.model.on("change:percent", function(model) {
                this.$el.find(".indicator")[0].style.width = model.get("percent");
            }.bind(this));
            this.model.on("change:time", function(model) {
                this.$el.find(".time").attr('time', model.get("time"));
            }.bind(this));
            this.model.on("change:time_left", function(model) {
            }.bind(this));
        },
        /**
         *
         */
        $addListeners: function () {
            var that = this;
            this.$el.find(".play").on("click", function () {
                 that.model.togglePlay();
            });
            this.$el.find(".play").on("click", function () {
                that.model.togglePlay();
            });
            this.$el.find(".forward").on("click", function () {
                that.model.playNext(true);
            });
            this.$el.find(".progress-bar").on("click", function (event) {
                var width = $(event.target).width(),
                    offset = event.offsetX,
                    percent = offset / width;
                that.model.setCurrentTime(percent);
            });
            this.$el.find(".backward").on("click", function () {
                that.model.playPrev();
            });
        },
        /**
         *
         */
        $renderPlayer: function (config) {
            this.$el = $(this.template(config));
            if (config.render_to) {
                config.render_to.append(this.$el);
            }
        }
    });
    return ModelView;
});