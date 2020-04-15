const gulp = require('gulp')
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const rename = require("gulp-rename");
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

const image = require('gulp-image');
const browser = require('browser-sync').create();

function browserSync(done){
    browser.init({
        server:{
            baseDir:"./bild"
        },
        port: 4000
    })
    done()
}

function browserSyncReload(done){
    browser.reload()
    done()
}

const paths = {
    styles:{
        // src:'app/styles/**/*.scss',
        src:'/*.scss',
        dest:'bild/css'
    },
    js:{
        src:'/*.js',

        // src:'app/js/**/*.js',
        dest:'bild/js'
    },
    images:{
        src: '/**/*.*',

        // src: 'app/images/*.*',
        dest:'build/images'
    },
    html:{
        src:'*.html',

        // src:'app/**/*.html',
        dest:'build/'
    }
}

function styles(){
    return gulp.src(paths.styles.src)
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(rename({
            suffix:'.min'
        }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browser.stream())
}


function html(){
    return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browser.stream())
}

function watch(){
    gulp.watch(paths.styles.src, styles)
    gulp.watch(paths.html.src, html)
    // gulp.watch('./app/index.html', gulp.series(browserSyncReload))
    gulp.watch('index.html', gulp.series(browserSyncReload))
}


const build = gulp.parallel(styles, html)
gulp.task('build', build)
gulp.task('default', gulp.parallel(watch, build ,browserSync))