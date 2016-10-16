var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync')
var express = require('express');

var sassOptions = {
	errLogToConsole: true,
	outputStyle: 'expanded'
};

var sassSources = './app/public/sass/**/*.scss';
var sassOutput = './app/public/css';
var htmlSource = './app/public/**/*.html';

var app = express();
var port = process.env.PORT || 3000;

gulp.task('sass', function(){
	return gulp.src(sassSources)
	.pipe(sourcemaps.init())
	.pipe(sass(sassOptions).on('error', sass.logError))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(sassOutput))
	.pipe(browserSync.stream())
});

function listening () {
	browserSync({
		proxy: 'localhost:' + port,
		browser: "google chrome"
	});
	gulp.watch(sassSources, ['sass']);
	gulp.watch(htmlSource).on('change', browserSync.reload);
}


app.use(express.static('./app/public'));

app.listen(port, listening);