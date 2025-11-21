/* =========================================================
   📁 index.js — Lógica principal del sitio web
   Autor: [Tu Nombre]
   Descripción general:
   Este archivo controla las interacciones dinámicas del sitio:
   1️⃣ Menú responsive (abrir/cerrar)
   2️⃣ Cierre automático del menú al hacer clic en un enlace
   3️⃣ Desplazamiento suave entre secciones (scroll suave)
   4️⃣ Inserción automática del año en el footer
   5️⃣ Comportamiento básico del buscador (modo demo)
   ========================================================= */


/* =========================================================
   🔹 1. Menú responsive (abrir/cerrar)
   ========================================================= */
// Se obtienen las referencias del botón de menú y la barra de navegación
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

// Evento: al hacer clic en el ícono del menú, se alterna (toggle)
// la clase "open" para mostrar u ocultar el menú (modo móvil)
menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});


/* =========================================================
   🔹 2. Cerrar el menú al hacer clic en un enlace
   ========================================================= */
// Selecciona todos los enlaces de navegación con la clase .nav-link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    // Si el menú está abierto, se cierra automáticamente
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
    }
  });
});


/* =========================================================
   🔹 3. Desplazamiento suave (smooth scroll)
   ========================================================= */
// Selecciona todos los enlaces que apuntan a anclas dentro del sitio
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = this.getAttribute('href');

    // Evita ejecutar si el href es solo "#"
    if (target && target.length > 1) {
      e.preventDefault(); // Evita el salto inmediato del navegador

      // Busca el elemento correspondiente al ancla
      const el = document.querySelector(target);

      if (el) {
        // Calcula la posición vertical ajustando el offset por el header fijo
        const top = el.getBoundingClientRect().top + window.pageYOffset - 72;

        // Realiza un desplazamiento suave hasta la posición calculada
        window.scrollTo({
          top,
          behavior: 'smooth'
        });
      }
    }
  });
});


/* =========================================================
   🔹 4. Año automático en el footer
   ========================================================= */
// Inserta el año actual en el elemento con id="year"
document.getElementById('year').textContent = new Date().getFullYear();


/* =========================================================
   🔹 5. Comportamiento del buscador (modo demo)
   ========================================================= */
// Selecciona los elementos del buscador
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');

// Evento: al hacer clic en el botón de búsqueda
searchBtn.addEventListener('click', () => {
  const q = searchInput.value.trim(); // Toma el texto del input

  if (q) {
    // Simula una búsqueda (alerta demostrativa)
    alert(`Buscar: "${q}" (implemente la funcionalidad real en backend)`);
  } else {
    // Si el campo está vacío, coloca el cursor en el input
    searchInput.focus();
  }
});

/* =========================================================
   🔹 6. Acordeón interactivo: ¿Por qué elegir CLINAID?
   Descripción: Controla la apertura y cierre de cada item
   del acordeón cuando se hace clic en su título.
========================================================= */

// Selecciona todos los botones que actúan como títulos del acordeón
const acordeonTitulos = document.querySelectorAll('.acordeon-titulo');

// Itera sobre cada título para agregar un evento de clic
acordeonTitulos.forEach(titulo => {
  titulo.addEventListener('click', () => {
    // Obtiene el div de contenido correspondiente al título clicado
    const contenido = titulo.nextElementSibling;

    /* ===============================
       Cierra otros acordeones abiertos
       =============================== */
    document.querySelectorAll('.acordeon-contenido.open').forEach(openItem => {
      // Verifica que no sea el mismo contenido que se está clicando
      if (openItem !== contenido) {
        openItem.classList.remove('open');        // Oculta el contenido abierto
        openItem.previousElementSibling.classList.remove('activo'); // Cambia icono a '+'
      }
    });

    /* ===============================
       Alterna el acordeón actual
       =============================== */
    contenido.classList.toggle('open'); // Abre o cierra el contenido
    titulo.classList.toggle('activo');  // Cambia el icono + / − y estilo del título
  });
});

// ========================================
// CONFIGURACIÓN DEL CARRUSEL AUTOMÁTICO
// ========================================

// Obtener el elemento del track del carrusel
const carruselTrack = document.getElementById('carruselTrack');

// Obtener todos los items del carrusel
const items = document.querySelectorAll('.carrusel-item');

// Obtener los botones de navegación
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

// Variable para controlar el índice actual del carrusel
let indiceActual = 0;

// Número total de logos originales (sin los duplicados)
const logosOriginales = 7;

