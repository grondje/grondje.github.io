module.exports = {
	context: __dirname + '/js',
	entry: './main.js',
	output: {
		filename: 'bundle.js',
		path: __dirname + '/dist' + '/js'
	}
}