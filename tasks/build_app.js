import gulp from 'gulp';
import eslint from 'gulp-eslint';
import browserSync from 'browser-sync';
import del from 'del';
import dotenvToJson from 'gulp-dotenv-to-json';
import watch from 'gulp-watch';
import batch from 'gulp-batch';
import merge from 'gulp-merge-json';
import plumber from 'gulp-plumber';
import jetpack from 'fs-jetpack';
import bundle from './bundle-PETE';
import { getEnvName, beepSound } from './utils';

const srcDir = jetpack.cwd('./src');
const destDir = jetpack.cwd('./app');
const configDir = jetpack.cwd('./config');
const sync = browserSync.create();

// Bundling JS
gulp.task('transpile', ['lint'], () => {
  Promise.all([
    bundle(srcDir.path('bootstrapper.js'), destDir.path('bootstrapper.js')),
    bundle(srcDir.path('index.js'), destDir.path('index.js')),
    bundle(srcDir.path('server.js'), destDir.path('server.js')),
    bundle(srcDir.path('app.js'), destDir.path('app.js'))
  ]);
});

// Linting
gulp.task('lint', () => {
  gulp.src(['src/**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format());
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

// Watching…
gulp.task('js:watch', ['transpile'], () => sync.reload());
gulp.task('html:watch', ['copy:html'], () => sync.reload());
gulp.task('css:watch', ['copy:css'], () => sync.reload());
gulp.task('images:watch', ['copy:images'], () => sync.reload());
gulp.task('views:watch', ['copy:views'], () => sync.reload());

gulp.task('watch', () => {
  const beepOnError = done => (err) => {
    if (err) {
      beepSound();
    }
    done(err);
  };

  watch('src/**/*.js', batch((events, done) => {
    gulp.start('js:watch', beepOnError(done));
  }));

  watch('src/**/*.html', batch((events, done) => {
    gulp.start('html:watch', beepOnError(done));
  }));

  watch('src/**/*.css', batch((events, done) => {
    gulp.start('css:watch', beepOnError(done));
  }));

  watch('src/images/**/*', batch((events, done) => {
    gulp.start('images:watch', beepOnError(done));
  }));

  watch('src/views/**/*', batch((events, done) => {
    gulp.start('views:watch', beepOnError(done));
  }));
});

// Copy Files
gulp.task('copy', ['copy:html', 'copy:css', 'copy:images', 'copy:views']);

gulp.task('copy:html', () => {
  gulp.src(srcDir.path('*.html'))
    .pipe(plumber())
    .pipe(gulp.dest(destDir.path('.')));
});

gulp.task('copy:css', () => {
  gulp.src(srcDir.path('stylesheets/*.css'))
    .pipe(plumber())
    .pipe(gulp.dest(destDir.path('stylesheets')));
});

gulp.task('copy:images', () => {
  gulp.src(srcDir.path('images/**/*'))
    .pipe(plumber())
    .pipe(gulp.dest(destDir.path('images')));
});

gulp.task('copy:views', () => {
  gulp.src(srcDir.path('views/**/*'))
    .pipe(plumber())
    .pipe(gulp.dest(destDir.path('views')));
});

gulp.task('build', ['transpile', 'environment', 'copy']);
