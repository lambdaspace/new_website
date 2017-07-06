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
        .pipe(plugins.cleanCss())
        .pipe(plugins.if(config.sourceMaps, plugins.sourcemaps.write('.')))
        .pipe(gulp.dest('dist/css'));
};

app.addScript = function(paths, outputFilename) {
    gulp.src(paths)
        .pipe(plugins.plumber())
        .pipe(plugins.if(config.sourceMaps, plugins.sourcemaps.init()))
        .pipe(plugins.concat(outputFilename))
        .pipe(plugins.uglify())
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
        './node_modules/bootstrap/dist/css/bootstrap.min.css',
        config.assetsDir+'/scss/**/*.scss',
        './node_modules/font-awesome/css/font-awesome.min.css',
    ], 'style.min.css');
});

// Scripts task.
gulp.task('scripts', function() {
    return app.addScript([
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './node_modules/wowjs/dist/wow.min.js',
        './node_modules/jquery-visible/jquery.visible.min.js',
        './node_modules/fittext.js/jquery.fittext.js',
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
    return app.copy('./node_modules/font-awesome/fonts/**', 'dist/fonts');
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
  !config.production ? (
    browserSync.init({
      server: {
        baseDir: "./"
      }
    })
  ) : plugins.util.noop()
});

// Watch task. Watches for changes.
gulp.task('watch', function() {
    if (!config.production) {
      gulp.watch(config.assetsDir+'/'+config.sassPattern, ['styles'])
      gulp.watch(config.assetsDir+'/js/**/*.js', ['scripts'])
      gulp.watch("*.html").on('change', browserSync.reload)
   }
});

// Defautl task.
gulp.task('default', ['html', 'styles', 'scripts', 'images', 'favicons', 'fonts', 'browser-sync', 'watch']);