// Número de items visibles simultáneamente
const itemsVisibles = 4;

// Variable para el intervalo automático
let intervaloCarrusel;

// ========================================
// FUNCIÓN PARA MOVER EL CARRUSEL
// ========================================
function moverCarrusel() {
    // Incrementar el índice actual (se mueve de a 1 imagen)
    indiceActual++;
    
    // Calcular el desplazamiento en porcentaje
    // Cada item ocupa 25% del ancho (100% / 4 items visibles)
    const desplazamiento = indiceActual * 25;
    
    // Aplicar la transformación para mover el track
    carruselTrack.style.transform = `translateX(-${desplazamiento}%)`;
    
    // Si llegamos al final de los logos originales
    if (indiceActual >= logosOriginales) {
        // Esperar a que termine la animación (600ms)
        setTimeout(() => {
            // Quitar la transición temporalmente
            carruselTrack.style.transition = 'none';
            // Volver al principio sin animación
            indiceActual = 0;
            carruselTrack.style.transform = `translateX(0%)`;
            // Restaurar la transición después de un momento
            setTimeout(() => {
                carruselTrack.style.transition = 'transform 0.6s ease-in-out';
            }, 50);
        }, 600);
    }
}

// ========================================
// FUNCIÓN PARA MOVER HACIA ATRÁS
// ========================================
function moverAtras() {
    // Si estamos en el inicio
    if (indiceActual === 0) {
        // Saltar al final sin animación
        carruselTrack.style.transition = 'none';
        indiceActual = logosOriginales;
        carruselTrack.style.transform = `translateX(-${indiceActual * 25}%)`;
        
        // Restaurar transición y retroceder
        setTimeout(() => {
            carruselTrack.style.transition = 'transform 0.6s ease-in-out';
            indiceActual--;
            const desplazamiento = indiceActual * 25;
            carruselTrack.style.transform = `translateX(-${desplazamiento}%)`;
        }, 50);
    } else {
        // Retroceder normalmente
        indiceActual--;
        const desplazamiento = indiceActual * 25;
        carruselTrack.style.transform = `translateX(-${desplazamiento}%)`;
    }
}

// ========================================
// FUNCIÓN PARA INICIAR EL CARRUSEL
// ========================================
function iniciarCarrusel() {
    // Configurar intervalo de 3 segundos (3000 milisegundos)
    intervaloCarrusel = setInterval(moverCarrusel, 3000);
}

// ========================================
// FUNCIÓN PARA DETENER EL CARRUSEL
// ========================================
function detenerCarrusel() {
    clearInterval(intervaloCarrusel);
}

// ========================================
// EVENTOS DE LOS BOTONES
// ========================================
// Evento para el botón siguiente
btnSiguiente.addEventListener('click', () => {
    detenerCarrusel();
    moverCarrusel();
    iniciarCarrusel();
});

// Evento para el botón anterior
btnAnterior.addEventListener('click', () => {
    detenerCarrusel();
    moverAtras();
    iniciarCarrusel();
});

// ========================================
// PAUSAR EL CARRUSEL AL HACER HOVER
// ========================================
// Obtener el contenedor del carrusel
const contenedorCarrusel = document.querySelector('.carrusel-container');

// Pausar el carrusel cuando el mouse está sobre él
contenedorCarrusel.addEventListener('mouseenter', () => {
    detenerCarrusel();
});

// Reanudar el carrusel cuando el mouse sale del contenedor
contenedorCarrusel.addEventListener('mouseleave', () => {
    iniciarCarrusel();
});

// ========================================
// INICIAR EL CARRUSEL AL CARGAR LA PÁGINA
// ========================================
iniciarCarrusel();


/* =========================================================
   FUNCIONALIDAD: CARRUSEL DE TESTIMONIOS
   ----------------------------------------------------------
   Control de navegación automática y manual del carrusel.
   - Auto-avance cada 5 segundos
   - Navegación con botones anterior/siguiente
   - Indicadores de puntos clickeables
   - Pausa al hacer hover sobre el carrusel
   ========================================================= */

// ========== VARIABLES GLOBALES ==========
const testimoniosTrack = document.getElementById('testimoniosTrack');
const testimoniosCards = document.querySelectorAll('.testimonio-card');
const btnTestimonioAnterior = document.getElementById('testimonioAnterior');
const btnTestimonioSiguiente = document.getElementById('testimonioSiguiente');
const testimoniosIndicadoresContainer = document.getElementById('testimoniosIndicadores');

