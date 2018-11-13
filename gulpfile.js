'use strict';

const browserify = require("browserify");
const source = require("vinyl-source-stream");
const babelify = require('babelify');
const buffer = require('vinyl-buffer');

var gulp          = require('gulp'),
  fs              = require('fs'),
  pkg             = JSON.parse(fs.readFileSync('package.json')),
  sass            = require('gulp-sass'),
  sourcemaps      = require('gulp-sourcemaps'),
  autoprefixer    = require('gulp-autoprefixer'),
  concat          = require('gulp-concat'),
  uglify          = require('gulp-uglify'),
  cleanCSS        = require('gulp-clean-css'),
  cssmin          = require('gulp-cssmin'),
  rename          = require('gulp-rename'),
  haml            = require('gulp-ruby-haml'),
  changed         = require('gulp-changed'),
  notify          = require('gulp-notify'),
  browserSync     = require('browser-sync'),
  babel           = require('gulp-babel');



var prName          = pkg.name,
  inputCss          = ['sass/**/*.sass', 'sass/**/*.scss','sass/*.sass', 'sass/*.scss'],
  outputCss         = 'css',
  inputJsLibraries  = 'js/../*.js',
  outputJsLibraries = 'js';


var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

var autoprefixerOptions = {
  browsers: ['last 10 versions', '> 5%', 'Firefox ESR']
};

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './'
    },
    notify: false,
    open: false
  });
});

gulp.task('haml', function() { //Vlad
  gulp.src('haml/**/*.haml')
  .pipe(changed('./', {extension: '.html'}))
  .pipe(haml().on('error', function(e) { console.log(e.message); }))
  .pipe(gulp.dest('./'))
  .pipe(notify('HAML successfully compiled'))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function () {
  return gulp
    .src(inputCss)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(cleanCSS({debug: true}, function(details) {
      console.log(details.name + ': ' + details.stats.originalSize + ' b');
      console.log(details.name + ': ' + details.stats.minifiedSize + ' b');
    }))
    .pipe(cssmin())
    .pipe(rename(prName + '.min.css'))
    .pipe(gulp.dest(outputCss))
    .pipe(notify('SASS successfully compiled'))
    .pipe(browserSync.reload({stream: true}))
    .resume()
});


var componentScripts = [
  'js/vendor/modernizr.js',
  'js/foundation/foundation.js',
  'js/foundation/foundation.topbar.js',
  'js/foundation/foundation.dropdown.js',
  'js/foundation/foundation.magellan.js',
  'bower_components/bootstrap/js/transition.js',
  'bower_components/bootstrap/js/modal.js',
  'bower_components/bootstrap/js/tab.js',
  'bower_components/bootstrap/js/collapse.js',
  'bower_components/bootstrap/js/dropdown.js',
  'bower_components/bootstrap/js/tooltip.js',
  'bower_components/bootstrap/js/popover.js',
  // 'bower_components/bootstrap-tabcollapse/bootstrap-tabcollapse.js',

  // 'bower_components/fancyBox/source/jquery.fancybox.js',
  // 'bower_components/fancyBox/source/helpers/jquery.fancybox-media.js',

  // 'js/js/jquery.form.min.js',
  // 'js/js/jquery.uploadfile.js',

  'bower_components/jStarbox/jstarbox.js',
  'bower_components/circliful/js/jquery.circliful.js',
  //'bower_components/slick-carousel/slick/slick.js',
  'bower_components/jquery-mousewheel/jquery.mousewheel.js',
  'bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js',
  'bower_components/jQuery.mmenu/dist/js/jquery.mmenu.all.min.js',
  'bower_components/sticky-kit/jquery.sticky-kit.js',
  'bower_components/stacktable.js/stacktable.js',
  'bower_components/LineProgressbar/dist/jquery.lineProgressbar.js',
  'js/lib/slick.js',
  // 'js/lib/classie.js',
  // 'js/lib/uisearch.js',
  //'js/lib/jquery.inputmask.js',
  'js/lib/jquery.formstyler.js',
  './node_modules/jquery.cookie/jquery.cookie.js'
  //'js/lib/formstyler-android.js'
];

gulp.task('js', function () {
  
    // .pipe(concat(pkg.name + '.js'))
    browserify({
      entries: 'js/source/config.js',
      debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('config.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest(outputJsLibraries));
});

gulp.task('js_concat', function () {
  return gulp.src(componentScripts)
    .pipe(concat(pkg.name + '.lib.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(outputJsLibraries));
});

gulp.task('js_conf', function () {
  return gulp.src([
      'js/config-source.js'
    ]
  )
    //.pipe(concat('config.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(outputJsLibraries));
});


gulp.task('watch', ['browser-sync', 'haml'], function () {
  gulp.watch(inputCss, ['sass'])
    .on('change', function (event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
  gulp.watch(['js/source/*', 'js/components/*', 'js/source//**/*'], ['js']);
  gulp.watch('haml/**/*.haml', ['haml']);
});
gulp.task('default', ['sass', 'js', 'js_concat', 'watch' /*, possible other tasks... */]);

