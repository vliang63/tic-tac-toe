var gulp = require('gulp');
var less = require('gulp-less');
var babelify = require('babelify');
var react = require('babel-preset-react')
var concat = require('gulp-concat')
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var transform = require('transform');


function swallowError (error) {
    console.log(error.toString());
    this.emit("end");
}

gulp.task('browserify', function() {
	return browserify({
		entries:['./client/app.js', './client/helpers.js'],
		debug: true
	})
	.transform(babelify.configure({presets:"react"}))
	.on('error', swallowError)	
	.bundle()
	.on('error', swallowError)
	.pipe(source('bundle.js'))
	.on('error', swallowError)
	.pipe(gulp.dest('./client/dist'))
});

gulp.task('lessify', function() {
	return gulp.src(['./client/styles.less'])
	.pipe(concat('styles.css'))
	.pipe(less())
	.on('error', swallowError)
	.pipe(gulp.dest('./client/dist'));
});

gulp.task('watch', function() {
	gulp.watch('./client/*.js', ['browserify']);
	gulp.watch('./client/*.jsx', ['browserify']);
	gulp.watch('./client/styles.less', ['lessify']);
});

gulp.task('build', ['browserify', 'lessify', 'watch']);