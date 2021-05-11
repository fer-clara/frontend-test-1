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
})

gulp.task('sass', function(){    
    return gulp.src('public/stylesheets/style.scss')       
        .pipe(sass()) // compila o sass      
        .pipe(cssnano()) // minifica      
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        })) 
});

gulp.task('js', function(){    
    return gulp.src(['public/javascripts/*.js'])          
        .pipe(concat('all.js')) // concatena      
        .pipe(uglify())  // minifica     
        .pipe(gulp.dest('dist/js')); 
});

gulp.task('watch', function(){       
	gulp.watch('public/stylesheets/*.scss', ['sass']);          
    gulp.watch('public/javascripts/**/*.js', ['js']);
});

gulp.task('default', ['sass', 'js', 'watch', 'serve']);