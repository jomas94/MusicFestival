
const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass'); //compila el scss a css
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat')

//Utilidades CSS
const autoprefixer = require('autoprefixer');// añade los prefijos donde sea necesario(-webkit, -o-, -moz- etc) 
const postcss = require('gulp-postcss'); // para transformar en css
const cssnano = require('cssnano'); // Minifica, quita los espacios
const sourcemaps = require('gulp-sourcemaps'); // conserva la referencia al archivo original tras compilar

//Utilidades JS 
const terser = require('gulp-terser-js'); // // conserva la referencia al archivo original tras compilar
const rename = require('gulp-rename');

const paths ={
    imagenes: './src/img/**/*',
    scss:'src/scss/**/*.scss',
    js:'src/js/**/*.js'
}

function css() {
    return src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass())// aqui compila el scss a css
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./build/css'));
    
}

function javascript() {
    return src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(concat('scripts.js'))
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(rename({suffix:'.min'}))
    .pipe(dest('./build/js'));
    
}

function versionWebp(){
    return src(paths.imagenes)
    .pipe(webp())
    .pipe(dest('./build/img'))
    .pipe(notify({message:'Version Webp Lista'}));
    
}

function imagenes() {
    return src(paths.imagenes)
    .pipe(imagemin())
    .pipe(dest('./build/img'))
    .pipe(notify({message: 'Imagen Minificada'}));
    
}

function watchingFiles() {
    watch(paths.scss,css);
    watch(paths.js,javascript);
    
}


// exports.css = css;
// exports.imagenes = imagenes;
// exports.watchingFiles = watchingFiles;
// exports.default = series( css, imagenes, javascript, versionWebp, watchingFiles);
exports.default = series( css, javascript, watchingFiles);
