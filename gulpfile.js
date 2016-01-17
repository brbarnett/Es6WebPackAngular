var gulp = require('gulp');
var webpack = require('gulp-webpack');
var wp = require('webpack');
var rename = require('gulp-rename'); // rename files or directories in streams
var named = require('vinyl-named'); // needed for gulp-webpack
var uglify = require('gulp-uglify');
var path = require('path');
var sourcemaps = require('gulp-sourcemaps');
var raw = require('raw');

gulp.task('js', function () {
    return gulp.src(['./src/app/app.config.js'], { base: './' })
        .pipe(named())
        .pipe(webpack({
            output: {
                filename: 'app.bundle.js'
            },
            externals: {
                angular: 'angular',
                jquery: 'jQuery'
            },
            // do external source maps for release, but internal otherwise
            devtool: (isRelease()) ? '#source-map' : '#inline-source-map',
            plugins: (isRelease()) ? [uglify] : [],
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel?presets[]=es2015',
                    query: {
                        presets: ['es2015']
                    }
                },
                // {
                //     test: /\.html$/,
                //     loader: "ng-cache?prefix=[dir]/[dir]"
                // },
                { test: /\.html$/, loader: "html" }
            ]
        }))
        .pipe(rename({
            // gulp-webpack doesn't honor base yet so folder is explicit
            dirname: 'dist/app/scripts'
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('html', function () {
    return gulp.src(['./src/**/*.html'], { base: './src/app' })
        .pipe(gulp.dest('./dist/app'));
});

gulp.task('build', ['js', 'html']);

gulp.task('watch', function () {
    gulp.watch('src/app/**/*.js', ['js']);
    gulp.watch('src/**/*.html', ['html']);
});

function isRelease() {
    return false;
}