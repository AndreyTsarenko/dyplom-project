/**
 * Created with JetBrains WebStorm.
 * User: andrey
 * Date: 24.12.13
 * Time: 15:06
 * To change this template use File | Settings | File Templates.
 */
define([], function () {
    return {
        $$Listeners: {

        },
        /**
         *
         * @param event_name
         */
        $getListener: function (event_name) {
            return this.this.$$Listeners[event_name] = this.$$Listeners[event_name] ?
                this.$$Listeners[event_name] : $.Callbacks();
        },
        /**
         *
         * @param event_name
         * @param action
         */
        addListener: function (event_name, action) {
            this.$getListener(event_name).add(action);
        },
        /**
         *
         * @param event_name
         * @param action
         */
        removeListener: function (event_name, action) {
            this.$getListener(event_name).remove(action);
        },
        /**
         *
         * @param event_name
         */
        fireListener: function (event_name) {
            this.$getListener(event_name).fire();
        }
    }
})