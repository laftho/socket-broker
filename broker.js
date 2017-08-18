const Eventer = require("./eventer");
const Session = require("./session");

class Broker extends Eventer {
    constructor(server) {
        super();
        this.server = server;

        this.sessions = new Map(); //TODO session resuming

        const self = this;
        this.server.on("connection", (socket, request) => {
            self.connect(socket, request);
        });
    }

    connect(socket, request) {
        let session = new Session(socket, request);
        this.sessions.set(session.id, session);

        this.trigger("connection", session);

        return session;
    }
}

module.exports = Broker;
