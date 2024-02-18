var currentIndex = 0;

function mostrarImagen(src) {
    var imagenGrandeContenedor = document.getElementById("imagen-grande-contenedor");
    var imagenGrande = document.getElementById("imagen-grande");

    imagenGrande.src = src;
    imagenGrandeContenedor.style.display = "block";

    var imagenes = document.querySelectorAll('.imagen');
    currentIndex = Array.from(imagenes).findIndex(img => img.src === (imagenGrande.src));
}

function ocultarImagen() {
    var imagenGrandeContenedor = document.getElementById("imagen-grande-contenedor");
    if (event.target.className === "cerrar-imagen") {
        imagenGrandeContenedor.style.display = "none";
    }
}

document.addEventListener("click", ocultarImagen);


function mostrarSiguienteImagen() {
    var imagenes = document.querySelectorAll('.imagen');
    currentIndex = (currentIndex + 1) % imagenes.length;
    mostrarImagen(imagenes[currentIndex].src);
}

function mostrarImagenAnterior() {
    var imagenes = document.querySelectorAll('.imagen');
    currentIndex = (currentIndex - 1 + imagenes.length) % imagenes.length;
    mostrarImagen(imagenes[currentIndex].src);
}
