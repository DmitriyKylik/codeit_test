var gulp        = require('gulp');
var config      = require('../../config');

gulp.task('pages', function() {

    return gulp
        .src(config.src.root+'/*.html')
        .pipe(gulp.dest(config.dest.html));
});

gulp.task('pages:watch', function() {
    gulp.watch(config.src.root+'/*', ['pages']);
});
