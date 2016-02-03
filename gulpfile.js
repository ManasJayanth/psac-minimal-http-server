var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require('gulp-babel');
var gutils = require('gulp-util');
var watch = require('gulp-watch');
var runSequence = require('run-sequence');
 
gulp.task('babel', function () {
  return gulp.src('src/**')
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['es2015']
    }))
    // .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', function () {
    watch(['src/**.js'], function (fileVinyl) {
        runSequence(['babel']);
    });
});
