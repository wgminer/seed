var gulp = require('gulp'); 
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
 
gulp.task('sass', function () {
    gulp.src('dev/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dev/css'));
});

gulp.task('browser-sync', function() {
    browserSync.init(['dev/css/**/*.css', 'dev/js/**/*.js', 'dev/**/*.html'], {
        server: {
            baseDir: './dev',
            routes: {
                '/bower_components': 'bower_components'
            }
        }
    });
});

gulp.task('default', ['sass', 'browser-sync'], function () {
    gulp.watch('dev/scss/**/*.scss', ['sass']);
});