let indiceTestimonioActual = 0; // Índice del testimonio visible
const totalTestimonios = testimoniosCards.length; // Total de testimonios
let intervaloTestimonios; // Variable para el auto-avance

// ========== GENERAR INDICADORES DE PUNTOS ==========
/**
 * Crea dinámicamente los puntos indicadores según el número de testimonios.
 * Cada punto es clickeable y permite navegar directamente a un testimonio.
 */
function generarIndicadoresTestimonios() {
  testimoniosIndicadoresContainer.innerHTML = ''; // Limpia contenedor
  
  for (let i = 0; i < totalTestimonios; i++) {
    const punto = document.createElement('div');
    punto.classList.add('indicador-punto');
    
    // Marcar el primer punto como activo
    if (i === 0) {
      punto.classList.add('activo');
    }
    
    // Evento click para navegar al testimonio correspondiente
    punto.addEventListener('click', () => {
      detenerCarruselTestimonios();
      irATestimonio(i);
      iniciarCarruselTestimonios();
    });
    
    testimoniosIndicadoresContainer.appendChild(punto);
  }
}

// ========== ACTUALIZAR INDICADORES ACTIVOS ==========
/**
 * Marca el punto indicador correspondiente al testimonio visible.
 * Remueve la clase 'activo' de todos y la añade solo al actual.
 */
function actualizarIndicadoresTestimonios() {
  const puntos = document.querySelectorAll('.indicador-punto');
  puntos.forEach((punto, index) => {
    punto.classList.toggle('activo', index === indiceTestimonioActual);
  });
}

// ========== MOVER CARRUSEL DE TESTIMONIOS ==========
/**
 * Desplaza el track del carrusel al testimonio correspondiente.
 * Usa transform translateX para la animación.
 */
function moverCarruselTestimonios() {
  const desplazamiento = indiceTestimonioActual * 100; // Cada card es 100% del ancho
  testimoniosTrack.style.transform = `translateX(-${desplazamiento}%)`;
  actualizarIndicadoresTestimonios();
}

// ========== NAVEGAR AL TESTIMONIO SIGUIENTE ==========
/**
 * Avanza al siguiente testimonio.
 * Si está en el último, vuelve al primero (efecto circular).
 */
function siguienteTestimonio() {
  indiceTestimonioActual = (indiceTestimonioActual + 1) % totalTestimonios;
  moverCarruselTestimonios();
}

// ========== NAVEGAR AL TESTIMONIO ANTERIOR ==========
/**
 * Retrocede al testimonio anterior.
 * Si está en el primero, va al último (efecto circular).
 */
function anteriorTestimonio() {
  indiceTestimonioActual = (indiceTestimonioActual - 1 + totalTestimonios) % totalTestimonios;
  moverCarruselTestimonios();
}

// ========== IR A UN TESTIMONIO ESPECÍFICO ==========
/**
 * Navega directamente a un testimonio según el índice proporcionado.
 * @param {number} indice - Índice del testimonio al que se quiere navegar
 */
function irATestimonio(indice) {
  indiceTestimonioActual = indice;
  moverCarruselTestimonios();
}

// ========== INICIAR AUTO-AVANCE DEL CARRUSEL ==========
/**
 * Inicia el auto-avance del carrusel cada 5 segundos.
 */
function iniciarCarruselTestimonios() {
  intervaloTestimonios = setInterval(siguienteTestimonio, 5000); // 5000ms = 5 segundos
}

// ========== DETENER AUTO-AVANCE DEL CARRUSEL ==========
/**
 * Detiene el auto-avance del carrusel.
 */
function detenerCarruselTestimonios() {
  clearInterval(intervaloTestimonios);
}

// ========== EVENTOS DE LOS BOTONES DE NAVEGACIÓN ==========
/**
 * Botón "Siguiente": Detiene auto-avance, avanza manualmente y reinicia auto-avance
 */
btnTestimonioSiguiente.addEventListener('click', () => {
  detenerCarruselTestimonios();
  siguienteTestimonio();
  iniciarCarruselTestimonios();
});

/**
 * Botón "Anterior": Detiene auto-avance, retrocede manualmente y reinicia auto-avance
 */
btnTestimonioAnterior.addEventListener('click', () => {
  detenerCarruselTestimonios();
  anteriorTestimonio();
  iniciarCarruselTestimonios();
});

// ========== PAUSAR CARRUSEL AL HACER HOVER ==========
/**
 * Cuando el usuario pasa el mouse sobre el carrusel, se pausa el auto-avance.
 * Al salir el mouse, se reanuda el auto-avance.
 */
