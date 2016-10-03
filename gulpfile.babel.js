// require('./tasks/build_app');

import gulp from 'gulp';
import eslint from 'gulp-eslint';
import browserSync from 'browser-sync';
import { bundle } from './tasks/build_app';

const sync = browserSync.create();

gulp.task('default', ['transpile']);

gulp.task('transpile', ['lint'], () => bundle);

gulp.task('lint', () => {
  gulp.src(['./src/**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('serve', ['transpile'], () => sync.init({ server: 'public' }));
gulp.task('js-watch', ['transpile'], () => sync.reload());

gulp.task('watch', ['serve'], () => {
  gulp.watch('src/**/*', ['js-watch']);
  gulp.watch('src/**/*.css', sync.reload);
  gulp.watch('app/index.html', sync.reload);
});


// 'use strict';
//
// import gulp from 'gulp';
// import browserify from 'browserify';
// import source from 'vinyl-source-stream';
// import buffer from 'vinyl-buffer';
// import eslint from 'gulp-eslint';
// import exorcist from 'exorcist';
// import browserSync from 'browser-sync';
// import watchify from 'watchify';
// import babelify from 'babelify';
// import uglify from 'gulp-uglify';
// import ifElse from 'gulp-if-else';
//
// watchify.args.debug = true;
//
// const sync = browserSync.create();
//
// // Input file.
// watchify.args.debug = true;
// var bundler = browserify('public/assets/js/index.js', watchify.args);
//
// // Babel transform
// bundler.transform(babelify.configure({
//   sourceMapRelative: 'app'
// }));
//
// // On updates recompile
// bundler.on('update', bundle);
//
// function bundle() {
//   return bundler.bundle()
//     .on('error', function(error){
//       console.error( '\nError: ', error.message, '\n');
//       this.emit('end');
//     })
//     .pipe(exorcist('public/assets/js/bundle.js.map'))
//     .pipe(source('bundle.js'))
//     .pipe(buffer())
//     .pipe(ifElse(process.env.NODE_ENV === 'production', uglify))
//     .pipe(gulp.dest('public/assets/js'));
// }
//
// gulp.task('default', ['transpile']);
//
// gulp.task('transpile', ['lint'], () => bundle());
//
// gulp.task('lint', () => {
//   return gulp.src(['views/**/*.js', 'gulpfile.babel.js'])
//     .pipe(eslint())
//     .pipe(eslint.format())
// });
//
// gulp.task('serve', ['transpile'], () => sync.init({ server: 'public' }))
// gulp.task('js-watch', ['transpile'], () => sync.reload());
//
// gulp.task('watch', ['serve'], () => {
//   gulp.watch('views/**/*', ['js-watch'])
//   gulp.watch('public/**/*.css', sync.reload)
//   gulp.watch('public/index.html', sync.reload)
// })
