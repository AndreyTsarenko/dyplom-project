/**
 * Created with JetBrains WebStorm.
 * User: andrey
 * Date: 09.01.14
 * Time: 13:23
 * To change this template use File | Settings | File Templates.
 */
define(["../../View", "./NavigationModelView"], function(View, ModelView) {
    var NavView = View.extend({
        tagName: "nav",
        id: "navigation",
        $items_view: [],
        /**
         *
         */
        initialize: function () {
            this.initItems();
            this.renderItems();
        },
        /**
         *
         */
        renderItems: function () {
            var i, len,
                body = $("body");
            for (i = 0, len = this.$items_view.length; i < len; i++) {
                this.$el.append(this.$items_view[i].$el);
            }
            body.append(this.$el);
        },
        /**
         *
         */
        initItems: function () {
            this.collection.each(function (Model) {
                this.$items_view.push(new ModelView({model: Model}));
            }.bind(this));
        }
    });
    return NavView;
});