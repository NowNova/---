const net = require('net');
const LogHandlerProtocol = require('./logHandlerProtocol');

class SocketHandler extends LogHandlerProtocol {
    constructor(host, port) {
        super();
        this.host = host;
        this.port = port;
    }

    handle(logText) {
        const client = new net.Socket();
        client.connect(this.port, this.host, () => {
            client.write(logText);
            client.end();
        });
    }
}

module.exports = SocketHandler;