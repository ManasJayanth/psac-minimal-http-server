var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require('gulp-babel');
var spawn = require('child_process').spawn;
var gutils = require('gulp-util');

gulp.task('default', function () {
  return gulp.src('src/**')
    .pipe(sourcemaps.init())
    .pipe(babel())
    // .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist')).on('end', function () {
        var server = spawn('node', ['src/index']);

        server.stdout.on('data', (data) => {
            console.log(`${data}`);
        });

        server.stderr.on('data', (data) => {
            console.log(`ps stderr: ${data}`);
        });

        server.on('close', (code) => {
        });
    });
});
