/* =========================================================
   📁 sobreNosotros.js — Lógica de la página Sobre Nosotros
   Autor: CLINAID
   Descripción:
   - Menú responsive
   - Botones "Ver más" para expandir texto
   - Scroll suave
   - Año automático en footer
   ========================================================= */

/* =========================================================
   🔹 1. Menú responsive (abrir/cerrar)
   ========================================================= */
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

/* =========================================================
   🔹 2. Cerrar el menú al hacer clic en un enlace
   ========================================================= */
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
    }
  });
});

/* =========================================================
   🔹 3. Desplazamiento suave (smooth scroll)
   ========================================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = this.getAttribute('href');

    if (target && target.length > 1) {
      e.preventDefault();

      const el = document.querySelector(target);

      if (el) {
        const top = el.getBoundingClientRect().top + window.pageYOffset - 72;

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
document.getElementById('year').textContent = new Date().getFullYear();

/* =========================================================
   🔹 5. Buscador (modo demo)
   ========================================================= */
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');

searchBtn.addEventListener('click', () => {
  const q = searchInput.value.trim();

  if (q) {
    alert(`Buscar: "${q}" (implemente la funcionalidad real en backend)`);
  } else {
    searchInput.focus();
  }
});

/* =========================================================
   🔹 6. BOTONES "VER MÁS" - EXPANDIR TEXTO
   ========================================================= */

// Función genérica para manejar botones "Ver más"
function setupExpandButton(btnId, textoId) {
  const btn = document.getElementById(btnId);
  const textoCompleto = document.getElementById(textoId);
  
  if (btn && textoCompleto) {
    btn.addEventListener('click', () => {
      const textoBtn = btn.querySelector('.texto-btn');
      const iconoBtn = btn.querySelector('.icono-btn');
      
      // Alternar visibilidad del texto
      textoCompleto.classList.toggle('oculto');
      textoCompleto.classList.toggle('visible');
      
      // Cambiar texto del botón
      if (textoCompleto.classList.contains('visible')) {
        textoBtn.textContent = 'Ver menos';
        btn.classList.add('expandido');
      } else {
        textoBtn.textContent = 'Ver más';
        btn.classList.remove('expandido');
      }
    });
  }
}

// Inicializar botones "Ver más"
setupExpandButton('btn-quienes-somos', 'texto-quienes-somos');
setupExpandButton('btn-politica', 'texto-politica');

/* =========================================================
   🔹 7. ANIMACIONES AL HACER SCROLL (Opcional)
   ========================================================= */

// Función para detectar cuando un elemento entra en el viewport
function handleScrollAnimation() {
  const elementos = document.querySelectorAll('.card-mv, .valor-item, .content-texto, .content-imagen');
  
  elementos.forEach(elemento => {
    const elementTop = elemento.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    // Si el elemento está visible en el viewport
    if (elementTop < windowHeight - 100) {
      elemento.style.opacity = '1';
      elemento.style.transform = 'translateY(0)';
    }
  });
}

// Configurar estilos iniciales para animación (opcional)
window.addEventListener('load', () => {
  const elementos = document.querySelectorAll('.card-mv, .valor-item');
  
  elementos.forEach((elemento, index) => {
    elemento.style.opacity = '0';
    elemento.style.transform = 'translateY(30px)';
    elemento.style.transition = `all 0.6s ease ${index * 0.1}s`;
  });
  
  // Ejecutar animación inicial
  setTimeout(handleScrollAnimation, 100);
});

// Ejecutar al hacer scroll
window.addEventListener('scroll', handleScrollAnimation);

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