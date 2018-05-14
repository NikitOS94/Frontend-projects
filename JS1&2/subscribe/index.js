var events = [];

module.exports = {
    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {
        events.push({
            event:event,
            subscriber:subscriber,
            handler:handler
        });

        return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
       events = events.filter(function (value) {
            return (value.event!=event || value.subscriber!=subscriber);
        })
        return this;
    },

    /**
     * @param {String} event
     */
    emit: function (event) {
        events.forEach(function (value) {
            if(value.event===event)
                value.handler.call(value.subscriber)
        })
        return this;
    }
};
