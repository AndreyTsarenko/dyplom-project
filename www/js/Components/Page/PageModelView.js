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
        initialize: function () {
            this.$renderPage();
            this.initializeModelEvents();
        },
        /**
         *
         */
        initializeModelEvents: function () {
            this.model.on("change:active", function (Model) {
                if (Model.get("active") === true) {
                    this.$el.show();
                } else {
                    this.$el.hide();
                }
            }.bind(this));
        },
        /**
         *
         */
        $renderPage: function () {
            this.$el = $(this.template(this.model.toJSON()));
            this.model.set("root_el", this.$el);
        }
        /**
         *
         */
    });
    return ModelView;
});