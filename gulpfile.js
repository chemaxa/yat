var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    nodemon = require('gulp-nodemon'),
    reload = browserSync.reload;

// Params
var buildDst = ['client', '.'];
var params = {
    currentFile: buildDst[0] + '/index',
    sassSrc: buildDst[0] + '/sass',
    cssDst: buildDst[0] + '/css',
    jsSrc: buildDst[0] + '/js',
    buildDst: buildDst
};

// Default Task
gulp.task('default', ['demon']);
//gulp.task('default', ['watch', 'sass', 'jade', 'server', 'csscomb']);

//Demon for nodemon
gulp.task('demon', function() {
    nodemon({
            script: 'gulpfile.js',
            watch: [params.currentFile, params.sassSrc],
            ext: 'sass js',
            ignore: [
                '.git',
                'node_modules/**/node_modules'
            ],
        })
        .on('start', ['watch'])
        .on('change', ['watch'])
        .on('restart', function() {
            console.log('restarted!');
        });
});


// Watch Task
gulp.task('watch', ['sass', 'server'], function() {
    gulp.watch(buildDst[0] + "/js/app.js").on("change", browserSync.reload);
    gulp.watch(buildDst[0] + "/*.html").on("change", browserSync.reload);
    gulp.watch([params.sassSrc + '/*.sass'], ['sass']);
});

// Sass Complie Task
gulp.task('sass', function() {
    gulp.src([params.sassSrc + '/' + params.currentFile + '.sass', params.sassSrc + '/main.sass'])
        .pipe(sass())
        .pipe(gulp.dest(params.cssDst))
        .pipe(browserSync.stream());
});

// Static server
gulp.task('server', function() {
    var files = [
        //params.jadeSrc + '/*.html',
        params.cssDst + '/*.css',
        params.jsSrc + '/*.js'
    ];
    browserSync.init(files, {
        server: {
            baseDir: params.buildDst,
            index: params.currentFile + '.html'
        }
    });
});
