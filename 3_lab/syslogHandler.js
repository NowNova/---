const { exec } = require('child_process');
const LogHandlerProtocol = require('./logHandlerProtocol');

class SyslogHandler extends LogHandlerProtocol {
    constructor(tag = 'nodejs') {
        super();
        this.tag = tag;
    }

    handle(logText) {
        exec(`logger -t ${this.tag} "${logText}"`, (error) => {
            if (error) {
                console.error('Failed to write to syslog:', error);
            }
        });
    }
}

module.exports = SyslogHandler;