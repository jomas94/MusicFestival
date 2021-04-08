
const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass');

sass.compiler = require('dart-sass'); 

function compilarSASS() {
    
    return src("./src/scss/app.scss")
    .pipe(sass())
    .pipe( dest("./build/css") );
    
}

function minificar() {
    return src("./src/scss/app.scss")
    .pipe(sass({
        outputStyle:'compressed'
    }))
    .pipe( dest("./build/css") );
    
}

function watchingFiles() {
    watch("./src/scss/**/*.scss",compilarSASS)
    
}


exports.compilarSASS = compilarSASS;
exports.minificar = minificar;
exports.watchingFiles = watchingFiles;
//exports.default = series(compilarSASS); con default ejecutará con tan solo GULP en el cmd
//exports.default = parallel(compilarSASS); todas las funciones empezarán a la vez