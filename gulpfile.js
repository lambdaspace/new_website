var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
//const autoprefixer = require('gulp-autoprefixer');

// Config Object.
var config = {
    assetsDir: './src',
    sassPattern: 'sass/**/*.scss',
    production: !!plugins.util.env.production,
    sourceMaps: !plugins.util.env.production
};

var app = {};

app.addStyle = function(paths, outputFilename) {
    gulp.src(paths)
        .pipe(plugins.plumber())
        .pipe(plugins.if(config.sourceMaps, plugins.sourcemaps.init()))
        .pipe(plugins.sass())
        .pipe(plugins.concat(outputFilename))
        .pipe(config.production ? plugins.cleanCss() : plugins.util.noop())
        .pipe(plugins.if(config.sourceMaps, plugins.sourcemaps.write('.')))
        .pipe(gulp.dest('dist/css'));
};

app.addScript = function(paths, outputFilename) {
    gulp.src(paths)
        .pipe(plugins.plumber())
        .pipe(plugins.if(config.sourceMaps, plugins.sourcemaps.init()))
        .pipe(plugins.concat(outputFilename))
        .pipe(config.production ? plugins.uglify() : plugins.util.noop())
        .pipe(plugins.if(config.sourceMaps, plugins.sourcemaps.write('.')))
        .pipe(gulp.dest('dist/js'));
};

// Copy method.
app.copy = function(srcFiles, outputDir) {
    gulp.src(srcFiles)
        .pipe(gulp.dest(outputDir));
};

// Sass styles task. Not used yet.
gulp.task('styles', function() {
    return app.addStyle([
        config.assetsDir+'/sass/styles.scss'
    ], 'styles.min.css');
});

// Scripts task.
gulp.task('scripts', function() {
    return app.addScript([
        config.assetsDir+'/js/**/*.js'
    ], 'scripts.min.js');
});

// Css task. Will be replaced in the future.
gulp.task('css', function() {
    return gulp.src('./src/css/**/*.css')
        .pipe(plugins.concat('style.min.css'))
        .pipe(config.production ? plugins.cleanCss({compatibility: 'ie8'}) : plugins.util.noop())
        .pipe(gulp.dest('dist/css'));
});

// Task for fonts
gulp.task('html', function() {
    return app.copy(
        './src/*.html',
        '.'
    );
});

// Task for fonts
gulp.task('fonts', function() {
    return app.copy(
        //config.bowerDir+'/font-awesome/fonts/*',
        'dist/fonts'
    );
});

// Images optimization.
gulp.task('images', function() {
    gulp.src(config.assetsDir+'/img/**')
        .pipe(plugins.imagemin())
        .pipe(gulp.dest('dist/img'));
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// Watch task. Watches for changes.
gulp.task('watch', function() {
    gulp.watch(config.assetsDir+'/'+config.sassPattern, ['styles']);
    gulp.watch(config.assetsDir+'/css/**/*.css', ['css']);
    gulp.watch(config.assetsDir+'/js/**/*.js', ['scripts']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Defautl task.
gulp.task('default', ['html', 'css', 'scripts', 'images' , 'browser-sync', 'watch']);

