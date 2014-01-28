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
            this.$initialize$el();
            this.addEventToModel();
        },
        /**
         *
         */
        addEventToModel: function () {
            this.model.on("change:active", function (model, value) {
                if (value === true) {
                    this.$el.attr("active", "true");
                } else {
                    this.$el.attr("active", "false");
                }
            }.bind(this));
        },
        /**
         *
         */
        $initialize$el: function () {
            this.$el = $(this.template(this.model.toJSON()));
        }
        /**
         *
         */
    });
    return ModelView;
});