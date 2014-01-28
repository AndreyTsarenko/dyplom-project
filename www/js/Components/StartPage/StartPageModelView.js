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
        $el: $(Template),
        /**
         *
         */
        _events: {
            ".logo": {
                "click": function (event) {
                    switch (event.target.getAttribute("data-social")) {
                        case "vk":
                            Application.loginVK();
                    }
                }
            }
        },
        /**
         *
         */
        initialize: function (options) {
            this.addEventToModel();
            this.model.checkLoginStatus();
            this.$el = $(Template);
            options.render_to.append(this.$el);
            this.bindEvents();
        },
        /**
         *
         */
        addEventToModel: function () {
            var key, changes;
            this.model.on("change", function (information) {
                changes = information.changed;
                for(key in changes) {
                   $(key).attr("state", changes[key]);
                };
            });
        }
    });
    return ModelView;
});