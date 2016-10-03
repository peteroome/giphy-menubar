// require('./tasks/build_app');

import gulp from 'gulp';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import exorcist from 'exorcist';
import watchify from 'watchify';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import ifElse from 'gulp-if-else';

watchify.args.debug = true;

// Input file.
watchify.args.debug = true;
const bundler = browserify('src/app.js', watchify.args);

// Babel transform
bundler.transform(babelify.configure({
  sourceMapRelative: 'app'
}));

// On updates recompile
bundler.on('update', bundle);

const bundle = () => {
  bundler.bundle()
    .on('error', (error) => {
      console.error('\nError: ', error.message, '\n');
      this.emit('end');
    })
    .pipe(exorcist('app/bundle.js.map'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(ifElse(process.env.NODE_ENV === 'production', uglify))
    .pipe(gulp.dest('app'));
};

export default 'bundle';
