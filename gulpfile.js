var gulp = require('gulp'); 
var clean = require('gulp-clean');
var postcss = require('gulp-postcss');
var less = require('gulp-less');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
 
gulp.task('sass', function () {
    gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'));
});

gulp.task('less', function () {
    gulp.src('src/less/**/*.less')
        .pipe(less().on('error', less.logError))
        .pipe(gulp.dest('build/css'));
});

gulp.task('jade', function() {
    return gulp.src(['src/**/*.jade'])
        .pipe(jade())
        .pipe(gulp.dest('build'));
});

gulp.task('browser-sync', function() {
    browserSync.init(['src/css/**/*.css', 'src/js/**/*.js', 'src/**/*.html'], {
        server: {
            baseDir: './src',
            routes: {
                '/libs': 'libs'
            }
        }
    });
});

gulp.task('default', ['sass', 'browser-sync'], function () {
    gulp.watch('src/scss/**/*.scss', ['sass']);
});