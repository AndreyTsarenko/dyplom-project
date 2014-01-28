/**
 * Created with JetBrains WebStorm.
 * User: andrey
 * Date: 24.12.13
 * Time: 11:27
 * To change this template use File | Settings | File Templates.
 */
define([], function () {
    var Model =  Backbone.Model.extend({
        defaults: {

        },
        /**
         *
         * @returns {*}
         */
        getPrevModel: function () {
            var current_index;
            if (this.collection) {
                current_index = this.collection.models.indexOf(this);
                return this.collection.models[--current_index];
            }
        },
        /**
         *
         * @returns {*}
         */
        getNextModel: function () {
            var current_index;
            if (this.collection) {
                current_index = this.collection.models.indexOf(this);
                return this.collection.models[++current_index];
            }
        },
        /**
         *
         */
        setActive: function () {
            this.collection && this.collection.setActiveModel(this);
        },
        /**
         *
         */
        disActive: function () {
            if (this.collection && this.collection._active_model === this) {
                this.collection._active_model = null;
                this.set("active", false);
            }

        }
    });
    return Model;
});