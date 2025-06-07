const LogHandlerProtocol = require('./logHandlerProtocol');

class ConsoleHandler extends LogHandlerProtocol {
    handle(logText) {
        console.log(`[Console Log]: ${logText}`);
    }
}

module.exports = ConsoleHandler;