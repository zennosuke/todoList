// plug-in
var gulp = require('gulp');
var browserify = require('browserify');
var browserSync = require('browser-sync').create();
var source = require('vinyl-source-stream');

// gulpタスク
gulp.task('build', function(done){
  browserify({
    entries: ['src/app.js']
  }).bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist/'));
    done();
});
gulp.task('browser-sync', function (done) {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });
    done();
});
gulp.task('bs-reload', function(done){
  browserSync.reload();
  done();
});

gulp.task('default', gulp.series( gulp.parallel('build', 'browser-sync'), function(done){
  gulp.watch('./src/*.js', gulp.task('build'));
  gulp.watch('./*.html', gulp.task('bs-reload'));
  gulp.watch('./dist/*.+(js|css)', gulp.task('bs-reload'));
  done();
}));