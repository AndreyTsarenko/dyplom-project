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
            ".vk.logo.btn": "active",
            fasebook_button: "active",
            myspase_button: "active",
            youtube_button: "active"
        },
        /**
         *
         */
        checkLoginStatus: function () {
            this.$checkVkLoginStatus();
            this.$checkMySpaseLoginStatus();
            this.$checkYouTubeLoginStatus();
            this.$checkFaseBookLoginStatus();
        },
        /**
         *
         */
        $checkMySpaseLoginStatus: function () {

        },
        /**
         *
         */
        $checkYouTubeLoginStatus: function () {

        },
        /**
         *
         */
        $checkFaseBookLoginStatus: function () {

        },
        /**
         *
         */
        $checkVkLoginStatus: function () {
            VK.Auth.getLoginStatus(function (login_status) {
                if (login_status.status === "connected") {
                    localStorage.setItem("VkSession", JSON.stringify(login_status.session));
                    this.set(".vk.logo.btn", "disactive");
                    Application.getVKUserAudio();
                    Application.getVKUserVideo();
                }
            }.bind(this));
        }
    });
    /**
     *
     */
    return NavModel;
});