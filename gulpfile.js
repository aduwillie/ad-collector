const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

const Paths = {
    HERE: './',
    CSS: './src/webui/backend/public/css/',
    SCSS_TOOLKIT_SOURCES: './src/webui/backend/public/scss/material-dashboard.scss',
    SCSS: './src/webui/backend/public/scss/**/**'
};

gulp.task('compile-scss', () => gulp.src(Paths.SCSS_TOOLKIT_SOURCES)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write(Paths.HERE))
    .pipe(gulp.dest(Paths.CSS))
);

gulp.task('watch', () => {
    gulp.watch(Paths.SCSS, ['compile-scss']);
});
