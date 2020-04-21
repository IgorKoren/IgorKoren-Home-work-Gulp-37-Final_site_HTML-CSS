const gulp = require('gulp')
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const rename = require("gulp-rename");
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

const image = require('gulp-image');
const browser = require('browser-sync').create();

function browserSync(done) {
    browser.init({
        server: {
            baseDir: "./build"
        },
        port: 4000
    })
    done()
}

function browserSyncReload(done) {
    browser.reload()
    done()
}

const paths = {
    styles: {
        src:'app/styles/**/*.scss',
        // src: 'main.scss',
        dest: 'build/styles/'
    },
    js: {
        src: 'app/**/*.js',
        // src:'app/js/**/*.js',
        dest: 'build/js'
    },
    images: {
        src: 'app/**/*.{jpg,jpeg,png,svg,gif,ico}',
        // src: '**/img/**/*.{jpg,jpeg,png,svg,gif,ico}',
        // src: 'app/images/*.*',
        dest: 'build/'
    },
    html: {
        src: 'app/*.html',
        // src:'app/**/*.html',
        dest: 'build/'
    }
}
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browser.stream())
}
function js(){
    return gulp.src(paths.js.src)
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.js.dest))
        .pipe(browser.stream())
}
function images(){
    return gulp.src(paths.images.src)
        .pipe(image())
        .pipe(gulp.dest(paths.images.dest))
}
function html() {
    return gulp.src(paths.html.src)
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browser.stream())
}
function watch() {
    gulp.watch(paths.styles.src, styles)
    gulp.watch(paths.html.src, html)
    gulp.watch(paths.js.src, js)
    gulp.watch(paths.images.src, images)
    gulp.watch('./build/index.html', gulp.series(browserSyncReload))
}

const build = gulp.parallel(styles, js, images, html)
gulp.task('build', build)
gulp.task('default', gulp.parallel(watch, build, browserSync))