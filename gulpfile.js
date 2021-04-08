
const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
sass.compiler = require('dart-sass'); 

function compilarSASS() {
    
    return src("./src/scss/app.scss")
    .pipe(sass())
    .pipe( dest("./build/css") );
    
}

function minificarcss() {
    return src("./src/scss/app.scss")
    .pipe(sass({
        outputStyle:'compressed'
    }))
    .pipe( dest("./build/css") );
    
}

function imagenes() {
    return src('src/img/**/*')
    .pipe(imagemin())
    .pipe(dest('./build/img'))
    
}

function watchingFiles() {
    watch("./src/scss/**/*.scss",compilarSASS);
    
}


exports.compilarSASS = compilarSASS;
exports.minificar = minificarcss;
exports.imagenes = imagenes;
exports.watchingFiles = watchingFiles;
//exports.default = series(compilarSASS); con default ejecutará con tan solo GULP en el cmd
//exports.default = parallel(compilarSASS); todas las funciones empezarán a la vez