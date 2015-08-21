var gulp = require('gulp'); 
var browserSync = require('browser-sync').create();
var precss = require('precss');
var postcss = require('gulp-postcss');

gulp.task('css', function () {
    var processors = [
        precss
    ];
    return gulp.src('./dev/postcss/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dev/css'));
});

gulp.task('browser-sync', function() {
    browserSync.init(['dev/postcss/**/*.css', 'dev/js/**/*.js', 'dev/**/*.html'], {
        server: {
            baseDir: './dev',
            routes: {
                '/bower_components': 'bower_components'
            }
        }
    });
});

gulp.task('default', ['css', 'browser-sync'], function () {
    gulp.watch('dev/postcss/*.css', ['css']);
});