class LogHandlerProtocol {
    handle(logText) {
        throw new Error('Method "handle" must be implemented');
    }
}

module.exports = LogHandlerProtocol;