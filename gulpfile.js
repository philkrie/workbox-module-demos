const gulp = require('gulp'),

    del = require('del'),
    runSequence = require('run-sequence'),
    src = `${__dirname}/src`,
    dist = `${__dirname}/dist`
    workbox = require('workbox-build');

gulp.task('clean', () => {
  return del(dist);
});

gulp.task('build', () => {
  return gulp.src(`${src}/**/*`)
      .pipe(gulp.dest(dist));
});

gulp.task('generate-service-worker', () => {
    return workbox.generateSW({
      globDirectory: dist,
      globPatterns: [
        '\*\*/\*.{html,js}'
      ],
      swDest: `${dist}/sw.js`,
      clientsClaim: true,
      skipWaiting: true
    }).then(({warnings}) => {
      // In case there are any warnings from workbox-build, log them.
      for (const warning of warnings) {
        console.warn(warning);
      }
      console.info('Service worker generation completed.');
    }).catch((error) => {
      console.warn('Service worker generation failed:', error);
    });
  });

gulp.task('default', (callback) => {
  runSequence('clean', 'build', 'generate-service-worker', callback);
});