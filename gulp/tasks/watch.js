var gulp   = require('gulp');
var config = require('../config');

gulp.task('watch', 
    ['copy:watch',
    'js:watch',
    'pages:watch',
    'sass:watch'
]);
