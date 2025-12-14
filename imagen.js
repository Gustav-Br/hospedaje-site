let currentIndex = 0;
let imagenesArray = [];
let imagenesSrcArray = [];

// Inicializar array de imágenes al cargar
document.addEventListener('DOMContentLoaded', function () {
    const imagenes = document.querySelectorAll('.imagen');
    imagenesArray = Array.from(imagenes);
    // Extraer src de cada imagen desde el atributo onclick
    imagenesSrcArray = imagenesArray.map(img => {
        const onclickAttr = img.getAttribute('onclick');
        if (onclickAttr) {
            const match = onclickAttr.match(/['"]([^'"]+)['"]/);
            return match ? match[1] : img.src;
        }
        return img.src;
    });
});

function mostrarImagen(src) {
    const imagenGrandeContenedor = document.getElementById("imagen-grande-contenedor");
    const imagenGrande = document.getElementById("imagen-grande");

    if (!imagenGrandeContenedor || !imagenGrande) return;

    imagenGrande.src = src;
    imagenGrandeContenedor.style.display = "block";
    document.body.style.overflow = "hidden"; // Prevenir scroll del body

    // Buscar el índice basado en el src
    currentIndex = imagenesSrcArray.findIndex(imgSrc => {
        return imgSrc === src || imgSrc.endsWith(src.split('/').pop());
    });

    if (currentIndex === -1) {
        currentIndex = 0;
    }
}

function ocultarImagen(event) {
    const imagenGrandeContenedor = document.getElementById("imagen-grande-contenedor");
    if (!imagenGrandeContenedor) return;

    // Solo cerrar si se hace clic en el fondo o en el botón cerrar
    if (event && (event.target === imagenGrandeContenedor || event.target.className === "cerrar-imagen" || event.target.classList.contains("cerrar-imagen"))) {
        imagenGrandeContenedor.style.display = "none";
        document.body.style.overflow = ""; // Restaurar scroll
    }
}

// Navegación con teclado
document.addEventListener("keydown", function (event) {
    const imagenGrandeContenedor = document.getElementById("imagen-grande-contenedor");
    if (!imagenGrandeContenedor || imagenGrandeContenedor.style.display !== "block") return;

    if (event.key === "Escape") {
        imagenGrandeContenedor.style.display = "none";
        document.body.style.overflow = "";
        event.preventDefault();
    } else if (event.key === "ArrowLeft") {
        mostrarImagenAnterior();
        event.preventDefault();
    } else if (event.key === "ArrowRight") {
        mostrarSiguienteImagen();
        event.preventDefault();
    }
});


function mostrarSiguienteImagen(event) {
    if (event) {
        event.stopPropagation();
    }
    if (imagenesSrcArray.length === 0) return;
    currentIndex = (currentIndex + 1) % imagenesSrcArray.length;
    mostrarImagen(imagenesSrcArray[currentIndex]);
}

function mostrarImagenAnterior(event) {
    if (event) {
        event.stopPropagation();
    }
    if (imagenesSrcArray.length === 0) return;
    currentIndex = (currentIndex - 1 + imagenesSrcArray.length) % imagenesSrcArray.length;
    mostrarImagen(imagenesSrcArray[currentIndex]);
}

// Manejo del menú móvil
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const botonCerrar = document.querySelector('.boton-cerrar');
    const navLinks = document.querySelector('.cont-nav-mobile');
    const mobileNavLinks = document.querySelectorAll('.cont-nav-mobile a');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }

    if (botonCerrar && navLinks && menuToggle) {
        botonCerrar.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (mobileNavLinks.length > 0) {
        mobileNavLinks.forEach(function (enlace) {
            enlace.addEventListener('click', function () {
                if (navLinks && menuToggle) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function (event) {
        if (navLinks && menuToggle && navLinks.classList.contains('active')) {
            if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});

// Header minimizado al hacer scroll (solo en landscape)
let scrollAnterior = 0;
let ticking = false;

function handleScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    const scrollY = window.scrollY;

    if (scrollY > scrollAnterior && scrollY > 100 && window.matchMedia("(orientation: landscape)").matches && window.innerHeight < 590) {
        header.classList.add('minimizado');
    } else {
        header.classList.remove('minimizado');
    }
    scrollAnterior = scrollY;
    ticking = false;
}

window.addEventListener('scroll', function () {
    if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
    }
}, { passive: true });