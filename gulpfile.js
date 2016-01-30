var gulp = require('gulp'); 
var postcss = require('gulp-postcss');
var less = require('gulp-less');
var jade = require('gulp-jade');
var browserSync = require('browser-sync').create();

var plugins = [
    require('autoprefixer'),
    require('cssnano')
];

gulp.task('less', function () {
    gulp.src('./src/less/main.less')
        .pipe(less({
            paths: ['libs/harmony/src']
        }))
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./build/css'));
});

gulp.task('jade', function() {
    return gulp.src(['./src/**/*.jade'])
        .pipe(jade())
        .pipe(gulp.dest('build'));
});

gulp.task('js', function() {
    return gulp.src(['./src/js/**/*.js',  './src/js/**/*.json'])
        .pipe(gulp.dest('./build/js'));
});

gulp.task('browser-sync', function() {
    browserSync.init(['./build/css/**/*.css', './build/js/**/*.js', './build/**/*.html'], {
        server: {
            baseDir: './build',
            routes: {
                '/libs': 'libs'
            }
        }
    });
});

gulp.task('default', ['less', 'jade', 'js', 'browser-sync'], function () {
    gulp.watch('less/**/*.less', {cwd: 'src'}, ['less']);
    gulp.watch('**/*.jade', {cwd: 'src'}, ['jade']);
    gulp.watch('js/**/*.js', {cwd: 'src'}, ['js']);
});