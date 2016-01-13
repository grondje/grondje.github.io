gulp = require 'gulp'
connect = require 'gulp-connect'
jade = require 'gulp-jade'
sass = require 'gulp-sass'
gutil = require 'gulp-util'
prefix = require 'gulp-autoprefixer'
plumber = require 'gulp-plumber'
webpack = require 'webpack'

gulp.task 'connect', ->
	connect.server
		port: 1337
		livereload: on
		root: './dist'

gulp.task 'sass',  ->
	gulp.src './sass/main.sass'
		.pipe plumber()
		.pipe sass(includePaths : ['./sass/includes/'])
		.pipe prefix(browsers: ['> 5%', 'last 2 version'], cascade: false)
		.pipe gulp.dest 'dist/css'
		.pipe do connect.reload
				
gulp.task 'jade', ->
	gulp.src './jade/*.jade'
		.pipe plumber()
		.pipe jade pretty: true
		.pipe gulp.dest 'dist'
		.pipe do connect.reload

gulp.task 'webpack', (cb) ->
	webpack require('./webpack.config'), (err, stats) ->
		throw new gutil.PluginError('webpack', err) if err
		gutil.log('[webpack]', stats.toString(colors: true))
		cb()


gulp.task 'watch', ->
	gulp.watch './jade/**/*.jade', ['jade']
	gulp.watch './sass/**/*.sass', ['sass']
	gulp.watch 'js/main.js', ['webpack']

gulp.task 'default', ["jade", "sass", 'connect', 'watch', 'webpack']