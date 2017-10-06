var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var bower = require('gulp-bower');
//var bower = require('gulp-bower-files');
//var concat = require('gulp-concat')
//var gulpFilter = require('gulp-filter');

gulp.task('bower', function() {
  return bower();
});

gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			baseDir: 'app',
			browser: 'google chrome',
			routes: {
		        "/bower_components": "bower_components"
		    }
		}
	})
});

gulp.task('sass', function() {
	return gulp.src('app/sass/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

gulp.task('watch', function() {
	gulp.watch('app/sass/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/*.js', browserSync.reload);
});

gulp.task('default', function(callback) {
	runSequence(['bower', 'sass', 'browserSync'], 'watch',
		callback
		)
});