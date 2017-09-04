var gulp = require('gulp')
  ,   fs              = require('fs')
  ,   rename          = require('gulp-rename')            // rename files or folders
  ,   hb              = require("gulp-hb")                // handlebar templates for html

  ,   gutil           = require('gulp-util')              // console logging
  ,   args            = require('yargs').string('id').argv

  ,   htmlmin         = require("gulp-htmlmin")
  ,   webpack         = require("webpack")
  ,   webpackStream   = require('webpack-stream')


  ,   sass            = require('gulp-sass')


  ,   connect         = require('gulp-connect')           // run local server

  // ,   htmlmin         = require("gulp-htmlmin")
  // ,   inlinesource    = require('gulp-inline-source')
  // ,   inlineOptions = {}

  ,   env               = 'dev'                           // environment to build for (e.g. dev, test, prod)
  ,   loc               = 'en'


  ,   webpackConfig     = require('./webpack.config.js')
  ,   gconfig           = require("./gulp-config")
  ,   templateData      = false
  ,   templateConfig    = {}
;



// Command line option:
//  --fatal=[warning|error|off]
var fatalLevel = require('yargs').argv.fatal;

var ERROR_LEVELS = ['error', 'warning'];

// Return true if the given level is equal to or more severe than
// the configured fatality error level.
// If the fatalLevel is 'off', then this will always return false.
// Defaults the fatalLevel to 'error'.
function isFatal(level) {
   return ERROR_LEVELS.indexOf(level) <= ERROR_LEVELS.indexOf(fatalLevel || 'error');
}

// Handle an error based on its severity level.
// Log all levels, and exit the process for fatal levels.
function handleError(level, error) {
   gutil.log(error.message);
   if (isFatal(level)) {
      process.exit(1);
   }
}

// Convenience handler for error-level errors.
function onError(error) { handleError.call(this, 'error', error);}
// Convenience handler for warning-level errors.
function onWarning(error) { handleError.call(this, 'warning', error);}


function init(cb) {
  // set environment if specified
  env = !!args.env ? args.env : env;
  gutil.log('Building for', gutil.colors.yellow(env), 'environment.');


  if (typeof environments[env] == "undefined") {
    cb ( new Error("Invalid env") );
    return;
  }
  cb();
}


// deletes entire build target
function clean(cb) {
  console.log("\n");
  del(environments[env].dest);
  mkdirp(environments[env].dest);
  cb()
};



gulp.task ("compile-scripts", function(cb) {
  var scripts = {
    "src" : "./src/scripts/main.js",
    "dest" : "./public/" + env + "/assets/scripts/"
  };

return gulp.src ( scripts.src )
  .pipe(webpackStream(webpackConfig), webpack)
  .pipe(gulp.dest(scripts.dest))

  .pipe(connect.reload());

});

gulp.task ("compile-templates", function(cb) {

  //setTaskValues();


  var templates = {
    "src" : "./src/templates/pages/**/*.html",
    "dest" : "./public/" + env
  };

  let templateData = {
    title : "THE TITLE",

    gallery : gconfig.gallery
  };

  return gulp.src ( templates.src )
      .pipe(
          hb (
              {
                  'debug' : true
                  ,
                  'compileOptions' : {
                    'compat' : true
                  }
              }
          )
          .partials('./src/templates/partials/**/*.hbs')
          .data(templateData)
          .helpers({
            foreach: function(arr,options) {
                  if(options.inverse && !arr.length)
                      return options.inverse(this);

                  return arr.map(function(item,index) {
                      item.$index = index;
                      item.$first = index === 0;
                      item.$last  = index === arr.length-1;
                      return options.fn(item);
                  }).join('');
              },
          eq : function(a, b, options) {
                if (arguments.length === 2) {
                    options = b;
                    b = options.hash.compare;
                }
                if (a === b) {
                  return options.fn(this);
                }
                return options.inverse(this);
              }

          })
      )
      //.pipe(htmlmin({collapseWhitespace: true,removeComments:true}))
      .pipe( gulp.dest (templates.dest) )
      .pipe(connect.reload())
  ;
});


// Start the local server.
gulp.task('compile-styles', function(cb) {

    var src  = "./src/styles/**/*.scss",
        dest = "./public/" + env + "/assets/styles/";

    var sassOptions = {
        errLogToConsole: true,
        outputStyle: 'expanded'
    };

    gulp.src(src)
        .pipe(
            sass(sassOptions)
            .on('error', sass.logError)
        )
        /*.pipe(autoprefixer({ browsers : ['IE > 8', 'ios >= 7']}))
        .pipe(cssnano(
            {
                discardUnused:false,
                zindex:false,
                reduceIdents : false,
                mergeIdents : false
            }))
        .pipe(rename({
            dirname:'',
            suffix:build
        }))*/
        .pipe(gulp.dest(dest))
        .pipe(connect.reload())
        .on('end', cb);
});

// Watch for changes.
gulp.task('gwatch', function() {
  gutil.log(gutil.colors.green('Watching for changes.'));

  //gulp.watch("./src/, ['watched', 'copy-assets'] );
  gulp.watch("./src/scripts/**/*.js", gulp.series('compile-scripts') );
  gulp.watch("./src/templates/**/*.html",  gulp.series('compile-templates') );
  gulp.watch("./src/templates/**/*.hbs",  gulp.series('compile-templates') );
  gulp.watch("./src/styles/**/*.scss",  gulp.series('compile-styles') );
    //gulp.watch(config.src + config.styles.watch, ['watched', 'compile-styles'] );
});

// Start the local server.
  gulp.task('connect', function() {
      connect.server({
          root: gconfig.environments[env].dest,
          livereload: true,
          port: 9000
      });
  });


  // Build, start server and watch for changes.
  gulp.task('default', gulp.parallel('compile-templates', 'compile-styles', 'compile-scripts', 'connect', 'gwatch'), function(cb) {

  });
