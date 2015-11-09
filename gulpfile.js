var browserify = require('browserify');
var gulp = require('gulp');
var watch = require('gulp-debounced-watch');
var source = require('vinyl-source-stream');

gulp.task('browserify', function() {
    return browserify('./game/main.js').bundle()
        // vinyl-source-stream makes the bundle compatible with gulp
        .pipe(source('bundle.js')) // Desired filename
        // Output the file
        .pipe(gulp.dest('./game/'));
});

gulp.task('watch', function() {
    gulp.watch('./game/**/*.js', {debounceDelay: 2000}, ['browserify']);
});

gulp.task('default', ['watch']);