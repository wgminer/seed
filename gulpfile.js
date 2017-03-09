'use-strict';

const gulp = require('gulp'); 
const gutil = require('gulp-util');
const del = require('del');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync');

const plugins = [
    require('autoprefixer'),
    require('cssnano')
];

gulp.task('clean', () => {
    return del([
        './public/css', 
        './public/js'
    ]);
});

gulp.task('scss', () => {
    return gulp.src(['./src/scss/**/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./public/css'));
});
 
gulp.task('js', () => {
    return gulp.src(['./src/js/**/*.js'])
        .pipe(gulp.dest('./public/js'));
});

gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({
        script: 'server.js',
        ext: 'js pug',
        ignore: [
            'src',
            'public',
            'gulpfile.js'
        ]
    })
    .on('start', function () {
        if (!called) {
            called = true;
            cb();
        }
    })
    .on('restart', function () {
        browserSync.reload();
    });
});

gulp.task('browser-sync', ['nodemon'], () => {
    browserSync.init([],{
        proxy: 'http://localhost:8080',
        files: ['public/**/*'],
        browser: ['google chrome'],
        port: 3000,
        reloadDelay: 1000,
        notify: {
            styles: {
                top: 'auto',
                bottom: '0'
            }
        }
    });
});

gulp.task('build', cb => {
    return runSequence('clean', ['scss', 'js'], cb);
});

gulp.task('watch', () => {
    gulp.watch('**/*.scss', {cwd: './src'}, ['scss']);
    gulp.watch('**/*.js', {cwd: './src'}, ['js']);
});

gulp.task('serve', cb => {
    runSequence('build', 'browser-sync', 'watch', cb)
});