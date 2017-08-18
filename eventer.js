class Eventer {
    constructor() {
        this.listeners = new Map();
    }

    on(event, listener) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }

        this.listeners.get(event).push(listener);
    }

    trigger(event, data) {
        if (this.listeners.has(event)) {
            for (let listener of this.listeners.get(event)) {
                try {
                    listener.call(listener, data);
                } catch(ex) {
                    console.log(`listener error on ${event}: ${ex}`);
                }
            }
        }
    }
}

module.exports = Eventer;

