/**
 * Created with JetBrains WebStorm.
 * User: andrey
 * Date: 24.12.13
 * Time: 10:22
 * To change this template use File | Settings | File Templates.
 */
define(['./Router'], function (Router) {
    var Application = Router.extend({
        /**
         *
         */
        NAVIGATION: [
            {
                title: "Start",
                href: "#page/start-page",
                className: "start-page",
                id: "start"
            },
            {
                title: "Audio",
                href: "#page/audio-page",
                className: "audio-page",
                id: "audio"
            },
            {
                title: "Video",
                href: "#page/video-page",
                className: "video-page",
                id: "video"
            },
            {
                title: "Photo",
                href: "#page/photo-page",
                className: "photo-page",
                id: "photo"
            },
            {
                title: "Settings",
                href: "#page/settings-page",
                className: "settings-page",
                id: "settings"

            }
        ],
        /**
         * @property
         * @private
         */
        $media: {
            "VK": {
                "user_audio": []
            }
        },
        /**
         * @property
         * @public
         */
        routes: {
            "page/:page_name": "turnPage"
        },
        /**
         *
         */
        initialize: function () {
            this.$initMainPlayerControls();
            this.$initNavigation();
            this.$initPages();
            this.$initSocialConnection();
            Backbone.history.start();
        },
        /**
         *
         */
        turnPage: function (page_class_name) {
            try {
                this.Components.Pages.Collection.setActiveModel({className: page_class_name});
                this.Components.Navigation.Collection.setActiveModel({className: page_class_name});
            } catch (error) {
                console.log("Error: page doesn't exist");
            }
        },
        /**
         *
         */
        $initSocialConnection: function () {
            VK.init({
                apiId: 4118576
            })
        },
        /**
         *
         */
        loginVK: function () {
            var settings = 4095;//111111111111 bin
            VK.Auth.login(function (response) {
                localStorage.setItem("VkSession", JSON.stringify(response.session));
            },settings);
        },
        /**
         *
         */
        $onPagesLoaded: function () {
            this.$initStartPage();
            this.$initAudioPage();
            this.$initVideoPage();
        },
        /**
         *
         */
        $initVideoPage: function () {
            var PATH = "./Components/VideoPage/";
            var VideoPage = this.Components.VideoPage = {};
            require([PATH + "VideoCollection", PATH + "VideoCollectionView"], function (Collection, CoolectionView) {
                VideoPage.Collection = new Collection();
                VideoPage.View  = new CoolectionView({
                    collection: VideoPage.Collection,
                    render_to: this.getPageRootElement("video")
                });
            }.bind(this));
        },
        /**
         *
         */
        $initAudioPage: function () {
            var PATH = "./Components/AudioPage/";
            var StartPage = this.Components.AudioPage = {};
            require([PATH + "AudioCollection", PATH + "AudioCollectionView"], function (Collection, CoolectionView) {
                StartPage.Collection = new Collection();
                StartPage.View  = new CoolectionView({
                    collection: StartPage.Collection,
                    render_to: this.getPageRootElement("audio")
                });
            }.bind(this));
        },
        /**
         *
         */
        $initStartPage: function () {
            var PATH = "./Components/StartPage/";
            var StartPage = this.Components.StartPage = {};
            require([PATH + "StartPageModel", PATH + "StartPageModelView"], function (Model, View) {
                StartPage.Model = new Model({});
                StartPage.View  = new View({
                    model: StartPage.Model,
                    render_to: this.getPageRootElement("start")
                });
            }.bind(this));
        },
        /**
         *
         */
        getPageRootElement: function (id) {
            return this.Components.Pages.Collection.findModel({id: id}).get("root_el")
        },
        /**
         *
         */
        getVKUserVideo: function () {
            var video;
            var session = JSON.parse(localStorage.getItem("VkSession"));
            VK.api("video.get", { owner_id: session.mid}, function (response) {
                video = response.response;
                video.slice(0, 1);
                this.$media.VK.user_video = video;
                if (video) {
                    this.Components.VideoPage.Collection.set(video);
                }
            }.bind(this));
        },
        /**
         *
         */
        getVKUserAudio: function () {
            var audios;
            var session = JSON.parse(localStorage.getItem("VkSession"));
            VK.api("audio.get", { owner_id: session.mid}, function (response) {
                audios = response.response;
                audios.slice(0, 1);
                this.$media.VK.user_audio = audios;
                if (audios) {
                    this.Components.AudioPage.Collection.set(audios);
                }
            }.bind(this));
        },
        /**
         *
         */
        $initMainPlayerControls: function () {
            var PATH = "./Components/PlayerControlls/";
            var Player = this.Components.Player = {};
            require([PATH + "PlayerControllsModel", PATH + "PlayerControllsModelView"], function (Model, View) {
                Player.Model = new Model ({
                    className: "main-controller"
                });
                Player.MainControlsView = new View({
                    model: Player.Model,
                    className: "main-controls",
                    render_to: $("body")
                });
                Player.MainControlsView.$addListeners();
            }.bind(this));
        },
        /**
         *
         */
        $initPages: function () {
            var PAGES_PATH = "./Components/Page/";
            var Pages = this.Components.Pages = {};
            require([PAGES_PATH + "PageCollection", PAGES_PATH + "PageCollectionView"], function (PagesCollection, PagesView) {
                Pages.Collection = new PagesCollection(this.NAVIGATION);
                Pages.CollectionView = new PagesView({collection: Pages.Collection});
                this.$onPagesLoaded();
                this.turnPage("start-page");
            }.bind(this));
        },
        /**
         *
         */
        $initNavigation: function () {
            var NAV_PATH = "./Components/Navigation/";
            var Navigation = this.Components.Navigation = {};
            require([NAV_PATH + "NavigationCollection", NAV_PATH + "NavigationCollectionView"], function (NavigationCollection, NavigationView) {
                Navigation.Collection = new NavigationCollection(this.NAVIGATION);
                Navigation.CollectionView = new NavigationView({collection: Navigation.Collection});
            }.bind(this));
        }

    });
    return Application;
});