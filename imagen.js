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

const menuToggle = document.querySelector('.menu-toggle');
const botonCerrar = document.querySelector('.boton-cerrar');
const navLinks = document.querySelector('.cont-nav-mobile');
const mobileNavLinks = document.querySelectorAll('.cont-nav-mobile a');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

botonCerrar.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

mobileNavLinks.forEach(function (enlace) {
    enlace.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
});

let scrollAnterior = 0;

window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    const scrollY = window.scrollY; // Obtener posición de desplazamiento

    console.log(header, scrollY);

    if (scrollY > scrollAnterior && window.matchMedia("(orientation: landscape)").matches) {
        header.classList.add('minimizado');
    } else {
        header.classList.remove('minimizado');
    }
    scrollAnterior = scrollY;
});