const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const runSequence = require('run-sequence');
const bower = require('gulp-bower');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const pump = require('pump');

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

gulp.task('babel', function() {
	return gulp.src("app/js/*.js")
		.pipe(babel())
		.pipe(gulp.dest("app/js/dist"))
		.pipe(browserSync.reload({
			stream: true
		}));
})

gulp.task('watch', function() {
	gulp.watch('app/sass/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/*.js', ['babel']);
});

gulp.task('jquery', function(){
	gulp.src('bower_components/*/*/*.min.js')
		.pipe(gulp.dest('app/js'));
});

gulp.task('js', function(cb) {
	gulp.src('bower_components/*/*/*.min.js')
		.pipe(gulp.dest('public/js'));

	pump([
        gulp.src('app/js/dist/*.js'),
        uglify(),
        gulp.dest('./public/js/dist')
    ],
    cb
    );
});

gulp.task('css', function() {
	gulp.src('app/css/*.css')
		.pipe(gulp.dest('public/css'));
});

gulp.task('html', function() {
	gulp.src('app/*.html')
		.pipe(gulp.dest('public/'));
});

gulp.task('images', function() {
	gulp.src('app/img/*.*')
		.pipe(imagemin())
		.pipe(gulp.dest('public/img'));
});

gulp.task('default', function(callback) {
	runSequence(['bower', 'sass', 'jquery', 'babel', 'browserSync', 'build'], 'watch',
		callback
		)
});

gulp.task('build', function(callback) {
	runSequence('html', 'css', 'js', 'images', 
		callback
		)
});