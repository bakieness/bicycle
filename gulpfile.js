/**
* Configuration.
*
* Project Configuration for gulp tasks.
*
* Edit the variables as per your project requirements.
*/

var project                 = 'website'; // Name
var URL                     = 'portfolio.james.test/';

var styleSRC                = './www/scss/site.scss'; // Path to main .scss file
var styleDestination        = './www/css/'; // Path to place the compiled CSS file
var mapDestination          = './maps/';

var jsSRC                   = './www/JS/scripts/*.js'; // Path to JS custom scripts folder
var jsDestination           = './www/JS/'; // Path to place the compiled JS custom scripts file
var jsFile                  = 'script'; // Compiled JS custom file name
var jsImportSRC             = './www/JS/scripts/modules/script.js';
var jsImportDestination     = './www/JS/scripts/';

/**
 * Load Plugins.
 *
 * Load gulp plugins and assign them semantic names.
 */
var gulp         = require('gulp'); // Gulp of-course

// CSS related plugins.
var sass         = require('gulp-sass'); // Gulp pluign for Sass compilation
var autoprefixer = require('gulp-autoprefixer'); // Autoprefixing magic
var minifycss    = require('gulp-uglifycss'); // Minifies CSS files

// JS related plugins.
var concat       = require('gulp-concat'); // Concatenates JS files
var uglify       = require('gulp-uglify'); // Minifies JS file
var jsImport     = require('gulp-js-import');

// Utility related plugins.
var rename       = require('gulp-rename'); // Renames files E.g. style.css -> style.min.css
var sourcemaps   = require('gulp-sourcemaps'); // Maps code in a compressed file (E.g. style.css) back to itâ€™s original position in a source file (E.g. structure.scss, which was later combined with other css files to generate style.css)
var notify       = require('gulp-notify'); // Sends message notification to you
//var browserSync  = require('browser-sync'); // Asynchronous browser loading on .scss file changes
var browserSync = require('browser-sync').create();

// Image sprite related plugins
var gulpif       = require('gulp-if');

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'www'
    },
  })
});


/**
 * Task: sass
 *
 * Compiles Sass, Autoprefixes it and Minifies CSS.
 *
 * This task does the following:
 *      1. Gets the source scss file
 *      2. Compiles Sass to CSS
 *      3. Writes Sourcemaps for it
 *      4. Autoprefixes it and generates style.css
 *      5. Renames the CSS file with suffix .min.css
 *      6. Minifies the CSS file and generates style.min.css
 */
gulp.task('sass', function () {
  gulp.src( styleSRC )
    .pipe( sourcemaps.init() )
    .pipe( sass( {
      errLogToConsole: true,
      outputStyle: 'compact',
      //outputStyle: 'compressed',
      // outputStyle: 'nested',
      // outputStyle: 'expanded',
      precision: 10
    } ) )
    .pipe( sourcemaps.write( { includeContent: false } ) )
    .pipe( sourcemaps.init( { loadMaps: true } ) )
    .pipe( autoprefixer(
      'last 2 version',
      '> 1%',
      'safari 5',
      'ie 8',
      'ie 9',
      'opera 12.1',
      'ios 6',
      'android 4' ) )

    .pipe( sourcemaps.write ( mapDestination ) )
    .pipe( gulp.dest( styleDestination ) )


    .pipe( rename( { suffix: '.min' } ) )
    .pipe( minifycss( {
      maxLineLen: 10
    }))
    .pipe( gulp.dest( styleDestination ) )
    .pipe( notify( { message: 'TASK: "sass" Completed!', onLast: true } ) )
    .pipe(browserSync.reload({
      stream: true
    }))
});

/**
 * Task: customJS
 *
 * Concatenate and uglify custom JS scripts.
 *
 * This task does the following:
 *      1. Gets the source folder for JS custom files
 *  2. Concatenates all the files and generates custom.js
 *  3. Renames the JS file with suffix .min.js
 *  4. Uglifes/Minifies the JS file and generates custom.min.js
 */
gulp.task( 'JS', function() {
  gulp.src( jsSRC )
    .pipe( concat( jsFile + '.js' ) )
    .pipe( gulp.dest( jsDestination ) )
    .pipe( rename( {
      basename: jsFile,
      suffix: '.min'
    }))
    .pipe( uglify() )
    .pipe( gulp.dest( jsDestination ) )
    .pipe( notify( { message: 'TASK: "JS" Completed!', onLast: true } ) );
});

gulp.task('import', function() {
  return gulp.src(jsImportSRC)
        .pipe(jsImport({hideConsole: true}))
        .pipe(gulp.dest(jsImportDestination))
        .pipe( notify( { message: 'TASK: "Import" Completed!', onLast: true } ) );
});

gulp.task('watch', function() {
  gulp.watch('www/scss/**/*.scss', ['sass', browserSync.reload]); 
  gulp.watch('www/js/scripts/*.js', ['JS', browserSync.reload]);
  gulp.watch('www/js/scripts/modules/*.js', ['import', browserSync.reload]);
  gulp.watch('www/*.html', [browserSync.reload]);
});

gulp.task('default', ['import', 'JS', 'sass', 'browserSync', 'watch']);