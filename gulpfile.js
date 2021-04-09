
const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat')

const paths ={
    imagenes: './src/img/**/*',
    scss:'src/scss/**/*.scss',
    js:'src/js/**/*.js'
}

function css() {
    return src(paths.scss)
    .pipe(sass({
        outputStyle:'expanded'
    }))
    .pipe(dest('./build/css'));
    
}

function minificarcss() {
    return src(paths.scss)
    .pipe(sass({
        outputStyle:'compressed'
    }))
    .pipe(dest('./build/css'));
    
}

function javascript() {
    return src(paths.js)
    .pipe(concat('bundle.js'))
    .pipe(dest('./build/js'))
    
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
    
}


// exports.css = css;
// exports.minificar = minificarcss;
// exports.imagenes = imagenes;
// exports.watchingFiles = watchingFiles;
// exports.default = series( css, imagenes, javascript, versionWebp, watchingFiles);
exports.default = series( css, javascript, watchingFiles);