const contenedorTestimonios = document.querySelector('.carrusel-testimonios-container');

contenedorTestimonios.addEventListener('mouseenter', () => {
  detenerCarruselTestimonios();
});

contenedorTestimonios.addEventListener('mouseleave', () => {
  iniciarCarruselTestimonios();
});

// ========== INICIALIZAR CARRUSEL AL CARGAR LA PÁGINA ==========
/**
 * Genera los indicadores y arranca el auto-avance cuando la página carga.
 */
generarIndicadoresTestimonios();
iniciarCarruselTestimonios();


/* =========================================================
   FUNCIONALIDAD: FAQ (PREGUNTAS FRECUENTES)
   ----------------------------------------------------------
   Control de acordeón para expandir/colapsar respuestas.
   - Solo una pregunta abierta a la vez
   - Animación suave al expandir/colapsar
   ========================================================= */

// Selecciona todos los botones de preguntas del FAQ
const faqPreguntas = document.querySelectorAll('.faq-pregunta');

// Itera sobre cada pregunta para agregar evento de click
faqPreguntas.forEach(pregunta => {
  pregunta.addEventListener('click', () => {
    // Obtiene la respuesta correspondiente
    const respuesta = pregunta.nextElementSibling;
    
    // Cierra otras respuestas abiertas
    document.querySelectorAll('.faq-respuesta.open').forEach(openRespuesta => {
      if (openRespuesta !== respuesta) {
        openRespuesta.classList.remove('open');
        openRespuesta.previousElementSibling.classList.remove('activo');
      }
    });
    
    // Alterna la respuesta actual (abre si está cerrada, cierra si está abierta)
    respuesta.classList.toggle('open');
    pregunta.classList.toggle('activo');
  });
});

// Lista de páginas disponibles
const pages = [
  { name: "Inicio", url: "../HTML/index.html" },
  { name: "Sobre Nosotros", url: "../HTML/sobreNosotros.html" },
  { name: "Testimonios", url: "../HTML/testimonios.html" },
  { name: "Servicios", url: "../HTML/servicios.html" },
  { name: "Contáctanos", url: "../HTML/index.html#contactanos" },
  { name: "Nuestros Especialistas", url: "../HTML/nuestrosEspecialistas.html" }
];

const input = document.getElementById("search-input");
const suggestions = document.getElementById("search-suggestions");
const btn = document.getElementById("search-btn");

// =======================
//  SUGERENCIAS EN VIVO
// =======================
input.addEventListener("input", () => {
  const q = input.value.toLowerCase().trim();

  // Si el input está vacío → ocultar lista
  if (q === "") {
    suggestions.innerHTML = "";
    suggestions.classList.remove("active");
    input.setAttribute("aria-expanded", "false");
    return;
  }

  // Filtrar las páginas por coincidencia parcial
  const filtered = pages.filter(p => p.name.toLowerCase().includes(q));

  // Insertar sugerencias
  suggestions.innerHTML = filtered
    .map(p => `<li role="option" data-url="${p.url}">${p.name}</li>`)
    .join("");

  // Mostrar lista si hay resultados
  if (filtered.length > 0) {
    suggestions.classList.add("active");
    input.setAttribute("aria-expanded", "true");
  } else {
    suggestions.classList.remove("active");
    input.setAttribute("aria-expanded", "false");
  }
});

// =======================
//  CLICK EN SUGERENCIAS
// =======================
suggestions.addEventListener("click", e => {
  if (e.target.tagName === "LI") {
    window.location.href = e.target.dataset.url;
  }
});

// =======================
//  BOTÓN BUSCAR
// =======================
btn.addEventListener("click", () => {
  const q = input.value.toLowerCase().trim();

  const exact = pages.find(p => p.name.toLowerCase() === q);

  if (exact) {
    window.location.href = exact.url;
  } else {
    alert("No se encontraron resultados.");
  }
});

// =======================
//  ENTER PARA BUSCAR
// =======================
input.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    btn.click();
  }
});


// Mostrar / ocultar el botón según el scroll
window.addEventListener("scroll", () => {
  const btn = document.getElementById("btn-top");
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  if (scrollTop > 300) {
    btn.classList.add("show");
  } else {
    btn.classList.remove("show");
  }
});

// Subir al inicio compatible con todos los navegadores
document.getElementById("btn-top").addEventListener("click", () => {
  // Para Chrome, Edge, Firefox modernos
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  // Para Safari, Opera o viejos navegadores
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0;
});

