import gulp from 'gulp';
import del from 'del';
import dotenvToJson from 'gulp-dotenv-to-json';
import watch from 'gulp-watch';
import batch from 'gulp-batch';
import merge from 'gulp-merge-json';
import plumber from 'gulp-plumber';
import jetpack from 'fs-jetpack';
import bundle from './bundle';
import { getEnvName, beepSound } from './utils';

const srcDir = jetpack.cwd('./src');
const destDir = jetpack.cwd('./app');
const configDir = jetpack.cwd('./config');

gulp.task('bundle', () => {
  Promise.all([
    bundle(srcDir.path('server.js'), destDir.path('server.js')),
    bundle(srcDir.path('app.js'), destDir.path('app.js')),
  ]);
});

gulp.task('clean', () => {
  del('.config/tmp');
});

gulp.task('environment', ['clean'], () => {
  const configFile = `config/env_${getEnvName()}.json`;
  const privateConfigFile = '/tmp/env_private.json';

  // Get env vars from .env
  dotenvToJson.copy({
    keys: ['*'],
    paths: {
      env: '.env',
      jenv: configDir.path(privateConfigFile)
    }
  });

  // Merge with non-private env vars
  gulp.src([
    configFile,
    configDir.path(privateConfigFile)
  ]).pipe(merge('env.json'))
    .pipe(gulp.dest(destDir.path()));
});

gulp.task('css', () => {
  gulp.src(srcDir.path('stylesheets/*.css'))
    .pipe(plumber())
    .pipe(gulp.dest(destDir.path('stylesheets')));
});

gulp.task('watch', () => {
  const beepOnError = done => (err) => {
    if (err) {
      beepSound();
    }
    done(err);
  };

  watch('src/**/*.js', batch((events, done) => {
    gulp.start('bundle', beepOnError(done));
  }));

  watch('src/**/*.css', batch((events, done) => {
    gulp.start('css', beepOnError(done));
  }));
});

gulp.task('build', ['bundle', 'environment', 'css', 'watch']);
