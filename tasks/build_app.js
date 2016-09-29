'use strict';

var gulp = require('gulp');
var del = require('del');
var dotenvToJson = require ('gulp-dotenv-to-json');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var merge = require('gulp-merge-json');
var plumber = require('gulp-plumber');
var jetpack = require('fs-jetpack');
var bundle = require('./bundle');
var utils = require('./utils');

var projectDir = jetpack;
var srcDir = jetpack.cwd('./src');
var destDir = jetpack.cwd('./app');
var configDir = jetpack.cwd('./config');

gulp.task('bundle', function () {
  return Promise.all([
    bundle(srcDir.path('server.js'), destDir.path('server.js')),
    bundle(srcDir.path('app.js'), destDir.path('app.js')),
  ]);
});

gulp.task('clean', function () {
  return del('.config/tmp');
});

gulp.task('environment', ['clean'], function () {
  var configFile = 'config/env_' + utils.getEnvName() + '.json';
  var privateConfigFile = '/tmp/env_private.json';

  // Get env vars from .env
  dotenvToJson.copy({
    keys : ['*'],
    paths : {
      env : '.env',
      jenv : configDir.path(privateConfigFile)
    }
  });

  // Merge with non-private env vars
  gulp.src([
    configFile,
    configDir.path(privateConfigFile)
  ]).pipe(merge('env.json'))
    .pipe(gulp.dest(destDir.path()));
});

gulp.task('css', function () {
  return gulp.src(srcDir.path('stylesheets/*.css'))
    .pipe(plumber())
    .pipe(gulp.dest(destDir.path('stylesheets')));
});

gulp.task('watch', function () {
  var beepOnError = function (done) {
    return function (err) {
      if (err) {
        utils.beepSound();
      }
      done(err);
    };
  };

  watch('src/**/*.js', batch(function (events, done) {
    gulp.start('bundle', beepOnError(done));
  }));

  watch('src/**/*.css', batch(function (events, done) {
    gulp.start('css', beepOnError(done));
  }));
});

gulp.task('build', ['bundle', 'environment', 'css', 'watch']);
