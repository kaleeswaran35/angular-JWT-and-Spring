import winston, { createLogger, transports, format } from 'winston';

var logger = new (winston.Logger)({
    "exitOnError" : true,
    "transports" : [
        new (winston.transports.Console)({ "level" : "silly", "silent" : false, "handleExceptions" : false }),
    ]
});

export class LoggingService {
  log(message) {
    logger.info(message);
  }
}
