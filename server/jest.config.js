module.exports = {
	testEnvironment: 'node',
	rootDir: './',
	name: 'server',
	preset: '@shelf/jest-mongodb',
	setupFiles: ['<rootDir>/config/config.js'],
};
