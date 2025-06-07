const LogFilterProtocol = require('./logFilterProtocol');

class ReLogFilter extends LogFilterProtocol {
    constructor(regexPattern) {
        super();
        this.regex = new RegExp(regexPattern);
    }

    match(logText) {
        return this.regex.test(logText);
    }
}

module.exports = ReLogFilter;