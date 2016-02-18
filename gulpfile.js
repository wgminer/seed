var gulp = require('gulp'); 
var gutil = require('gulp-util');

var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var concat = require('gulp-concat');
var jade = require('gulp-jade');

var browserSync = require('browser-sync').create();

gulp.task('img', function() {
    return gulp.src(['./src/img/**/*'])
        .pipe(gulp.dest('./build/img'));
});

gulp.task('sass', function () {

    var plugins = [
        require('autoprefixer'),
        require('cssnano')
    ];

    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./build/css'));
});

gulp.task('jade', function() {
    return gulp.src(['./src/**/*.jade'])
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task('json', function() {
    return gulp.src(['./src/js/**/*.json'])
        .pipe(gulp.dest('./build/js'));
});

gulp.task('js', ['json'], function () {

    var scripts = [
        './libs/jquery/dist/jquery.js',
        './libs/lodash/lodash.js',
        // './libs/firebase/firebase.js',
        // './libs/angular/angular.js',
        // './libs/angular-ui-router/release/angular-ui-router.js',
        // './libs/angularfire/dist/angularfire.js',
        './src/js/**/*.js',
    ];

    return gulp.src(scripts)
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./build/js'))
});

gulp.task('browser-sync', function() {
    browserSync.init(['./build/css/styles.css', './build/js/**/*.js', './build/**/*.html'], {
        notify: false,
        server: {
            baseDir: './build',
            routes: {
                '/libs': 'libs'
            }
        }
    });
});

gulp.task('serve', ['img', 'sass', 'jade', 'js', 'browser-sync'], function () {
    gulp.watch('img/**/*', {cwd: 'src'}, ['imgs']);
    gulp.watch('scss/**/*.scss', {cwd: 'src'}, ['sass']);
    gulp.watch('**/*.jade', {cwd: 'src'}, ['jade']);
    gulp.watch('js/**/*', {cwd: 'src'}, ['js']);
});