const Logger = require('./logger');
const SimpleLogFilter = require('./simpleLogFilter');
const ReLogFilter = require('./reLogFilter');
const FileHandler = require('./fileHandler');
const ConsoleHandler = require('./consoleHandler');

const errorFilter = new SimpleLogFilter('ERROR');
const httpFilter = new ReLogFilter('HTTP/\\d\\.\\d');

const fileHandler = new FileHandler('app.log');
const consoleHandler = new ConsoleHandler();

const logger = new Logger(
    [errorFilter, httpFilter],
    [fileHandler, consoleHandler]
);

logger.log('INFO: Application started');
logger.log('ERROR: HTTP/1.1 404 Not Found');
logger.log('ERROR: Database connection failed');
logger.log('HTTP/2.0 200 OK');