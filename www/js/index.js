(function () {
    /**
     * @type {Array}
     */
    window.CSS_PATH = [
        "./css/Navigation.css",
        "./css/AudioContainer.css",
        "./css/VideoContainer.css",
        "./css/Audio.css",
        "./css/Video.css",
        "./css/Media.css",
        "./css/PlayerController.css",
        "./css/StartPage.css",
        "./css/Pages.css"
    ];
    /**
     * @description
     * @type {Array}
     */
    window.PATH = [
        "js/libs/jQuery/jquery.js",
        "js/libs/underscore/underscore.js",
        "js/libs/backbone/backbone.js",
        "App"
    ];
    /**
     * @description Method that load CSS files
     * @param CSS_PATH path to css files
     * @public
     */
    window.loadCSS = function (CSS_PATH) {
        var i, link,
            head = document.getElementsByTagName("head")[0],
            len = CSS_PATH.length;
        for (i = 0; i < len; i++) {
            link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = CSS_PATH[i];
            head.appendChild(link);
        }
    };

    loadCSS(CSS_PATH);

    requirejs.config({
        paths: {
            "text": "libs/require/text"
        }
    });
    /**
     * @description Requires files that is write on PATH
     */
    require(PATH , function (first, second, thrid, Application) {
        Backbone.$ = $;
        window.Application = new Application ();
    });
})();
