const fs = require('fs');
const LogHandlerProtocol = require('./logHandlerProtocol');

class FileHandler extends LogHandlerProtocol {
    constructor(filePath) {
        super();
        this.filePath = filePath;
    }

    handle(logText) {
        fs.appendFileSync(this.filePath, logText + '\n', 'utf8');
        console.log(`Log written to file: ${this.filePath}`);
    }
}

module.exports = FileHandler;