/**
 * Created by Shweta on 4/16/2015.
 */
//learning GULP!!

var gulp = require('gulp');

var concat = require('gulp-concat');

//defining a task now
gulp.task('concatScripts', function(){
   return gulp.src('src/**/*.js')
       .pipe(concat('main.js'))
       .pipe(gulp.dest('js'))
});

gulp.task('default', ['concatScripts']);