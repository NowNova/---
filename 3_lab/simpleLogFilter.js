const LogFilterProtocol = require('./logFilterProtocol');

class SimpleLogFilter extends LogFilterProtocol {
    constructor(pattern) {
        super();
        this.pattern = pattern;
    }

    match(logText) {
        return logText.includes(this.pattern);
    }
}

module.exports = SimpleLogFilter;