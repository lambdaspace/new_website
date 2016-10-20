var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
//const autoprefixer = require('gulp-autoprefixer');

// Config Object.
var config = {
    assetsDir: './src',
    sassPattern: 'scss/*.scss',
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
        config.assetsDir+'/components/bootstrap/dist/css/bootstrap.min.css',
        config.assetsDir+'/scss/**/*.scss'
    ], 'style.min.css');
});

// Scripts task.
gulp.task('scripts', function() {
    return app.addScript([
        config.assetsDir+'/components/jquery/dist/jquery.min.js',
        config.assetsDir+'/components/bootstrap/dist/js/bootstrap.min.js',
        config.assetsDir+'/components/wow/dist/wow.min.js',
        config.assetsDir+'/components/df-visible/jquery.visible.min.js',
        config.assetsDir+'/components/FitText.js/jquery.fittext.js',
        config.assetsDir+'/js/**/*.js'
    ], 'scripts.min.js');
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

gulp.task('favicons', function() {
    gulp.src(config.assetsDir+'/favicons/**')
        .pipe(gulp.dest('dist/favicons'));
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
    gulp.watch(config.assetsDir+'/js/**/*.js', ['scripts']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Defautl task.
gulp.task('default', ['html', 'styles', 'scripts', 'images', 'favicons', 'browser-sync', 'watch']);