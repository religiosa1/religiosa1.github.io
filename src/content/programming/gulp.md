---
title: "gulp"
deprecated: true
---
# Это доисторическая статья про сборку фронта гульпом

Я не знаю, кому в наше время ещё нежен гульп в таком виде в наше время, но пусть останется в летописи.

Данный вариант использует для сборки js пллагин gulp-better-rollup. Таким образом сюда можно при желании
запихнуть какие-то штуки вроде gulp-convert-encoding или какие-то другие части пайпа.
В официальной документации rollup приведён пример внедрения без использования плагина,
можно при желании взять оттуда.


```javascript
/* eslint-env node */
const {src, dest, watch, parallel} = require("gulp");
const log = require("fancy-log");
const sass = require("gulp-sass");
const tildeImporter = require("node-sass-tilde-importer");
const del = require("del");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const notifier = require("node-notifier");
const flexibility = require('postcss-flexibility');

const plumber = require("gulp-plumber");
const nunjucks = require('gulp-nunjucks-render');
const data = require('gulp-data');

const rollup = require('rollup');
const nodeResolve = require('@rollup/plugin-node-resolve');
const terser = require('rollup-plugin-terser').terser;
const commonJs = require('@rollup/plugin-commonjs');
// npm install --save-dev @babel/core @babel/preset-env
// npm install --save core-js regenerator-runtime
const babel = require('rollup-plugin-babel');

// Компиляция sass
function css() {
  let plugins = [
    autoprefixer(), // управляем поддерживаемыми браузерами через .browserlistrc
    flexibility,
  ];
  del("./css/*"); // Мы удаляем сначала все css, таким образом если компиляция sass сорвалось, то это будет заметно

  return src("./scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({
      importer: tildeImporter, // для импорта из node_modules через ~, например '~bootstrap/scss/bootstrap'
      outputStyle:"compressed", // минимизированный вывод
    }))
    .on("error", function(err){
      notifier.notify({"title": "SASS error","message": err.message});
      log.error(err.message);
      this.emit("end");
    })
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write("./")) // sourcemap'ы, для более веселого дебага
    .pipe(dest("./css"))
  ;
}

// сборка шаблонов nunjucks
function html() {
  return src(['./*.njk', '!./_*.njk'])
    .pipe(plumber()) // Чтобы не вываливался watch, хотя заметно это НЕ будет
    .pipe(data(()=>{
      const btgt = "./data/banners.js";
      delete require.cache[require.resolve(btgt)];
      let d = { ...require(btgt) };
      return d;
    }))
    .pipe(nunjucks({
      ext:"",
      path: ['src/']
    }))
    .pipe(dest('./'))
  ;
}

function js() {
  return rollup.rollup({
    input: './src/app.js',
    plugins: [
      commonJs(),
      nodeResolve({ browser: true }),
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true,
        extensions: [".js", ".mjs"],
        presets: [
          ["@babel/env", {
            modules: 'false',
            useBuiltIns: "usage",
            corejs:3,
          }],
        ]
      }),
      terser(),
    ]
  }).then(bundle => bundle.write({
    file: './js/app.min.js',
    format: 'iife',
    sourcemap: true
  })).catch(err => {
    notifier.notify({"title": "Rollup error","message": err.message});
    log.error(err.message, err.file, err.frame);
  });
}

exports.css = css;
exports.html = html;
exports.js = js;
exports.default = parallel(html, js, css);
exports.watch = function() {
  watch(["scss/*.scss"], css);
  watch(["src/**/*.js"], js);
  watch(['./**/*.njk', 'data/*.js'], html);
};
```

В package.json (или в .browserlistrc) надо создать конфиг для babel и autoprefixer'а
```javascript
  // всякое старьё для bootstrap'а 3
  "browserslist": [
    "Android 2.3",
    "Android >= 4",
    "Chrome >= 20",
    "Firefox >= 24",
    "Explorer >= 8",
    "iOS >= 6",
    "Opera >= 12",
    "Safari >= 6"
  ],
  // более осмысленный вариант
  "browserslist": [
    "Android >= 49",
    "Chrome >= 49",
    "Firefox >= 51",
    "Edge >= 15",
    "iOS >= 10",
    "Opera >= 36",
    "Safari >= 10",
    "last 2 versions"
  ],
```

```shell
npm install --save-dev gulp fancy-log gulp-sass node-sass-tilde-importer del gulp-sourcemaps gulp-postcss autoprefixer node-notifier postcss-flexibility gulp-plumber gulp-twig gulp-data rollup gulp-better-rollup gulp-rename rollup-plugin-node-resolve rollup-plugin-terser rollup-plugin-commonjs @babel/core @babel/preset-env rollup-plugin-babel
npm install --save core-js regenerator-runtime
```
Вариант с browserify

Его стоит рассматривать как устаревший. NB как и всю эту сраную писанину

```javascript
// npm install --save-dev @babel/core @babel/preset-env @babel/plugin-transform-runtime
// npm install --save @babel/polyfill @babel/runtime
const browserify = require("browserify");
const babelify = require("babelify");
const tap = require("gulp-tap");
const buffer = require("vinyl-buffer");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");

function js() {
  return src("src/app.js", {read: false}) // не читаем -- читает browserify
    // преобразуем файлы используя gulp-tap
    .pipe(tap( (file) => {
      log("bundling " + file.path);
      // кормим browserify
      file.contents = browserify(file.path, {debug: true })
        .transform( babelify.configure({
          presets: [
            ["@babel/preset-env", {
              useBuiltIns: "usage",
              modules: "commonjs"
            }]
          ],
          plugins: [
            "@babel/plugin-transform-runtime",
            // "loop-optimizer", // forEach для IE babel-plugin-loop-optimizer
            // "transform-decorators-legacy", // декораторы
            // "@babel/plugin-proposal-optional-chaining" // null propagation operator
            // "@babel/plugin-proposal-do-expressions"
            // ["transform-class-properties", { "spec": false }] // свойства класса для vue
          ]
        }) ) // END transform(babelify)
        .transform(vueify)
        .transform({ global: true }, envify({ NODE_ENV: 'production' }))
        .bundle()
      ;
    })) // END gulp-tap
    // Затыкаем рот попытке потока навернуться
    .pipe(plumber({errorHandler: function(err){
      notifier.notify({"title": "JS-Compile Error","message": err.message});
      log.error("JS-Compile Error: ", err);
      this.emit("end");
    }}))
    // преобразуем в буффер, чтобы gulp-sourcemaps был счастлив
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    //.pipe(ngAnnotate()) // Делаем ангулярку счастливой
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" })) // Переименовываем, дописывая суффикс .min
    //.pipe(convertEncoding({to: 'cp1251'}))
    // пишем sourcemap'ы
    .pipe(sourcemaps.write("./"))
    .pipe(dest("js")); // Пишем результата в папку js
}
```

Голый rollup

Если не нужно собирать css/шаблоны то есть смысл пользоваться только rollup'ом.

Ниже вариант с бабелем, минимизацией и sourcemap'ами.
```javascript
import nodeResolve from 'rollup-plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import commonJs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import sourcemaps from 'rollup-plugin-sourcemaps';

export default [{
  input: 'src/app.js',
  output: [{
    file: 'app/app.min.js',
    sourcemap: 'app/app.min.js.map',
    format: 'iife',
  }],
  plugins: [
    nodeResolve(),
    commonJs(),
    sourcemaps(),
    babel({
      exclude: 'node_modules/**',
      presets: [
        ["@babel/env", {
          modules: 'false',
          useBuiltIns: "usage",
          corejs:3,
        }]
      ],
    }),
    terser(),
  ],
}];
```