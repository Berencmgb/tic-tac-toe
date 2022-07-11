var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass')(require('sass'));

function buildJs(cb){
    return gulp.src('./dest/*.js')
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./wwwroot/js'));
    cb();
}

function buildCss(cb){
    return gulp.src('./sass/*.scss')
        .pipe(sass())
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('./wwwroot/css'));
    cb();
}

exports.buildJs = buildJs;
exports.buildCss = buildCss;