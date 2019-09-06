const path = require('path');
const { createLogger, format, transports } = require('winston');

const { combine, timestamp, label, printf, splat, json } = format;

var options = {
	file: {
		level: 'info',
		filename: path.join(__dirname, '../logs/server.log'),
		handleExceptions: true,
		maxsize: 5242880, // 5MB
		maxFiles: 5,
	},
};

const myFormat = printf(info => {
	return `${info.timestamp} ${info.label} ${info.level}: ${info.message}`;
});

const logger = createLogger({
	format: combine(
		label({ label: '[logger]' }),
		timestamp(),
		json(),
		splat(),
		myFormat
	),
	transports: [new transports.File(options.file)],
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
	write: function(message) {
		logger.info(message);
	},
};

module.exports = logger;
