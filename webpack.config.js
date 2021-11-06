module.exports = {
	entry: './script',
	output: {
		filename: './build.js'
	},
	watchOptions: {
		aggregateTimeout: 500,
		poll: 1000
	}
}