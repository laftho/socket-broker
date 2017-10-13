const Eventer = require("./eventer");
const uuid = require("node-uuid");

class Session extends Eventer {
    constructor(socket, request) {
        super();
        this.socket = socket;
        this.request = request; //TODO cookies for session resuming
        this.client = new Eventer();
        this.id = uuid.v4();

        const self = this;
        this.socket.on("message", (...args) => self.message.call(self, ...args));
        this.socket.on("open", (...args) => self.open.call(self, ...args));
        this.socket.on("close", (...args) => self.close.call(self, ...args));
    }

    open() {
        this.trigger("open");
    }

    close() {
        this.trigger("close");
    }

    message(data) {
        this.trigger("data", data);

        try {
            let event = JSON.parse(data);

            if (event && event.type && event.data) {
                this.client.trigger(event.type, event.data);
            } else {
                this.trigger("error", new Error("Malformed or null event"));
            }
        } catch(ex) {
            this.trigger("error", ex);
        }
    }

    send(event, data) {
        let evt = {
            type: event,
            data: data
        };

        this.socket.send(JSON.stringify(evt));
        this.trigger("sent", evt);
    }
}

module.exports = Session;
