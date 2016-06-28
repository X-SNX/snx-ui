var gulp         = require("gulp")
  , postcss      = require("gulp-postcss")
  , sourcemaps   = require("gulp-sourcemaps")
  , autoprefixer = require("autoprefixer")
  , precss       = require("precss")
  , alias        = require("postcss-alias")
  , crip         = require("postcss-crip")
  , magician     = require("postcss-font-magician")
  , center       = require("postcss-center")
  , clearfix     = require("postcss-clearfix")
  , position     = require("postcss-position")
  , size         = require("postcss-size")
  , verthorz     = require("postcss-verthorz")
  , colorShort   = require("postcss-color-short")
  , bem          = require("postcss-bem");

var processors = [
  alias,
  crip,
  magician,
  triangle,
  circle,
  linkColors,
  center,
  clearfix,
  position,
  size,
  verthorz,
  colorShort,
  autoprefixer,
  precss,
  bem
];

gulp.task("css", function () {
  return gulp.src("src/**/*.css")
    .pipe( sourcemaps.init() )
    .pipe( postcss(processors) )
    .pipe( sourcemaps.write(".") )
    .pipe( gulp.dest("dist/") );
});
gulp.task("watch", function(){
  gulp.watch("src/**/*.css", ["css"]);
});
gulp.task("default", ["watch", "css"]);