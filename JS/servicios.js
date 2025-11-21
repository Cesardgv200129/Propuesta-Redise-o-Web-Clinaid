/* =========================================================
   📁 servicios.js — Lógica de la página Servicios (CORREGIDO)
   Autor: CLINAID
   Descripción:
   - Menú responsive
   - Scroll suave
   - Año automático en footer
   - Modal overlay para servicios
   - Botones "Ver más" inteligentes en procedimientos
   - Animaciones al hacer scroll
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
   🔹 6. MODAL OVERLAY PARA SERVICIOS
   ========================================================= */

// Crear el overlay modal dinámicamente
function crearModalOverlay() {
  if (document.getElementById('modal-overlay')) return;
  
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-content" id="modal-content">
      <button class="modal-close" id="modal-close">&times;</button>
      <div id="modal-body"></div>
    </div>
  `;
  document.body.appendChild(overlay);
}

// Abrir modal con contenido
function abrirModal(contenido) {
  const overlay = document.getElementById('modal-overlay');
  const modalBody = document.getElementById('modal-body');
  
  if (!overlay) crearModalOverlay();
  
  modalBody.innerHTML = contenido;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // Evitar scroll del body
}

// Cerrar modal
function cerrarModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // Restaurar scroll del body
  }
}

// Inicializar modal al cargar la página
window.addEventListener('load', () => {
  crearModalOverlay();
  
  // Event listener para cerrar modal
  const closeBtn = document.getElementById('modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', cerrarModal);
  }
  
  // Cerrar modal al hacer click fuera del contenido
  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        cerrarModal();
      }
    });
  }
  
  // Cerrar modal con tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      cerrarModal();
    }
  });
});

/* =========================================================
   🔹 7. AGREGAR BOTONES "VER MÁS" A SERVICIOS CON TEXTO LARGO
   ========================================================= */

// Datos completos de cada servicio
const serviciosCompletos = {
  1: {
    icono: 'fa-user-doctor',
    titulo: 'Consulta Externa Especializada en Dolor y Cuidados Paliativos',
    contenido: `
      <p>Valoración de pacientes ambulatorios con dolor crónico benigno, dolor oncológico y cuidado paliativo.</p>
      <p class="detalle-adicional"><strong>Duración:</strong> Primera vez 30 minutos, controles 20 minutos.</p>
      <div class="destacado">
        <i class="fa-solid fa-certificate"></i>
        <p>Contamos con el único especialista de la región certificado por el instituto mundial del Dolor FIPP, WIP.</p>
      </div>
    `
  },
  2: {
    icono: 'fa-syringe',
    titulo: 'Consulta Externa Especializada de Anestesiología',
    contenido: `
      <p>Valoración preanestésica de pacientes ambulatorios.</p>
    `
  },
  3: {
    icono: 'fa-hand',
    titulo: 'Consulta Externa Especializada de Cirugía de Mano',
    contenido: `
      <p>Consulta especializada Cirugía de Mano y Miembro Superior, valoración integral a problemas degenerativos de la mano.</p>
    `
  },
  4: {
    icono: 'fa-heartbeat',
    titulo: 'Intervencionismo Analgésico',
    contenido: `
      <p>Procedimientos intervencionistas con el fin de lograr alivio del dolor severo de cualquier origen, según criterio médico.</p>
      <p class="detalle-adicional">Dichos procedimientos derivados de la consulta externa se realizarán en salas de cirugía o sala de procedimientos de dolor, según aplique con fluoroscopia o ecografía y radiofrecuencia (disponibilidad del equipo).</p>
      <div class="estadistica">
        <i class="fa-solid fa-chart-line"></i>
        <p>Se estima el 25% a 30% de pacientes valorados en la consulta externa requerirán procedimientos analgésicos.</p>
      </div>
    `
  },
  5: {
    icono: 'fa-pills',
    titulo: 'Servicio Farmacéutico',
    contenido: `
      <p>Medicamentos especializados para manejo del dolor y medicamentos de control especial.</p>
    `
  }
};

// Identificar servicios que necesitan botón "Ver Más"
const serviciosConBoton = [1, 4];

// Agregar botones "Ver Más" dinámicamente
window.addEventListener('load', () => {
  const servicios = document.querySelectorAll('.servicio-item');
  
  servicios.forEach((servicio, index) => {
    const servicioId = index + 1;
    
    if (serviciosConBoton.includes(servicioId)) {
      const boton = document.createElement('button');
      boton.className = 'btn-ver-detalle';
      boton.textContent = 'Ver más...';
      boton.addEventListener('click', () => {
        const data = serviciosCompletos[servicioId];
        const contenidoModal = `
          <div class="servicio-icono">
            <i class="fa-solid ${data.icono}"></i>
          </div>
          <h3>${data.titulo}</h3>
          ${data.contenido}
        `;
        abrirModal(contenidoModal);
      });
      servicio.appendChild(boton);
    }
  });
});

/* =========================================================
   🔹 8. ANIMACIONES AL HACER SCROLL
   ========================================================= */

// Función para detectar cuando un elemento entra en el viewport
function handleScrollAnimation() {
  const elementos = document.querySelectorAll('.servicio-item, .categoria-contenido, .imagen-irregular-nueva');
  
  elementos.forEach(elemento => {
    const elementTop = elemento.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 100) {
      elemento.style.opacity = '1';
      if (elemento.classList.contains('servicio-item')) {
        elemento.style.transform = 'translateY(0)';
      } else if (elemento.classList.contains('categoria-contenido')) {
        elemento.style.transform = 'translateX(0)';
      } else if (elemento.classList.contains('imagen-irregular-nueva')) {
        elemento.style.opacity = '1';
      }
    }
  });
}

// Configurar estilos iniciales para animación
window.addEventListener('load', () => {
  const servicios = document.querySelectorAll('.servicio-item');
  const procedimientos = document.querySelectorAll('.categoria-contenido');
  const imagenes = document.querySelectorAll('.imagen-irregular-nueva');
  
  servicios.forEach((elemento, index) => {
    elemento.style.opacity = '0';
    elemento.style.transform = 'translateY(30px)';
    elemento.style.transition = `all 0.6s ease ${index * 0.1}s`;
  });
  
  procedimientos.forEach((elemento, index) => {
    elemento.style.opacity = '0';
    elemento.style.transform = 'translateX(-30px)';
    elemento.style.transition = `all 0.7s ease ${index * 0.15}s`;
  });
  
  imagenes.forEach((elemento, index) => {
    elemento.style.opacity = '0';
    elemento.style.transition = `opacity 0.7s ease ${index * 0.15}s`;
  });
  
  setTimeout(handleScrollAnimation, 100);
});

window.addEventListener('scroll', handleScrollAnimation);

/* =========================================================
   🔹 9. LAZY LOADING PARA IMÁGENES
   ========================================================= */
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  const images = document.querySelectorAll('.imagen-irregular-nueva');
  images.forEach(img => imageObserver.observe(img));
}

/* ... (todo igual hasta la sección de procedimientos) ... */

/* =========================================================
   🔹 10. BOTONES "VER MÁS" EN PROCEDIMIENTOS (CORREGIDO Y FIJO)
   ========================================================= */

// Contenido exacto para los modales (con viñetas • y texto íntegro)
const procedimientosCompletos = {
  'toracica-lumbosacra': {
    titulo: 'Región Torácica y Lumbosacra',
    contenido: `
      <ul>
        <li>Bloqueo y Radiofrecuencia ganglio de Gasser y esfenopalatino.</li>
        <li>Bloqueo y radiofrecuencia de Nervios glosofaríngeo y ramas terminales del trigémino.</li>
        <li>Bloqueo y radiofrecuencia de Nervios Occipital mayor, menor y tercer nervio occipital.</li>
        <li>Inyección diagnóstica de ramo mediano dorsal.</li>
        <li>Inyección epidural translaminar.</li>
        <li>Inyección periradicular por ecografía.</li>
        <li>Denervación por radiofrecuencia de ramo mediano dorsal.</li>
        <li>Bloqueo simpático de ganglio estrellado.</li>
        <li>Inyección epidural translaminar y transforaminal.</li>
        <li>Inyección diagnóstica de ramo mediano dorsal.</li>
        <li>Inyección articulaciones facetarias.</li>
        <li>Denervación por radiofrecuencia de ramo mediano dorsal.</li>
        <li>Radiofrecuencia pulsada de Ganglio de la raíz Dorsal.</li>
        <li>Discografía Diagnóstica.</li>
        <li>Bloqueo simpático torácico o lumbares.</li>
        <li>Bloqueo y denervación por radiofrecuencia de Nervios esplácnicos.</li>
        <li>Bloqueo y neurolisis del plexo celiaco o hipogástrico.</li>
        <li>Bloqueo y neurolisis del ganglio impar o Walter.</li>
        <li>Adhesiolisis percutánea mecánica o química.</li>
      </ul>
    `
  },
  dispositivos: {
    titulo: 'Dispositivos Implantables',
    contenido: `
      <ul>
        <li>Implantación, programación y manejo de neuroestimulación espinal cervical, torácica y lumbar.</li>
        <li>Implantación, programación y manejo de bombas programables para infusión de fármacos intratecales.</li>
      </ul>
      <div class="nota-medica">
        <i class="fa-solid fa-info-circle"></i>
        <strong>NOTA:</strong> Todos los dispositivos implantables son realizados por dos intervencionistas algesiologos debidamente titulados en el país, con instalaciones idóneas.
      </div>
    `
  },
  musculoesqueletico: {
    titulo: 'Musculoesquelético y Analgesia Regional',
    contenido: `
      <ul>
        <li>Bloqueo y radiofrecuencia de nervios periféricos: supraescapular, occipital, ilioinguinal, intercostal, genitofemoral, safeno, geniculados, etc.</li>
        <li>Colocación catéteres perineurales para infusión continua.</li>
        <li>Inyección de articulaciones, bursas y uniones tendinosas de hombro, codo, cadera, rodilla.</li>
        <li>Inyección y radiofrecuencia de articulación sacroilíaca.</li>
        <li>Inyección musculo Piriforme.</li>
        <li>Inyección de puntos miofasciales.</li>
        <li>Inyección de toxina botulínica e fenolizaciones de puntos unión mioneural.</li>
        <li>Bloqueo de cicatrices y neuroma.</li>
        <li>Terapia regenerativa articular, columna vertebral, musculoesquelética – ligamentaria.</li>
      </ul>
    `
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Solo activar listeners en botones existentes
  document.querySelectorAll('.btn-ver-mas').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.dataset.modalId;
      const data = procedimientosCompletos[id];
      
      if (data) {
        const contenido = `
          <h3><i class="fa-solid fa-check-circle"></i> ${data.titulo}</h3>
          ${data.contenido}
        `;
        abrirModal(contenido);
        document.getElementById('modal-overlay').classList.add('modal-procedimiento');
      }
    });
  });

  // Limpiar clase al cerrar modal
  const originalCerrarModal = cerrarModal;
  window.cerrarModal = function() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.classList.remove('modal-procedimiento');
    originalCerrarModal();
  };
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