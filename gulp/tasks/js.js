var gulp = require('gulp');
var include = require("gulp-include");
var concat = require ('gulp-concat');
var uglify = require('gulp-uglify');
var config = require('../config');
var browserSync = require('browser-sync');
var babel = require('gulp-babel');
var reload = browserSync.reload;


gulp.task('js', function () {
    gulp.src(config.src.js+'/app.js')
        .pipe(include())
        .on('error', function(){notify("Javascript include error");})
        // .pipe(babel())
        .pipe(concat('app.min.js'))
        // .pipe(uglify())
        .pipe(gulp.dest(config.dest.js+'/'))
        .pipe(reload({stream: true}));
});
gulp.task('js:watch',['js'], function() {
    gulp.watch(config.src.js+'/*', ['js']);
});