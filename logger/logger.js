var winston = require('winston');

// define the custom settings for each transport (file, console)
var options = {
	file: {
		level: 'info',
		filename: `${__dirname}/logs/server.log`,
		handleExceptions: true,
		json: true,
		maxsize: 5242880, // 5MB
		maxFiles: 5,
		colorize: true
	}
};

// instantiate a new Winston Logger with the settings defined above
var logger = winston.createLogger({
	transports: [new winston.transports.File(options.file)],
	exitOnError: false // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
	write: function(message) {
		// use the 'info' log level so the output will be picked up by both transports (file and console)
		logger.info(message);
	}
};

module.exports = logger;
