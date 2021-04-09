document.addEventListener('DOMContentLoaded', function(){
    crearGaleria();
});


function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    for (let i = 1; i <=12; i++) {
        const imagen = document.createElement('img');
        imagen.src = `build/img/thumb/${i}.webp`;
        imagen.dataset.imagenId = i;


       


        imagen.onclick = mostrarImagen; //Añadir la función de mostrarImagen

        const lista = document.createElement('li');
        lista.appendChild(imagen);
        
        galeria.appendChild(lista);
    }
    
}

function mostrarImagen(event){
    const id = parseInt(event.target.dataset.imagenId);

    const imagen = document.createElement('img');
    imagen.src = `build/img/grande/${id}.webp`;

    const overlay = document.createElement('div');

    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    //boton cerrar imagen
    const cerrarImagen = document.createElement('p');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-cerrar');
    overlay.appendChild(cerrarImagen);


    //cerrar imagen
    cerrarImagen.onclick = ()=>{ overlay.remove() 
        body.classList.remove('fijar-body')
    }
    overlay.onclick = ()=>{ overlay.remove()
        body.classList.remove('fijar-body')}

    //enseñar imagen en el body
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');

}


