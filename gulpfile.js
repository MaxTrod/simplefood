const { src, dest, watch, parallel, series } = require("gulp");
const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const del = require("del");
const browserSync = require("browser-sync").create();
const svgSprite = require("gulp-svg-sprite");
const cheerio = require("gulp-cheerio");
const replace = require("gulp-replace");
const fileInclude = require('gulp-file-include');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');


function htmlInclude() {
  return src(['app/html/*.html'])
  .pipe(fileInclude({
    prefix: '@',
    basepath: '@file'
  }))
  .pipe(replace(/@images\//g, 'images/'))
  .pipe(dest('app'))
  .pipe(browserSync.stream());
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
    notify: false,
  });
}

function styles() {
  return src("app/scss/style.scss")
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(concat("style.min.css"))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 10 versions"],
        grid: true,
      })
    )
    .pipe(dest("app/css"))
    .pipe(browserSync.stream());
}

function scripts() {
  return src([
    "node_modules/jquery/dist/jquery.js", 
    "node_modules/swiper/swiper-bundle.js",
    // "node_modules/webfontloader/src/core/webfont.js",
    "node_modules/jquery-form-styler/dist/jquery.formstyler.js",
    "node_modules/ion-rangeslider/js/ion.rangeSlider.js",
    "node_modules/@fancyapps/ui/dist/fancybox.umd.js",
    // "node_modules/@fancyapps/ui/dist/carousel.umd.js",
    "node_modules/rateyo/src/jquery.rateyo.js",
    "app/js/main.js",
  ])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("app/js"))
    .pipe(browserSync.stream());
}

function images() {
  // return src('app/images/**/*.*')
  return src("app/images/**/*.*", { encoding: false })
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            {
              name: "removeViewBox",
              active: true,
            },
            {
              name: "cleanupIDs",
              active: false,
            },
          ],
        }),
      ])
    )
    .pipe(dest("dist/images"));
}

function svgSprites() {
  return src("app/images/icons/*.svg")

  .pipe(cheerio({
    run: ($) => {
        $("[fill]").removeAttr("fill"); 
        $("[stroke]").removeAttr("stroke"); 
        $("[style]").removeAttr("style"); 
    },
    parserOptions: { xmlMode: true },
  })
)

    .pipe(replace('&gt;','>')) 

    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg",
            example: true,
          },
        },
      })
    )
    .pipe(dest("app/images"));
}

// function fonts() {
//   return src('app/fonts/*.*')
//   .pipe(dest('app'))
// }

function fonts() {
  return src('app/fonts/src/*.*')
     .pipe(fonter({
        formats: ['woff', 'ttf']
     }))
     .pipe(src('app/fonts/*.ttf'))
     .pipe(ttf2woff2())
     .pipe(dest('app/fonts'))
}

function build() {
  return src([
    "app/css/style.min.css", 
    "app/js/main.min.js", 
    "app/*.html", 
    "app/fonts/*.*"
  ], {base: "app",})
  .pipe(dest("dist"));
}

function cleanDist() {
  return del("dist");
}

function watching() {
  watch(["app/scss/**/*.scss"], styles);
  watch(["app/js/**/*.js", "!app/js/main.min.js"], scripts);
  watch(["app/**/*.html"]).on("change", browserSync.reload);
  watch(["app/images/icons/*.svg"], svgSprites);
  watch(["app/html/**/*.html"], htmlInclude);
}

exports.styles = styles;
exports.scripts = scripts;
exports.fonts = fonts;
exports.browsersync = browsersync;
exports.htmlInclude = htmlInclude;
exports.watching = watching;
exports.fonts = fonts;
exports.images = images;
exports.svgSprites = svgSprites;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, build);

exports.default = parallel(htmlInclude, svgSprites, styles, scripts, browsersync, watching);
