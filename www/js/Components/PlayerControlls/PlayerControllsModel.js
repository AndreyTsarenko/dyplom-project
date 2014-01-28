/**
 * Created with JetBrains WebStorm.
 * User: andrey
 * Date: 09.01.14
 * Time: 13:24
 * To change this template use File | Settings | File Templates.
 */
define(["../../Model"], function (Model) {
    var Model = Model.extend({
        default: {
        },
        $audio_players: [],
        $media_model: null,
        $$media_model: null,
        initialize: function () {
            this.on("change", function (model) {
                if (model.changed.url) {
                    this.$media_model = model;
                    var player = model.get("player");
                    if (this.$audio_players.indexOf(player) == -1) {
                        this.$audio_players.push(player);
                        this.$initPlayerEvent();
                    }
                    player.src = model.get("url");
                    this.play();
                }
            }.bind(this));
        },
        /**
         *
         */
        togglePlay: function () {
            var play = this.get("playing");
            if (!play){
                this.play();
            } else {
                this.pause()
            }
        },
        /**
         *
         */
        setCurrentTime: function (percent) {
            var player = this.get("player");
            player.currentTime = player.duration * percent;
        },
        /**
         *
         */
        pause: function () {
            this.get("player").pause();
            this.set("playing", false);

            this.$$media_model.disActive();
        },
        /**
         *
         */
        play: function () {
            this.get("player").play();
            this.set("playing", true);
            if (this.$$media_model && this.$$media_model.get("active") !== true) {
                this.$$media_model.setActive();

            }
            this.$media_model.setActive();
        },
        /**
         *
         */
        playPrev: function () {
            this.$$media_model = this.$$media_model.getPrevModel();
            this.set(this.$$media_model.toJSON());
        },
        /**
         *
         * @param forward
         */
        playNext: function (forward) {
            this.$$media_model = this.$$media_model.getNextModel();
            this.set(this.$$media_model.toJSON());
        },
        /**
         *
         */
        $initPlayerEvent: function () {
            var that = this;
            this.get("player").addEventListener("ended", function (event) {
                that.playNext();
            });
            this.get("player").addEventListener("timeupdate", function (event) {
                var current_time = parseInt(this.get("player").currentTime),
                    duration = parseInt(this.get("player").duration),
                    time_left = duration - current_time,
                    percentage = current_time / duration * 100;
                this.set({
                    percent: percentage + "%",
                    time: parseInt(current_time / 60) + ":" + (current_time % 60),
                    time_left: parseInt(time_left / 60) + ":" + (time_left % 60)
                })

            }.bind(this));
        }
    });
    return Model;
});