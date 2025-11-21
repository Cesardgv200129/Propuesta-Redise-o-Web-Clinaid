// ======================== MENÚ MÓVIL ========================
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

// ======================== AÑO EN FOOTER ========================
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ======================== FUNCIONALIDAD DE BÚSQUEDA ========================
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');

if (searchBtn && searchInput) {
  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();
    if (query) {
      buscarEspecialista(query);
    } else {
      mostrarTodos();
    }
  });

  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim().toLowerCase();
      if (query) {
        buscarEspecialista(query);
      } else {
        mostrarTodos();
      }
    }
  });

  // Limpiar búsqueda al borrar el input
  searchInput.addEventListener('input', (e) => {
    if (e.target.value.trim() === '') {
      mostrarTodos();
    }
  });
}

function buscarEspecialista(query) {
  const cards = document.querySelectorAll('.card-especialista');
  let encontrado = false;
  let primerResultado = null;

  cards.forEach(card => {
    const nombre = card.querySelector('.nombre').textContent.toLowerCase();
    const especialidades = Array.from(card.querySelectorAll('.especialidad'))
      .map(el => el.textContent.toLowerCase())
      .join(' ');

    if (nombre.includes(query) || especialidades.includes(query)) {
      card.style.display = 'grid';
      encontrado = true;
      
      // Guardar el primer resultado para hacer scroll
      if (!primerResultado) {
        primerResultado = card;
      }
    } else {
      card.style.display = 'none';
    }
  });

  if (!encontrado) {
    alert('No se encontraron especialistas que coincidan con la búsqueda: "' + query + '"');
    mostrarTodos();
  } else if (primerResultado) {
    // Scroll suave al primer resultado
    setTimeout(() => {
      primerResultado.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }
}

function mostrarTodos() {
  const cards = document.querySelectorAll('.card-especialista');
  cards.forEach(card => {
    card.style.display = 'grid';
  });
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