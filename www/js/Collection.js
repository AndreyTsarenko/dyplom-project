/**
 * Created with JetBrains WebStorm.
 * User: andrey
 * Date: 24.12.13
 * Time: 14:42
 * To change this template use File | Settings | File Templates.
 */
define(["ObjectListener"], function (ObjectListener) {
    var Collection = Backbone.Collection.extend($.extend(ObjectListener, {
        _active_model: null,
        /**
         *
         */
        setActiveModel: function (Model) {
            if (this.models.indexOf(Model) !== -1) {
                this._active_model && this._active_model.set("active", false);
                Model.set("active", true);
                this._active_model = Model;
            } else {
                Model = this.findModel(Model);
                if (Model) {
                    this.setActiveModel(Model);
                } else {
                    console.log("Error: this model does'nt exist");
                }
            }
        },
        /**
         *
         * @param SerchObject
         */
        findModel: function (SerchObject) {
            var i, len, key, json_model;
            a: for (i = 0, len = this.models.length; i < len; i++) {
                json_model = this.models[i].toJSON();
                for (key in SerchObject) {
                    if (json_model[key] !== SerchObject[key]) {
                        continue a;
                    }
                }
                return this.models[i];
            }
        }
    }));
    return Collection;
});