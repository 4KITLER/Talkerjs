'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const cssScss = require('gulp-css-scss');
const babeljs = require('@babel/register');

/* конвертировать main.scss в main.css */
gulp.task('sass', function () {
  return gulp.src('./style/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('./style/css/'));
 });
 
