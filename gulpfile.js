var gulp = require('gulp');
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var Server = require('karma').Server;


var paths = {
  jslint: [
    'src/*.js'
  ],
  build: [
    'src/reaumur.js'
  ]
};


gulp.task('lint', function () {
  return gulp.src(paths.jslint)
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failOnError());
});


gulp.task('build', function () {
  gulp.src(paths.build)
    .pipe(gulp.dest('dist'));

  return gulp.src(paths.build)
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('dist'));
});


gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});


gulp.task('default', ['lint']);
