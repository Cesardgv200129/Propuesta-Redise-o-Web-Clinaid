/* =========================================================
   testimonios.js — Versión final con carrusel 100% funcional
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  // ———————————————————————
  // 1. Menú responsive
  // ———————————————————————
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (nav.classList.contains('open')) {
          nav.classList.remove('open');
        }
      });
    });
  }

  // Año en footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ———————————————————————
  // 2. ✅ CARRUSEL DE VIDEOS — CORREGIDO Y FUNCIONAL
  // ———————————————————————
  function initVideoCarousel() {
    const videoCarousel = document.getElementById('video-carousel');
    if (!videoCarousel) return;

    const items = videoCarousel.querySelectorAll('.slider-item');
    if (items.length === 0) return;

    const muteBtn = document.getElementById('btn-mute');
    const indicatorList = document.querySelector('.custom-indicators');
    
    let currentIndex = 0;
    let isMuted = false;
    let hasUserGesture = false;

    // 🔑 Habilitar autoplay tras primera interacción
    function enableAutoplay() {
      if (hasUserGesture) return;
      hasUserGesture = true;
      
      const video = items[currentIndex]?.querySelector('video');
      if (video) {
        video.muted = isMuted;
        video.play().catch(() => {
          // Silencioso: común en iOS/Safari
        });
      }
    }

    // Escuchar clic, toque o tecla (una sola vez)
    ['click', 'touchstart', 'keydown'].forEach(eventType => {
      document.addEventListener(eventType, enableAutoplay, { once: true });
    });

    function updateClasses() {
      items.forEach((item, i) => {
        item.classList.remove('prev', 'active', 'next');
        if (i === currentIndex) {
          item.classList.add('active');
        } else if (i === (currentIndex - 1 + items.length) % items.length) {
          item.classList.add('prev');
        } else if (i === (currentIndex + 1) % items.length) {
          item.classList.add('next');
        }
      });

      if (indicatorList) {
        indicatorList.innerHTML = '';
        items.forEach((_, i) => {
          const li = document.createElement('li');
          const btn = document.createElement('button');
          btn.setAttribute('data-index', i);
          if (i === currentIndex) btn.classList.add('active');
          btn.addEventListener('click', () => goToSlide(i));
          li.appendChild(btn);
          indicatorList.appendChild(li);
        });
      }
    }

    function goToSlide(index) {
      // Pausar video actual
      const currentVideo = items[currentIndex]?.querySelector('video');
      if (currentVideo) {
        currentVideo.pause();
        currentVideo.onended = null;
      }

      currentIndex = index;
      updateClasses();

      // Reproducir nuevo video
      const newVideo = items[currentIndex]?.querySelector('video');
      if (newVideo) {
        newVideo.currentTime = 0;
        newVideo.muted = isMuted;
        
        if (hasUserGesture) {
          newVideo.play().catch(e => {
            console.warn("⚠️ Reproducción fallida:", e);
          });
        }

        newVideo.onended = () => {
          setTimeout(() => {
            goToSlide((currentIndex + 1) % items.length);
          }, 500);
        };
      }
    }

    // Botón de mute
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        items.forEach(item => {
          const v = item.querySelector('video');
          if (v) v.muted = isMuted;
        });
        muteBtn.innerHTML = isMuted 
          ? '<i class="fa-solid fa-volume-xmark"></i>' 
          : '<i class="fa-solid fa-volume-high"></i>';
        muteBtn.title = isMuted ? 'Activar sonido' : 'Silenciar';
        enableAutoplay(); // Clic en mute = interacción válida
      });
    }

    // Inicializar
    updateClasses();
    goToSlide(0);
  }

  setTimeout(initVideoCarousel, 100);

  // ———————————————————————
  // 3. Formulario y Testimonios (sin cambios)
  // ———————————————————————
  const form = document.getElementById('testimonial-form');
  const grid = document.getElementById('testimonios-grid');

  if (form && grid) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const nombre = document.getElementById('nombre').value.trim();
      const calificacion = document.querySelector('input[name="calificacion"]:checked')?.value || '5';
      const mensaje = document.getElementById('mensaje').value.trim();

      if (!nombre || !mensaje) {
        alert('Por favor completa todos los campos.');
        return;
      }

      const testimonio = {
        id: Date.now(),
        nombre,
        calificacion: parseInt(calificacion),
        mensaje,
        fecha: new Date().toISOString()
      };

      let testimonios = JSON.parse(localStorage.getItem('testimonios_clinaid') || '[]');
      testimonios.unshift(testimonio);
      localStorage.setItem('testimonios_clinaid', JSON.stringify(testimonios));

      form.reset();
      document.querySelector('.rating input[value="5"]').checked = true;
      renderTestimonios();
      renderCalificacionGlobal();

      document.querySelector('.section-testimonios').scrollIntoView({ behavior: 'smooth' });
    });
  }

  function renderTestimonios() {
    const testimonios = JSON.parse(localStorage.getItem('testimonios_clinaid') || '[]');
    const grid = document.getElementById('testimonios-grid');

    if (!grid) return;

    if (testimonios.length === 0) {
      grid.innerHTML = `
        <div class="testimonio-vacio">
          <i class="fa-regular fa-comment-dots"></i>
          <p>Aún no hay testimonios. ¡Sé el primero en compartir tu experiencia!</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = testimonios.map(t => {
      const fecha = new Date(t.fecha).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      const estrellas = '★'.repeat(t.calificacion) + '☆'.repeat(5 - t.calificacion);
      return `
        <div class="testimonio-card">
          <div class="testimonio-header">
            <div>
              <div class="testimonio-nombre">${t.nombre}</div>
              <div class="testimonio-fecha">${fecha}</div>
            </div>
          </div>
          <div class="testimonio-estrellas">${estrellas}</div>
          <div class="testimonio-mensaje">"${t.mensaje}"</div>
        </div>
      `;
    }).join('');
  }

  function renderCalificacionGlobal() {
    const testimonios = JSON.parse(localStorage.getItem('testimonios_clinaid') || '[]');
    const total = testimonios.length;

    const promedioEl = document.getElementById('calificacion-promedio');
    const estrellasEl = document.getElementById('estrellas-promedio');
    const totalEl = document.getElementById('total-testimonios');
    const distribucionEl = document.getElementById('distribucion-estrellas');

    if (!promedioEl || !estrellasEl || !totalEl || !distribucionEl) return;

    if (total === 0) {
      promedioEl.textContent = '—';
      estrellasEl.innerHTML = '☆☆☆☆☆';
      totalEl.innerHTML = 'Basado en <span>0</span> testimonios';
      distribucionEl.innerHTML = '';
      return;
    }

    const suma = testimonios.reduce((acc, t) => acc + t.calificacion, 0);
    const promedio = suma / total;
    const promedioRedondeado = Math.round(promedio * 10) / 10;

    promedioEl.textContent = promedioRedondeado;

    let estrellasHTML = '';
    for (let i = 1; i <= 5; i++) {
      estrellasHTML += i <= Math.round(promedio) ? '★' : '☆';
    }
    estrellasEl.innerHTML = estrellasHTML;

    totalEl.innerHTML = `Basado en <span>${total}</span> testimonios`;

    const counts = [0, 0, 0, 0, 0];
    testimonios.forEach(t => {
      if (t.calificacion >= 1 && t.calificacion <= 5) {
        counts[t.calificacion - 1]++;
      }
    });

    const maxCount = Math.max(...counts);
    let distribucionHTML = '';
    for (let i = 5; i >= 1; i--) {
      const count = counts[i-1];
      const porcentaje = total > 0 ? Math.round((count / total) * 100) : 0;
      const ancho = maxCount > 0 ? (count / maxCount) * 100 : 0;
      distribucionHTML += `
        <div class="barra-estrella">
          <div class="label">${i}★</div>
          <div class="barra">
            <div class="progreso" style="width: ${ancho}%"></div>
          </div>
          <div class="porcentaje">${porcentaje}%</div>
        </div>
      `;
    }
    distribucionEl.innerHTML = distribucionHTML;
  }

  // Inicializar
  renderTestimonios();
  renderCalificacionGlobal();
});

// Escucha el clic del botón de búsqueda
document.getElementById("search-btn").addEventListener("click", buscar);

// Permite buscar presionando Enter dentro del input
document.getElementById("search-input").addEventListener("keypress", function(e) {
  if (e.key === "Enter") buscar();
});


// =========================
// FUNCIÓN PRINCIPAL DE BÚSQUEDA
// =========================
function buscar() {

  // Obtener lo que escribió el usuario
  let query = document.getElementById("search-input").value.toLowerCase().trim();

  // Si el campo está vacío, no hacer nada
  if (query === "") return;

  // -----------------------------
  // COMPARAR PALABRAS CLAVE
  // Y REDIRIGIR A LAS PÁGINAS
  // -----------------------------

  // Ir a Inicio
  if (query.includes("inicio") || query.includes("home")) {
    window.location.href = "../HTML/index.html";
  }

  // Ir a Sobre Nosotros
  else if (query.includes("nosotros") || query.includes("sobre")) {
    window.location.href = "../HTML/sobreNosotros.html";
  }

  // Ir a Testimonios
  else if (query.includes("testimonio") || query.includes("opiniones")) {
    window.location.href = "../HTML/testimonios.html";
  }

  // Ir a Servicios
  else if (query.includes("servicio") || query.includes("tratamiento")) {
    window.location.href = "../HTML/servicios.html";
  }

  // Ir a Contacto (sección dentro de index)
  else if (
    query.includes("contacto") ||
    query.includes("numero") ||
    query.includes("número") ||
    query.includes("telefono") ||
    query.includes("teléfono")
  ) {
    window.location.href = "../HTML/index.html#contactanos";
  }

  // Si no coincide con nada
  else {
    alert("No se encontró ninguna sección con esa búsqueda.");
  }
}

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