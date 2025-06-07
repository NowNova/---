class LogFilterProtocol {
    match(logText) {
        throw new Error('Method "match" must be implemented');
    }
}

module.exports = LogFilterProtocol;