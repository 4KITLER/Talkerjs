'use strict';

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      babel = require('gulp-babel'),
      browserSync = require('browser-sync');

/* преобразовываем js файлы в старый формат  */
gulp.task("babel-run", function () {
  return gulp.src("src/app.js")
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest("dist"));
});

/* автоматическое обновление страниц */
gulp.task('browser-sync', function() { // Создаем таск browser-sync
  browserSync({ // Выполняем browser Sync
      server: { // Определяем параметры сервера
          baseDir: './' // Директория для сервера - app
      },
      notify: false // Отключаем уведомления
  });
});

/* конвертировать main.scss в main.css */
gulp.task('scss', function() {
  return gulp.src('./style/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('./style/css/'))
        .pipe(browserSync.reload({stream: true}));
 });
 
 /* наблюдаем за изменениями в файлах */
 gulp.task('watch',  gulp.series('browser-sync', 'scss'), function() {
  gulp.watch('./style/scss/**/*.scss', ['scss']); // Наблюдение за scss файлами
});