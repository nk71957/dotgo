var  browserSync = require('browser-sync').create(),
    gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    rename = require("gulp-rename"),
    sourcemaps = require("gulp-sourcemaps");
   

var paths = {
    styles: {
        src: "./scss/**/*.scss",
        dest: "./css"
    }
};


function style() {
    return gulp
        .src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.reload({
            stream: true
        }));
}

function watch(done) {
    browserSync.init({
        server: {
            baseDir: "./",
            injectChanges: true
        }
    });
    gulp.watch(paths.styles.src, style);
    gulp.watch("./**/*.html").on('change', browserSync.reload);

    done();
}
 

exports.watch = watch
exports.style = style;

var build = gulp.parallel(style, watch);
gulp.task('default', build);