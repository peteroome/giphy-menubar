import gulp from 'gulp';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import exorcist from 'exorcist';
import watchify from 'watchify';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import ifElse from 'gulp-if-else';
import path from 'path';

// Input file.
watchify.args.debug = true;
const bundler = browserify(watchify.args);

// Babel transform
bundler.transform(
  babelify.configure({
    sourceMapRelative: 'app'
  })
);

function bundle(src, dest) {
  const jsFile = path.basename(dest);
  const destPath = path.dirname(dest);
  const mapFile = `${dest}.map`;

  bundler.add(src, bundle);
  bundler.bundle()
    .on('error', (error) => {
      console.error('\nError: ', error, '\n');
      bundler.emit('end');
    })
    .pipe(exorcist(mapFile))
    .pipe(source(jsFile))
    .pipe(buffer())
    .pipe(ifElse(process.env.NODE_ENV === 'production', uglify))
    .pipe(gulp.dest(destPath));
}

// On updates recompile
bundler.on('update', bundle);

export default bundle;
