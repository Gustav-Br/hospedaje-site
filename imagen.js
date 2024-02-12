function mostrarImagen(src) {
    var imagenGrandeContenedor = document.getElementById("imagen-grande-contenedor");
    var imagenGrande = document.getElementById("imagen-grande");

    imagenGrande.src = src;
    imagenGrandeContenedor.style.display = "block";
}

function ocultarImagen() {
    var imagenGrandeContenedor = document.getElementById("imagen-grande-contenedor");
    imagenGrandeContenedor.style.display = "none";
}