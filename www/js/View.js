/**
 * Created with JetBrains WebStorm.
 * User: andrey
 * Date: 24.12.13
 * Time: 12:30
 * To change this template use File | Settings | File Templates.
 */
define([], function () {
    var View = Backbone.View.extend({
        /**
         *
         * @param [root_el]
         * @param [event_object]
         */
        bindEvents: function (root_el, event_object) {
            var selector, event_el, event_type;
            if (!root_el) {
                root_el = this.$el;
            }
            if (!event_object) {
                event_object = this._events;
            }
            if (root_el && event_object) {
                for (selector in event_object) {
                    event_el = root_el.find(selector);
                    for (event_type in event_object[selector]) {
                        hendler = event_object[selector][event_type].bind(this);
                        event_object[selector][event_type] = hendler;
                        event_el.on(event_type, event_object[selector][event_type]);
                    }
                    event_el = null;
                }
            } else {
                alert("element or event object is absent");
            }
        },
        /**
         *
         * @param [root_el]
         * @param [event_object]
         */
        unbindEvents: function (root_el, event_object) {
            var selector, event_el, event_type, hendler;
            if (!root_el) {
                root_el = this.$el;
            }
            if (!event_object) {
                event_object = this._events;
            }
            if (root_el && event_object) {
                for (selector in event_object) {
                    event_el = root_el.find(selector);
                    for (event_type in event_object[selector]) {
                        event_el.off(event_type, event_object[selector][event_type]);
                    }
                    event_el = null;
                }
            } else {
                alert("element or event object is absent");
            }
        },
        /**
         *
         * @param [root_el]
         * @param [event_object]
         */
        rebindEvents: function (root_el, event_object) {
            this.unbindEvents(root_el, event_object);
            this.bindEvents(root_el, event_object);
        }
    });
    return View;
});