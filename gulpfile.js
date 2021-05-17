'use strict';

var gulp = require('gulp'); 
var cssnano = require('gulp-cssnano'); 
var sass = require('gulp-sass'); 
var concat = require('gulp-concat'); 
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: './public'
        },
        port: 3000
    })

    gulp.watch('./public/*.html', reload);
    gulp.watch('./public/dist/css/*.css', reload);
    gulp.watch('./public/dist/js/*.js', reload);
})

gulp.task('sass', function(){    
    return gulp.src('./public/stylesheets/style.scss')
        .pipe(concat('style.css'))        
        .pipe(sass())      
        .pipe(cssnano())      
        .pipe(gulp.dest('./public/dist/css'))
});

gulp.task('js', function(){    
    return gulp.src(['./public/javascripts/*.js'])          
        .pipe(concat('all.js'))      
        .pipe(uglify())  
        .pipe(gulp.dest('./public/dist/js')); 
});

gulp.task('watch', function(){       
	gulp.watch('public/stylesheets/style.scss', ['sass']);          
    gulp.watch('public/javascripts/**/*.js', ['js']);
});

gulp.task('default', ['sass', 'js', 'watch', 'serve']);