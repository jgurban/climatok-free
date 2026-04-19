

/* ===== Extracted from inline <script> blocks (no src) ===== */

function translateInfoPanelIfNeeded() {
  const IS_ES = ((navigator.languages && navigator.languages[0]) || navigator.language || "")
    .toLowerCase()
    .startsWith("es");

  if (!IS_ES) return;

  const el = document.querySelector('[data-translatable-info]');
  if (!el) return;

  el.innerHTML = `
<div class="info-actions">
  <button id="go-premium-button" class="premium-button">
    Prueba Premium GRATIS 3 días
  </button>
</div>

<h3>Información Meteorológica Global</h3>
<p>Esta plataforma muestra datos meteorológicos con:</p>
<ul>
<li>🗓️ Previsión de Alta Resolución 4 días</li>
<li>🗓️ Previsión hasta 14 días</li>
<li>⏱️ Actualizaciones cada 6 horas</li>
<li>🌍 Cobertura global con zoom local</li>
<li>📊 Capas disponibles:
  <ul>
<li>- Previsión alta resolución 4 días</li>
<li>- Precipitación</li>
<li>- Radar de precipitación</li>
<li>- Aire frío: Temperatura 500mb</li>
<li>- Altura geopotencial 500mb</li>
<li>- Agua precipitable</li>
<li>- Velocidad maxima del viento</li>
<li>- Jet Stream</li>
<li>- Presión atmosférica</li>
<li>- Tormentas</li>
<li>- Nubosidad total</li>
<li>- Humedad relativa</li>
<li>- Espesor de nieve</li>
  </ul>
</li>
</ul>

<p>🔍 Haz clic en cualquier punto del mapa para ver valores exactos.</p>

<p>
<a href="https://www.nco.ncep.noaa.gov/pmb/products/gfs/" target="_blank">Modelo NOAA/GFS</a>
</p>

<p>🚀 Próximamente: más modelos y capas: ECMWF, AROME, ARPEGE, CMEMS, HRRR y MFWAM</p>

<hr style="border:none;border-top:1px solid rgba(255,255,255,0.18);margin:12px 0;">

<p style="margin:8px 0;font-size:13px;opacity:0.9;">
  <strong>Legal</strong><br>
  <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank">Términos de uso (EULA)</a>
  <span style="opacity:0.7;"> · </span>
  <a href="https://www.climatok.net/privacy" target="_blank">Política de privacidad</a>
</p>
`;
}

// ===== i18n Premium (ES/EN) =====
const I18N = {
  en: {
    premium_active: "ClimaTok Premium active",
    upgrade_premium: "Upgrade to ClimaTok Premium",
    premium_overlay_info: "Unlock 14-day forecasts with ClimaTok Premium. Try Premium FREE for 3 days. No charge today · Cancel anytime.",
    premium_overlay_settings: "Try Premium FREE for 3 days. No charge today · Cancel anytime",
    premium_overlay_short: "Try Premium FREE for 3 days",
  },
  es: {
    premium_active: "ClimaTok Premium activo",
    upgrade_premium: "Mejorar a ClimaTok Premium",
    premium_overlay_info: "Desbloquea previsiones de 14 días con ClimaTok Premium. Prueba Premium GRATIS 3 días. No se cobra hoy · Cancela cuando quieras",
    premium_overlay_settings: "Prueba Premium GRATIS 3 días. No se cobra hoy · Cancela cuando quieras",
    premium_overlay_short: "Prueba Premium GRATIS 3 días",
  }
};

function t(key){
  return (IS_ES ? I18N.es[key] : I18N.en[key]) || (I18N.en[key] || key);
}

// === i18n básico (ES vs EN) ===
// OJO: desde JS en web NO puedes saber el idioma por IP de forma fiable.
// Lo correcto es usar el idioma del navegador.
const UI_LOCALE = (() => {
  const l = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
  return /^es\b/i.test(l) ? 'es-ES' : 'en-US';
})();

function formatHeaderDate(dateObj) {
  // Ajusta aquí el estilo exacto de fecha/hora
  const opts = {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };
  return new Intl.DateTimeFormat(UI_LOCALE, opts).format(dateObj);
}

function setHeaderTimeLabel(dateObj) {
  const text = formatHeaderDate(dateObj);

  const elLocal = document.getElementById('local-datetime');
  if (elLocal) elLocal.innerText = text;

  const elTime = document.getElementById('time-text');
  if (elTime) elTime.innerText = text;

  const elTop = document.getElementById('time-text-top');
  if (elTop) elTop.innerText = text;
}

// ===== Traducción básica SOLO botones capas =====
const IS_ES = ((navigator.languages && navigator.languages[0]) || navigator.language || "")
  .toLowerCase()
  .startsWith("es");

function translateLayerButtonsIfNeeded() {
  if (!IS_ES) return;

  const map = {
    detailprecipitation: "Precipitación AR",
    detailradar: "Radar AR",
    detailwind: "Viento AR",
    detailtemperature: "Temperatura AR",
    detailpressure: "Presión AR",

    // precipitation_noaa: "Precipitación acumulada 3h",
    radar_noaa: "Radar de precipitación",
    temp500mb_noaa: "Aire frío 500mb",
    instability_noaa: "DANAS - Geopotencial a 500mb",
    precipitable_noaa: "Agua precipitable",
    wind_noaa: "Velocidad maxima del viento",
    windgust: "Jet Stream",
    pressure_noaa: "Presión atmosférica",
    cape_noaa: "Tormentas",
    cloudcover_noaa: "Nubosidad",
    relativehumidity_noaa: "Humedad relativa",
    snowdepth_noaa: "Espesor de nieve",
  };

  Object.entries(map).forEach(([id, text]) => {
    const el = document.getElementById(id);
    if (!el) return;

    // Mantiene el icono <i> y solo cambia el texto
    const icon = el.querySelector("i");
    el.innerHTML = "";
    if (icon) el.appendChild(icon);
    el.insertAdjacentText("beforeend", " " + text);
  });
}




/* ---- script block 1 ---- */
window.__onAppBecameActive = () => {
      if (rendererLost || gl?.isContextLost?.()) {
        recreateRenderer();
      }
    };


    const DETAIL_LAYERS_NO_OVERLAY = new Set([
  // 'detailprecipitation',
  // 'detailradar',
  // 'detailwind',
  // 'detailtemperature'
]);

let overlayPrevDatasetId = null;

function isDetailLayer(id){
  return DETAIL_LAYERS_NO_OVERLAY.has(id);
}

function setOverlayAvailabilityForBaseLayer(baseLayerId){
  const overlayContainer = document.getElementById('overlay-container');

  if (isDetailLayer(baseLayerId)) {
    // guarda lo que hubiera
    if (overlayDatasetId) overlayPrevDatasetId = overlayDatasetId;

    // fuerza None
    overlayDatasetId = null;
    try { cloudVisible = false; } catch(_) {}

    // borra la capa overlay visualmente
    try { clearCloudLayer?.(); } catch(_) {}
    try { window.applyCombinedLayers?.(); } catch(_) {}
    try { window.map?.triggerRepaint?.(); } catch(_) {}

    // UI: no mostrar opción overlay
    if (overlayContainer) overlayContainer.style.display = 'none';

    // si tienes helper de texto/icono:
    try { setOverlayButtonUI?.({label:'None', icon:'fa-ban'}); } catch(_) {}
    return;
  }

  // capa normal -> vuelve overlay
  if (overlayContainer) overlayContainer.style.display = '';

  // opcional: restaurar el overlay anterior automáticamente
  if (overlayPrevDatasetId) {
    overlayDatasetId = overlayPrevDatasetId;
    try { cloudVisible = true; } catch(_) {}
    try { window.updateCloud ? window.updateCloud(true) : updateCloud(true); } catch(_) {}
    try { window.applyCombinedLayers?.(); } catch(_) {}
    try { window.map?.triggerRepaint?.(); } catch(_) {}
  } else {
    // si no quieres restaurar, déjalo en None
    // overlayDatasetId = null;
  }
}


// === Overlay (2ª capa) selector ===
let overlayDatasetId = null;

const OVERLAY_OPTIONS = [
  { id: null,                                       label: 'None' },
  { id: 'gfs/precipitation_3h_accumulation_surface', label: 'Rain (3h)' },
  { id: 'gfs/cloud_cover_entire_atmosphere',         label: 'Clouds' },
  { id: 'gfs/reflectivity_1000m_above_ground',       label: 'Radar' },
  { id:   'gfs/snow_depth_surface',       label: 'Snow' },
  { id:   'gfs/temperature_500mb',       label: 'Cold Air' },
   { id:   'gfs/pressure_mean_sea_level',       label: 'Air Pressure' },
   
];

function setOverlayButtonLabel(label){
  const el = document.getElementById('selected-overlay-text');
  if (el) el.textContent = `Overlay: ${label || 'None'}`;
}

function closeOverlayMenu(){
  const container = document.getElementById('overlay-container');
  const toggle = document.getElementById('toggle-overlay');
  if (container) container.classList.remove('open');
  if (toggle) toggle.setAttribute('aria-expanded', 'false');
}

function openOverlayMenu(){
  const container = document.getElementById('overlay-container');
  const toggle = document.getElementById('toggle-overlay');
  if (container) container.classList.add('open');
  if (toggle) toggle.setAttribute('aria-expanded', 'true');
}



function buildOverlayMenu(){
  const ul = document.getElementById('overlay-buttons');
  if (!ul) return;

  ul.innerHTML = '';

  OVERLAY_OPTIONS.forEach(opt => {
    const li = document.createElement('li');
    li.textContent = opt.label;

    if (opt.id === overlayDatasetId) li.classList.add('active');


    li.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();

      overlayDatasetId = opt.id;
      setOverlayButtonLabel(opt.label);

      // marcar active
      ul.querySelectorAll('li').forEach(x => x.classList.remove('active'));
      li.classList.add('active');

      // aplicar overlay
      if (!overlayDatasetId) {
        try { cloudVisible = false; } catch(_) {}
        try { clearCloudLayer?.(); } catch(_) {}              // <-- CLAVE: borra la layer
        try { window.applyCombinedLayers?.(); } catch(_) {}
        try { window.map?.triggerRepaint?.(); } catch(_) {}
        closeOverlayMenu();
        return;
      }

      try { cloudVisible = true; } catch(_) {}

      try {
        // updateCloud existe en tu archivo (async function updateCloud...)
        // pero por seguridad la llamamos desde window si quieres exponerla luego
        await (window.updateCloud ? window.updateCloud(true) : updateCloud(true));
      } catch (err) {
        console.warn('[Overlay] updateCloud failed', err);
      }

      try { window.applyCombinedLayers?.(); } catch(_) {}
      try { window.map?.triggerRepaint?.(); } catch(_) {}
      try { window.deckgl?.redraw?.(true); } catch(_) {}

      closeOverlayMenu();
    });

    ul.appendChild(li);
  });
}

function initOverlayUI(){
  const container = document.getElementById('overlay-container');
  const toggle = document.getElementById('toggle-overlay');
  const ul = document.getElementById('overlay-buttons');
  if (!container || !toggle || !ul) return;

  toggle.setAttribute('aria-haspopup', 'true');
  toggle.setAttribute('aria-expanded', 'false');

  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const open = !container.classList.contains('open');
    if (open) openOverlayMenu();
    else closeOverlayMenu();
  });

  // click fuera -> cerrar
  document.addEventListener('click', (e) => {
    if (!container.classList.contains('open')) return;
    if (!container.contains(e.target)) closeOverlayMenu();
  });

  // Escape -> cerrar
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && container.classList.contains('open')) {
      closeOverlayMenu();
      toggle.focus();
    }
  });

  // default
  overlayDatasetId = null;
  setOverlayButtonLabel('None');
  buildOverlayMenu();
}

const OVERLAY_ENABLED = false;
if (OVERLAY_ENABLED) initOverlayUI();







  (function(){
  const container = document.getElementById('layers-container');
  const toggle = document.getElementById('toggle-layers');
  const panel = document.getElementById('buttons');








  if (!container || !toggle || !panel) return;

  // Estado accesible
  toggle.setAttribute('aria-haspopup', 'true');
  toggle.setAttribute('aria-expanded', 'false');

  // Abre/cierra al pulsar
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = !container.classList.contains('open');
    container.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });

  // Cerrar al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (!container.classList.contains('open')) return;
    if (!container.contains(e.target)) {
      container.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && container.classList.contains('open')) {
      container.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });

  // Opcional: al abrir, llevar el scroll al principio
  const obs = new MutationObserver(() => {
    if (container.classList.contains('open')) panel.scrollTop = 0;
  });
  obs.observe(container, { attributes: true, attributeFilter: ['class'] });
})();


 let dataModel = 'GFS';

  (function () {
  const layersContainer = document.getElementById('layers-container');
  const buttonsList     = document.getElementById('buttons');
  const toggleBtn       = document.getElementById('toggle-layers');
  const layersIconSpan  = document.getElementById('layers-icon');
  const layerTextSpan   = document.getElementById('selected-layer-text');

  if (!layersContainer || !buttonsList) return;

  function updateToggleFromItem(item) {
    if (!layersIconSpan || !layerTextSpan || !item) return;

    // 1) Icono: clonamos el <i> del <li> y lo ponemos en #layers-icon
    const icon = item.querySelector('i');
    layersIconSpan.innerHTML = '';
    if (icon) {
      const cloned = icon.cloneNode(true);
      cloned.style.marginRight = '0'; // ya usamos gap en el botón
      layersIconSpan.appendChild(cloned);
    }

    // 2) Texto: usamos el texto del <li> sin espacios extra
    const text = item.textContent.replace(/\s+/g, ' ').trim();
    layerTextSpan.textContent = text || 'Layers';
  }
// 👇 Exponer helper para refrescar el pill desde fuera (init, i18n, etc.)
window.climatokRefreshLayerToggle = function () {
  const active =
    buttonsList.querySelector('#buttons > li.active') ||
    buttonsList.querySelector('#buttons > li');
  if (active) updateToggleFromItem(active);
};
  

  // Cierra el panel cuando se elige una capa
  buttonsList.addEventListener('click', (e) => {
    const item = e.target.closest('#buttons > li');
    if (!item) return;

    // Deja que ejecuten primero tus otros handlers (si los hay)
    requestAnimationFrame(() => {
      layersContainer.classList.remove('open');
      toggleBtn?.setAttribute('aria-expanded', 'false');

      // 🔹 Actualizar botón toggle con icono + texto de la capa elegida
      updateToggleFromItem(item);

      // Actualiza la disponibilidad GFS/ECMWF según la capa activa
      if (typeof updateModelSwitcherAvailability === 'function') {
        updateModelSwitcherAvailability();
      }
    });
  });

  // Opcional: al cargar, puedes inicializar el botón con la primera capa
  const firstItem = buttonsList.querySelector('#buttons > li');
  if (firstItem) {
    updateToggleFromItem(firstItem);
  }

  // ... resto de tu código (keydown para Enter/Espacio, etc.)
})();


  // ===== Capas visibles según modelo =====

// Guardamos la lista completa de botones de capas
const ALL_LAYER_BUTTONS = Array.from(
  document.querySelectorAll('#buttons > li')
);


// MetaDatos WL
const LOCAL_DATASET_META = {

   "gfs/temperature_2m": {
  title: "Temperature",
  attribution: "<a href=\"https://www.nco.ncep.noaa.gov/pmb/products/gfs/\">NOAA / GFS</a> via <a href=\"https://weatherlayers.com\">WeatherLayers</a>",
  unitFormat: { unit: "°F", offset: -273.15 },
  units: {
      METRIC:        { unit: "°C", scale: 1.0 },
      METRIC_KMH:    { unit: "°C", scale: 1.0 },
      IMPERIAL:      { unit: "°F",  scale: 1.0 }
    
    },
  palette: [
    [218.15, [204,235,255]],
    [228.15, [179,205,227]],
    [235.65, [140,150,198]],
    [240.65, [140,150,198]],
    [245.65, [136, 86,167]],
    [250.65, [129, 15,124]],
    [254.15, [  8, 29, 88]],
    [256.15, [ 19, 39,120]],
    [258.15, [ 37, 52,148]],
    [260.15, [ 35, 71,158]],
    [262.15, [ 34, 92,167]],
    [264.15, [ 31,118,180]],
    [266.15, [ 29,145,192]],
    [268.15, [ 44,167,197]],
    [270.15, [ 67,181,197]],
    [272.15, [ 99,200,197]],
    [274.15, [127,205,187]],
    [276.15, [152,220,166]],
    [278.15, [199,233,180]],
    [280.15, [220,242,198]],
    [282.15, [237,248,217]],
    [284.15, [245,252,211]],
    [286.15, [252,255,204]],
    [288.15, [255,249,182]],
    [290.15, [255,237,160]],
    [292.15, [255,228,139]],
    [294.15, [254,217,118]],
    [296.15, [254,199, 97]],
    [298.15, [254,178, 76]],
    [300.15, [254,160, 68]],
    [302.15, [253,141, 60]],
    [304.15, [253,110, 51]],
    [306.15, [252, 78, 42]],
    [308.15, [242, 49, 32]],
    [310.15, [227, 26, 28]],
    [312.15, [210, 11, 32]],
    [314.15, [189,  0, 38]],
    [316.15, [159,  0, 39]],
    [318.15, [115,  0, 31]],
    [320.15, [ 76,  0, 25]],
    [322.15, [ 25,  0, 13]],
    [324.15, [ 76,  0,153]],
    [326.15, [204,  0,204]]
  ]
},


  "gfs/temperature_2m_above_ground": {
  title: "Temperature",
  attribution: "<a href=\"https://www.nco.ncep.noaa.gov/pmb/products/gfs/\">NOAA / GFS</a> via <a href=\"https://weatherlayers.com\">WeatherLayers</a>",
  unitFormat: { unit: "°F", offset: -273.15 },
  units: {
      METRIC:        { unit: "°C", scale: 1.0 },
      METRIC_KMH:    { unit: "°C", scale: 1.0 },
      IMPERIAL:      { unit: "°F",  scale: 1.0 }
    
    },
  palette: [
    [218.15, [204,235,255]],
    [228.15, [179,205,227]],
    [235.65, [140,150,198]],
    [240.65, [140,150,198]],
    [245.65, [136, 86,167]],
    [250.65, [129, 15,124]],
    [254.15, [  8, 29, 88]],
    [256.15, [ 19, 39,120]],
    [258.15, [ 37, 52,148]],
    [260.15, [ 35, 71,158]],
    [262.15, [ 34, 92,167]],
    [264.15, [ 31,118,180]],
    [266.15, [ 29,145,192]],
    [268.15, [ 44,167,197]],
    [270.15, [ 67,181,197]],
    [272.15, [ 99,200,197]],
    [274.15, [127,205,187]],
    [276.15, [152,220,166]],
    [278.15, [199,233,180]],
    [280.15, [220,242,198]],
    [282.15, [237,248,217]],
    [284.15, [245,252,211]],
    [286.15, [252,255,204]],
    [288.15, [255,249,182]],
    [290.15, [255,237,160]],
    [292.15, [255,228,139]],
    [294.15, [254,217,118]],
    [296.15, [254,199, 97]],
    [298.15, [254,178, 76]],
    [300.15, [254,160, 68]],
    [302.15, [253,141, 60]],
    [304.15, [253,110, 51]],
    [306.15, [252, 78, 42]],
    [308.15, [242, 49, 32]],
    [310.15, [227, 26, 28]],
    [312.15, [210, 11, 32]],
    [314.15, [189,  0, 38]],
    [316.15, [159,  0, 39]],
    [318.15, [115,  0, 31]],
    [320.15, [ 76,  0, 25]],
    [322.15, [ 25,  0, 13]],
    [324.15, [ 76,  0,153]],
    [326.15, [204,  0,204]]
  ]
},


"gfs/reflectivity_1000m_above_ground": {
  title: "Reflectivity",
  attribution: "<a href=\"https://www.nco.ncep.noaa.gov/pmb/products/gfs/\">NOAA / GFS</a> via <a href=\"https://weatherlayers.com\">WeatherLayers</a>",
  unitFormat: { unit: "dBZ" },
  palette: [
    [ 0, [ 82, 71,141,  0]],
    [ 5, [ 83, 73,150]],
    [10, [ 76, 92,187]],
    [15, [ 65,146,184]],
    [20, [ 78,194, 98]],
    [25, [ 89,209, 67]],
    [30, [170,224, 66]],
    [35, [213,233, 57]],
    [40, [234,164, 62]],
    [45, [216, 83, 95]],
    [50, [169, 36, 98]],
    [55, [122, 22, 61]],
    [60, [255,255,255]]
  ]
},


  "gfs/wind_tropopause_noaa": {
    title: "Wind (tropopause)",
    imageType: "VECTOR",
    imageUnscale: { min: -128, max: 127 },   // como en WL
    unitFormat: {
      system: "METRIC",
      unit: "m/s",
      toDisplay: (ms) => ms,
      label: "m/s"
    },
    units: {
      METRIC:        { unit: "m/s", scale: 1.0 },
      METRIC_KMH:    { unit: "km/h", scale: 3.6 },
      IMPERIAL:      { unit: "mph",  scale: 2.23694 },
      NAUTICAL:      { unit: "kn",   scale: 1.943844 }
    },
    attribution: "NOAA / GFS (processed & hosted by ClimaTok)",
    palette: [[0,[246,246,246]],[1.2861,[239,248,253]],[3.8583,[204,240,254]],[6.4305,[156,219,252]],[9.0027,[172,255,167]],[11.5749,[126,222,120]],[15.17598,[230,230,117]],[21.09204,[255,125,75]],[28.80864,[229,39,13]],[37.03968,[153,0,0]],[46.2996,[127,0,160]],[56.5884,[255,100,127]],[66.8772,[255,255,255]]]
  },

   "gfs/wind_10m_above_ground": {
    title: "Wind (tropopause)",
    imageType: "VECTOR",
    imageUnscale: { min: -128, max: 127 },   // como en WL
    unitFormat: {
      system: "METRIC",
      unit: "m/s",
      toDisplay: (ms) => ms,
      label: "m/s"
    },
    units: {
      METRIC:        { unit: "m/s", scale: 1.0 },
      METRIC_KMH:    { unit: "km/h", scale: 3.6 },
      IMPERIAL:      { unit: "mph",  scale: 2.23694 },
      NAUTICAL:      { unit: "kn",   scale: 1.943844 }
    },
    attribution: "NOAA / GFS (processed & hosted by ClimaTok)",
    palette: [[0,[246,246,246]],[1.2861,[239,248,253]],[3.8583,[204,240,254]],[6.4305,[156,219,252]],[9.0027,[172,255,167]],[11.5749,[126,222,120]],[15.17598,[230,230,117]],[21.09204,[255,125,75]],[28.80864,[229,39,13]],[37.03968,[153,0,0]],[46.2996,[127,0,160]],[56.5884,[255,100,127]],[66.8772,[255,255,255]]]
  },

  "gfs/temperature_500mb": {
  title: "Temperature (500mb)",
  attribution: "<a href=\"https://www.nco.ncep.noaa.gov/pmb/products/gfs/\">NOAA / GFS</a> via <a href=\"https://weatherlayers.com\">WeatherLayers</a>",
  unitFormat: { unit: "°C", offset: -273.15 },
  units: {
      METRIC:        { unit: "°C", scale: 1.0 },
      METRIC_KMH:    { unit: "°C", scale: 1.0 },
      IMPERIAL:      { unit: "°F",  scale: 1.0 }
    
    },
  palette: [
    [218.15, [204,235,255]],
    [228.15, [179,205,227]],
    [235.65, [140,150,198]],
    [240.65, [140,150,198]],
    [245.65, [136, 86,167]],
    [250.65, [129, 15,124]],
    [254.15, [  8, 29, 88]],
    [256.15, [ 19, 39,120]],
    [258.15, [ 37, 52,148]],
    [260.15, [ 35, 71,158]],
    [262.15, [ 34, 92,167]],
    [264.15, [ 31,118,180]],
    [266.15, [ 29,145,192]],
    [268.15, [ 44,167,197]],
    [270.15, [ 67,181,197]],
    [272.15, [ 99,200,197]],
    [274.15, [127,205,187]],
    [276.15, [152,220,166]],
    [278.15, [199,233,180]],
    [280.15, [220,242,198]],
    [282.15, [237,248,217]],
    [284.15, [245,252,211]],
    [286.15, [252,255,204]],
    [288.15, [255,249,182]],
    [290.15, [255,237,160]],
    [292.15, [255,228,139]],
    [294.15, [254,217,118]],
    [296.15, [254,199, 97]],
    [298.15, [254,178, 76]],
    [300.15, [254,160, 68]],
    [302.15, [253,141, 60]],
    [304.15, [253,110, 51]],
    [306.15, [252, 78, 42]],
    [308.15, [242, 49, 32]],
    [310.15, [227, 26, 28]],
    [312.15, [210, 11, 32]],
    [314.15, [189,  0, 38]],
    [316.15, [159,  0, 39]],
    [318.15, [115,  0, 31]],
    [320.15, [ 76,  0, 25]],
    [322.15, [ 25,  0, 13]],
    [324.15, [ 76,  0,153]],
    [326.15, [204,  0,204]]
  ]
},
// "gfs/precipitation_3h_accumulation_surface": {
//   title: "Precipitation (3-hour accumulation)",
//   attribution: "<a href=\"https://www.nco.ncep.noaa.gov/pmb/products/gfs/\">NOAA / GFS</a> via <a href=\"https://weatherlayers.com\">WeatherLayers</a>",
//   unitFormat: { unit: "mm" },

//     units: {
//       METRIC:        { unit: "mm", scale: 1.0 },
//       METRIC_KMH:    { unit: "mm", scale: 1.0 },
//       IMPERIAL:      { unit: "in",  scale: 1.0 }
    
//     },
//   palette: [
//     [0.0,   [219,216,199,  0]],
//     [0.6,   [219,216,199]],
//     [1.5,   [220,255,200]],
//     [3.5,   [150,255,150]],
//     [7.5,   [100,255,255]],
//     [15.0,  [  1,200,255]],
//     [35.0,  [  0,100,255]],
//     [75.0,  [150,100,255]],
//     [125.0, [220,100,255]],
//     [175.0, [255,  0,255]],
//     [225.0, [255,255,255]]
//   ]
// },
"gfs/geopotential_height_500mb": {
  title: "Geopotential Height (500mb)",
  attribution: "<a href=\"https://www.nco.ncep.noaa.gov/pmb/products/gfs/\">NOAA / GFS</a> via <a href=\"https://weatherlayers.com\">WeatherLayers</a>",
  unitFormat: { unit: "dm", scale: 0.1 },
  palette: [
    [4725, [ 50, 50, 50]],
    [4755, [ 83, 83, 83]],
    [4785, [110,110,110]],
    [4815, [140,140,140]],
    [4845, [158,158,158]],
    [4875, [181,181,181]],
    [4905, [199,199,199]],
    [4935, [226,226,248]],
    [4965, [193,184,255]],
    [4995, [129,112,235]],
    [5025, [ 98, 88,222]],
    [5055, [ 70, 65,209]],
    [5085, [ 46, 44,162]],
    [5115, [ 37,109,231]],
    [5145, [ 40,131,241]],
    [5175, [ 61,151,245]],
    [5205, [ 80,165,245]],
    [5235, [152,207,252]],
    [5265, [181,251,171]],
    [5295, [151,238,142]],
    [5325, [ 80,236, 80]],
    [5355, [ 30,181, 30]],
    [5385, [ 15,160, 15]],
    [5415, [254,249,170]],
    [5445, [255,231,120]],
    [5475, [255,193, 60]],
    [5505, [255,161,  0]],
    [5535, [255, 96,  0]],
    [5565, [255, 50,  0]],
    [5595, [225, 20,  0]],
    [5640, [193,  0,  0]],
    [5685, [100, 60, 50]],
    [5715, [120, 80, 70]],
    [5745, [140,100, 90]],
    [5775, [161,120,110]],
    [5805, [181,141,131]],
    [5835, [200,160,150]],
    [5865, [225,191,181]],
    [5895, [245,161,161]],
    [5925, [229,130,130]],
    [5955, [215, 80, 80]],
    [5985, [181, 40, 40]],
    [6015, [159, 31, 28]]
  ]
},
"gfs/precipitable_water_entire_atmosphere": {
  title: "Total Precipitable Water",
  attribution: "<a href=\"https://www.nco.ncep.noaa.gov/pmb/products/gfs/\">NOAA / GFS</a> via <a href=\"https://weatherlayers.com\">WeatherLayers</a>",
  unitFormat: { unit: "kg/m^2" },
  palette: [
    [0.0,     [201,201,201]],
    [0.254,   [201,201,201]],
    [0.762,   [179,179,179]],
    [1.397,   [159,159,159]],
    [2.159,   [141,141,141]],
    [3.175,   [120,120,120]],
    [4.445,   [100,100,100]],
    [5.715,   [ 80, 80, 80]],
    [6.985,   [ 60, 60, 60]],
    [8.255,   [ 88, 66, 32]],
    [9.525,   [114, 86, 48]],
    [10.795,  [133,102, 60]],
    [12.065,  [157,122, 76]],
    [13.335,  [176,138, 90]],
    [14.605,  [201,159,106]],
    [15.875,  [214,170,115]],
    [17.145,  [181,182,252]],
    [18.415,  [167,167,232]],
    [19.685,  [151,151,217]],
    [20.955,  [135,135,198]],
    [22.225,  [108,108,171]],
    [23.495,  [ 90, 90,151]],
    [24.765,  [ 70, 70,129]],
    [26.035,  [  0,100,100]],
    [27.305,  [ 20,110, 90]],
    [28.575,  [ 40,122, 78]],
    [29.845,  [ 58,135, 68]],
    [31.75,   [ 90,153, 52]],
    [34.29,   [114,165, 40]],
    [36.83,   [139,179, 28]],
    [39.37,   [159,159, 78]],
    [41.91,   [173,173, 68]],
    [44.45,   [197,197, 48]],
    [46.99,   [217,217, 30]],
    [49.53,   [239,239, 14]],
    [51.7525, [233,110, 88]],
    [53.6575, [201, 82, 68]],
    [55.5625, [175, 62, 54]],
    [57.4675, [151, 40, 40]],
    [59.3725, [135, 18, 26]],
    [61.2775, [120,  0, 12]],
    [63.1825, [118,  0,118]],
    [65.0875, [141,  0,141]],
    [66.9925, [177,  0,177]],
    [68.8975, [193,  0,193]],
    [70.8025, [219,  0,219]],
    [72.7075, [165,  0,219]],
    [74.93,   [120,  0,217]],
    [77.47,   [ 98,  0,219]],
    [80.01,   [ 60,  0,219]],
    [82.55,   [ 34,  0,219]],
    [85.09,   [  0, 38,219]],
    [87.63,   [  0, 76,219]],
    [90.17,   [  0,116,219]],
    [92.71,   [  0,155,219]]
  ]
},
"gfs/pressure_mean_sea_level": {
  title: "Mean Sea Level Pressure",
  attribution: "<a href=\"https://www.nco.ncep.noaa.gov/pmb/products/gfs/\">NOAA / GFS</a> via <a href=\"https://weatherlayers.com\">WeatherLayers</a>",
  unitFormat: { unit: "hPa" },
  palette: [
    [ 940, [238,238,238]],
    [ 948, [255, 51,255]],
    [ 956, [157, 19,157]],
    [ 964, [ 40, 29,102]],
    [ 973, [ 88, 82,163]],
    [ 981, [ 67,121,183]],
    [ 989, [ 80,173,131]],
    [ 997, [107,193, 83]],
    [1005, [195,212, 64]],
    [1013, [213,182, 61]],
    [1021, [212,134, 72]],
    [1030, [200, 73,109]],
    [1038, [158, 45, 90]],
    [1046, [109, 27, 50]],
    [1054, [ 47,  7,  8]],
    [1080, [ 47,  7,  8]]
  ]
},
"gfs/convective_available_potential_energy_surface": {
  title: "Convective Available Potential Energy",
  attribution: "<a href=\"https://www.nco.ncep.noaa.gov/pmb/products/gfs/\">NOAA / GFS</a> via <a href=\"https://weatherlayers.com\">WeatherLayers</a>",
  unitFormat: { unit: "J/kg" },
  palette: [
    [0,    [233,233,233,  0]],
    [75,   [233,233,233]],
    [125,  [223,223,223]],
    [175,  [198,198,198]],
    [225,  [174,174,174]],
    [300,  [139,139,139]],
    [375,  [ 89,150,195]],
    [450,  [ 42,158,253]],
    [625,  [ 42,181,253]],
    [875,  [ 42,203,253]],
    [1125, [ 54,245,233]],
    [1375, [ 89,253,197]],
    [1625, [125,253,162]],
    [1875, [162,253,125]],
    [2125, [233,253, 54]],
    [2375, [253,217, 42]],
    [2625, [253,177, 42]],
    [2875, [253,136, 42]],
    [3125, [253, 93, 42]],
    [3375, [249, 52, 42]],
    [3625, [197, 42, 42]],
    [3875, [148, 42, 42]],
    [4250, [152,  0,  0]],
    [4750, [152,  0,101]],
    [5250, [152,  0,152]],
    [5750, [203,  0,253]],
    [6500, [253,  0,253]],
    [7500, [245, 22,245]]
  ]
},
"gfs/cloud_cover_entire_atmosphere": {
  title: "Total Cloud Cover",
  attribution: "<a href=\"https://www.nco.ncep.noaa.gov/pmb/products/gfs/\">NOAA / GFS</a> via <a href=\"https://weatherlayers.com\">WeatherLayers</a>",
  unitFormat: { unit: "%" },
  palette: [
    [  0, [ 60, 72, 94]],
    [ 10, [ 60, 92,139]],
    [ 25, [ 60,118,177]],
    [ 40, [ 80,143,197]],
    [ 50, [106,169,211]],
    [ 60, [139,193,223]],
    [ 70, [179,214,233]],
    [ 80, [211,227,243]],
    [ 90, [220,233,246]],
    [ 99, [229,239,249]],
    [100, [255,255,255]]
  ]
},
"gfs/relative_humidity_2m_above_ground": {
  title: "Relative Humidity",
  attribution: "<a href=\"https://www.nco.ncep.noaa.gov/pmb/products/gfs/\">NOAA / GFS</a> via <a href=\"https://weatherlayers.com\">WeatherLayers</a>",
  unitFormat: { unit: "%" },
  palette: [
    [  0.0,  [229, 59, 46]],
    [  0.25, [166, 15, 20]],
    [  0.75, [103, 38, 11]],
    [  1.5,  [153, 52,  4]],
    [  3.5,  [204, 76,  2]],
    [  7.5,  [236,112, 20]],
    [ 15.0,  [254,153, 41]],
    [ 25.0,  [254,196, 79]],
    [ 35.0,  [254,227,145]],
    [ 45.0,  [247,247,247]],
    [ 55.0,  [209,229,240]],
    [ 65.0,  [146,197,222]],
    [ 75.0,  [ 67,147,195]],
    [ 85.0,  [ 33,102,172]],
    [ 95.0,  [  5, 48, 97]],
    [100.0,  [ 45,  0, 75]]
  ]
},
"gfs/snow_depth_surface": {
  title: "Snow Depth",
  attribution: "<a href=\"https://www.nco.ncep.noaa.gov/pmb/products/gfs/\">NOAA / GFS</a> via <a href=\"https://weatherlayers.com\">WeatherLayers</a>",
  unitFormat: { unit: "cm" },
  // palette: [
  //   [  0, [ 75,182,152,  0]],
  //   [  1, [150,204,246,170]],
  //   [  5, [ 50,128,190,232]],
  //   [ 10, [ 46, 87,186]],
  //   [ 15, [ 84, 80,179]],
  //   [ 20, [ 60, 53,156]],
  //   [ 25, [ 46, 34,112]],
  //   [ 30, [ 26, 13,100]],
  //   [ 40, [145,  9,145]],
  //   [ 50, [180,  0,180]],
  //   [ 60, [210,  0,210]],
  //   [ 80, [198,127,198]],
  //   [100, [227,208,227]],
  //   [150, [235,235,235]],
  //   [200, [255,255,255]]
  // ]
palette: [
  [  0, [255,255,255,  0]],  // transparente (sin nieve)

  // Blancos más intensos desde valores bajos
  [  1, [255,255,255,200]],  // blanco muy visible
  [  5, [255,255,255,230]],  // casi sólido
  [ 10, [252,250,255,245]],  // blanco con micro-tinte frío
  [ 15, [247,242,255,250]],  // sigue muy blanco, apenas lila

  // A partir de aquí empieza la “firma” lila/azulada
  [ 20, [236,224,255,252]],
  [ 25, [222,204,255,253]],
  [ 30, [204,182,255,254]],
  [ 40, [182,155,255,254]],
  [ 50, [158,125,248,255]],
  [ 60, [132, 95,234,255]],
  [ 80, [105, 55,210,255]],
  [100, [ 55,  0,120,255]]
]
},

  "gfs/wind_gust_noaa": {
    title: "Wind gust (surface)",
    imageType: "SCALAR", // si lo pintas como color/heatmap
    imageUnscale: { min: -128, max: 127 },
    unitFormat: {
      system: "METRIC",
      unit: "m/s",
      toDisplay: (ms) => ms,
      label: "m/s"
    },
    units: {
      METRIC:        { unit: "m/s", scale: 1.0 },
      METRIC_KMH:    { unit: "km/h", scale: 3.6 },
      IMPERIAL:      { unit: "mph",  scale: 2.23694 },
      NAUTICAL:      { unit: "kn",   scale: 1.943844 }
    },
    attribution: "NOAA / GFS (processed & hosted by ClimaTok)",
    palette: /* tu palette de gust si la tienes */
      [[0,[255,255,255]],[10,[200,220,255]],[20,[120,180,255]],[30,[60,120,255]],[40,[0,60,255]],[50,[255,0,0]]]
  }
};






// Qué IDs de botón se muestran en cada modelo
const LAYER_BUTTONS_BY_MODEL = {
  gfs: [
    // 'detailprecipitation',
    // 'detailradar',
    // 'detailwind',
    // 'detailtemperature',
    //  'detailpressure',
    'precipitation',
    'precipitation_noaa',
    'radar',
    'radar_noaa',
    'temp500mb',
    'temp500mb_noaa',
    'instability',
    'instability_noaa',
    'precipitable',
    'precipitable_noaa',
    'pressure',
     'pressure_noaa',
    // 'wind',
    'wind_noaa',
    // 'windgust',
    'temp2m',
    'temp2m_noaa',
    'apparenttemperature',
    'cloudcover',
    'cloudcover_noaa',
    // 'solarradiation',
    'relativehumidity',
    'relativehumidity_noaa',
    'cape-ecmwf',
    'cape_noaa',
    'snowdepth',
    'snowdepth_noaa'
  ],
  ecmwf: [
    // ECMWF AIFS / IFS (los 7 que me has pedido)
    'cloudcover',      // CLOUD COVER -> ecmwf_aifs/total_cloud_cover
    'pressure',  // AIR PRESSURE -> ecmwf_aifs/pressure_mean_sea_level
    'temp2m',    // TEMPERATURE  -> ecmwf_aifs/temperature_2m_above_ground
    // 'wind',            // WIND         -> ecmwf_aifs/wind_10m_above_ground
    'cape-ecmwf',      // THUNDERSTORMS -> ecmwf_ifs/convective_available_potential_energy_surface
    'instability',     // INESTABILITY -> ecmwf_ifs/geopotential_height_500mb
          
  ],
  arome: [
    // de momento vacío; cuando tengas capas AROME las añadimos aquí
  ]
};

// Capas que tienen gemelo GFS/ECMWF y permiten hacer switch de modelo
const LAYERS_WITH_ECMWF_TWIN = new Set([
//   'cloudcover',   // CLOUD COVER
//   'pressure',     // AIR PRESSURE
//  'temp2m',  // TEMPERATURE
//    'wind',         // WIND
//    'cape-ecmwf',   // THUNDERSTORMS (CAPE ECMWF)
//   'instability',  // INESTABILITY (500mb)
  
]);




function applyLayerMenuForModel(modelKey) {
  const allowed = new Set(LAYER_BUTTONS_BY_MODEL[modelKey] || []);

  ALL_LAYER_BUTTONS.forEach(li => {
    // Si no hay lista (por ejemplo AROME vacío) ocultamos todo
    if (!allowed.size || !allowed.has(li.id)) {
      li.style.display = 'none';
    } else {
      li.style.display = '';
    }
  });
}

function refreshActiveLayerForModel() {
  // Botones visibles según el modelo actual (GFS / ECMWF / AROME)
  const visibleButtons = Array.from(
    document.querySelectorAll('#buttons > li')
  ).filter(li => li.style.display !== 'none');

  if (!visibleButtons.length) {
    // Para AROME ahora mismo no hay botones visibles (coming soon),
    // así que no hacemos nada: se mantiene el mapa actual.
    return;
  }

  // ¿Hay algún botón visible que ya esté marcado como activo?
  let activeVisible = visibleButtons.find(li => li.classList.contains('active'));

  // Si no hay ninguno activo, usamos el primero visible como capa por defecto
  if (!activeVisible) {
    activeVisible = visibleButtons[0];
  }

  // Re-disparamos el click de ese botón para que recargue la capa
  activeVisible.click();
  
}





  // ===== Settings segmented buttons =====
// helper para marcar activo dentro de un grupo
function setActiveSegment(...buttons) {
  return function(activeBtn) {
    buttons.forEach(b => b && b.classList.remove('active'));
    if (activeBtn) activeBtn.classList.add('active');
  };
}

// --- Modelo: GFS / ECMWF (Settings + switcher bajo el time-info) ---

// Botones en el panel Settings
const modelGfsBtn   = document.getElementById('model-gfs');
const modelEcmwfBtn = document.getElementById('model-ecmwf');
const setModelActive = setActiveSegment(modelGfsBtn, modelEcmwfBtn);

// Botones del switcher bajo el time-info

// Devuelve el id de la capa activa en el menú lateral (#buttons > li.active)
function getActiveLayerId() {
  const activeLi = document.querySelector('#buttons > li.active');
  return activeLi ? activeLi.id : null;
}







// Muestra/oculta la opción ECMWF según la capa actual
function updateModelSwitcherAvailability() {
  const activeId = getActiveLayerId();
  const supportsSwitch = !!activeId && LAYERS_WITH_ECMWF_TWIN.has(activeId);

  // Switcher superior (píldoras GFS / ECMWF)
  const bar = document.getElementById('model-switcher-bar');
  const pills = bar ? Array.from(bar.querySelectorAll('.model-pill')) : [];
  pills.forEach(btn => {
    const model = (btn.dataset.model || '').toLowerCase();
    if (model === 'ecmwf') {
      btn.style.display = supportsSwitch ? '' : 'none';
    }
  });

  // Botón ECMWF en Settings
  if (modelEcmwfBtn) {
    modelEcmwfBtn.disabled = !supportsSwitch;
    modelEcmwfBtn.classList.toggle('disabled', !supportsSwitch);
  }
}


const modelSwitcherBar = document.getElementById('model-switcher-bar');
const modelSwitcherButtons = modelSwitcherBar
  ? Array.from(modelSwitcherBar.querySelectorAll('.model-pill'))
  : [];

// Sincroniza aspecto de Settings + switcher
function syncModelUI(modelKey) {
  const upper = modelKey.toUpperCase();

  // Panel Settings
  if (modelKey === 'gfs'   && modelGfsBtn)   setModelActive(modelGfsBtn);
  if (modelKey === 'ecmwf' && modelEcmwfBtn) setModelActive(modelEcmwfBtn);

  // Switcher bajo el time-info
  modelSwitcherButtons.forEach(btn => {
    const m = (btn.dataset.model || '').toUpperCase();
    btn.classList.toggle('active', m === upper);
  });

  // 🔹 Habilitar/deshabilitar botón play según modelo
  // updatePlayAvailabilityForModel(modelKey);
}


function updatePlayAvailabilityForModel(modelKey) {
  const isEcmwf = (modelKey === 'ecmwf');

  const playBtnTimeline = document.getElementById('play-pause-bt'); // botón del time-info
  const playIcon        = document.getElementById('play-icon');
  const pauseIcon       = document.getElementById('pause-icon');

  // (Opcional) si tienes también un botón grande "play-button" para animaciones,
  // lo puedes sincronizar aquí:
  const bigPlayBtn = document.getElementById('play-button');

  // 1) Habilitar / deshabilitar botones
  if (playBtnTimeline) {
    playBtnTimeline.disabled = isEcmwf;            // ECMWF → deshabilitado
    playBtnTimeline.dataset.state = 'paused';      // nos aseguramos de dejarlo en pausa
  }

  if (bigPlayBtn) {
    bigPlayBtn.disabled = isEcmwf;
  }

  // 2) Asegurar iconos en estado "PAUSA" (mostrar ▶️, ocultar ⏸)
  if (playIcon)  playIcon.style.display  = '';
  if (pauseIcon) pauseIcon.style.display = 'none';

  // 3) Si cambiamos a ECMWF, parar la animación si estuviera corriendo
  if (isEcmwf) {
    try {
      if (typeof timelineControl?.pause === 'function') {
        timelineControl.pause();
      } else if (typeof stopPlayback === 'function') {
        stopPlayback();
      }
    } catch (err) {
      console.error('Error pausing timeline when switching to ECMWF:', err);
    }
  }
}




// Cambia modelo en toda la app
function applyModel(modelKey) {
  const normalized = (modelKey || 'gfs').toLowerCase(); // 'gfs' | 'ecmwf'

  // 1) variables globales
  window.currentModel = normalized;
  if (typeof dataModel !== 'undefined') {
    dataModel = normalized.toUpperCase(); // 'GFS' | 'ECMWF'
  }

  // 2) opcional: actualizar lista de maps y menú de capas si tienes estas funciones
  if (typeof renderModelLayers === 'function') {
    renderModelLayers(normalized);
  }
  if (typeof applyLayerMenuForModel === 'function') {
    applyLayerMenuForModel(normalized);
  }

  // 3) sincronizar UI
  syncModelUI(normalized);

  // 4) recargar la capa actual en el nuevo modelo
  refreshActiveLayerForModel();

  // 5) ajustar visibilidad de ECMWF según la capa actual
  updateModelSwitcherAvailability();

  console.log('[Model] set to', normalized.toUpperCase());
}

// Listeners del panel Settings
if (modelGfsBtn) {
  modelGfsBtn.addEventListener('click', () => applyModel('gfs'));
}
if (modelEcmwfBtn) {
  modelEcmwfBtn.addEventListener('click', () => applyModel('ecmwf'));
}

// Listeners del switcher bajo el time-info
modelSwitcherButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const key = (btn.dataset.model || 'GFS').toLowerCase();
    applyModel(key);
  });
});

// Estado inicial: GFS
window.currentModel = window.currentModel || 'gfs';
syncModelUI(window.currentModel);
updateModelSwitcherAvailability();


// ====== PREMIUM CONFIG (versión free vs Premium) ======

/**
 * Bandera principal: aquí decides si el usuario es Premium o no.
 * De momento será false. En iOS la app inyectará true cuando detecte
 * que el usuario ha pagado la suscripción.
 */
// EDITADO PREMIUM
let IS_PREMIUM_USER = false;

function updateAppStoreBadgeVisibility(isPremium){
  const el = document.getElementById("appstore-badge");
  if (!el) return;
  el.style.display = isPremium ? "none" : "inline-flex";
}

// Límite de la versión gratuita: 3 días = 72 horas desde el primer datetime.
const FREE_MAX_HOURS = 48;



// Capas avanzadas sólo para Premium (IDs de <li> en #buttons)
// Capas avanzadas solo Premium (IDs de <li> en #buttons)
const PREMIUM_LAYER_IDS = new Set([

  // 'temp500mb_noaa',            // Cold Air 500mb
  // 'instability_noaa',          // Inestability (gh500)
  'cape-ecmwf',           // Thunderstorms
  'cape_noaa',                 // Thunderstorms
  // 'precipitable_noaa',         // Precipitable Water
  'windgust',             // Jet Stream
  'relativehumidity_noaa' ,    // Relative Humidity
  'wind_noaa',                 // Wind
  'snowdepth_noaa',           // Snow Depth
    'cloudcover_noaa',                 // Cloud Cover
    'pressure_noaa',                 // Air Pressure
    'precipitation_noaa' ,            // Precipitation 3h
    'radar_noaa',                 // Radar NOAA

  // si quieres, añade aquí más en el futuro
]);


// Si quieres distinguir más tarde otras cosas (nº días detalle, etc.)
const PREMIUM_LIMITS = {
  freeMaxHours: FREE_MAX_HOURS,
  freeMaxDetailDays: 3,   // para el flatpickr de 4 días
  premiumDetailDays: 4    // lo que ya tienes ahora
};

function isPremium() {
  return !!IS_PREMIUM_USER;
}

// Bootstrap premium flag from localStorage (web) if present
(function bootstrapPremiumFromStorage(){
  try {
    const untilStr = localStorage.getItem('climatok_premium_until');
    const until = untilStr ? parseInt(untilStr, 10) : 0;
    const now = Math.floor(Date.now() / 1000);
    if (until && until > now) {
      // Mark premium without needing network (UI only)
      setPremiumFromApp({ premium: true, premiumUntil: until, sub: localStorage.getItem('climatok_customer_id') || null });
    } else {
      setPremiumFromApp(false);
    }
  } catch (_) {
    // ignore
  }
})();
/**
 * Callback que podrás llamar desde iOS / Web cuando el usuario compre.
 * Ej: window.setPremiumFromApp(true)
 */
function setPremiumFromApp(value) {
  // Accept either boolean or an entitlement object, e.g.:
  // { sub: "cus_...", premium: true, premiumUntil: 1234567890, exp: ..., iat: ... }
  let premiumFlag = false;
  let customerId = null;
  let premiumUntil = null;

  if (typeof value === 'object' && value) {
    premiumFlag = !!value.premium;
    customerId = value.sub || value.customerId || null;
    premiumUntil = value.premiumUntil || value.exp || null;

    // Persist for web (Stripe portal, etc.)
    try {
      if (customerId) localStorage.setItem('climatok_customer_id', String(customerId));
      if (premiumUntil) localStorage.setItem('climatok_premium_until', String(premiumUntil));
    } catch (_) {}
  } else {
    premiumFlag = !!value;
  }

  // EDITADO PREMIUM
  IS_PREMIUM_USER = true;
  // IS_PREMIUM_USER = premiumFlag;

  updateAppStoreBadgeVisibility(IS_PREMIUM_USER);

  document.documentElement.classList.toggle('is-premium', IS_PREMIUM_USER);

  // Settings: upgrade CTA
  const cta = document.getElementById('go-premium-cta');
 if (cta) {
  if (IS_PREMIUM_USER) {
    cta.textContent = t("premium_active");
    cta.disabled = true;
    cta.classList.add('premium-active');
  } else {
    cta.textContent = t("upgrade_premium");
    cta.disabled = false;
    cta.classList.remove('premium-active');
  }
}

  // Settings: manage subscription CTA (WEB)
  const manage = document.getElementById('manage-subscription-cta');
  if (manage) {
    // manage.style.display = IS_PREMIUM_USER ? '' : 'none';
    manage.style.display = '';
  }

  // Close premium overlay if open
  hidePremiumOverlay();
}
window.setPremiumFromApp = setPremiumFromApp;


async function climatokHandleStripeSuccessIfPresent() {
  const url = new URL(window.location.href);
  const sessionId = url.searchParams.get("session_id");
  if (!sessionId) return;

  // Reintentos: webhook puede tardar en persistir entitlement en Upstash
  const maxAttempts = 12;          // ~12s si delay=1s
  const delayMs = 1000;

  for (let i = 0; i < maxAttempts; i++) {
    try {
      const res = await fetch(`/.netlify/functions/verify-entitlement?session_id=${encodeURIComponent(sessionId)}`, {
        cache: "no-store"
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        if (data.jwt) localStorage.setItem("climatok_premium_jwt", data.jwt);
        if (data.customerId) localStorage.setItem("climatok_customer_id", data.customerId);
        if (typeof data.premiumUntil === "number") localStorage.setItem("climatok_premium_until", String(data.premiumUntil));

        // Si ya es premium, aplica y limpia URL
        if (data.premium) {
          if (typeof setPremiumFromApp === "function") {
            setPremiumFromApp({ sub: data.customerId, premium: true, premiumUntil: Number(data.premiumUntil || 0) });
          }
          // Limpia session_id de la URL
          url.searchParams.delete("session_id");
          window.history.replaceState({}, "", url.toString());
          // Opcional: asegúrate de estar en /app/
          if (!window.location.pathname.endsWith("/app/")) window.location.href = "/app/";
          return;
        }
      }
    } catch (_) {}

    await new Promise(r => setTimeout(r, delayMs));
  }

  // Si no llegó a premium aún, al menos intenta refresco normal más tarde
  setTimeout(() => { climatokRefreshPremiumFromServer?.().catch(()=>{}); }, 1500);
}


document.addEventListener("DOMContentLoaded", () => {
  climatokHandleStripeSuccessIfPresent();
});


function climatokGetCustomerId() {
  // 1) intenta desde JWT
  const jwt = localStorage.getItem("climatok_premium_jwt");
  if (jwt) {
    try {
      const payloadJson = atob(jwt.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"));
      const payload = JSON.parse(payloadJson);
      const cus = payload?.sub || null;
      if (cus && String(cus).startsWith("cus_")) {
        // 2) cachea por si algún día cambias el formato
        localStorage.setItem("climatok_customer_id", cus);
        return cus;
      }
    } catch {}
  }

  // 3) fallback a clave “cacheada”
  const cached = localStorage.getItem("climatok_customer_id");
  if (cached && cached.startsWith("cus_")) return cached;

  return null;
}



// Lista de planos disponibles por modelo (sólo texto)
const MODEL_LAYERS = {
  gfs: [
    'Detail Forecast 4 days',
    'Precipitation',
    'Radar Precipitation',
    'Cold Air (500 mb)',
    'Geopotential Height 500 mb',
    'Precipitable Water',
    'Wind speed',
    'Wind gust',
    'Jet Stream',
    'Temperature',
    'Apparent Temperature',
    'Air Pressure',
    'Thunderstorms',
    'Total Cloud Cover',
    'Solar Radiation',
    'Relative Humidity',
    'Snow Depth'
  ],
  ecmwf: [
    'Cloud Cover',
    'Air Pressure',
    'Temperature',
    'Wind',
    'Thunderstorms',
    'Inestability',
    'Wind Gusts',
  ],
  arome: [
    'Coming soon'
  ]
};

const modelLayersList = document.getElementById('settings-model-layers');

function renderModelLayers(modelKey) {
  if (!modelLayersList) return;
  modelLayersList.innerHTML = '';

  const layers = MODEL_LAYERS[modelKey] || [];
  layers.forEach(text => {
    const li = document.createElement('li');
    li.textContent = text;
    modelLayersList.appendChild(li);
  });
}


function postToiOS2(payload) {
  try { window.webkit?.messageHandlers?.bridge?.postMessage(payload); } catch(_) {}
}

// PREMIUM RENDER
// ===== Helpers de overlay Premium =====
const premiumOverlay   = document.getElementById('premium-overlay');
const premiumMsg       = document.getElementById('premium-message');
const premiumGoButton  = document.getElementById('premium-upgrade-bt');
const premiumCloseButton = document.getElementById('premium-close-bt');
// Ya existe en Settings: <button id="go-premium-cta">...<button>
const goPremiumCta = document.getElementById('go-premium-cta');
// const infoPremiumBtn     = document.getElementById('go-premium-button'); // Info panel

const rateBtn = document.getElementById('go-premium-button'); // si no cambiaste el id

// Poner este codigo a ejecutar si estamos en iOS
rateBtn?.addEventListener('click', () => {
   const infoDesc =
    document.getElementById('info-description') ||
    document.getElementById('info-descrition'); // por si está escrito así en tu HTML

  if (infoDesc) infoDesc.classList.remove('info-open');

  // Si tu botón Info también pone una clase en <body> o en otro wrapper, quítala aquí (por si acaso)
  document.body.classList.remove('info-open');

  // Si hay backdrop (a veces se llama así)
  const backdrop =
    document.getElementById('info-backdrop') ||
    document.querySelector('.info-backdrop');

  if (backdrop) backdrop.classList.remove('info-open', 'visible');

  // Por seguridad, evita que quede capturando clicks si usa opacity/transform
  if (infoDesc) infoDesc.style.pointerEvents = 'none';
  setTimeout(() => { if (infoDesc) infoDesc.style.pointerEvents = ''; }, 350);

  

  try {
    window.webkit?.messageHandlers?.bridge?.postMessage({
      type: 'rateUs',
      source: 'info-panel'
    });
  } catch (_) {
    // En web: fallback opcional (pon tu APP_ID real si quieres)
    const APP_ID = '6744102515';
    window.open(`https://apps.apple.com/app/id${APP_ID}?action=write-review`, '_blank');
  }
});



const premiumMonthlyBtn = document.getElementById('premium-monthly-bt');
const premiumYearlyBtn  = document.getElementById('premium-yearly-bt');

function isInIOSApp() {
  return !!window.webkit?.messageHandlers?.bridge;
}

premiumMonthlyBtn?.addEventListener('click', () => {
  hidePremiumOverlay();
  const settingsPanel = document.getElementById('settings-panel');
  settingsPanel?.classList.remove('visible');

  if (isInIOSApp()) {
    window.webkit.messageHandlers.bridge.postMessage({ type: 'openPremium', source: 'web-paywall-monthly' });
    return;
  }

  // WEB: aquí luego llamaremos a Stripe con plan:"monthly"
   climatokStartCheckout('monthly');
});

premiumYearlyBtn?.addEventListener('click', () => {
  hidePremiumOverlay();
  const settingsPanel = document.getElementById('settings-panel');
  settingsPanel?.classList.remove('visible');

  if (isInIOSApp()) {
    window.webkit.messageHandlers.bridge.postMessage({ type: 'openPremium', source: 'web-paywall-yearly' });
    return;
  }

  // WEB: aquí luego llamaremos a Stripe con plan:"yearly"
   climatokStartCheckout('yearly');
});

// WEB (Stripe): create checkout session and redirect
async function climatokStartCheckout(plan) {
  try {
    // Optional: show small "Loading" banner while we create the session
    try { setLoadingUI(true); } catch (_) {}

    const res = await fetch('/.netlify/functions/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan })
    });

    let data = {};
    try { data = await res.json(); } catch (_) {}

    if (!res.ok) {
      const msg = data?.error || data?.message || `Checkout failed (HTTP ${res.status})`;
      throw new Error(msg);
    }

    const url = data?.url || data?.checkoutUrl || data?.sessionUrl;
    if (!url) throw new Error('Checkout URL not returned by server.');

    window.location.href = url;
  } catch (err) {
    console.error('[Stripe] checkout error:', err);
    alert(err?.message || 'Unable to start checkout. Please try again.');
  } finally {
    try { setLoadingUI(false); } catch (_) {}
  }
}

async function climatokRefreshPremiumFromServer() {
  const customerId = climatokGetCustomerId?.() || localStorage.getItem("climatok_customer_id");
  if (!customerId) return;

  const res = await fetch(`/.netlify/functions/verify-entitlement?customer_id=${encodeURIComponent(customerId)}`);
  const data = await res.json();
  if (!res.ok) return;

  if (data.jwt) localStorage.setItem("climatok_premium_jwt", data.jwt);
  if (typeof data.premiumUntil === "number") localStorage.setItem("climatok_premium_until", String(data.premiumUntil));
  if (data.customerId) localStorage.setItem("climatok_customer_id", data.customerId);

  // Aplica a UI (usa tu función existente)
  if (typeof setPremiumFromApp === "function") {
    setPremiumFromApp({ sub: data.customerId, premium: !!data.premium, premiumUntil: Number(data.premiumUntil || 0) });
  }
}

// Parche Premium
function climatokHasValidPremiumCache() {
  try {
    const untilStr = localStorage.getItem("climatok_premium_until");
    const until = untilStr ? parseInt(untilStr, 10) : 0;
    const now = Math.floor(Date.now() / 1000);
    return !!(until && until > now);
  } catch {
    return false;
  }
}

async function climatokPremiumResync({ reason = "boot" } = {}) {
  // Si ya hay cache premium válida, mantenemos UI premium y refrescamos “en segundo plano”
  // (no degrada la experiencia del usuario).
  const hasCache = climatokHasValidPremiumCache();

  // Intento inmediato (si hay customerId)
  try { await climatokRefreshPremiumFromServer?.(); } catch (_) {}

  // Reintentos cortos por si el backend / Apple tarda
  const delays = hasCache ? [1500, 3500, 8000] : [800, 2000, 5000, 12000];
  for (const ms of delays) {
    await new Promise(r => setTimeout(r, ms));
    try { await climatokRefreshPremiumFromServer?.(); } catch (_) {}
    if (climatokHasValidPremiumCache()) break; // ya quedó premium por cache válida
  }
}

// 1) Al cargar
document.addEventListener("DOMContentLoaded", () => {
  climatokPremiumResync({ reason: "dom" });
});

// 2) Cuando vuelves a la app (esto es CLAVE en iOS)
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    climatokPremiumResync({ reason: "resume" });
  }
});

// 3) Extra: cada X minutos mientras el usuario está dentro
setInterval(() => {
  if (document.visibilityState === "visible") {
    climatokRefreshPremiumFromServer?.().catch(()=>{});
  }
}, 5 * 60 * 1000);

// Parche Premium


const infoPremiumBtn = document.getElementById('go-premium-button'); // si ese es tu id real en el panel info

infoPremiumBtn?.addEventListener('click', () => {
  if (typeof IS_PREMIUM_USER !== 'undefined' && IS_PREMIUM_USER) return;
  showPremiumOverlay(t("premium_overlay_info"));
});





function showPremiumOverlay(message) {
  if (!premiumOverlay) return;
  if (premiumMsg && message) premiumMsg.textContent = message;
  premiumOverlay.classList.add('visible');
}

function hidePremiumOverlay() {
  premiumOverlay?.classList.remove('visible');
}

// Cerrar desde el botón secundario
premiumCloseButton?.addEventListener('click', hidePremiumOverlay);

// CTA desde Settings (reuse)

const manageSubCta = document.getElementById('manage-subscription-cta');
manageSubCta?.addEventListener('click', () => {
  // iOS app: you could handle this natively in the future
  if (isInIOSApp()) {
    window.webkit.messageHandlers.bridge.postMessage({ type: 'openCustomerPortal', source: 'settings' });
   // window.webkit.messageHandlers.bridge.postMessage({ type: 'openAppleSubscriptions', source: 'settings' });
    return;
  }
  climatokOpenCustomerPortal();
});

goPremiumCta?.addEventListener('click', () => {
  showPremiumOverlay(t("premium_overlay_info"));
});

// // 🔹 CTA desde el panel de Info – MISMO COMPORTAMIENTO
// infoPremiumBtn?.addEventListener('click', () => {
//   // Si ya es premium, no mostramos nada
//   if (IS_PREMIUM_USER) return;

//   // Si quieres, puedes cerrar el panel de info aquí
//   const infoPanel = document.getElementById('info-panel');
//   if (infoPanel) infoPanel.classList.remove('visible');

//   showPremiumOverlay(
//     'Unlock 12-day forecasts and advanced layers with ClimaTok Premium.'
//   );
// });

// Botón “Mejorar a Premium”
// En iOS: aquí dispararás el flujo de compra (o abrir WebView con la web de pago).
premiumGoButton?.addEventListener('click', () => {
 console.log('🔔 Ir a flujo de compra Premium');

  // 1) Cerrar overlay de compra
  hidePremiumOverlay();

  // 2) Cerrar también el panel de Settings si está abierto
  const settingsPanel = document.getElementById('settings-panel');
  if (settingsPanel) {
    settingsPanel.classList.remove('visible');
  }

  // 3) Avisar a iOS para que abra el Paywall nativo
  try {
    window.webkit?.messageHandlers?.bridge?.postMessage({
      type: 'openPremium',
      source: 'premium-overlay'
    });
  } catch (_) {
    // en web no pasa nada
  }
});










// UNIT SYSTEM
const unitsMetricBtn   = document.getElementById('units-metric');
const unitsMetricKmBtn = document.getElementById('units-metrickm');
const unitsImperialBtn = document.getElementById('units-imperial');
const setUnitsActive   = setActiveSegment(unitsMetricBtn, unitsMetricKmBtn, unitsImperialBtn);

if (unitsMetricBtn) {
  unitsMetricBtn.addEventListener('click', () => {
    setUnitsActive(unitsMetricBtn);
    setUnitMetric(); 
          document.querySelectorAll(".markerTemperature").forEach(el => {
    el.style.display = "none";
  });
   document.querySelectorAll(".markerMainWeatherIcon").forEach(el => {
    el.style.display = "none";
  });
          // ✅ tu función
  });
}
if (unitsMetricKmBtn) {
  unitsMetricKmBtn.addEventListener('click', () => {
    setUnitsActive(unitsMetricKmBtn);
    setUnitMetricKm(); 
          document.querySelectorAll(".markerTemperature").forEach(el => {
    el.style.display = "none";
  });
   document.querySelectorAll(".markerMainWeatherIcon").forEach(el => {
    el.style.display = "none";
  });
        // ✅ tu función
  });
}
if (unitsImperialBtn) {
  unitsImperialBtn.addEventListener('click', () => {
    setUnitsActive(unitsImperialBtn);
    setUnitImperial(); 
          document.querySelectorAll(".markerTemperature").forEach(el => {
    el.style.display = "none";
  });
   document.querySelectorAll(".markerMainWeatherIcon").forEach(el => {
    el.style.display = "none";
  });
         // ✅ tu función
  });
}

// CONTOUR
const contourOnBtn  = document.getElementById('contour-on');
const contourOffBtn = document.getElementById('contour-off');
const setContourActive = setActiveSegment(contourOnBtn, contourOffBtn);

if (contourOnBtn) {
  contourOnBtn.addEventListener('click', () => {
    setContourActive(contourOnBtn);
    setContourLayer();      // ✅ tu función
  });
}
if (contourOffBtn) {
  contourOffBtn.addEventListener('click', () => {
    setContourActive(contourOffBtn);
    unSetContourLayer();    // ✅ tu función
  });
}

// LEGEND ON / OFF
const legendOnBtn  = document.getElementById('legend-on');
const legendOffBtn = document.getElementById('legend-off');
const setLegendActive = setActiveSegment(legendOnBtn, legendOffBtn);

function showLegend() {
  // 🔹 Leyenda WL (tu wrapper centrado)
  const wrapper = document.getElementById('legend-wrapper');
  if (wrapper) {
    wrapper.style.display = '';
  }

  // 🔹 Leyenda MapTiler (si aún la usas)
  if (typeof hideMaptilerLegend === 'function' && window.map) {
    hideMaptilerLegend(window.map, false);
  } else {
    const mtCtrl = document.querySelector('.maplibregl-ctrl-color-ramp');
    if (mtCtrl) mtCtrl.style.display = '';
  }
}

function hideLegend() {
  // 🔹 Leyenda WL
  const wrapper = document.getElementById('legend-wrapper');
  if (wrapper) {
    wrapper.style.display = 'none';
  }

  // 🔹 Leyenda MapTiler
  if (typeof hideMaptilerLegend === 'function' && window.map) {
    hideMaptilerLegend(window.map, true);
  } else {
    const mtCtrl = document.querySelector('.maplibregl-ctrl-color-ramp');
    if (mtCtrl) mtCtrl.style.display = 'none';
  }
}

if (legendOnBtn) {
  legendOnBtn.addEventListener('click', () => {
    setLegendActive(legendOnBtn);
    showLegend();
  });
}

if (legendOffBtn) {
  legendOffBtn.addEventListener('click', () => {
    setLegendActive(legendOffBtn);
    hideLegend();
  });
}




// DATA ON MAP
const dataOnBtn  = document.getElementById('datalayer-on');
const dataOffBtn = document.getElementById('datalayer-off');
const setDataActive = setActiveSegment(dataOnBtn, dataOffBtn);

if (dataOnBtn) {
  dataOnBtn.addEventListener('click', () => {
    setDataActive(dataOnBtn);
    setDataLayer();         // ✅ tu función
  });
}
if (dataOffBtn) {
  dataOffBtn.addEventListener('click', () => {
    setDataActive(dataOffBtn);
    unSetDataLayer();       // ✅ tu función
  });
}

// CTA Go Premium (por ahora sólo placeholder)
// const goPremiumCta = document.getElementById('go-premium-cta');
// if (goPremiumCta) {
//   goPremiumCta.addEventListener('click', () => {
//     console.log('[Settings] Go Premium clicked');
//     // Más adelante: window.goPremium && window.goPremium();
//   });
// }



  // Inyectar un SVG externo dentro del span para que herede estilos (color, etc.)
  async function inlineSvg(targetEl) {
    const url = targetEl.dataset.src;
    if (!url) return;
    try {
      const res = await fetch(url, { cache: 'force-cache' });
      const txt = await res.text();
      const svg = new DOMParser().parseFromString(txt, 'image/svg+xml').documentElement;
      // Copiamos id/clases para no romper selectores
      svg.id = targetEl.id;
      svg.classList.add(...targetEl.classList);
      // El span pasa a ser el propio SVG
      targetEl.replaceWith(svg);
    } catch (e) {
      console.warn('No se pudo inyectar el SVG', url, e);
      // fallback: muestra un ▷ unicode
      targetEl.textContent = '▶';
    }
  }

  // Llama a la inyección del play.svg
  (async () => {
    const playSpan = document.getElementById('play-icon');
    if (playSpan) await inlineSvg(playSpan);

    const nowSpan = document.getElementById('now-icon');
    if (nowSpan) await inlineSvg(nowSpan);

    const layersSpan = document.getElementById('layers-icon');
    if (layersSpan) await inlineSvg(layersSpan);

    const infoSpan = document.getElementById('info-icon');
    if (infoSpan) await inlineSvg(infoSpan);

     const searchSpan = document.getElementById('search-icon');
    if (searchSpan) await inlineSvg(searchSpan);

     const geoSpan = document.getElementById('geo-icon');
    if (geoSpan) await inlineSvg(geoSpan);

      const windSpan = document.getElementById('wind-icon');
  if (windSpan) await inlineSvg(windSpan);

    const settingsSpan = document.getElementById('settings-icon');
  if (settingsSpan) await inlineSvg(settingsSpan);

 

  // 👇 AÑADE ESTO
  const infoLayerSpan = document.getElementById('info-layer-icon');
  if (infoLayerSpan) await inlineSvg(infoLayerSpan);



    const btn = document.getElementById('play-pause-bt');
    const playEl  = document.getElementById('play-icon');  // ahora es <svg>
    const pauseEl = document.getElementById('pause-icon');

    // Estado inicial
    btn.dataset.state = 'paused';
    btn.setAttribute('aria-label', 'Play');

    // Conmutación Play/Pause
    btn.addEventListener('click', () => {

if (window.__INITIAL_PRECACHING__) {
  e.preventDefault();
  e.stopPropagation();
  return;
}

      const isPlaying = btn.dataset.state === 'playing';
      if (isPlaying) {
        // Pasar a PAUSA
        btn.dataset.state = 'paused';
        btn.setAttribute('aria-label', 'Play');
        if (playEl)  playEl.style.display = '';
        if (pauseEl) pauseEl.style.display = 'none';
        // TODO: aquí tu lógica para pausar la animación
        // e.g., timelineControl?.pause?.() o lo que uses
      } else {
        // Pasar a PLAY
        btn.dataset.state = 'playing';
        btn.setAttribute('aria-label', 'Pause');
        if (playEl)  playEl.style.display = 'none';
        if (pauseEl) pauseEl.style.display = '';
        // TODO: aquí tu lógica para iniciar/reanudar la animación
        // e.g., timelineControl?.play?.()
      }
    });
  })();





    import { WEATHER_LAYERS_ACCESS_TOKEN } from '../auth.js';
    import { NO_DATA, initConfig, initGui, cssToColor, waitForDeck, isMetalWebGl2 } from '../config.js';
    import { BASEMAP_VECTOR_STYLE_URL, updateBasemapVectorStyle } from '../basemap.js';
    import { InfoControl } from '../info-control.js';
    import { FpsControl } from '../fps-control.js';

  // const client = window.client = new WeatherLayersClient.Client({
  //     accessToken: '42170F47-E25D-41DC-886B-058D7339A106',
  //     // 7D75A8A3-1A2E-4718-80C9-B8D4AD213FAD
  //      dataFormat: 'byte.webp',   // 👈 aquí le dices que quieres WebP
  //   });

const WL_TOKEN_URL = "https://climatok-public-config-juan-20251221.s3.eu-central-1.amazonaws.com/token.json";

function fetchWithTimeout(url, ms) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), ms);
  return fetch(url, { cache: "no-store", signal: controller.signal })
    .finally(() => clearTimeout(t));
}

async function refreshWLTokenInBackground() {
  try {
    const r = await fetchWithTimeout(WL_TOKEN_URL + "?v=" + Date.now(), 2500);
    if (!r.ok) throw new Error("token.json HTTP " + r.status);
    const j = await r.json();
    if (!j.accessToken) throw new Error("token.json sin accessToken");

    localStorage.setItem("WL_ACCESS_TOKEN", j.accessToken);

    // Re-crea el client SIN parar la app
    window.client = new WeatherLayersClient.Client({
      accessToken: j.accessToken,
      dataFormat: "byte.webp",
    });

    console.log("[WL] Token actualizado desde S3");
  } catch (e) {
    console.warn("[WL] No pude refrescar token desde S3:", e);
  }
}

// Arranca con lo que haya en localStorage (o vacío)
const initialToken = localStorage.getItem("WL_ACCESS_TOKEN") || "";

window.client = new WeatherLayersClient.Client({
  accessToken: initialToken,
  dataFormat: "byte.webp",
});

// Refresca en segundo plano (NO bloquea)
refreshWLTokenInBackground();



// Location

window.__NATIVE_setLocation = function(lat, lon, accuracy) {
  console.log("[iOS native] location", lat, lon, accuracy);

  // Aquí llama a tu lógica actual: centrar mapa, set marker, etc.
  // Ejemplo genérico:
  if (typeof setUserLocation === "function") {
    setUserLocation(lat, lon, accuracy);
  } else if (window.map && typeof window.map.setCenter === "function") {
    window.map.setCenter([lon, lat]);
  }
};

window.__NATIVE_locationError = function(code, message) {
  console.warn("[iOS native] location error", code, message);
  // Si tienes toast/modal:
  if (typeof showToast === "function") showToast("No se pudo obtener tu ubicación");
};


   // Evitar WL
   // ========= STUBS LOCALES PARA METADATOS Y DATETIMES (SIN WL) =========

// Ya tienes datasetId() definido cerca de AWS (si no, reaprovecha este)
// function datasetId(ds) {
//   if (typeof ds === 'string') return ds;
//   if (ds && typeof ds === 'object') return ds.id || ds.dataset || ds.name || '';
//   return '';
// }

// // 4.1. loadDataset → título + unidades "locales"
// client.loadDataset = async (dataset, { unitSystem } = {}) => {
//   const id = datasetId(dataset);
//   const meta = AWS_DATASETS[id] || {};

//   const title =
//     meta.title ||
//     (window.DATASETS_BY_ID && window.DATASETS_BY_ID[id]?.label) ||
//     id;

//   // Intenta sacar unidad de tus propias funciones / tablas
//   let unitFormat =
//     meta.unitFormat ||
//     meta.units ||
//     (typeof getUnitsFromDataset === 'function' ? getUnitsFromDataset(id) : '') ||
//     '';

//   return {
//     title,
//     unitFormat,
//     attribution: 'NOAA GFS vía ClimaTok (AWS)',
//     palette: null   // 👈 de momento sin paleta WL; la leyenda puede quedarse vacía y ya
//   };
// };

// 4.2. loadDatasetSlice → generamos una rejilla de horas sin preguntar a WL
client.loadDatasetSlice = async (dataset, [startISO, endISO], options = {}) => {
  const stepStr   = options.datetimeStep || '3h';   // "3h", "1h", etc.
  const stepHours = parseInt(stepStr, 10) || 3;

  let start = startISO ? new Date(startISO) : new Date();
  let end   = endISO   ? new Date(endISO)   : new Date(start.getTime() + AWS_LEAD_MAX * 3600000);

  if (end <= start) {
    end = new Date(start.getTime() + AWS_LEAD_MAX * 3600000);
  }

  const datetimes = [];
  for (let t = start.getTime(); t <= end.getTime(); t += stepHours * 3600000) {
    datetimes.push(new Date(t).toISOString());
  }

  return { datetimes };
};
 









    async function logFinalWLAsset(datasetId, dtISO) {

  // const base = 'https://catalog.weatherlayers.com/catalog/search';
  // const token = '7D75A8A3-1A2E-4718-80C9-B8D4AD213FAD'; // usa tu variable real si la tienes
  // const version = '2025.3.0'; // la que ves en tus peticiones

  // const datetime = dtISO || new Date().toISOString();
  // const qs = new URLSearchParams({
  //   access_token: token,
  //   version,
  //   collections: datasetId,
  //   datetime: `${datetime}/${datetime}`
  // });

  // const res = await fetch(`${base}?${qs.toString()}`);
  // if (!res.ok) throw new Error(`catalog/search ${res.status}`);
  // const json = await res.json();

  // // STAC-like: a veces viene en features[], otras en items[]
  // const items = json.features || json.items || [];
  // if (!items.length) {
  //   console.warn('Sin items para ese datetime');
  //   return;
  // }

  // const it = items[0];
  // const props = it.properties || {};
  // const assets = it.assets || it.links || {};
  // // el asset de interés suele tener nombres como:
  // // data.byte, data.byte.png, image.byte, data.webp...
  // const asset =
  //   assets['data.byte'] ||
  //   assets['data.byte.png'] ||
  //   assets['image.byte'] ||
  //   assets['data.webp'] ||
  //   assets['image.webp'] ||
  //   // si cambia el nombre, coge el primero que tenga href y parezca raster:
  //   Object.values(assets).find(a => a?.href && /data\.(byte|webp)/.test(a.href)) ||
  //   Object.values(assets).find(a => a?.href);

  // const href = asset?.href;
  // // Intenta deducir runUTC/lead desde props; WL suele exponerlos:
  // // props.run (YYYYMMDDHH), props.lead (horas), props.datetime (ISO)
  // let runUTC = props.run || props['forecast:reference_time'] || null;
  // let lead = (typeof props.lead === 'number') ? props.lead : null;

  // if (!runUTC) {
  //   // Deducción: si hay issued/run ISO → formatea a yyyymmddHH
  //   const runISO = props.issued || props['forecast:reference_time'] || props.run || props.datetime;
  //   if (runISO) {
  //     const d = new Date(runISO);
  //     const pad2 = n => (n < 10 ? '0'+n : ''+n);
  //     runUTC = `${d.getUTCFullYear()}${pad2(d.getUTCMonth()+1)}${pad2(d.getUTCDate())}${pad2(d.getUTCHours())}`;
  //   }
  // }
  // if (lead == null && props.datetime && runUTC) {
  //   const dRun = new Date(`${runUTC.slice(0,4)}-${runUTC.slice(4,6)}-${runUTC.slice(6,8)}T${runUTC.slice(8,10)}:00:00Z`);
  //   const dFx  = new Date(props.datetime);
  //   lead = Math.round((dFx - dRun)/3600000);
  // }

  // console.log('%c[WL resolved]', 'color:#0bf',
  //   { datasetId, datetime, runUTC, lead, href, props, assetKeys: Object.keys(assets) });

  // if (!href) {
  //   console.warn('No se encontró href de asset en el item. Revisa assetKeys arriba.');
  // }


}






// ——— WL URL LOGGER (pegar justo tras crear `client`) ———
const __WL_ORIG_LOAD = client.loadDatasetData.bind(client);

/**
 * Captura y muestra en consola la URL real (y cabeceras clave) que usa WL
 * para descargar el raster de un dataset en un datetime dado.
 * - datasetId: p.ej. 'gfs/pressure_mean_sea_level'
 * - datetimeISOString: opcional; si no lo pasas, usa el datetime actual/config
 */
async function logSampleWLUrl(datasetId, datetimeISOString) {

  // Elige un datetime sensato si no te pasan uno
  // const dtISO =
  //   datetimeISOString ||
  //   (window.config?.datetime && window.config.datetime !== NO_DATA
  //     ? window.config.datetime
  //     : new Date().toISOString());

  // // Parcheamos fetch temporalmente para capturar la PRIMERA petición a WL
  // const origFetch = window.fetch;
  // let captured = null;

  // window.fetch = async function(input, init) {
  //   try {
  //     const url = (typeof input === 'string') ? input : (input?.url || '');
  //     // Dominios típicos de WL (ajústalos si ves otros en tu consola)
  //     const looksWL = /weatherlayers\.com|wlcdn|weatherlayers-cdn|cdn\.weatherlayers/i.test(url);
  //     if (looksWL && !captured) {
  //       // Intenta sacar el Authorization si viene en headers
  //       let auth = '';
  //       const h = init?.headers;
  //       if (h) {
  //         auth = h.Authorization || h.authorization || '';
  //       }
  //       captured = { url, auth };
  //       console.log('%c[WL URL]', 'color:#0bf', url);
  //       if (auth) console.log('%c[WL Auth]', 'color:#0bf', auth.slice(0, 24) + '…');
  //     }
  //   } catch (_) { /* noop */ }

  //   return origFetch.apply(this, arguments);
  // };

  // try {
  //   // Fuerza una carga directa con el loader ORIGINAL de WL (sin wrapper)
  //   await __WL_ORIG_LOAD(datasetId, dtISO, { datetimeInterpolate: true });
  //   if (!captured) {
  //     console.warn('⚠️ No se capturó ninguna URL WL (quizá cache del navegador o dominio distinto).');
  //   } else {
  //     console.log('[WL capture]', captured);
  //   }
  // } catch (err) {
  //   console.error('Fallo en logSampleWLUrl:', err);
  // } finally {
  //   // Restaura fetch pase lo que pase
  //   window.fetch = origFetch;
  // }
}










let lastAppliedFps = null; // esto debe estar declarado FUERA de la función
  // ====== BLENDING TEMPORAL (toggle) ======
let __NO_BLEND = false; // ← true = SIN blending

// ====== AWS: multi-dataset ======
const AWS_CDN = 'https://d3kw1vf60gu3rr.cloudfront.net';




//  console.log('[Dataset] isECMWF:', isEcmwf);
let SAFETY_LAG_HOURS = 6;
let STEP_HOURS = 3;



function autoSafetyLagTweak() {
  try {
    const now = new Date();
    const utcH = now.getUTCHours();
    const utcM = now.getUTCMinutes();

    const isSynopticBoundary = (utcH % 6) === 0;   // 0, 6, 12, 18
    const inFirst60Min       = (utcM < 60);

    if (isSynopticBoundary && inFirst60Min) {
      SAFETY_LAG_HOURS = 12;
      console.log('[AWS mirror] Ventana de arranque del run (60min) -> SAFETY_LAG_HOURS = 12');
    } else {
      SAFETY_LAG_HOURS = 6;
      console.log('[AWS mirror] Fuera de ventana -> SAFETY_LAG_HOURS = 6');
    }
  } catch (e) {
    console.warn('autoSafetyLagTweak fallo, usando SAFETY_LAG_HOURS = 6 por defecto', e);
    SAFETY_LAG_HOURS = 6;
  }
}

// Ejecuta al cargar y luego refresca
autoSafetyLagTweak();
setInterval(autoSafetyLagTweak, 60 * 1000);



const HOUR_MS = 3600000;
const STEP_MS = STEP_HOURS * HOUR_MS;




// Devuelve la misma serie pero quedándote solo con las horas espaciadas 3h
function to3hCadence(datetimes) {
  if (!Array.isArray(datetimes) || datetimes.length < 2) return datetimes || [];
  // Ancla: el primer timestamp marca el residuo (…13Z → 13,16,19,…)
  const anchor = new Date(datetimes[0]).getUTCHours() % 3;
  return datetimes.filter(dtISO => (new Date(dtISO).getUTCHours() % 3) === anchor);
}

// Devuelve la serie de datetimes que usará el Timeline según el dataset
function getTimelineDatetimesForDataset(datasetId, datetimesAll) {
  if (!Array.isArray(datetimesAll)) return [];
  const ds = String(datasetId || '').toLowerCase();

  // Para ECMWF IFS respetamos tal cual la cadencia original (suele ser 12h)
  if (ds.startsWith('ecmwf_ifs/')) {
    return datetimesAll;
  }

  // Para el resto (GFS, AIFS, etc.) seguimos usando rejilla de 3h
  return to3hCadence(datetimesAll);
}



// --- añade junto a HOUR_MS y helpers ---
const DATASET_TIME_OFFSETS = {
  // WL muestra la acumulación futura (t→t+3). Para igualar a Ventusky/Windy (t-3→t)
  'gfs/precipitation_3h_accumulation_surface': -3 * HOUR_MS,
  // si mañana quieres otro dataset con ajuste, añádelo aquí
};

// Datasets interceptados por AWS (puedes añadir más)



 

   // Datasets disponibles en tu bucket AWS
  const AWS_DATASETS = {
 
    'gfs/geopotential_height_500mb':                 { defaultUnscale: [4710, 6000] },
    // 'gfs/geopotential_height_500mb_noaa':                 { defaultUnscale: [4710, 6000] },
    'gfs/pressure_mean_sea_level':                   { defaultUnscale: [940, 1080] },
    // 'gfs/pressure_mean_sea_level_noaa':                   { defaultUnscale: [940, 1080] },
     'gfs/temperature_2m_above_ground':               { defaultUnscale: [223, 312] },
     'gfs/temperature_2m':               { defaultUnscale: [223, 314] },

    'gfs/precipitable_water_entire_atmosphere':      { defaultUnscale: [0, 72] },
    // 'gfs/apparent_temperature_2m_above_ground':      { defaultUnscale: [218, 326] },
    'gfs/relative_humidity_2m_above_ground':         { defaultUnscale: [0, 100] },
    //  'gfs/relative_humidity_2m_above_ground_noaa':         { defaultUnscale: [0, 100] },
    'gfs/snow_depth_surface':                         { defaultUnscale: [0, 200] },
    // 'gfs/snow_depth_surface_noaa_200':                         { defaultUnscale: [0, 200] },
    'gfs/downward_short_wave_radiation_flux_surface': { defaultUnscale: [0, 1000] },
    'gfs/convective_available_potential_energy_surface': { defaultUnscale: [0, 5000] },
    // 'gfs/convective_available_potential_energy_surface_noaa': { defaultUnscale: [0, 5000] },
    'gfs/reflectivity_1000m_above_ground':     { defaultUnscale: [0, 72] }, // dBZ
    // 'gfs/reflectivity_1000m_above_ground_noaa':     { defaultUnscale: [0, 72] }, // dBZ

    'gfs/wind_10m_above_ground':{ defaultUnscale: [-67, 67] },
     'gfs/wind_10m_noaa':{ defaultUnscale: [-127, 128] },
      'gfs/wind_tropopause_noaa':{  minLead: 1,defaultUnscale: [-67, 67] },

  //  'gfs/wind_gust_surface':{ defaultUnscale: [-67, 67] },
    // 'gfs/wind_gust_noaa':{ defaultUnscale: [-67, 67] },
    'gfs/precipitation_3h_accumulation_surface': {  minLead: 1, defaultUnscale: [0, 75] },
    // 'gfs/apcp3h_noaa': { defaultUnscale: [0, 144] },
    'gfs/cloud_cover_entire_atmosphere':       { defaultUnscale: [0, 100] },
    // 'gfs/tcdc_noaa':       { defaultUnscale: [0, 100] },
    'gfs/temperature_500mb':       { defaultUnscale: [224, 272] }, // WL
    // 'gfs/temperature_500mb_noaa':  { defaultUnscale: [224, 272] }, // NOAA propio
    'gfs/precipitable_water_entire_atmosphere': { defaultUnscale: [0, 144] }, // NOAA propio
  };

  // Capas “editadas”: WL primero, si falla → fallback a AWS (si existe)
  const WL_FIRST_DATASETS = new Set([

    // Ajusta este listado a tus capas que prefieras WL primero:
      'gfs/wind_10m_above_ground',
    
  ]);

  // Datasets VECTORIALES (u, v) codificados en canales R y G
const VECTOR_DATASETS = new Set([
  'gfs/wind_10m_above_ground',
  'gfs/wind_tropopause_noaa',
  'gfs/wind_gust_surface',
  'gfs/wind_10m_noaa',
  // 'ecmwf_ifs/wind_10m_above_ground',
  // 'ecmwf_aifs/wind_10m_above_ground',
]);







// const CDN_BASE

const DEFAULT_BOUNDS = [-180, -90, 180, 90];
const SKIP_SEED = true;      // si quieres leer unscale/bounds de WL una vez: pon false
const AWS_LEAD_MAX = 345;    // 120 h → leads 0..119

// Caches por dataset (si SKIP_SEED=false)
const __UNSCALE = {};  // __UNSCALE[id] = [min,max]
const __BOUNDS  = {};  // __BOUNDS[id]  = bounds array

// URL generadora (byte PNG, 1440x721, canal R)
function awsByteUrl(datasetId, runUTCstr, lead) {
  return `${AWS_CDN}/data/${datasetId}/${runUTCstr}/${lead}/data.byte.png`;
}

// Utilidad: normaliza dataset a string id
function datasetId(ds) {
  if (typeof ds === 'string') return ds;
  if (ds && typeof ds === 'object') return ds.id || ds.dataset || ds.name || '';
  return '';
}



  const __WL_IS_IOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const __WL_IS_IPHONE = /iPhone|iPod/i.test(navigator.userAgent);
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

  const HOURS_WINDOW = 48; // cámbialo a voluntad

// AWSJGU
function computeImageWeight(datetimeISOString) {
  const d = safeUTCDate(datetimeISOString);
  if (!d) return 0;
  const frac = (d.getUTCMinutes() * 60 + d.getUTCSeconds() + d.getUTCMilliseconds()/1000) / 3600;
  // clamp 0..1
  return Math.max(0, Math.min(1, frac));
}

// safeUTCDate
 function safeUTCDate(input) {
    // Acepta Date, string ISO, o algunos objetos con .iso / .datetime
    if (!input) return null;
    if (input instanceof Date) return new Date(input.getTime());
    if (typeof input === 'string') {
      const d = new Date(input);
      return isNaN(d.getTime()) ? null : d;
    }
    if (typeof input === 'object') {
      const s = input.iso || input.datetime || input.date || input.time || null;
      if (s) {
        const d = new Date(s);
        return isNaN(d.getTime()) ? null : d;
      }
    }
    return null;
  }

  // --- Métricas de descargas AWS ---
window.AWS_STATS = window.AWS_STATS || {
  totalFiles: 0,             // nº de ficheros descargados (image + image2 cuentan)
  totalBytes: 0,             // bytes “en el cable” (blob.size)
  totalDecodedBytes: 0,      // bytes del buffer decodificado (W*H)
  perDataset: {}             // por datasetId: { files, bytes, decoded }
};

function __awsStatsAdd(dsId, wireBytes, decodedBytes) {
  const S = window.AWS_STATS;
  S.totalFiles += 1;
  S.totalBytes += wireBytes|0;
  S.totalDecodedBytes += decodedBytes|0;

  const k = dsId || 'unknown';
  if (!S.perDataset[k]) S.perDataset[k] = { files: 0, bytes: 0, decoded: 0 };
  S.perDataset[k].files   += 1;
  S.perDataset[k].bytes   += wireBytes|0;
  S.perDataset[k].decoded += decodedBytes|0;
}

function printAWSStats() {
  const S = window.AWS_STATS;
  const fmt = n => {
    const k=1024, u=['B','KB','MB','GB']; let i=0, x=n;
    while (x>=k && i<u.length-1) { x/=k; i++; }
    return `${x.toFixed(i?1:0)} ${u[i]}`;
  };
  console.table(Object.entries(S.perDataset).map(([id,v]) => ({
    dataset:id, files:v.files, wire:fmt(v.bytes), decoded:fmt(v.decoded)
  })));
  console.log(`[AWS STATS] files=${S.totalFiles} wire=${fmt(S.totalBytes)} decoded=${fmt(S.totalDecodedBytes)}`);
}

function resetAWSStats() {
  window.AWS_STATS = { totalFiles:0, totalBytes:0, totalDecodedBytes:0, perDataset:{} };
}


// GESTION PRECACHE
// --- Control global de cancelación de precargas ---
window.__PRECACHE__ = window.__PRECACHE__ || { currentId: 0 };
function cancelPrecache() {
  // Cancela cualquier trabajo en curso incrementando la versión
  window.__PRECACHE__.currentId++;
}



// WRAPPER INTERCEPTANDO WL ⇄ AWS con fallback bidireccional
(() => {
  let __decodeCanvas, __decodeCtx, __isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  const FAST_FIRST_FRAME_MS = 400;
  function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }




  // === CONFIG ===
  async function fetchByteTexture(url, datasetId) {
    // 1️⃣ Construimos candidatos: primero WEBP, luego PNG
    const candidates = [];
    if (/data\.byte\.png(\?|$)/.test(url)) {
      const webp = url.replace(/data\.byte\.png(\?|$)/, 'data.byte.webp$1');
      candidates.push(webp, url);       // primero WEBP, luego PNG original
    } else if (/\.png(\?|$)/.test(url)) {
      const webp = url.replace(/\.png(\?|$)/, '.webp$1');
      candidates.push(webp, url);
    } else {
      candidates.push(url);             // por si algún otro formato/lógica
    }

    let lastErr = null;
    let blob = null;
    let finalUrl = null;

    // 2️⃣ Intentamos cada URL en orden hasta que una funcione
    for (const u of candidates) {
      const resp = await fetch(u, { mode: 'cors' });
      if (resp.ok) {
        blob = await resp.blob();
        finalUrl = u;
        break;
      }
      lastErr = new Error(`AWS ${resp.status} – ${u}`);
    }

    // 3️⃣ Si ninguna ha funcionado, re-lanzamos el último error
    if (!blob) {
      throw lastErr || new Error(`AWS – no se pudo descargar ${url}`);
    }

    const wireBytes = blob.size | 0;

    if (!__decodeCanvas) {
      __decodeCanvas = document.createElement('canvas');
      __decodeCtx = __decodeCanvas.getContext('2d', { willReadFrequently: true });
    }

    let W, H;
    if (__isIOS) {
      const img = await new Promise((res, rej) => {
        const el = new Image();
        el.crossOrigin = 'anonymous';
        const objURL = URL.createObjectURL(blob);
        el.onload  = () => { URL.revokeObjectURL(objURL); res(el); };
        el.onerror = (e) => { URL.revokeObjectURL(objURL); rej(e); };
        el.src = objURL;
      });
      W = img.naturalWidth; H = img.naturalHeight;
      __decodeCanvas.width = W; __decodeCanvas.height = H;
      __decodeCtx.clearRect(0,0,W,H);
      __decodeCtx.drawImage(img, 0, 0);
    } else {
      const bmp = await createImageBitmap(blob);
      W = bmp.width; H = bmp.height;
      __decodeCanvas.width = W; __decodeCanvas.height = H;
      __decodeCtx.clearRect(0,0,W,H);
      __decodeCtx.drawImage(bmp, 0, 0);
      if (typeof bmp.close === 'function') bmp.close();
    }



    // const rgba = __decodeCtx.getImageData(0, 0, W, H).data;
    // const out  = new Uint8ClampedArray(W * H);
    // for (let i = 0, j = 0; i < rgba.length; i += 4, j++) out[j] = rgba[i]; // canal R

const rgba = __decodeCtx.getImageData(0, 0, W, H).data;

let out;
const id = datasetId || '';   // por si viene undefined
const isVector = VECTOR_DATASETS.has(id);

if (isVector) {
  // VECTOR: usamos R y G como (u, v)
  out = new Uint8ClampedArray(W * H * 2);
  for (let i = 0, j = 0; i < rgba.length; i += 4) {
    out[j++] = rgba[i];     // canal R -> u
    out[j++] = rgba[i + 1]; // canal G -> v
  }
} else {
  // ESCALAR: sólo canal R
  out = new Uint8ClampedArray(W * H);
  for (let i = 0, j = 0; i < rgba.length; i += 4, j++) {
    out[j] = rgba[i];       // canal R
  }
}




    if (!datasetId) {
      // OJO: usamos la URL FINAL (WEBP o PNG) para deducir el id
      const m = finalUrl.match(/\/data\/(.+?)\/\d{10}\/\d+\//);
      datasetId = m ? decodeURIComponent(m[1]) : 'unknown';
    }
    __awsStatsAdd(datasetId, wireBytes, out.byteLength);

    return { data: out, width: W, height: H };
  }








// --- CACHÉ DE TEXTURAS POR URL (LRU simple) ---
const __TEX_CACHE = new Map();  // key -> Promise<{data,width,height}>
const __LRU_KEYS = [];
const TEX_CACHE_MAX = 256;

function cacheKeyFromUrl(url) {
  try { const u = new URL(url); u.search = ''; return u.toString(); } 
  catch { return (url.split('?')[0] || url); }
}

async function cachedFetch(url, datasetId) {
  const key = cacheKeyFromUrl(url);
  if (__TEX_CACHE.has(key)) {
    // console.debug('[cache HIT]', key);
    return __TEX_CACHE.get(key);
  }
  // console.debug('[cache MISS]', key);
  const p = fetchByteTexture(url, datasetId)
    .catch(err => { __TEX_CACHE.delete(key); throw err; });

  __TEX_CACHE.set(key, p);
  __LRU_KEYS.push(key);
  if (__LRU_KEYS.length > TEX_CACHE_MAX) {
    const old = __LRU_KEYS.shift();
    __TEX_CACHE.delete(old);
  }
  return p;
}

// util para debug
window.__dumpTexCache = () => ({ size: __TEX_CACHE.size, keys: Array.from(__TEX_CACHE.keys()).slice(-10) });





  const AWS_CDN = 'https://d3kw1vf60gu3rr.cloudfront.net';
  // const SAFETY_LAG_HOURS = 6;                // espejo/seguridad
  const AWS_LEAD_MAX = 340;                   // 0..240 (123..240 saltos de 3h)
  const DEFAULT_BOUNDS = [-180, -90, 180, 90];










  // === helpers tiempo ===
  const HOUR_MS = 3600000;
  const pad2 = (n) => (n < 10 ? '0' + n : '' + n);

  function safeUTCDate(input) {
    if (!input) return null;
    if (input instanceof Date) return new Date(input.getTime());
    if (typeof input === 'string') {
      const d = new Date(input);
      return isNaN(d.getTime()) ? null : d;
    }
    if (typeof input === 'object') {
      const s = input.iso || input.datetime || input.date || input.time || null;
      if (s) {
        const d = new Date(s);
        return isNaN(d.getTime()) ? null : d;
      }
    }
    return null;
  }
  function truncateToUTC_Hour(d) {
    return new Date(Date.UTC(
      d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), 0, 0, 0
    ));
  }
  function latestSynopticRunUTC(dt) {
    const H = dt.getUTCHours();
    const hh = (H >= 18) ? 18 : (H >= 12) ? 12 : (H >= 6) ? 6 : 0;
    return new Date(Date.UTC(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate(), hh, 0, 0));
  }
  function mirrorMaxRunUTC(nowUTC = new Date()) {
    const t = new Date(nowUTC.getTime() - SAFETY_LAG_HOURS * HOUR_MS);
    return latestSynopticRunUTC(t);
  }
  function yyyymmddHHZ(d) {
    return `${d.getUTCFullYear()}${pad2(d.getUTCMonth() + 1)}${pad2(d.getUTCDate())}${pad2(d.getUTCHours())}`;
  }
  function computeRunLead(datetimeISOString) {
    let dt = safeUTCDate(datetimeISOString);
    if (!dt) dt = truncateToUTC_Hour(new Date());
    else dt = truncateToUTC_Hour(dt);

    const parentRun = latestSynopticRunUTC(dt);
    const maxRun = mirrorMaxRunUTC(new Date());
    const run = (parentRun.getTime() <= maxRun.getTime()) ? parentRun : maxRun;

    let lead = Math.floor((dt.getTime() - run.getTime()) / HOUR_MS);
    if (!Number.isFinite(lead) || lead < 0) lead = 0;

    return { run, lead, dt };
  }



// SAFETY_HOURS

function buildAwsManifestUrl(datasetId, runUTC) {
  const dsKey = datasetId.replace(/\//g, '_');
  return `${AWS_CDN}/manifests/${dsKey}/${runUTC}.json`;
}

/**
 * Elige un run "seguro" mirando el manifest en AWS.
 * Empieza por mirrorMaxRunUTC(nowUTC) y, si ese run NO está completed,
 * prueba run-6h, run-12h, ... hasta maxBackRuns.
 */
async function pickSafeMirrorMaxRunUTC(datasetId, nowUTC = new Date(), maxBackRuns = 2) {
  for (let back = 0; back <= maxBackRuns; back++) {
    const shiftedNow = new Date(nowUTC.getTime() - back * 6 * HOUR_MS);
    const candidateRunUTC = mirrorMaxRunUTC(shiftedNow);
    const manifestUrl = buildAwsManifestUrl(datasetId, candidateRunUTC);

    try {
      const res = await fetch(manifestUrl, { cache: 'no-store' });
      if (!res.ok) continue;

      const manifest = await res.json();
      if (manifest && manifest.completed) {
        // 👌 Este run está completo en tu AWS
        return { runUTC: candidateRunUTC, manifest };
      }
    } catch (err) {
      console.warn('[SAFE_RUN] Error leyendo manifest', manifestUrl, err);
    }
  }

  // Fallback: no hemos encontrado ningún run "completed"
  const fallbackRunUTC = mirrorMaxRunUTC(nowUTC);
  return { runUTC: fallbackRunUTC, manifest: null };
}










  function clamp(n, lo, hi){ return Math.min(hi, Math.max(lo, n)); }

function quantizeLeadDown(L){
  // múltiplos de 3h hacia abajo
  const q = 3 * Math.floor(L / 3);
  return clamp(q, 0, AWS_LEAD_MAX);
}

function quantizeLeadUp(L){
  // múltiplos de 3h hacia arriba
  const q = 3 * Math.ceil(L / 3);
  return clamp(q, 0, AWS_LEAD_MAX);
}

function nextValidLeadAfter(L){
  // siguiente slot 3h
  return clamp(quantizeLeadDown(L) + 3, 0, AWS_LEAD_MAX);
}


  // === CARGA DESDE AWS (reutilizable) ===


// === Paso de 3h fijo (WL-style) ===
const STEP_H  = 3;
// const HOUR_MS = 3600000;
const STEP_MS = STEP_H * HOUR_MS;

function clamp(n, lo, hi){ return Math.min(hi, Math.max(lo, n)); }

// lead “a múltiplos de 3h” hacia abajo/arriba
function stepLeadFloor(lead){ 
  lead = Math.floor(lead);
  return STEP_H * Math.floor(lead / STEP_H); // 0,3,6,...
}
function stepLeadCeil(lead){
  lead = Math.floor(lead);
  return STEP_H * Math.ceil(lead / STEP_H);  // 0,3,6,... (ceil)
}

// Dada una fecha dt, devuelve {run, lead} del slot de 3h inferior
function slotDown(dtISO){
  const { run, lead, dt } = computeRunLead(dtISO);
  return { run, dt, lead: stepLeadFloor(lead) };
}

// Dada una fecha dt, devuelve {run, lead} del slot de 3h superior
function slotUp(dtISO){
  const { run, lead, dt } = computeRunLead(dtISO);
  return { run, dt, lead: stepLeadCeil(lead) };
}

// Peso WL clásico: fracción exacta entre dos slots de 3h
function computeWLWeight(dtRaw, run0, L0, run1, L1){
  const t0 = new Date(run0.getTime() + L0 * HOUR_MS).getTime();
  const t1 = new Date(run1.getTime() + L1 * HOUR_MS).getTime();
  const dt = (dtRaw instanceof Date) ? dtRaw.getTime() : new Date(dtRaw).getTime();
  const denom = Math.max(1, t1 - t0); // normalmente 3h
  return clamp((dt - t0) / denom, 0, 1);
}


// === CARGA DESDE AWS con lógica WL (frames a 3h + weight exacto) ===
async function loadFromAWS(id, datetimeISOString) {

  // const nowUTC = new Date();
  // const inVulnerableWindow = ((nowUTC.getUTCHours() % 6) === 0) && (nowUTC.getUTCMinutes() < 60);

  // const maxBackRuns = inVulnerableWindow ? 4 : 2;
  // const safe = await pickSafeMirrorMaxRunUTC(id, nowUTC, maxBackRuns);
  // const safeRunUTC = safe.runUTC; // string YYYYMMDDHH



  // 1) Frame base (L0): múltiplo de 3h <= dt
  let { run: run0, dt: dt0, lead: L0 } = slotDown(datetimeISOString);
  let  runUTC0 = yyyymmddHHZ(run0);

  // 2) Frame superior (L1): múltiplo de 3h >= dt
  let { run: run1, dt: dt1, lead: L1 } = slotUp(datetimeISOString);
  let runUTC1 = yyyymmddHHZ(run1);

  // Si no “avanza” (pasa cuando dt ya cae exacto en múltiplo), fuerza +3h
  if (runUTC1 === runUTC0 && L1 === L0) {
    const dtPlus = new Date(dt0.getTime() + STEP_MS);
    const up = slotUp(dtPlus.toISOString());
    run1 = up.run; dt1 = up.dt; L1 = up.lead;
    runUTC1 = yyyymmddHHZ(run1);
  }

    // ✅ CLAVE: evitar f000 en datasets que no lo soportan (APCP)
  const minLead = AWS_DATASETS[id]?.minLead ?? 0;
  if (L0 < minLead) L0 = minLead;
  if (L1 < minLead) L1 = minLead;

  const url0 = awsByteUrl(id, runUTC0, L0);
  const url1 = awsByteUrl(id, runUTC1, L1);

  // Descarga en paralelo
  const fetcher = (u) =>
    (typeof cachedFetch === 'function') ? cachedFetch(u, id) : fetchByteTexture(u, id);

  const [image, image2] = await Promise.all([
    fetcher(url0),
    fetcher(url1)
  ]);

  // Peso estilo WL: fracción real entre t0 y t1
  const imageWeight = computeWLWeight(datetimeISOString, run0, L0, run1, L1);

  // Meta para WL layers
  const imageUnscale = AWS_DATASETS[id]?.defaultUnscale ?? null;
  const bounds = DEFAULT_BOUNDS;

 

  const isVector = VECTOR_DATASETS.has(id);
  const imageType = isVector ? 'VECTOR' : 'SCALAR';

  return {
    image,
    image2,
    imageWeight,
    imageType,
    imageUnscale,
    bounds
  };
}










// Para alternar desde consola: setBlendEnabled(true/false)
window.setBlendEnabled = (on) => {
  __NO_BLEND = !on ? true : false;
  console.log('[blend] temporal blending', __NO_BLEND ? 'DISABLED' : 'ENABLED');
};

// Resta `hours` horas a un Date / string ISO y devuelve ISO
function shiftISOStringHours(datetimeISOString, hours) {
  if (!datetimeISOString) return datetimeISOString;

  let d;
  if (datetimeISOString instanceof Date) {
    d = new Date(datetimeISOString.getTime());
  } else {
    d = new Date(datetimeISOString);
  }

  if (!Number.isFinite(d.getTime())) {
    // si no se puede parsear, lo devolvemos tal cual
    return datetimeISOString;
  }

  d.setTime(d.getTime() - hours * 3600000);
  return d.toISOString();
}







  // --- Override principal con políticas WL/AWS y fallbacks ---
  const orig = client.loadDatasetData.bind(client);

  // client.loadDatasetData = async (dataset, datetimeISOString, options = {}) => {

  //   console.log('AWS/WL loadDatasetData Time', datasetId(dataset), datetimeISOString);
  //   const id = datasetId(dataset);
  //   const inAWS = !!AWS_DATASETS[id];
  //   const wlFirst = WL_FIRST_DATASETS.has(id);

  //   // POLÍTICA 1: Capas “editadas” → WL primero, fallback AWS (si existe)
  //   if (wlFirst) {
  //     try {
  //       return await orig(dataset, datetimeISOString, options);
  //     } catch (eWL) {
  //       console.warn('[WL→AWS fallback]', id, eWL);
  //       if (!inAWS) throw eWL; // No hay AWS para esta capa
  //       try {
  //         // Para AWS usamos nuestro blend → desactiva interpolate
  //         return await loadFromAWS(id, datetimeISOString);
  //       } catch (eAWS) {
  //         const err = new Error(`WL y AWS fallaron para ${id}`);
  //         err.wl = eWL; err.aws = eAWS;
  //         throw err;
  //       }
  //     }
  //   }

  //   // POLÍTICA 2: Resto de capas → AWS primero (si existe), fallback WL
  //   if (inAWS) {
  //     try {
  //       return await loadFromAWS(id, datetimeISOString);
  //     } catch (eAWS) {
  //       console.warn('[AWS→WL fallback]', id, eAWS);
  //       try {
  //         return await orig(dataset, datetimeISOString, options);
  //       } catch (eWL) {
  //         const err = new Error(`AWS y WL fallaron para ${id}`);
  //         err.aws = eAWS; err.wl = eWL;
  //         throw err;
  //       }
  //     }
  //   }

  //   // POLÍTICA 3: No tenemos dataset en AWS → WL directo
  //   return orig(dataset, datetimeISOString, options);
  // };

    const __WL_ORIG_LOAD = client.loadDatasetData.bind(client); // por si algún día lo quieres para debug

  // ========= MODO AISLADO: SOLO AWS, NADA DE WL =========
  
  client.loadDatasetData = async (dataset, datetimeISOString, options = {}) => {
    let id = datasetId(dataset);

//  if (id === 'gfs/temperature_500mb' && window.NOAA) {
//     id = 'gfs/temperature_500mb_noaa'
//   }

//    if (id === 'gfs/precipitable_water_entire_atmosphere' && window.NOAA) {
//     id = 'gfs/pwat_noaa'
//   }

//     if (id === 'gfs/precipitation_3h_accumulation_surface' && window.NOAA) {
//     id = 'gfs/apcp3h_noaa'
//   }

//     if (id === 'gfs/cloud_cover_entire_atmosphere' && window.NOAA) {
//     id = 'gfs/tcdc_noaa'
//   }


   if (id ===  'gfs/temperature_2m_above_ground' && window.NOAA) {
    id =  'gfs/temperature_2m'
  }


//   if (id ===   'gfs/pressure_mean_sea_level' && window.NOAA) {
//     id =   'gfs/pressure_mean_sea_level_noaa'
//   }

// if (id ===   'gfs/reflectivity_1000m_above_ground' && window.NOAA) {
//     id =   'gfs/reflectivity_1000m_above_ground_noaa'
//   }

// if (id ===   'gfs/geopotential_height_500mb' && window.NOAA) {
//     id =   'gfs/geopotential_height_500mb_noaa'
//   }

// if (id ===   'gfs/snow_depth_surface' && window.NOAA) {
//     id =   'gfs/snow_depth_surface_noaa_200'
//   }

//   if (id ===   'gfs/snow_depth_surfacgfs/convective_available_potential_energy_surface' && window.NOAA) {
//     id =   'gfs/convective_available_potential_energy_surface_noaa'
//   }

//     if (id ===   'gfs/relative_humidity_2m_above_ground' && window.NOAA) {
//     id =   'gfs/relative_humidity_2m_above_ground_noaa'
//   }

     if (id === 'gfs/wind_10m_above_ground' && window.NOAA) {
    id =   'gfs/wind_10m_noaa'
  }


    const inAWS = !!AWS_DATASETS[id];

    console.log('[AWS ONLY] loadDatasetData', id, datetimeISOString);

    if (!inAWS) {
      // No existe en tu bucket → se salta el frame
      console.warn('[AWS only] Dataset NO espejado en AWS, se salta frame:', id);
      throw new Error(`Dataset ${id} not mirrored in AWS`);
    }

    // Toda la lógica de run/lead + blend está en loadFromAWS(id, dt)
    return await loadFromAWS(id, datetimeISOString);
  };


 // ========= MODO COMBINADO: SOLO AWS y WL =========

// client.loadDatasetData = async (dataset, datetimeISOString, options = {}) => {


//   // === DATETIME GLOBAL SEGURO (AWS + WL) ===
// const safeDtISO = shiftISOStringHours(
//   datetimeISOString,
//   SAFETY_LAG_HOURS || 6
// );



//   console.log('AWS/WL loadDatasetData Time', datasetId(dataset), datetimeISOString);
//    let id      = datasetId(dataset);

// //  if (id === 'gfs/temperature_500mb' && window.NOAA) {
// //     id = 'gfs/temperature_500mb_noaa'
// //   }

// //    if (id === 'gfs/precipitable_water_entire_atmosphere' && window.NOAA) {
// //     id = 'gfs/pwat_noaa'
// //   }

// //     if (id === 'gfs/precipitation_3h_accumulation_surface' && window.NOAA) {
// //     id = 'gfs/apcp3h_noaa'
// //   }

// //     if (id === 'gfs/cloud_cover_entire_atmosphere' && window.NOAA) {
// //     id = 'gfs/tcdc_noaa'
// //   }


//    if (id ===  'gfs/temperature_2m_above_ground' && window.NOAA) {
//     id =  'gfs/temperature_2m'
//   }


// //   if (id ===   'gfs/pressure_mean_sea_level' && window.NOAA) {
// //     id =   'gfs/pressure_mean_sea_level_noaa'
// //   }

// // if (id ===   'gfs/reflectivity_1000m_above_ground' && window.NOAA) {
// //     id =   'gfs/reflectivity_1000m_above_ground_noaa'
// //   }

// // if (id ===   'gfs/geopotential_height_500mb' && window.NOAA) {
// //     id =   'gfs/geopotential_height_500mb_noaa'
// //   }

// // if (id ===   'gfs/snow_depth_surface' && window.NOAA) {
// //     id =   'gfs/snow_depth_surface_noaa_200'
// //   }

// //   if (id ===   'gfs/snow_depth_surfacgfs/convective_available_potential_energy_surface' && window.NOAA) {
// //     id =   'gfs/convective_available_potential_energy_surface_noaa'
// //   }

// //     if (id ===   'gfs/relative_humidity_2m_above_ground' && window.NOAA) {
// //     id =   'gfs/relative_humidity_2m_above_ground_noaa'
// //   }

//       if (id === 'gfs/wind_10m_above_ground' && window.NOAA) {
//    id =   'gfs/wind_10m_noaa'
//  }

// //        if (id === 'gfs/wind_gust_surface' && window.NOAA) {
// //    id =   'gfs/wind_gust_noaa'
// //  }


//   const inAWS   = !!AWS_DATASETS[id];
//   const wlFirst = WL_FIRST_DATASETS.has(id);

//   // ⬇️ NUEVO: versión “segura” para WL (dt - SAFETY_LAG_HOURS)
//   const wlDtISO = shiftISOStringHours(datetimeISOString, SAFETY_LAG_HOURS || 6);
//  console.log('AWS/WL loadDatasetData Time', datasetId(dataset), wlDtISO);
//   // POLÍTICA 1: Capas “editadas” → WL primero, fallback AWS (si existe)
//   if (wlFirst) {
//     try {
//       // WL usa datetime - 6h
//       return await orig(dataset, wlDtISO, options);
//     } catch (eWL) {
//       console.warn('[WL→AWS fallback]', id, eWL);
//       if (!inAWS) throw eWL; // No hay AWS para esta capa
//       try {
//         // AWS sigue usando la hora original del slider
//       //  return await loadFromAWS(id, datetimeISOString);
//         return await loadFromAWS(id, safeDtISO);

//       } catch (eAWS) {
//         const err = new Error(`WL y AWS fallaron para ${id}`);
//         err.wl  = eWL;
//         err.aws = eAWS;
//         throw err;
//       }
//     }
//   }

//   // POLÍTICA 2: Resto de capas → AWS primero (si existe), fallback WL
//   if (inAWS) {
//     try {
//       // AWS primero con hora original
//     //  return await loadFromAWS(id, datetimeISOString);
//       return await loadFromAWS(id, safeDtISO);
//     } catch (eAWS) {
//       console.warn('[AWS→WL fallback]', id, eAWS);
//       try {
//         // Fallback WL con datetime - 6h
//       //  return await orig(dataset, wlDtISO, options);
//         return await orig(dataset, safeDtISO, options);
      
//       } catch (eWL) {
//         const err = new Error(`AWS y WL fallaron para ${id}`);
//         err.aws = eAWS;
//         err.wl  = eWL;
//         throw err;
//       }
//     }
//   }

//   // POLÍTICA 3: No tenemos dataset en AWS → WL directo
//   // Siempre WL con datetime - 6h
//   return orig(dataset, wlDtISO, options);
// };





})();




//  window.__FORCE_BLEND = { enabled: true, weight: 0.75, forceTwoFrames: true };


function fitPaletteToDomain(stops, [umin, umax]) {
  // clamp + ordena + quita duplicados (WL puede ignorar paletas con stops fuera)
  const clamped = stops.map(([v, col]) => [Math.min(umax, Math.max(umin, v)), col]);
  clamped.sort((a,b) => a[0]-b[0]);
  return clamped.filter((s,i,a) => i===0 || s[0] !== a[i-1][0]);
}

function sampleTexture(image, imageUnscale) {
  if (!(image && image.data)) return null;
  let minB=255, maxB=0;
  const step = Math.max(1, Math.floor(image.data.length/50000));
  for (let i=0; i<image.data.length; i+=step) { const b = image.data[i]; if (b<minB) minB=b; if (b>maxB) maxB=b; }
  const [umin, umax] = Array.isArray(imageUnscale) ? imageUnscale : [4710,6000];
  const toVal = b => umin + (b/255)*(umax-umin);
  return {minB, maxB, minVal: toVal(minB), maxVal: toVal(maxB)};
}

   // =============== 2) LRU & CACHÉ =========================

    if (__WL_IS_IPHONE) {
      window.__WL_LRU = __makeLRU(60);
      window.__WL_CACHE_MODE = window.__WL_LRU;
    }
    // Minimal LRU for WeatherLayers Client cache param
    function __makeLRU(max = 340) {
      const map = new Map();
      return {
        has: (k) => map.has(k),
        get: (k) => {
          if (!map.has(k)) return undefined;
          const v = map.get(k);
          map.delete(k); map.set(k, v);
          return v;
        },
        set: (k, v) => {
          if (map.has(k)) map.delete(k);
          map.set(k, v);
          if (map.size > max) {
            const firstKey = map.keys().next().value;
            map.delete(firstKey);
          }
          return true;
        },
        get size() { return map.size; }
      };
    }

    // Small helper to merge cache option
    function __wlOpts(extra) {
      const base = { cache: window.__WL_CACHE_MODE };
      return extra ? Object.assign({}, extra, base) : base;
    }


    // Precargas 6h

    // === Rolling silent prefetch (6h) ===
const ROLLING_HOURS = 6;
const ROLLING_PARALLEL = __WL_IS_IPHONE ? 1 : 2;
let __rolling = { dataset: null, lastIdx: -1 };


  initMap(client);

  

  function initMap(client) {


window.addEventListener('DOMContentLoaded', async () => {

    WeatherLayersClient.setLibrary('geotiff', GeoTIFF);

  function toggleMiniView() {
  const iframe = document.getElementById("mini-frame");
  iframe.style.display = iframe.style.display === "none" ? "block" : "none";
  }

  function setHeaderTimeLabelEN(dt) {
  const d = typeof dt === 'string' ? new Date(dt) : dt;
  const s = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true   // fuerza AM/PM como en la animación
  }).format(d);
  document.getElementById('local-datetime').innerText = s;
  
}

// let pointerStickyLngLat = null;
const pointerCalloutEl = document.getElementById('pointer-callout');
const pointerCalloutElFlecha = document.getElementById('pointer-wire');

// const weatherLayers = {
		   
//         "precipitation": {
//           "layer": null,
//           "value": "value",
//           "units": "mm"
//         }, 
		  
//         "radar": {
//           "layer": null,
//           "value": "value",
//           "units": "dBZ"
//         },
//         "pressure": {
//           "layer": null,
//           "value": "value",
//           "units": " hPa"
//         },
//         "clouds": {
//           "layer": null,
//           "value": "value",
//           "units": " %"
//         },
//         "temperature": {
//           "layer": null,
//           "value": "value",
//           "units": "°"
//         },
//         "wind": {
//           "layer": null,
//           "value": "speedMetersPerSecond",
//           "units": " m/s"
//         }, 
//         "cold": {
//           "layer": null,
//           "value": "value",
//           "units": "°C"
//         }, 
//       };

      function getMapDate() {
  const wl = weatherLayers[activeLayer]?.layer;
  const tSec = wl?.getAnimationTime?.();
  if (typeof tSec === "number") return new Date(tSec * 1000);
  // Fallback: si guardas el tiempo del slider en ms
  if (window.currentMapTimeMs) return new Date(window.currentMapTimeMs);
  return new Date();
}

// --- Construye el HTML con los datos en ese punto (adapta a tu UI) ---
// function renderPointerInfoHTML(lngLat) {
//   const [lng, lat] = Array.isArray(lngLat) ? lngLat : [lngLat.lng, lngLat.lat];
//   const wl = weatherLayers[activeLayer]?.layer;

//   // Valor de la capa activa (usa tu lógica de unidades)
//   let main = '';
//   const pick = wl?.pickAt?.(lng, lat);
//   if (pick ) {

//   console.info("Active Layer", activeLayer);
//    console.info("Value", pick.speedKilometersPerHour);

  
  
//     if (activeLayer === 'temp2m') main = `${pick.value.toFixed(1)}`;
//     else if (activeLayer === 'precipitation') main = `${pick.value.toFixed(1)} `;
//     else if (activeLayer === 'radar') main = `${pick.value.toFixed(0)} `;
//     else if (activeLayer === 'wind') main = `${pick.speedKilometersPerHour.toFixed(1)} `;

//     else main = `${pick.value.toFixed(2)}`;
//   }

//   // Hora del mapa (si quieres mostrarla)
//   const dt = getMapDate();
//   const hh = String(dt.getUTCHours()).padStart(2,'0');
//   const mm = String(dt.getUTCMinutes()).padStart(2,'0');

//   return `${main} `;
// }

function renderPointerInfoHTML(lngLat) {
  const [lng, lat] = Array.isArray(lngLat) ? lngLat : [lngLat.lng, lngLat.lat];
  const wl = weatherLayers[activeLayer]?.layer;

  let main = '';
  const pick = wl?.pickAt?.(lng, lat);
  if (pick) {
    // TEMPERATURA 2 m
    if (activeLayer === 'temperature') {
      const c = pick.value; // asumimos que viene en ºC
      if (constUni === WeatherLayers.UnitSystem.IMPERIAL) {
        const f = c * 9 / 5 + 32;
        main = `${f.toFixed(1)} `;
      } else {
        // METRIC y METRIC_KILOMETERS, NAUTICAL → siempre ºC
        main = `${c.toFixed(1)} `;
      }

    // PRECIPITACIÓN
    } else if (activeLayer === 'precipitation') {
      const mm = pick.value; // mm/h o mm acumulados
      if (constUni === WeatherLayers.UnitSystem.IMPERIAL) {
        const inches = mm / 25.4;
        main = `${inches.toFixed(2)} `;
      } else {
        main = `${mm.toFixed(1)} `;
      }

    // RADAR
    } else if (activeLayer === 'radar') {
      main = `${pick.value.toFixed(0)} `;

    // VIENTO SUPERFICIAL
    } else if (activeLayer === 'wind') {
      const kph = (typeof pick.speedKilometersPerHour === 'number')
        ? pick.speedKilometersPerHour
        : pick.value;

      let v = kph;
      let unitLabel = '';

      if (constUni === WeatherLayers.UnitSystem.METRIC) {
        v = kph / 3.6;          // km/h → m/s
        unitLabel = '';
      } else if (constUni === WeatherLayers.UnitSystem.IMPERIAL) {
        v = kph / 1.609344;     // km/h → mph
        unitLabel = '';
      } else if (constUni === WeatherLayers.UnitSystem.NAUTICAL) {
        v = kph / 1.852;        // km/h → kt
        unitLabel = '';
      }
      main = `${v.toFixed(1)} ${unitLabel}`;

    // RESTO DE CAPAS
    } else {
      main = `${pick.value.toFixed(2)}`;
    }
  }

  return `${main}`;
}






// cloudcoverPress()

function updatePointerWire(dir, boxLeft, boxTop, boxWidth, boxHeight) {
  const svg = document.getElementById('pointer-wire');
  const halo = document.getElementById('wire-halo');
  const wire = document.getElementById('wire');
  if (!svg || !wire || !halo || !pointerStickyLngLat) {
    if (svg) svg.style.display = 'none';
    return;
  }

  // tamaño del contenedor del mapa
  const cont = map.getContainer().getBoundingClientRect();
  const w = cont.width, h = cont.height;

  // dimensiona el svg al tamaño del mapa
  svg.setAttribute('width', w);
  svg.setAttribute('height', h);
  svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
  svg.style.display = 'block';

  // punto 1: la cruceta (coordenadas de pantalla)
  const p = map.project(pointerStickyLngLat);

  // punto 2: esquina de la caja según la orientación (dir: 'ne','nw','se','sw')
  // boxLeft/Top/Width/Height son coords en px relativos al viewport.
  // Pasamos a coords relativas al contenedor del mapa:
  const bx = boxLeft  - cont.left;
  const by = boxTop   - cont.top;
  const bw = boxWidth, bh = boxHeight;
  const tailHalf = 0; // mismo offset que la “punta”

  let ax = bx, ay = by;
  switch (dir) {
    case 'ne': // esquina bottom-left
      ax = bx - tailHalf;
      ay = by + bh - tailHalf;
      break;
    case 'nw': // esquina bottom-right
      ax = bx + bw - tailHalf;
      ay = by + bh - tailHalf;
      break;
    case 'se': // esquina top-left
      ax = bx - tailHalf;
      ay = by - tailHalf;
      break;
    case 'sw': // esquina top-right
      ax = bx + bw - tailHalf;
      ay = by - tailHalf;
      break;
  }

  // pinta la línea (dos pasadas: halo + línea)
  for (const line of [halo, wire]) {
    line.setAttribute('x1', p.x);
    line.setAttribute('y1', p.y);
    line.setAttribute('x2', ax);
    line.setAttribute('y2', ay);
  }
}


// --- Coloca la banderita junto al punto, preferentemente arriba-derecha ---
function positionPointerCallout() {

  if (!pointerStickyLngLat || !pointerCalloutEl) return;
  // si está oculto, no lo fuerces a mostrarse
  if (pointerCalloutEl.style.display === 'none') return;
 console.info("Llego aqui 2");

  const p = map.project(pointerStickyLngLat);
  const containerRect = map.getContainer().getBoundingClientRect();

  // mide la caja (después de haberle puesto el texto)
  const er = pointerCalloutEl.getBoundingClientRect();
  const margin = 12;

  // posición ideal: arriba-dcha (ne)
  let x = p.x + margin;
  let y = p.y - er.height - margin;
  let dir = 'ne';

  // corrige si se sale por derecha/arriba
  if (x + er.width > containerRect.width - 8) { x = p.x - er.width - margin; dir = dir.replace('e','w'); }
  if (y < 8) { y = p.y + margin; dir = dir.replace('n','s'); }

  pointerCalloutEl.classList.remove('dir-ne','dir-nw','dir-se','dir-sw');
  pointerCalloutEl.classList.add('dir-' + dir);
  pointerCalloutEl.style.left = `${x}px`;
  pointerCalloutEl.style.top  = `${y}px`;
  pointerCalloutEl.style.display = 'block';

  // 🔗 dibuja/actualiza la línea
  updatePointerWire(dir, x + containerRect.left, y + containerRect.top, er.width, er.height);
}



// --- Actualiza el contenido de la banderita con el tiempo/capa actual ---

// === Auto-hide del pointer (tooltip WL) ===
let __pointerHideTimer = null;
const POINTER_AUTOHIDE_MS = 1500; // ~3s

function schedulePointerAutoHide() {
  if (__pointerHideTimer) clearTimeout(__pointerHideTimer);
  __pointerHideTimer = setTimeout(() => {
    // Si está fijado/pinned, no lo ocultes
    if (typeof tooltipPinned !== 'undefined' && tooltipPinned) return;
    try {
       pointerStickyLngLat = null;
  if (pointerCalloutEl) pointerCalloutEl.style.display = 'none'; // oculta el tooltip WL
    } catch (_) {}
  }, POINTER_AUTOHIDE_MS);
}

function cancelPointerAutoHide() {
  if (__pointerHideTimer) {
    clearTimeout(__pointerHideTimer);
    __pointerHideTimer = null;
  }
}



function refreshPointerCalloutContent() {

  if (!pointerStickyLngLat || !pointerCalloutEl) return;

 console.info("llego aqui");
  pointerCalloutEl.innerHTML = renderPointerInfoHTML(pointerStickyLngLat);
  positionPointerCallout();
}

// --- API para mostrar/ocultar ---
function showPointerCallout(lngLat) {

  // asegura referencias al DOM
  if (!window.pointerCalloutEl) {
    window.pointerCalloutEl = document.getElementById('pointer-callout');
    
  }
  if (!window.pointerCalloutEl) {
    console.warn('pointer-callout no existe en el DOM');
    return;
  }

   console.info("lngLat", lngLat);

  pointerStickyLngLat = Array.isArray(lngLat) ? { lng: lngLat[0], lat: lngLat[1] } : lngLat;
  pointerCalloutEl.style.display = 'block';
  
  console.info("pointerStickyLngLat", pointerStickyLngLat);
  
  refreshPointerCalloutContent();
  schedulePointerAutoHide();
}


function hidePointerCallout() {
  pointerStickyLngLat = null;
  if (pointerCalloutEl) pointerCalloutEl.style.display = 'none';
}


    // const pointerDataDiv = document.getElementById("pointer-data");
    // let pointerLngLat = null;
    // let lastPointerValue = ""; // Nueva variable para cache
    // let fixedCrosshair = false; 

// loadSelectedDatetime()

    // Capas cuya info ya se ha mostrado en el panel
// const shownInfoLayers = new Set();

const INFO_SEEN_STORAGE_KEY = "climatok:seenInfoLayers:v1";

function loadSeenInfoLayers() {
  try {
    const raw = localStorage.getItem(INFO_SEEN_STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return new Set();
    return new Set(arr.filter(x => typeof x === "string" && x.length));
  } catch {
    return new Set();
  }
}

function saveSeenInfoLayers(set) {
  try {
    localStorage.setItem(INFO_SEEN_STORAGE_KEY, JSON.stringify(Array.from(set)));
  } catch {
    // no rompemos nada si falla
  }
}

let shownInfoLayers = loadSeenInfoLayers();



    let currentDataset = "gfs/precipitation_1h_accumulation_surface";
    let opacity = 0.9;
    let windOpacity = 0.30;
    let windOpacityGlobal = 0.70;
    // const initWeatherLayer = "cold";
    // let activeLayer = null;
    // let isPlaying = false;
    // let currentTime = null;
    // let playfactor = 3600;
    let startTimePre = null;
    let actualTime = null;
    let contourVisible = true;
    let contourNoVisibleAllways = false;
    let contourUser = true;
    let dataLayer = false;
    let dataLayerUser = false;
    let highValuesVisible = false;
    let highValuesVisibleUser = true;
    let highValuesVisibleAllways = false;
  
    let timelineControl = null;
    let timelineError = false;


    let overlayVisible = true;                     // si quieres separar de cloudVisible
    


    let cloudVisible = true;
    let windVisible = true;
    let windVisibleOnMaptiler = false;

    const rangeMax = 340 ;
    const intervalOptions = ["1h", "3h", "6h"];
    let currentIntervalIndex = 0;
    let selectedInterval = intervalOptions[currentIntervalIndex];
    var constUni =  WeatherLayers.UnitSystem.METRIC_KILOMETERS;
   // let dataModel = 'GFS';

    if (dataModel == 'GFS') {
      currentDataset = 'gfs/reflectivity_1000m_above_ground';

    



    } else {
      currentDataset = 'ecmwf_ifs/pressure_mean_sea_level';
    }






// Diccionario de equivalencias entre GFS y ECMWF
const datasetMap = {
  // presión
  "gfs/pressure_mean_sea_level": "ecmwf_ifs/pressure_mean_sea_level",

  // viento 10m
  "gfs/wind_10m_above_ground": "ecmwf_ifs/wind_10m_above_ground",

  // nubosidad
  "gfs/cloud_cover_entire_atmosphere": "ecmwf_aifs/total_cloud_cover",

  // temperatura
  "gfs/temperature_2m_above_ground": "ecmwf_ifs/temperature_2m_above_ground",

  // CAPE
  "gfs/convective_available_potential_energy_surface": "ecmwf_ifs/convective_available_potential_energy_surface",

  // geopotencial
  "gfs/geopotential_height_500mb": "ecmwf_ifs/geopotential_height_500mb"
};

// Crear el mapa inverso (ECMWF → GFS)
const datasetMapInverse = Object.fromEntries(
  Object.entries(datasetMap).map(([gfs, ecmwf]) => [ecmwf, gfs])
);

// window.addEventListener('DOMContentLoaded', async () => {

// Utilidades

function showPrefetchUI(total){
  const box = document.getElementById('prefetchOverlay');
  const bar = document.getElementById('pfBar');
  const pct = document.getElementById('pfPct');
  const hint = document.getElementById('pfHint');
  bar.max = total; bar.value = 0; pct.textContent = '0%';
  hint.textContent = '';
  box.style.display = 'block';
}
function updatePrefetchUI(done,total,label){
  const bar = document.getElementById('pfBar');
  const pct = document.getElementById('pfPct');
  const hint = document.getElementById('pfHint');
  bar.value = done;
  pct.textContent = Math.round(done*100/total) + '%';
  if (label) hint.textContent = label;
}
function hidePrefetchUI(){
  const box = document.getElementById('prefetchOverlay');
  box.style.display = 'none';
}

// Caché en RAM por URL (evita descargas duplicadas; si ya existe, conserva la tuya)
const AWS_CACHE = window.AWS_CACHE || new Map();
function getAWSTexture(url){
  let p = AWS_CACHE.get(url);
  if (!p) {
    p = fetchByteTexture(url).catch(err => { AWS_CACHE.delete(url); throw err; });
    AWS_CACHE.set(url, p);
  }
  return p;
}

// === Time utils (globales, deben existir antes de buildFramePlan) ===
const HOUR_MS = 3600000;
const pad2 = n => (n < 10 ? '0' + n : '' + n);

// Acepta Date, ISO string, o {iso|datetime|date|time}
function safeUTCDate(input) {
  if (!input) return null;
  if (input instanceof Date) return new Date(input.getTime());
  if (typeof input === 'string') {
    const d = new Date(input);
    return isNaN(d.getTime()) ? null : d;
  }
  if (typeof input === 'object') {
    const s = input.iso || input.datetime || input.date || input.time || null;
    if (s) {
      const d = new Date(s);
      return isNaN(d.getTime()) ? null : d;
    }
  }
  return null;
}

function truncateToUTC_Hour(d) {
  return new Date(Date.UTC(
    d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), 0, 0, 0
  ));
}

// 00/06/12/18Z más cercano por detrás
function latestSynopticRunUTC(dt) {
  const H = dt.getUTCHours();
  const hh = (H >= 18) ? 18 : (H >= 12) ? 12 : (H >= 6) ? 6 : 0;
  return new Date(Date.UTC(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate(), hh, 0, 0));
}

// Respeta tu “lag” de seguridad (usa la constante global que ya tienes)
function mirrorMaxRunUTC(nowUTC = new Date()) {
  const SAFETY = (typeof SAFETY_LAG_HOURS === 'number') ? SAFETY_LAG_HOURS : 12;
  const t = new Date(nowUTC.getTime() - SAFETY * HOUR_MS);
  return latestSynopticRunUTC(t);
}

function yyyymmddHHZ(d) {
  return `${d.getUTCFullYear()}${pad2(d.getUTCMonth()+1)}${pad2(d.getUTCDate())}${pad2(d.getUTCHours())}`;
}

// {run, lead, dt} robusto y sin NaN
function computeRunLead(datetimeISOString) {
  let dt = safeUTCDate(datetimeISOString);
  dt = dt ? truncateToUTC_Hour(dt) : truncateToUTC_Hour(new Date());

  const parentRun = latestSynopticRunUTC(dt);
  const maxRun    = mirrorMaxRunUTC(new Date());
  const run       = (parentRun.getTime() <= maxRun.getTime()) ? parentRun : maxRun;

  let lead = Math.floor((dt.getTime() - run.getTime()) / HOUR_MS);
  if (!Number.isFinite(lead) || lead < 0) lead = 0;

  return { run, lead, dt };
}


// === Paso de 3h fijo (WL-style) ===
const STEP_H  = 3;
// const HOUR_MS = 3600000;
const STEP_MS = STEP_H * HOUR_MS;

function clamp(n, lo, hi){ return Math.min(hi, Math.max(lo, n)); }

// lead “a múltiplos de 3h” hacia abajo/arriba
function stepLeadFloor(lead){ 
  lead = Math.floor(lead);
  return STEP_H * Math.floor(lead / STEP_H); // 0,3,6,...
}
function stepLeadCeil(lead){
  lead = Math.floor(lead);
  return STEP_H * Math.ceil(lead / STEP_H);  // 0,3,6,... (ceil)
}

// Dada una fecha dt, devuelve {run, lead} del slot de 3h inferior
function slotDown(dtISO){
  const { run, lead, dt } = computeRunLead(dtISO);
  return { run, dt, lead: stepLeadFloor(lead) };
}

// Dada una fecha dt, devuelve {run, lead} del slot de 3h superior
function slotUp(dtISO){
  const { run, lead, dt } = computeRunLead(dtISO);
  return { run, dt, lead: stepLeadCeil(lead) };
}

// Peso WL clásico: fracción exacta entre dos slots de 3h
function computeWLWeight(dtRaw, run0, L0, run1, L1){
  const t0 = new Date(run0.getTime() + L0 * HOUR_MS).getTime();
  const t1 = new Date(run1.getTime() + L1 * HOUR_MS).getTime();
  const dt = (dtRaw instanceof Date) ? dtRaw.getTime() : new Date(dtRaw).getTime();
  const denom = Math.max(1, t1 - t0); // normalmente 3h
  return clamp((dt - t0) / denom, 0, 1);
}




// Construye la lista de frames (URL + meta) para 120 horas desde 'startISO'
function buildFramePlan(datasetId, startISO, hours=120){
  const plan = [];
  let dt = safeUTCDate(startISO) || new Date();
  dt = truncateToUTC_Hour(dt);

  for (let h=0; h<hours; h++){
    const { run, lead } = computeRunLead(dt.toISOString());
    const runUTC = yyyymmddHHZ(run);
    const L = Math.max(0, Math.min(lead, AWS_LEAD_MAX));
    const url = awsByteUrl(datasetId, runUTC, L);
    plan.push({ dt: new Date(dt), runUTC, lead: L, url });
    dt = new Date(dt.getTime() + HOUR_MS);
  }
  return plan;
}

// Prefetch con concurrencia y progreso; cancelable
let __prefetchToken = 0;
async function prefetchFrames(plan, {concurrency=6, onProgress}={}){
  const token = ++__prefetchToken;
  let done = 0, total = plan.length, i = 0;
  onProgress && onProgress(done,total);

  async function worker(){
    while (i < total && token === __prefetchToken){
      const idx = i++;
      try { await getAWSTexture(plan[idx].url); } catch(e) {}
      done++;
      onProgress && onProgress(done, total, `${plan[idx].runUTC}+${plan[idx].lead}h`);
    }
  }
  const workers = Array.from({length: Math.min(concurrency, total)}, worker);
  await Promise.all(workers);
  return token === __prefetchToken; // true si no se canceló por cambio de token
}
function cancelPrefetch(){ __prefetchToken++; hidePrefetchUI(); }



// async function prepareAnimationAndPlay(){
//   const id = typeof currentDataset === 'string' ? currentDataset : (currentDataset?.id || currentDataset?.dataset || '');
//   const isAWS = !!(window.AWS_DATASETS ? AWS_DATASETS[id] : (typeof AWS_DATASETS!=='undefined' && AWS_DATASETS[id]));
//   if (!isAWS) { 
//     // Dataset no servido por AWS → usa tu play actual
//     startPlayback && startPlayback();
//     return;
//   }

//   // origen temporal: tu datetime actual del timeline
//   const startISO = (config && config.datetime) ? config.datetime : new Date().toISOString();

//   const plan = buildFramePlan(id, startISO, 120); // 5 días = 120h
//   showPrefetchUI(plan.length);

//   // Prefetch; puedes subir/bajar concurrencia según desktop/móvil
//   const ok = await prefetchFrames(plan, {
//     concurrency: /iPhone|iPad|Android/i.test(navigator.userAgent) ? 3 : 6,
//     onProgress: (done,total,label) => updatePrefetchUI(done,total,label)
//   });

//   hidePrefetchUI();
//   if (!ok) return;  // cancelado

//   // Lanzar tu reproducción (usa lo que ya tengas: timelineControl.play(), etc.)
//   if (typeof timelineControl?.play === 'function') {
//     timelineControl.play();
//   } else if (typeof startPlayback === 'function') {
//     startPlayback();
//   } else {
//     // Fallback: avanza manualmente cada X ms si no tienes función
//     // (ajusta step/interval a tu app)
//     console.warn('No play() handler found; please wire prepareAnimationAndPlay() to your play button.');
//   }
// }

  

// async function prefetchRolling(datasetId, anchorISO) {
//   try {
//     log(`⏳ Precarga disparada para ${datasetId} desde ${anchorISO || 'inicio'}`);

//     const { datetimes } = await client.loadDatasetSlice(
//       datasetId,
//       config.datetimeRange.split('/'),
//       { datetimeStep: config.datetimeStep, ...__wlOpts() }
//     );

//      __NET_STATS__.tilesPlanned = datetimes.length;
//      __NET_STATS__.tilesDone = 0; 
//      __NET_STATS__.bytesTotal = 0; 
//      __NET_STATS__.rttEMA = null; 
//      __NET_STATS__.mbpsEMA = null; 
//      pushNetStatus('Loading');

//     const startIdx = (function alignIndex(dts, iso) {
//       if (!iso) return 0;
//       const i = dts.findIndex(dt => dt >= iso);
//       return i >= 0 ? i : 0;
//     })(datetimes, anchorISO) + 1;

//     const endIdx = Math.min(startIdx + ROLLING_HOURS, datetimes.length);
//     if (startIdx >= endIdx) {
//       log(`⚠️ Nada que precargar (startIdx >= endIdx)`);
//       return;
//     }

//     if (__rolling.dataset === datasetId && __rolling.lastIdx >= endIdx - 1) {
//       log(`✔️ Ya estaba precargado hasta ${endIdx - 1}`);
//       return;
//     }

//     const slice = datetimes.slice(startIdx, endIdx);
//     log(`▶️ Precargando ${slice.length} frames (${startIdx}–${endIdx - 1})`);

// for (let i = 0; i < slice.length; i += ROLLING_PARALLEL) {
//   const batch = slice.slice(i, i + ROLLING_PARALLEL);
//   await Promise.all(
//     batch.map(async (dt) => {
//       const t0 = performance.now();
//       try {
//         const res = await client.loadDatasetData(datasetId, dt, {
//           imageType: 'byte',
//           datetimeInterpolate: false,
//           ...__wlOpts()
//         });

//         // === bytes aprox del tile ===
//         let tileBytes = 0;
//         if (res?.image?.data?.byteLength) tileBytes = res.image.data.byteLength;
//         else if (res?.image?.byteLength) tileBytes = res.image.byteLength;
//         else if (res?.image2?.data?.byteLength) tileBytes = res.image2.data.byteLength;
//         else if (res?.image2?.byteLength) tileBytes = res.image2.byteLength;

//         const dtMs = performance.now() - t0;
//         const mbps = tileBytes ? (tileBytes * 8) / (dtMs/1000) / 1e6 : 0;

//         __NET_STATS__.bytesTotal += (tileBytes || 0);
//         __NET_STATS__.tilesDone++;
//         __NET_STATS__.rttEMA  = ema(__NET_STATS__.rttEMA,  dtMs);
//         if (mbps > 0) __NET_STATS__.mbpsEMA = ema(__NET_STATS__.mbpsEMA, mbps);

//        pushNetStatus(`Downloading ${__NET_STATS__.tilesDone}/${__NET_STATS__.tilesPlanned}…`);


//         // Limpieza
//         try { res?.image?.close?.(); } catch {}
//         try { res?.image2?.close?.(); } catch {}
//         if (res) { res.image = undefined; res.image2 = undefined; }

//         log(`✅ Frame ${dt} listo`);
//       } catch {
//         pushNetStatus('Trying again…');
//         log(`❌ Fallo en frame ${dt}`);
//       }
//     })
//   );
// }


//     __rolling = { dataset: datasetId, lastIdx: endIdx - 1 };
//     log(`🎯 Precarga completada hasta índice ${endIdx - 1}`);
//   } catch (err) {
//     log(`💥 Error en precarga: ${err.message}`);
//   }
// }

// async function prefetchExtend(datasetId, fallbackAnchorISO) {
//   try {
//     const { datetimes } = await client.loadDatasetSlice(
//       datasetId,
//       config.datetimeRange.split('/'),
//       { datetimeStep: config.datetimeStep, ...(typeof __wlOpts === 'function' ? __wlOpts() : {}) }
//     );

//     __NET_STATS__.tilesPlanned = datetimes.length;
//      __NET_STATS__.tilesDone = 0; 
//      __NET_STATS__.bytesTotal = 0; 
//      __NET_STATS__.rttEMA = null; 
//      __NET_STATS__.mbpsEMA = null; 
//      pushNetStatus('Loading');



//     // Si ya hay ventana previa, extendemos desde ahí; si no, partimos del ancla (actual)
//     let startIdx;
//     if (__rolling.dataset === datasetId && __rolling.lastIdx >= 0) {
//       startIdx = __rolling.lastIdx + 1;
//     } else {
//       const anchor = fallbackAnchorISO || config?.datetime || datetimes[0];
//       const i = datetimes.findIndex(dt => dt >= anchor);
//       startIdx = (i >= 0 ? i : 0) + 1;
//       __rolling = { dataset: datasetId, lastIdx: startIdx - 1 };
//     }

//     if (startIdx >= datetimes.length) {
//       (window.log || console.log)(`⚠️ prefetchExtend: sin más frames (startIdx=${startIdx})`);
//       return;
//     }

//     const endIdx = Math.min(startIdx + ROLLING_HOURS, datetimes.length);
//     const slice = datetimes.slice(startIdx, endIdx);
//     if (slice.length === 0) {
//       (window.log || console.log)(`⚠️ prefetchExtend: no hay frames nuevos`);
//       return;
//     }

//     (window.log || console.log)(`⤴️ Extendiendo precarga: ${slice.length} frames (${startIdx}–${endIdx - 1})`);
//     for (let i = 0; i < slice.length; i += ROLLING_PARALLEL) {
//       const batch = slice.slice(i, i + ROLLING_PARALLEL);

//      await Promise.all(batch.map(async (dt) => {
//   const t0 = performance.now();
//   try {
//     const res = await client.loadDatasetData(
//       datasetId,
//       dt,
//       { datetimeInterpolate: config.datetimeInterpolate, ...__wlOpts() }
//     );

//     let tileBytes = 0;
//     if (res?.image?.data?.byteLength) tileBytes = res.image.data.byteLength;
//     else if (res?.image?.byteLength)   tileBytes = res.image.byteLength;
//     else if (res?.image2?.data?.byteLength) tileBytes = res.image2.data.byteLength;
//     else if (res?.image2?.byteLength)  tileBytes = res.image2.byteLength;

//     const dtMs = performance.now() - t0;
//     const mbps = tileBytes ? (tileBytes * 8) / (dtMs/1000) / 1e6 : 0;

//     __NET_STATS__.bytesTotal += (tileBytes || 0);
//     __NET_STATS__.tilesDone++;
//     __NET_STATS__.rttEMA  = ema(__NET_STATS__.rttEMA,  dtMs);
//     if (mbps > 0) __NET_STATS__.mbpsEMA = ema(__NET_STATS__.mbpsEMA, mbps);

//     pushNetStatus(`Downloading ${__NET_STATS__.tilesDone}/${__NET_STATS__.tilesPlanned}…`);


//     try { res?.image?.close?.(); } catch {}
//     try { res?.image2?.close?.(); } catch {}
//     if (res) { res.image = undefined; res.image2 = undefined; }
//   } catch (err) {
//     console.warn(`⚠️ Error precargando ${datasetId} @ ${dt}`, err);
//     pushNetStatus('Trying again…');
//   }
// }));



//       if (__WL_IS_IPHONE) await new Promise(r => setTimeout(r, 40));
//     }

//     __rolling = { dataset: datasetId, lastIdx: endIdx - 1 };
//     (window.log || console.log)(`🎯 prefetchExtend completado. lastIdx=${__rolling.lastIdx}`);
//   } catch (e) {
//     (window.log || console.log)(`💥 prefetchExtend error: ${e?.message || e}`);
//   }
// }






const layerDescriptions = {
  "apparenttemperature":"APPARENT TEMPERATURE LAYER displays the ‘feels-like’ temperature—a human-perceived value derived from air temperature combined with humidity and wind",
  "instability":"INESTABILITY LAYER shows the height (in decameters) at which the 500 mb pressure level is found. Lower values (530–550) indicate cold and unstable air, often linked to storms and low pressure systems. Higher values (570–590) reflect warm and stable air, typical of high pressure zones",
   "instability_noaa":"INESTABILITY LAYER shows the height (in decameters) at which the 500 mb pressure level is found. Lower values (530–550) indicate cold and unstable air, often linked to storms and low pressure systems. Higher values (570–590) reflect warm and stable air, typical of high pressure zones",
  "cape": "THUNDERSTORMS LAYER measures the positive buoyancy available to an air parcel—higher CAPE values indicate greater potential for strong convection and thunderstorms.",
  "cape_noaa": "THUNDERSTORMS LAYER measures the positive buoyancy available to an air parcel—higher CAPE values indicate greater potential for strong convection and thunderstorms.",
  "temp2m": "TEMPERATURE LAYER displays surface temperature in °C, derived from ground-based measurements or model output, indicating thermal conditions at the Earth’s surface.",
  "temp2m_noaa": "TEMPERATURE LAYER displays surface temperature in °C, derived from ground-based measurements or model output, indicating thermal conditions at the Earth’s surface.",
  "wind": "WIND LAYER shows wind speed and direction at 10 m above ground, in Km/h, revealing surface wind conditions and patterns.",
   "wind_noaa": "WIND LAYER shows wind speed and direction at 10 m above ground, in Km/h, revealing surface wind conditions and patterns.",
  "precipitation": "DETAILED PRECIPITATION LAYER shows high-resolution precipitation accumulations along the forecast, allowing you to track where and when the heaviest rain is expected over the coming days",
  "precipitation_noaa": "PRECIPITATION LAYER shows the total precipitation accumulated over a specific period (3h), based on NOAA’s quantitative precipitation forecasts.",
  "solarRadiation": "SOLAR RADIATION LAYER shows the amount of solar radiation reaching the surface (shortwave, 0.3–3 µm), measured by NOAA pyranometers.",
  "cloudcover": "CLOUD COVER LAYER indicates the fraction of sky covered by clouds, from clear (0%) to overcast (100%), based on NOAA cloud observations.",
  "cloudcover_noaa": "CLOUD COVER LAYER indicates the fraction of sky covered by clouds, from clear (0%) to overcast (100%), based on NOAA cloud observations.",
  "relativehumidity": "RELATIVE HUMIDITY LAYER shows the percentage of moisture in the air relative to saturation at current temperature—higher RH means more humid air.",
  "detailprecipitation5days": "This layer shows shows high-resolution detailed precipitation over the next 4 days, based on NOAA’s quantitative precipitation forecast models.",
  "precipitable": "PRECIPITABLE WATER LAYER displays the total column water vapor (mm) in the atmosphere; higher values indicate more moisture available for precipitation.",

  "precipitable_noaa": "PRECIPITABLE WATER LAYER displays the total column water vapor (mm) in the atmosphere; higher values indicate more moisture available for precipitation.",

  "snowdepth": "SNOW DEPTH LAYER shows the depth of snow on the ground, measured in inches or cm—key for understanding snowpack and runoff potential.",
  "snowdepth_noaa": "SNOW DEPTH LAYER shows the depth of snow on the ground, measured in inches or cm—key for understanding snowpack and runoff potential.",
"jetstream": "WIND GUST LAYER displays the maximum 3‑second wind speed (at 10 m) within a 2‑minute window, indicating sudden bursts of stronger wind.",
"pressure": "PRESSURE LAYER shows atmospheric (sea‑level) pressure in millibars or inches Hg; typical sea‑level value is ~1013 mb, reflecting high/low pressure systems.",
"pressure_noaa": "PRESSURE LAYER shows atmospheric (sea‑level) pressure in millibars or inches Hg; typical sea‑level value is ~1013 mb, reflecting high/low pressure systems.",
"relative": "RELATIVE HUMIDITY LAYER shows the percentage of water vapor in the air relative to the maximum it could hold at the same temperature—higher values mean more moisture and a feeling of mugginess.",
"relative_noaa": "RELATIVE HUMIDITY LAYER shows the percentage of water vapor in the air relative to the maximum it could hold at the same temperature—higher values mean more moisture and a feeling of mugginess.",
"detailprecipitation": "DETAILED PRECIPITATION LAYER shows high-resolution precipitation accumulations along the forecast, allowing you to track where and when the heaviest rain is expected over the coming days.",

  "detailradar": "DETAILED RADAR LAYER displays a high-resolution composite of weather radar reflectivity, highlighting areas of light, moderate and heavy rain or snow, as well as convective cores within storms.",

  "detailwind": "DETAILED WIND LAYER shows the evolution of surface wind speed and direction at 10 m over the next days, helping identify persistent winds, gusty episodes, fronts and wind-shift lines.",

  "detailtemperature": "DETAILED TEMPERATURE LAYER shows high-resolution tracks surface temperature in °C along the forecast, making it easy to spot cold outbreaks, heat waves and strong day-night contrasts.",
  
 "detailpressure": "DETAILED PRESSURE LAYER shows high-resolution tracks surface pressure in hPa along the forecast, making it easy to spot areas of high and low pressure systems.",
  

  "radar": "RADAR LAYER shows the latest weather radar reflectivity, indicating where precipitation is occurring right now and how intense it is—from light showers to severe thunderstorms.",
  "radar_noaa": "RADAR LAYER shows the latest weather radar reflectivity, indicating where precipitation is occurring right now and how intense it is—from light showers to severe thunderstorms.",


  "temp500mb": "500 MB TEMPERATURE LAYER displays air temperature at the mid-troposphere (around 5–6 km altitude) with wind at the same altitude. Colder values often correspond to more unstable environments favorable for showers, storms and cold, while warmer values indicate more stable air aloft.",

  "temp500mb_noaa": "500 MB TEMPERATURE LAYER displays air temperature at the mid-troposphere (around 5–6 km altitude) with wind at the same altitude. Colder values often correspond to more unstable environments favorable for showers, storms and cold, while warmer values indicate more stable air aloft.",

  "cape-ecmwf": "ECMWF THUNDERSTORMS (CAPE) LAYER uses the ECMWF model to estimate convective available potential energy. Higher CAPE values signal a stronger potential for deep convection and severe thunderstorms, especially when combined with wind shear and lifting mechanisms.",

  "windgust": "JET STREAM LAYER shows the position and strength of high-altitude winds (around 9–12 km above sea level), where wind speeds can exceed 200 km/h. These fast westerly currents guide the path of storms and low-pressure systems, and jet streaks (the strongest cores) often mark regions where intense weather and rapid pressure changes are more likely."

};




// ===== Traducción capas (solo español, sin tocar lógica) =====
let __layerDescEsApplied = false;

function applySpanishLayerDescriptionsIfNeeded(){
  if (__layerDescEsApplied) return;

  const IS_ES = ((navigator.languages && navigator.languages[0]) || navigator.language || "")
    .toLowerCase()
    .startsWith("es");
  if (!IS_ES) return;

  Object.assign(layerDescriptions, {
    apparenttemperature:
      "Capa de sensación térmica: muestra la temperatura percibida combinando temperatura, humedad y viento.",


    instability_noaa:
      "Capa de inestabilidad: muestra la altura (en decámetros) del nivel de 500 mb. Valores bajos indican aire frío e inestable asociado a borrascas y tormentas. Valores altos indican aire cálido y estable, típico de anticiclones.",

 
    cape_noaa:
      "Capa de tormentas (CAPE): mide la energía disponible para la convección. Valores altos indican mayor probabilidad de tormentas intensas.",


    temp2m_noaa:
      "Capa de temperatura: muestra la temperatura en superficie (2 m) en °C, indicando las condiciones térmicas a nivel del suelo.",


    wind_noaa:
      "Capa de velocidad viento maxima: muestra la velocidad maxima y dirección del viento a 10 m en km/h, revelando patrones de viento en superficie.",

 
    precipitation_noaa:
      "Capa de precipitación: muestra la precipitación acumulada en un periodo de 3 horas según los modelos de NOAA.",

    solarRadiation:
      "Capa de radiación solar: muestra la radiación solar de onda corta que alcanza la superficie terrestre.",


    cloudcover_noaa:
      "Capa de nubosidad: indica el porcentaje del cielo cubierto por nubes, desde despejado hasta completamente cubierto.",

    relativehumidity:
      "Capa de humedad relativa: muestra el porcentaje de humedad del aire respecto al máximo que puede contener a esa temperatura.",

    detailprecipitation5days:
      "Capa de precipitación detallada: muestra precipitación de alta resolución para los próximos 4 días.",

     precipitation:
      "Capa de precipitación detallada: muestra precipitación detallada en Alta Resolución para los próximos 4 días.", 
  
    precipitable_noaa:
      "Capa de agua precipitable: muestra el vapor de agua total en la columna atmosférica (mm). Valores altos indican mayor humedad disponible para precipitación.",


    snowdepth_noaa:
      "Capa de espesor de nieve: muestra el espesor de nieve en el suelo, útil para evaluar acumulaciones y deshielo.",

    jetstream:
      "Capa de rachas de viento: muestra la racha máxima de viento en superficie dentro de una ventana de 2 minutos.",


    pressure_noaa:
      "Capa de presión: muestra la presión atmosférica a nivel del mar en mb, útil para identificar borrascas y anticiclones.",


    relative_noaa:
      "Capa de humedad relativa: indica la cantidad de vapor de agua en el aire respecto a su capacidad máxima.",

    detailprecipitation:
      "Capa de precipitación detallada: permite seguir dónde y cuándo se esperan las lluvias más intensas durante el pronóstico.",

    detailradar:
      "Capa de radar detallado: muestra un compuesto de reflectividad radar de Alta Resolución, destacando lluvias y núcleos convectivos.",

    detailwind:
      "Capa de viento detallado: muestra la evolución del viento en superficie durante los próximos días.",

    detailtemperature:
      "Capa de temperatura detallada: muestra la evolución de la temperatura en superficie a lo largo del pronóstico.",

    detailpressure:
      "Capa de presión detallada: muestra la evolución de la presión atmosférica en superficie.",


    radar_noaa:
      "Capa de radar: muestra la reflectividad radar más reciente, indicando dónde está precipitando y con qué intensidad.",


    temp500mb_noaa:
      "Capa de temperatura 500 mb: muestra la temperatura en la troposfera media (5–6 km), clave para identificar inestabilidad en altura.",

    "cape-ecmwf":
      "Capa de tormentas (CAPE ECMWF): utiliza el modelo ECMWF para estimar la energía convectiva disponible y el riesgo de tormentas severas.",

    windgust:
      "Capa de jet stream: muestra la posición e intensidad de los vientos en altura (9–12 km) que guían el desplazamiento de borrascas."
  });

  __layerDescEsApplied = true;
}


let layerInfoTimeout = null;

function hideLayerInfo() {
  const panel = document.getElementById("info-content-layer");
  if (!panel) return;
  panel.style.display = "none";
}


// function showLayerInfo(description) {
//   const panel = document.getElementById("info-content-layer");
//   if (!panel) return;

//   // Intentamos separar "CABECERA LAYER" del resto del texto
//   const match = description.match(/^([A-Z0-9 ()\-]+LAYER)\s*(.*)$/);

//   let html;
//   if (match) {
//     const header = match[1];  // ej: "APPARENT TEMPERATURE LAYER"
//     const body   = match[2];  // resto de la frase
//     html = `<span class="info-layer-title">${header}</span>${body ? " " + body : ""}`;
//   } else {
//     // Si no cuadra el patrón, mostramos el texto tal cual
//     html = description;
//   }

//   panel.innerHTML = html;
//   panel.style.display = "block";

//   if (layerInfoTimeout) {
//     clearTimeout(layerInfoTimeout);
//   }
//   layerInfoTimeout = setTimeout(() => {
//     hideLayerInfo();
//   }, 4000);
// }








// Última capa para la que se mostró info


function showLayerInfo(description) {
  const panel = document.getElementById("info-content-layer");
  if (!panel) return;

  const text = String(description || "");

  // Patrón: "XXXX LAYER" en mayúsculas al inicio
  const match = text.match(/^([A-Z0-9 ()\-]+LAYER)\s*(.*)$/);

  // Limpia panel y construye DOM seguro
  panel.innerHTML = "";

  if (match) {
    const header = match[1];
    const body = match[2] || "";

    const titleEl = document.createElement("span");
    titleEl.className = "info-layer-title";
    titleEl.textContent = header;

    panel.appendChild(titleEl);

    if (body.trim()) {
      panel.appendChild(document.createTextNode(" " + body));
    }
  } else {
    // Texto completo tal cual, pero seguro
    panel.textContent = text;
  }

  panel.style.display = "block";

  if (layerInfoTimeout) clearTimeout(layerInfoTimeout);
  layerInfoTimeout = setTimeout(() => {
    hideLayerInfo();
  }, 5000);
}




let lastInfoLayerKey = null;




// function updateInfoPanel(layerKey) {
//   if (!layerKey) return;

//   // ✅ Si ya hemos mostrado info para esta capa, no hacemos nada
//   if (shownInfoLayers.has(layerKey)) {
//     return;
//   }

//   // ✅ Marcamos esta capa como “ya mostrada”
//   shownInfoLayers.add(layerKey);

//   const description =
//     layerDescriptions[layerKey] ||
//     "No hay información disponible para esta capa.";

//   showLayerInfo(description);
// }

function updateInfoPanel(layerKey, options = {}) {

  applySpanishLayerDescriptionsIfNeeded();

setOverlayAvailabilityForBaseLayer(layerKey);


  if (!layerKey) return;

  // Guardamos cuál es la última capa “informativa” activa
  lastInfoLayerKey = layerKey;

  const force = options.force === true;

  // Si ya la mostramos y no es un “force”, no hacemos nada
  if (!force && shownInfoLayers.has(layerKey)) {
    return;
  }

  shownInfoLayers.add(layerKey);

   saveSeenInfoLayers(shownInfoLayers);

  const description =
    layerDescriptions[layerKey] ||
    "No hay información disponible para esta capa.";
  showLayerInfo(description);
}




 function fillDetails(jsonData) {
            console.log('Hollllalalalalalalalalalalalalal' );
          //  console.log('jsonData =' , jsonData);
         //   var userData = JSON.parse(jsonData);
         //   document.getElementById("email").value = userData["email"];
         //  document.getElementById("firstName").value = userData["firstName"];
          //  document.getElementById("lastName").value = userData["lastName"]; 
          layersButtons.classList.toggle('show');
        }

  window.fillDetails = fillDetails;

const fp = flatpickr("#date-input", {
dateFormat: "Y-m-d",
  defaultDate: new Date(),
  minDate: "today",
  maxDate: new Date().fp_incr(4),
  position: "above",
  disableMobile: true,
  onChange: function(selectedDates, dateStr){ document.getElementById('date-input').value = dateStr; if (typeof loadSelectedDatetime === 'function') loadSelectedDatetime(); }
});

// function applyWindLayer() {


//   if (!windVisible || isPlaying || maptilerWindOff) {
//     // Viento desactivado por el usuario
//     updateNoWind();
//     return;
//   } else {

//     updateWind();
//   }

// }


function applyWindLayer() {
  const animating = !!(window.__ANIM__ && window.__ANIM__.playing);

  // Mientras se esté animando, o el viento esté apagado, no recalculamos
  if (!windVisible || animating || maptilerWindOff) {
  
    updateWind();
    return;
    
  } 
   
   // updateNoWind();
  updateWind();
  

  // Aquí ya NO usamos isPlaying, solo el estado real de animación
  
}





      // Inicializa con fecha y hora actual
document.getElementById('local-datetime')
const now = new Date();
// document.getElementById('date-input').value = now.toISOString().slice(0, 10);
// document.getElementById('hour-select').value = now.toISOString().slice(11, 16);
const pad = n => String(n).padStart(2, '0');
document.getElementById('date-input').value =
  `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`;
document.getElementById('hour-select').value =
  `${pad(now.getHours())}:${pad(now.getMinutes())}`.slice(0,5);

setHeaderTimeLabel(now);

function loadSelectedDatetime() {
  const date = document.getElementById('date-input').value;
  const hour = document.getElementById('hour-select').value;
  if (!date || !hour) return;
  const localDateTime = new Date(`${date}T${hour}`);
 // const datetimeUTC = new Date(localDateTime.getTime() - localDateTime.getTimezoneOffset() * 60000).toISOString();
  const datetimeUTC = localDateTime.toISOString();
 console.log("🌐 datetimeUTC generado:", datetimeUTC); // 👈 aquí ves el valor exacto
  config.datetime = datetimeUTC;
 // loadingIndicator.style.display = 'block';
  (async () => {
    try {
      if(currentDataset === 'gfs/pressure_mean_sea_level') {
      //  updatePressure();
      update();
         if (shouldUpdateWind()) {
      applyWindLayer();
    } else {
      // opcional: console.debug('[wind] skip during animation on non-wind layer');
    }
        cloudVisible ?  updateCloud() : clearCloudLayer();
        // 🔁 Precarga oculta de 6h del dataset recién activado
   

       
      } else {
        //update();
        safeUpdate();
        if(currentDataset === 'gfs/wind_10m_above_ground') {
            cloudVisible ?  updateCloud() : clearCloudLayer();
             if (shouldUpdateWind()) {
      applyWindLayer();
    } else {
      // opcional: console.debug('[wind] skip during animation on non-wind layer');
    } 
                 // 🔁 Precarga oculta de 6h del dataset recién activado
    
        } else {
            cloudVisible ?  updateCloud() : clearCloudLayer();
             if (shouldUpdateWind()) {
      applyWindLayer();
    } else {
      // opcional: console.debug('[wind] skip during animation on non-wind layer');
    }
                 // 🔁 Precarga oculta de 6h del dataset recién activado
   
        }
      }

      // const formatted = new Intl.DateTimeFormat('es-ES', {
      //   weekday: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
      // }).format(localDateTime);

     // document.getElementById("local-datetime").innerText = formatted;
      setHeaderTimeLabel(localDateTime);
      
    } catch (e) {
      console.error("Error al cargar plano:", e);
      // alert("The map layer is not available for the selected time");
    }
   // loadingIndicator.style.display = 'none';
  })();
}

// onUpdate: datetime =>
// Llamar cuando el usuario cambia la fecha o la hora
document.getElementById('date-input').addEventListener('change', loadSelectedDatetime);
document.getElementById('hour-select').addEventListener('change', loadSelectedDatetime);

const steps = [
  "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00",
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
  "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
];

// Redondear a la hora más cercana anterior disponible
// const now = new Date();
const currentHour = now.getHours().toString().padStart(2, '0') + ":00";
const hourSelect = document.getElementById('hour-select');
if ([...hourSelect.options].some(opt => opt.value === currentHour)) {
  hourSelect.value = currentHour;
} else {
  // fallback a la hora más cercana anterior entre steps
  const steps = [...hourSelect.options].map(o => o.value);
  const fallback = steps.reverse().find(step => step <= currentHour);
  if (fallback) hourSelect.value = fallback;
}



function getNextForecastHour(currentHour, directionInHours) {
  const stepSize = 1; // pasos de 1 hora ahora
  let idx = steps.indexOf(currentHour);
  if (idx === -1) idx = 0;

  let stepChange = Math.round(directionInHours / stepSize);
  let newDate = new Date(fp.selectedDates[0] || new Date());

  idx += stepChange;

  while (idx < 0) {
    idx += steps.length;
    newDate.setDate(newDate.getDate() - 1);
  }

  while (idx >= steps.length) {
    idx -= steps.length;
    newDate.setDate(newDate.getDate() + 1);
  }

  fp.setDate(newDate, true); // actualiza el date picker
  document.getElementById('hour-select').value = steps[idx];
  console.log("🌐 hour selected:", document.getElementById('hour-select').value); // 👈 aquí ves el valor solicitado
  // loadSelectedDatetime(); // recarga capa o plano
}

document.getElementById('rewind-button').addEventListener('click', () => {
 // pauseWindAnimation();
  const currentHour = document.getElementById('hour-select').value;
  getNextForecastHour(currentHour, -1);
});

document.getElementById('forward-button').addEventListener('click', () => {
 // pauseWindAnimation();
  const currentHour = document.getElementById('hour-select').value;
  getNextForecastHour(currentHour, 1);
});

// onUpdate: datetime

function getIntervalInHours() {
  switch (selectedInterval) {
    case "3h":
      return 3;
    case "6h":
      return 6;
    default:
      return 1;
  }
}


function nextHour() {
  const currentHour = document.getElementById('hour-select').value; // antes de mover
  const step = getIntervalInHours(); // 1h, 6h, 24h, etc.

  // Avanza el timeline (tu función existente)
  getNextForecastHour(currentHour, step);
}
window.nextHour = nextHour;


// Precipitation 3h

function previousHour() {
  const currentHour = document.getElementById('hour-select').value;
  const step = getIntervalInHours();
  getNextForecastHour(currentHour, -step);
}
window.previousHour = previousHour;

function updateIntervalFromiOS(value) {
    if (intervalOptions.includes(value)) {
      selectedInterval = value;
      currentIntervalIndex = intervalOptions.indexOf(value);
      console.log("🔁 Intervalo actualizado desde iOS:", selectedInterval);
      // Aquí puedes ejecutar lógica adicional si lo necesitas
    } else {
      console.warn("Valor de intervalo inválido recibido:", value);
    }
  }
  window.updateIntervalFromiOS = updateIntervalFromiOS


function isPremiumLayerId(layerId) {
  return PREMIUM_LAYER_IDS.has(String(layerId || '').toLowerCase());
}

function guardPremiumLayerClick(event) {
  const li = event.currentTarget;
  const layerId = li && li.id;

  if (!IS_PREMIUM_USER && isPremiumLayerId(layerId)) {
   showPremiumOverlay(t("premium_overlay_info"));

    // Bloquea que se ejecuten los demás listeners (los que cambian la capa)
    event.stopImmediatePropagation();
    event.preventDefault();
    return false;
  }

  return true;
}




const selectedLayerText = document.getElementById('selected-layer-text');

function handleLayerButtonClick(event) {


  // 1) Primero, control Premium
  if (!guardPremiumLayerClick(event)) {
    return;
  }



  
  // 2) Si pasa el filtro, aquí puedes hacer lo que quieras a nivel de UI
  //    (por ejemplo, actualizar texto del botón, cerrar el menú, etc.)
  //    Si no necesitas nada extra, lo puedes dejar vacío: los handlers
  //    específicos (wind, instability, etc.) ya hacen el trabajo de verdad.
  
  // Ejemplo de actualización de texto, si quieres usarlo:
  // const buttonText = event.currentTarget.textContent.trim();
  // selectedLayerText.textContent = buttonText;
}


// Evento para mostrar/ocultar la lista de capas
// toggleLayersButton.addEventListener('click', function() {
//   layersButtons.classList.toggle('show');
// });

// Asignar el evento click a todos los botones de capa
document.querySelectorAll('#buttons li').forEach(button => {
  button.addEventListener('click', handleLayerButtonClick);
});

// Inicializar con el texto de la capa por defecto
// selectedLayerText.textContent = 'Layers';

// pauseWind
// Animacion no disponible

      const useWebgl2 = true;
      //  if (/Mobi|Android/i.test(navigator.userAgent))useWebgl2 = false;   // Safari iOS: WebGL1 más estable
    //  const datasets = await client.loadCatalog();
      const datasets = "";
      const config = await initConfig({ datasets, deckgl: true, webgl2: useWebgl2, globe: true });
      // Tras: const config = await initConfig({ datasets, deckgl: true, webgl2: true });
     // if (__WL_IS_IPHONE) config.webgl2 = false;   // Safari iOS: WebGL1 más estable

      let gui;


      if (/Mobi|Android/i.test(navigator.userAgent)) {
    config.imageSmoothing = 2; // en lugar de 5
    }




     // const loadingIndicator = document.getElementById('loading-indicator');

function log(msg) {
  // 1) Imprimir en consola normal
  console.log(msg);

  // 2) Añadir al div en pantalla
  const box = document.getElementById('logBox');
  if (box) {
    const line = document.createElement('div');
    line.textContent = msg;
    box.appendChild(line);
    box.scrollTop = box.scrollHeight;
  }
}



// Utilidad Precarga Controlada
// ===== Precarga completada: registro por clave (layer+range+hours+step) =====

async function warmUpFrames(dataset, datetimes, aroundISO) {
  if (!window.deckgl || !datetimes?.length) return;
  // Busca el índice del datetime actual y toma 2-3 frames
  const i = Math.max(0, datetimes.findIndex(d => d === aroundISO));
  const pick = [datetimes[i], datetimes[i+1], datetimes[i+2]].filter(Boolean);

  for (const dt of pick) {
    const { image, image2, imageWeight, imageType, imageUnscale, bounds } =
      await client.loadDatasetData(dataset, dt, { datetimeInterpolate: false });

    const warmLayer = new WeatherLayers.RasterLayer({
      id: '__warmup__',
      image, image2, imageWeight, imageType, imageUnscale, bounds,
      visible: true,
      opacity: 0.001,      // importante: no 0
      imageSmoothing: 0,
      imageInterpolation: config.imageInterpolation,
    });

    const layers = (deckgl.props.layers || []).filter(l => l.id !== '__warmup__').concat(warmLayer);
    deckgl.setProps({ layers });
    // Espera un frame para forzar draw y compilación
    await new Promise(r => requestAnimationFrame(r));
  }

  // Retira la capa de calentamiento
  deckgl.setProps({ layers: (deckgl.props.layers || []).filter(l => l.id !== '__warmup__') });
}



// window.__PRECACHE_DONE__ = window.__PRECACHE_DONE__ || new Set();
window.__PRECACHE_DONE__ = window.__PRECACHE_DONE__ || new Set();
window.__INITIAL_PRECACHING__ = false;
window.__INITIAL_PRECACHED__ = false;

function setPlaybackControlsDisabled(disabled) {
  const playBtn1 = document.getElementById('play-button');
  const playBtn2 = document.getElementById('play-pause-bt');
  const nowBtn   = document.getElementById('now-bt');

  if (playBtn1) playBtn1.disabled = disabled;
  if (playBtn2) playBtn2.disabled = disabled;
  if (nowBtn)   nowBtn.disabled = disabled;

  document.documentElement.classList.toggle('precache-running', disabled);
}


const __SEEN_NEXT = new Set();
function keyFor(runUTC, L){ return `${runUTC}/${L}`; }


function __buildPrecacheKey(layer, hoursToPreload, rangeStr, step) {
  // normaliza para claves estables
  const h = Number.isFinite(+hoursToPreload) ? +hoursToPreload : 'unk';
  const s = step ?? (typeof config?.datetimeStep !== 'undefined' ? config.datetimeStep : '3h');
  return `${layer}::${rangeStr}::h=${h}::step=${s}`;
}

async function precacheDatasets(layer) {

  window.__INITIAL_PRECACHING__ = true;
setPlaybackControlsDisabled(true);

  // === Selección de horas a precargar (igual que tu lógica actual) ===
  const IS_IPHONE = /iPhone|iPod/i.test(navigator.userAgent);
  const IS_LOW_HEADROOM = IS_IPHONE && (
    (navigator.hardwareConcurrency || 2) <= 3 ||
    (window.devicePixelRatio >= 3 && Math.max(screen.width, screen.height) <= 896)
  );
  const hoursToPreload = IS_LOW_HEADROOM
    ? Math.min(typeof rangeMax === 'number' ? rangeMax : 340, 24)
    : (typeof rangeMax === 'number' ? rangeMax : 340);

  // Rango objetivo (idéntico a tu código)
  const step = config?.datetimeStep;
  const rangeStr = (config?.datetimeRange || WeatherLayers
    .offsetDatetimeRange(CURRENT_DATETIME, 0, hoursToPreload)
    .join('/'));

  // === SKIP tempranero si ya está precargado para esta clave ===
  const key = __buildPrecacheKey(layer, hoursToPreload, rangeStr, step);
if (window.__PRECACHE_DONE__.has(key)) {
  (window.__NET_UI_LOG__||console.log)(`⏭️ Skip precache (already done): ${key}`);
  window.__INITIAL_PRECACHING__ = false;
  window.__INITIAL_PRECACHED__ = true;
  setPlaybackControlsDisabled(false);
  try { showPrecacheFinished(layer); } catch {}
  return;
}

  // === A partir de aquí, SÍ hacemos precarga (cancelamos la anterior y bloqueamos UI) ===
  cancelPrecache();
  const myId = ++window.__PRECACHE__.currentId;
  const isCancelled = () => myId !== window.__PRECACHE__.currentId;
  const assertNotCancelled = () => { if (isCancelled()) throw new Error('PRECACHE_CANCELLED'); };

  // UI bloqueada solo si realmente vamos a precargar
  const playBtn1 = document.getElementById('play-button');
  const playBtn2 = document.getElementById('play-pause-bt');
  // if (playBtn1) playBtn1.disabled = true;
  // if (playBtn2) playBtn2.disabled = true;

  window.__NET_TOAST__?.show?.('Please wait, preloading all meteorology tiles…');

  const SLEEP_MS  = IS_LOW_HEADROOM ? 120 : (IS_IPHONE ? 40 : 0);
  const batchSize = IS_LOW_HEADROOM ? 1   : (IS_IPHONE ? 2  : 10);

  // Desactiva caché propia durante precarga
  const prevCacheMode = window.__WL_CACHE_MODE;
  window.__WL_CACHE_MODE = false;

  const datasetsToPreload = [layer];
  const fmtBytes = (n) => {
    if (!n) return '0 B';
    const k = 1024, sizes = ['B','KB','MB','GB'];
    const i = Math.floor(Math.log(n)/Math.log(k));
    return `${(n/Math.pow(k,i)).toFixed(i ? 1 : 0)} ${sizes[i]}`;
  };
  let __bytesTotal__ = 0, __tilesOK__ = 0, __tilesPlanned__ = 0;

  try {
    (window.__NET_UI_LOG__||console.log)(`▶️ Preload: datasets=${JSON.stringify(datasetsToPreload)} hours=${hoursToPreload}`);
    assertNotCancelled();

    for (const dataset of datasetsToPreload) {
      try {
        assertNotCancelled();
      //  log(`⏳ Loading datetimes for ${dataset}`, { scope: 'precache' });

        const baseOpts = { datetimeStep: step, ...__wlOpts(), cache: false };
        const { datetimes } = await client.loadDatasetSlice(dataset, rangeStr.split('/'), baseOpts);
        assertNotCancelled();

        const datetimesToLoad = datetimes.slice(0, hoursToPreload);

// Justo tras calcular datetimesToLoad
__NET_STATS__.tilesPlanned = datetimesToLoad.length;
__NET_STATS__.tilesDone = 0;
__NET_STATS__.bytesTotal = 0;
__NET_STATS__.rttEMA = null;
__NET_STATS__.mbpsEMA = null;
pushNetStatus('Loading');; // muestra UI al empezar










        __tilesPlanned__ += datetimesToLoad.length;

        for (let i = 0; i < datetimesToLoad.length; i += batchSize) {
          assertNotCancelled();
          const batch = datetimesToLoad.slice(i, i + batchSize);

          const tasks = batch.map(async (datetime) => {
            assertNotCancelled();
            try {
              const res = await client.loadDatasetData(dataset, datetime, {
                imageType: 'byte',
                datetimeInterpolate: config.datetimeInterpolate,
                ...__wlOpts(),
                cache: false
              });

              // Medición opcional de bytes (aprox)
              let tileBytes = 0;
              if (res?.image?.data?.byteLength)        tileBytes = res.image.data.byteLength;
              else if (res?.image?.byteLength)          tileBytes = res.image.byteLength;
              else if (res?.image2?.data?.byteLength)   tileBytes = res.image2.data.byteLength;
              else if (res?.image2?.byteLength)         tileBytes = res.image2.byteLength;

              (window.__NET_UI_LOG__||console.log)(`[DL] ${dataset} @ ${datetime} → ${fmtBytes(tileBytes)}`);
              __bytesTotal__ += (tileBytes || 0);
              __tilesOK__++;

              // Liberar referencias
              try { res.image?.close?.(); } catch {}
              try { res.image2?.close?.(); } catch {}
              if (res) { res.image = undefined; res.image2 = undefined; }
              try { await client.evict?.(dataset, datetime); } catch {}
            } catch (err) {
              if (err && err.message === 'PRECACHE_CANCELLED') throw err;
              console.warn(`⚠️ Error ${dataset} at ${datetime}`, err);
              (window.__NET_UI_LOG__||console.log)(`[DL] ${dataset} @ ${datetime} → ERROR`);
            }
          });

          await Promise.all(tasks);
          assertNotCancelled();

          if (SLEEP_MS > 0) await new Promise(r => setTimeout(r, SLEEP_MS));
          assertNotCancelled();
        }

        await new Promise(r => requestAnimationFrame(r));
        assertNotCancelled();

      } catch (err) {
        if (err && err.message === 'PRECACHE_CANCELLED') throw err;
        console.warn(`❌ Failed to preload ${dataset}`, err);
      }
    }

    if (!isCancelled()) {
      // Marca como COMPLETADO para esta clave
      window.__PRECACHE_DONE__.add(key);

      const summary = `Download completed: ${fmtBytes(__bytesTotal__)} in ${__tilesOK__}/${__tilesPlanned__} tiles`;
      (window.__NET_UI_LOG__||console.log)(`📊 TOTAL: ${fmtBytes(__bytesTotal__)} en ${__tilesOK__}/${__tilesPlanned__} planos`);
      window.__NET_TOAST__?.update?.(summary);
      window.__NET_TOAST__?.hide?.(3000);
      setTimeout(()=> window.__NET_UI_REMOVE__?.(), 3200);
      showPrecacheFinished(layer);

      pushNetStatus('Ready');

      await warmUpFrames(currentDataset, config.datetimes, config.datetime);

      setTimeout(()=> NetLine.hide(), 800);

      printAWSStats?.();
    }

  } catch (err) {
    if (err && err.message === 'PRECACHE_CANCELLED') {
      (window.__NET_UI_LOG__||console.log)('⏹️ Preload cancelled');
    } else {
      console.error('Precache failed:', err);
      window.__NET_TOAST__?.update?.('Preload failed');
      window.__NET_TOAST__?.hide?.(3000);
    }
  } finally {
    if (!isCancelled()) {
      window.__WL_CACHE_MODE = prevCacheMode;


// if (currentDataset === 'gfs/wind_10m_above_ground' || currentDataset === 'gfs/wind_tropopause' || currentDataset === 'gfs/wind_gust_surface' ) {
//     // Capa de viento activa: siempre mostrar viento
//     console.log("Capa de viento activa: mostrando viento", currentDataset);
    
//    updateWind();
    
//   }


        // if (playBtn1) playBtn1.disabled = false;
        // if (playBtn2) playBtn2.disabled = false;
        window.__INITIAL_PRECACHING__ = false;
window.__INITIAL_PRECACHED__ = true;
setPlaybackControlsDisabled(false);

      //      // 👇 NUEVO: respetar el modelo actual
      // const isEcmwf = (window.currentModel === 'ecmwf');

      // if (playBtn1) playBtn1.disabled = isEcmwf;
      // if (playBtn2) playBtn2.disabled = isEcmwf;

      
    }
  }
}



async function precacheDatasetFrames(datasetId, frameCount = rangeMax, batchSize = 1) {
  // 🛠️ Injected by ChatGPT (fixed): serialize precaches to avoid concurrent spikes
  window.__precacheChain = window.__precacheChain || Promise.resolve();

  /* Injected: dynamic frame count for iOS */
  frameCount = __WL_IS_IOS ? rangeMax : Math.min(frameCount,rangeMax);

  // Injected: cap batch size
  batchSize = __WL_IS_IOS ? 1 : Math.min(batchSize, 1);

  const playBtn = document.getElementById('play-button');
  if (playBtn) playBtn.disabled = true;

  const run = async () => {
    try {
      console.log(`⏳ Iniciando precarga para ${datasetId} (${frameCount} frames)...`);

      const { datetimes } = await client.loadDatasetSlice(
        datasetId,
        config.datetimeRange.split('/'),
        { datetimeStep: config.datetimeStep, ...__wlOpts() }
      );

      const toPreload = datetimes.slice(0, frameCount);

      for (let i = 0; i < toPreload.length; i += batchSize) {
        const batch = toPreload.slice(i, i + batchSize);
        await Promise.all(batch.map(dt =>
          client.loadDatasetData(
            datasetId,
            dt,
            { datetimeInterpolate: config.datetimeInterpolate, ...__wlOpts() }
          ).catch(err => console.warn(`⚠️ Error precargando ${datasetId} @ ${dt}`, err))
        ));
      }

      console.log(`✅ Precarga completa para ${datasetId}`);
      showPrecacheFinished(datasetId);
     
    } catch (err) {
      console.error(`❌ Error en precarga de ${datasetId}:`, err);
    } finally {
      if (playBtn) playBtn.disabled = false;
    }
  };

  // Encola la ejecución y devuelve la promesa encadenada
  window.__precacheChain = window.__precacheChain.then(run);

  return window.__precacheChain;
}// client

function showPrecacheFinished(datasetId) {

  // lo anulo
  return;
  const ell = document.getElementById('logBox'); // o el contenedor que uses
  if (ell) ell.textContent = '';  

  const el = document.getElementById('precache-toast');
  if (!el) return;
  const short = (datasetId || '').split('/').pop() || 'dataset';
  el.textContent = `✅ Precarga lista: ${short}`;
  el.style.display = 'block';
  // forzar reflow para habilitar la transición
  void el.offsetWidth;
  el.style.opacity = '1';
  setTimeout(() => {
    el.style.opacity = '0';
    setTimeout(() => { el.style.display = 'none'; }, 700);
  }, 1000);
 
}


// === Bridge a iOS (silencioso si no estamos dentro de la app) ===
function postToiOS(payload) {
  try { window.webkit?.messageHandlers?.bridge?.postMessage(payload); } catch(_) {}
}

// Opcional: controlar el banner web (línea de puntos)
const NetLine = {
  el: null, msgEl: null, visible: false,
  ensure() {
    this.el = this.el || document.getElementById('net-line');
    this.msgEl = this.msgEl || (this.el ? this.el.querySelector('.msg') : null);
  },
  show(text) {
    this.ensure(); if (!this.el) return;
    if (text && this.msgEl) this.msgEl.textContent = text;
    this.el.style.display = 'block'; this.visible = true;
  },
  hide() { this.ensure(); if (!this.el) return; this.el.style.display = 'none'; this.visible = false; },
  setText(text){ this.ensure(); if (this.msgEl) this.msgEl.textContent = text; }
};

// Estado de red estimado durante precarga/descarga
const __NET_STATS__ = {
  rttEMA: null, // ms
  mbpsEMA: null, // Megabits/s aprox
  tilesDone: 0,
  tilesPlanned: 0,
  bytesTotal: 0
};

// Sencillas EMAs
function ema(cur, sample, alpha=0.25) { return (cur==null) ? sample : (cur*(1-alpha) + sample*alpha); }

// Lanza notificación periódica hacia iOS (throttle)
let __lastPushTS = 0;
function pushNetStatus(toastText) {
  const now = performance.now();
  if (now - __lastPushTS < 350) return; // ~3 Hz
  __lastPushTS = now;

  const slow = (__NET_STATS__.rttEMA && __NET_STATS__.rttEMA > 1200) ||
               (__NET_STATS__.mbpsEMA && __NET_STATS__.mbpsEMA < 0.6); // umbrales suaves

  postToiOS({
    type: 'net:status',
    slow,
    rttMs: Math.round(__NET_STATS__.rttEMA || 0),
    mbps: (__NET_STATS__.mbpsEMA || 0),
    tilesDone: __NET_STATS__.tilesDone,
    tilesPlanned: __NET_STATS__.tilesPlanned,
    bytesTotal: __NET_STATS__.bytesTotal
  });

  // Fallback UI web opcional
  if (slow) NetLine.show('Conexión lenta. Intentando cargar…');
  else NetLine.show(toastText || 'Cargando datos…');

  if (__NET_STATS__.tilesPlanned && __NET_STATS__.tilesDone >= __NET_STATS__.tilesPlanned) {
    setTimeout(() => NetLine.hide(), 1000);
  }
}








// ——— Smooth switch con búfer corto ———
const __WL_IS_IPHONE = /iPhone/.test(navigator.userAgent);

// Cancela prefetch en curso si el usuario cambia otra vez
let __switchAbort = null;

function __alignIndex(datetimes, targetISO) {
  if (!targetISO) return 0;
  const i = datetimes.findIndex(dt => dt >= targetISO);
  return i >= 0 ? i : 0;
}

// Precarga "ligera": byte + sin LRU + concurrencia baja
async function __primeWindow(datasetId, datetimes, startIdx, {
  minBuffer = 6, windowSize = 12, parallel = 2, sleepMs = 30, signal
} = {}) {
  const prevCacheMode = window.__WL_CACHE_MODE;
  window.__WL_CACHE_MODE = false;          // no LRU durante el prefetch

  let loaded = 0;
  try {
    const slice = datetimes.slice(startIdx, Math.min(startIdx + windowSize, datetimes.length));
    for (let i = 0; i < slice.length; i += parallel) {
      if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
      const batch = slice.slice(i, i + parallel).map(async dt => {
        const res = await client.loadDatasetData(datasetId, dt, {
          imageType: 'byte',               // liviano
          datetimeInterpolate: false,
          ...__wlOpts()
        });
        // soltar posibles referencias
        try { res?.image?.close?.(); } catch(_) {}
        try { res?.image2?.close?.(); } catch(_) {}
        if (res) { res.image = undefined; res.image2 = undefined; }
        loaded++;
      });
      await Promise.all(batch);
      if (__WL_IS_IPHONE) await new Promise(r => setTimeout(r, sleepMs));
      if (loaded >= minBuffer) break;      // tenemos búfer mínimo → OK para cambiar
    }
  } finally {
    window.__WL_CACHE_MODE = prevCacheMode;
  }
  return loaded;
}

function __showBufferToast(text) {
  const el = document.getElementById('precache-toast');
  if (!el) return { done:()=>{} };
  el.textContent = text;
  el.style.display = 'block';
  void el.offsetWidth;
  el.style.opacity = '1';
  return {
    update(t){ el.textContent = t; },
    done(){
      el.style.opacity = '0';
      setTimeout(()=>{ el.style.display = 'none'; }, 7000);
    }
  };
}

 
// Utilidaes leyenda

// ===== Utilidades de color =====
function hexToRGBA(hex, alpha=1) {
  if (Array.isArray(hex)) { // [r,g,b,(a?)]
    const [r,g,b,a] = hex;
    return `rgba(${r},${g},${b},${a ?? alpha})`;
  }
  const s = hex.replace('#','');
  const int = parseInt(s.length===3
    ? s.split('').map(c=>c+c).join('')
    : s, 16);
  const r = (int >> 16) & 255, g = (int >> 8) & 255, b = int & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

function getDeviceScale(ctx) {
  const dpr = window.devicePixelRatio || 1;
  const bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;
  return dpr / bsr;
}

// ===== Obtención de rango desde AWS_DATASETS flexible =====
function getRangeFromDataset(ds) {
  // intenta varias convenciones comunes
  if (!ds || typeof ds !== 'object') return {min:0, max:1};
  if ('min' in ds && 'max' in ds) return {min: ds.min, max: ds.max};
  if (ds.domain && Array.isArray(ds.domain) && ds.domain.length>=2) {
    return {min: ds.domain[0], max: ds.domain[ds.domain.length-1]};
  }
  if (ds.scale && ds.scale.min != null && ds.scale.max != null) {
    return {min: ds.scale.min, max: ds.scale.max};
  }
  return {min:0, max:1};
}

function getUnitsFromDataset(ds) {
  return (ds && (ds.units || ds.unit || ds.meta?.units)) || '';
}

// ===== Dibujo del gradiente y ticks =====
function drawLegendGradient(canvas, colors) {
  const ctx = canvas.getContext('2d');
  const scale = getDeviceScale(ctx);
  // tamaño lógico
  const w = 28, h = 340;
  canvas.width = w * scale; canvas.height = h * scale;
  canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
  ctx.scale(scale, scale);

  const grad = ctx.createLinearGradient(0, h, 0, 0); // vertical: min abajo, max arriba

  if (Array.isArray(colors) && colors.length > 0) {
    const n = colors.length;
    for (let i=0;i<n;i++) {
      grad.addColorStop(i/(n-1), hexToRGBA(colors[i]));
    }
  } else {
    // fallback blanco→negro
    grad.addColorStop(0, 'black'); grad.addColorStop(1,'white');
  }

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  // marco suave
  ctx.strokeStyle = 'rgba(255,255,255,.25)';
  ctx.strokeRect(.5, .5, w-1, h-1);
}

function niceTicks(min, max, target=6) {
  if (!isFinite(min) || !isFinite(max) || min===max) {
    return Array.from({length: target}, (_,i)=>i/(target-1));
  }
  const span = Math.abs(max-min);
  const step0 = span / Math.max(1, target-1);
  const mag = Math.pow(10, Math.floor(Math.log10(step0)));
  const norm = step0 / mag;
  const niceNorm = norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10;
  const step = niceNorm * mag;

  const tickMin = Math.ceil(min/step)*step;
  const tickMax = Math.floor(max/step)*step;
  const ticks = [];
  for (let v=tickMin; v<=tickMax + 1e-12; v+=step) ticks.push(+v.toFixed(12));
  if (ticks.length<2) return [min, max];
  // incluye límites si quedan fuera por poco
  if (ticks[0] > min) ticks.unshift(min);
  if (ticks[ticks.length-1] < max) ticks.push(max);
  return ticks;
}

function formatTick(v) {
  const a = Math.abs(v);
  if (a >= 1000) return Math.round(v).toString();
  if (a >= 100) return v.toFixed(1);
  if (a >= 1) return v.toFixed(2);
  return v.toFixed(3);
}

function renderLegendTicks(container, min, max, canvasHeightPx) {
  container.innerHTML = '';
  const ticks = niceTicks(min, max, 6);
  const h = canvasHeightPx; // 240 por defecto
  for (const t of ticks) {
    const pct = (t - min) / (max - min || 1);
    const y = (1 - pct) * h; // 0 arriba
    const div = document.createElement('div');
    div.className = 'tick';
    div.style.top = `${y}px`;
    div.innerHTML = `<span class="rule"></span><span class="label">${formatTick(t)}</span>`;
    container.appendChild(div);
  }
}

// ===== API pública de la leyenda =====
// const Legend = (() => {
//   const el = {
//     root: document.getElementById('legend'),
//     title: document.getElementById('legend-title'),
//     units: document.getElementById('legend-units'),
//     canvas: document.getElementById('legend-canvas'),
//     ticks: document.getElementById('legend-ticks'),
  
//   };

//   function show() {
//     el.root.classList.remove('hidden');
//     el.toggle.setAttribute('aria-expanded','true');
//     el.root.setAttribute('aria-hidden','false');
//   }
//   function hide() {
//     el.root.classList.add('hidden');
//     el.toggle.setAttribute('aria-expanded','false');
//     el.root.setAttribute('aria-hidden','true');
//   }

//   el.toggle?.addEventListener('click', () => {
//     if (el.root.classList.contains('hidden')) show(); else hide();
//   });
//   el.close?.addEventListener('click', hide);

//   function set({title, units, palette, min, max}) {
//     el.title.textContent = title ?? 'Legend';
//     el.units.textContent = units ? `Units: ${units}` : '';
//     drawLegendGradient(el.canvas, palette);
//     renderLegendTicks(el.ticks, min, max, parseInt(el.canvas.style.height || '240', 10));
//     show();
//   }

//   return { set, show, hide };
// })();

// ===== Resolver paleta desde distintos formatos =====
// Acepta: array de hex/rgba arrays, o un objeto tipo {stops:[{value,color,label},...]}
function resolvePalette(palette, range) {
  if (!palette) return ['#000', '#fff'];
  // Discreta tipo stops → la convertimos a continua para la barra
  if (palette.stops && Array.isArray(palette.stops)) {
    const {min, max} = range;
    // muestreamos 64 pasos entre min..max interpolando por los stops
    const stops = palette.stops
      .slice().sort((a,b)=>a.value-b.value)
      .map(s => ({value: s.value, color: s.color}));
    const samples = 64;
    const colors = [];
    for (let i=0;i<samples;i++){
      const v = min + (i/(samples-1))*(max-min);
      // busca segmento
      let j = 0;
      while (j < stops.length-1 && v > stops[j+1].value) j++;
      const a = stops[j], b = stops[Math.min(j+1, stops.length-1)];
      if (!a || !b || a.value===b.value) { colors.push(a? a.color : b.color); continue; }
      const t = (v - a.value) / (b.value - a.value);
      colors.push(t<.5 ? a.color : b.color); // simple “nearest” (rápido y suficiente para la barra)
    }
    return colors;
  }
  // Continua ya en array
  if (Array.isArray(palette)) return palette;
  // Fallback
  return ['#000', '#fff'];
}

// ===== Función principal que te interesa llamar =====
function getRuleFor(datasetId){
  return UNIT_RULES.find(r => r.match && r.match.test(String(datasetId))) || { unit:'', decimals:0 };
}

function updateLegendForDataset(datasetId, opts={}) {
  const ds = (AWS_DATASETS && AWS_DATASETS[datasetId]) || {};
  // nombre mostrado
  const title = opts.title || ds.title || datasetId || 'Dataset';
  const {min, max} = getRangeFromDataset(ds);
  const units = opts.units || getUnitsFromDataset(ds);
  const palette = resolvePalette(opts.palette || ds.palette || ds.colors, {min, max});
  Legend.set({ title, units, palette, min, max });
}




function __applyLegendFromContext({ datasetId, paletteToUse, imageUnscale, unitFormat, title }) {
  // 1) Rango numérico: preferimos AWS_DATASETS, si no, imageUnscale
  const ds = (AWS_DATASETS && AWS_DATASETS[datasetId]) || {};
  let min, max;

  if (typeof ds.min === 'number' && typeof ds.max === 'number') {
    min = ds.min; max = ds.max;
  } else if (Array.isArray(ds.domain) && ds.domain.length >= 2) {
    min = ds.domain[0]; max = ds.domain[ds.domain.length - 1];
  } else if (Array.isArray(imageUnscale) && imageUnscale.length >= 2) {
    min = imageUnscale[0]; max = imageUnscale[1];
  } else {
    min = 0; max = 1;
  }

  // 2) Unidades / título
 const units = resolveUnits({ datasetId, unitFormat, ds });  // ← NUEVO

  if (window.Legend?.set) {
    window.Legend.set({ title: title || ds.title || datasetId, units, palette: colors, min, max });
  } else if (window.legendControl?.updateConfig) {
    window.legendControl.updateConfig({ title: title || ds.title || datasetId, unitFormat: units, palette: colors });
  }

  

  // 3) Convertimos paletas posibles a array continuo de colores CSS
  function rgbaArrayToCss(c){ return `rgba(${c[0]},${c[1]},${c[2]},${(c[3] ?? 255)/255})`; }

  let colors;
  if (paletteToUse?.stops && Array.isArray(paletteToUse.stops)) {
    // forma {stops:[{value,color},...]} -> muestreamos colores en orden
    colors = paletteToUse.stops
      .slice().sort((a,b)=>a.value-b.value)
      .map(s => Array.isArray(s.color) ? rgbaArrayToCss(s.color) : s.color);
  } else if (Array.isArray(paletteToUse)) {
    // forma [[value,[r,g,b,a]], ...] o ['#hex', ...]
    colors = paletteToUse.map(p => Array.isArray(p)
      ? (Array.isArray(p[1]) ? rgbaArrayToCss(p[1]) : p[1])
      : p);
  } else {
    // último recurso: intenta wlPalette si existe en el scope
    colors = ['#000', '#fff'];
  }

  // 4) Pintar (usa tu Legend.set del bloque que te pasé)
  if (window.Legend?.set) {
    window.Legend.set({ title: legendTitle, units, palette: colors, min, max });
  } else if (window.legendControl?.updateConfig) {
    // Si usas tu control 'legendControl', pásale al menos la paleta y el unitFormat;
    // si ese control no acepta min/max, ya los tomará internamente de AWS_DATASETS.
    window.legendControl.updateConfig({ title: legendTitle, unitFormat: units, palette: colors });
  }
}

// ——— Leyenda: crear/actualizar en función del dataset actual ———
window.__legendCtrl ||= { inst: null }; // singleton simple

function ensureLegendForDataset({
  map,                     // instancia de maptilersdk.Map
  datasetId,               // currentDataset
  paletteToUse,            // array de [valor,[r,g,b,a]] o WL palette
  imageUnscale,            // [min,max] si viene del loadDatasetData
  unitFormat,              // string (p.e. "hPa", "°C", "mm")
  title                    // opcional
}) {
  // 1) Dominio numérico (min,max)
  let min = null, max = null;
  if (Array.isArray(imageUnscale) && imageUnscale.length === 2) {
    [min, max] = imageUnscale;
  } else if (AWS_DATASETS && AWS_DATASETS[datasetId]?.defaultUnscale) {
    [min, max] = AWS_DATASETS[datasetId].defaultUnscale; // fallback AWS
  }


   console.info("Active Layer", datasetId);

  if (/geopotential[_-]?height[_-]?500mb/.test(datasetId)) {
  min = 470;
  max = 600;

  }

  const isWindFixedLegend = /(?:^|\/)gfs\/(?:wind_10m_above_ground|wind_tropopause|wind_gust_surface)(?:$|\/)?/.test(datasetId);
  if (isWindFixedLegend) {
   
    min = 0;
    max = 240;
  }
  



  // 2) Construir un maptiler ColorRamp a partir de tus "stops"
  //    Soporta tanto formato [[v,[r,g,b,a]],...] como {stops:[{value,color:[]},...]}
  let stops = [];
  if (Array.isArray(paletteToUse)) {
    // [[valor,[r,g,b,a]], ...]
    stops = paletteToUse.map(([value, rgba]) => ({
      value,
      color: [rgba[0], rgba[1], rgba[2], rgba[3] ?? 255]
    }));
  } else if (paletteToUse?.stops) {
    // {stops:[{value,color:[r,g,b,a]}...]}
    stops = paletteToUse.stops.map(s => ({
      value: s.value,
      color: s.color
    }));
  }

  // Si no hay stops válidos, no hacemos nada
  if (!stops.length) return;

  // 3) Instanciar ColorRamp y escalarla si tenemos dominio
  const ramp = new maptilerweather.ColorRamp({ stops });
  const rampScaled = (Number.isFinite(min) && Number.isFinite(max))
    ? ramp.scale(min, max)
    : ramp;

  // 4) Desmontar la leyenda previa, si la había
  if (window.__legendCtrl.inst) {
    try { map.removeControl(window.__legendCtrl.inst); } catch {}
    window.__legendCtrl.inst = null;
  }

  // 5) Montar la leyenda
  const units = (typeof unitFormat === 'string' && unitFormat.trim()) ? unitFormat : '';
  const legend = new colorRampLegendControl({ colorRamp: rampScaled, units, title });
  map.addControl(legend, 'top-left');




  window.__legendCtrl.inst = legend;
}





// tamaño de la barra
const LEGEND_WIDTH = 28;
const LEGEND_HEIGHT = 480; // ← antes 240

function drawLegendGradient(canvas, colors) {
  const ctx = canvas.getContext('2d');
  const scale = (window.devicePixelRatio || 1);
  canvas.width  = LEGEND_WIDTH * scale;
  canvas.height = LEGEND_HEIGHT * scale;
  canvas.style.width  = LEGEND_WIDTH + 'px';
  canvas.style.height = LEGEND_HEIGHT + 'px';
  ctx.scale(scale, scale);

  const grad = ctx.createLinearGradient(0, LEGEND_HEIGHT, 0, 0);
  const n = Array.isArray(colors) ? colors.length : 0;
  if (n > 0) {
    for (let i = 0; i < n; i++) grad.addColorStop(i/(n-1), colors[i]);
  } else {
    grad.addColorStop(0, '#000'); grad.addColorStop(1, '#fff');
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, LEGEND_WIDTH, LEGEND_HEIGHT);
  ctx.strokeStyle = 'rgba(255,255,255,.25)';
  ctx.strokeRect(.5, .5, LEGEND_WIDTH-1, LEGEND_HEIGHT-1);
}

function renderLegendTicks(container, min, max) {
  container.innerHTML = '';
  const ticks = niceTicks(min, max, 8); // opcional: más ticks por ser más alta
  for (const t of ticks) {
    const pct = (t - min) / (max - min || 1);
    const y = (1 - pct) * LEGEND_HEIGHT;
    const div = document.createElement('div');
    div.className = 'tick';
    div.style.top = `${y}px`;
    div.innerHTML = `<span class="rule"></span><span class="label">${formatTick(t)}</span>`;
    container.appendChild(div);
  }
}

// en el IIFE de Legend, elimina toda la lógica de toggle/close y fuerza visible:
const Legend = (() => {
  const el = {
    root: document.getElementById('legend'),
    title: document.getElementById('legend-title'),
    units: document.getElementById('legend-units'),
    canvas: document.getElementById('legend-canvas'),
    ticks: document.getElementById('legend-ticks'),
  };
  function set({title, units, palette, min, max}) {
    el.root?.classList.remove('hidden');             // siempre visible
    el.root?.setAttribute('aria-hidden','false');    // accesible
    el.title.textContent = title ?? 'Legend';
    el.units.textContent = units ? `Units: ${units}` : '';
    drawLegendGradient(el.canvas, palette);
    renderLegendTicks(el.ticks, min, max);
  }
  return { set };
})();

// Control "singleton" que usamos cuando NO es MapTiler
window.__legendCtrl ||= { inst: null };

function applyLegendPolicy({ map, maptilerON }) {
  const customRoot = document.getElementById('legend'); // tu leyenda custom (si la usas)

  if (maptilerON) {
    // a) quitar control colorRamp propio si existiera
    if (window.__legendCtrl.inst) {
      try { map.removeControl(window.__legendCtrl.inst); } catch {}
      window.__legendCtrl.inst = null;
    }
    // b) ocultar completamente la leyenda custom si existe
    if (customRoot) customRoot.style.display = 'none';
  } else {
    // a) re-mostrar la leyenda custom (si la usas)
    if (customRoot) customRoot.style.display = '';
    // (no instanciamos aquí el control: lo haces justo antes del setProps con ensureLegendForDataset)
  }
}

// singleton del control propio (solo cuando NO es MapTiler)
window.__legendCtrl ||= { inst: null };

/**
 * Sincroniza la leyenda:
 * - maptilerON === true  -> oculta/retira tu leyenda y deja la nativa de MapTiler.
 * - maptilerON === false -> monta/actualiza tu leyenda propia con los datos pasados.
 */
function syncLegend({
  map,
  maptilerON,
  datasetId      = null,
  paletteToUse   = null,
  imageUnscale   = null,
  unitFormat     = '',
  title          = ''
} = {}) {
  const customRoot = document.getElementById('legend');

  if (maptilerON) {
    // 1) Es MapTiler: NO usamos nuestra leyenda -> quitar/ocultar y salir
    if (window.__legendCtrl.inst) {
      try { map.removeControl(window.__legendCtrl.inst); } catch {}
      window.__legendCtrl.inst = null;
    }
    if (customRoot) customRoot.style.display = 'none';
    document.body.classList.add('maptiler-on');
    document.body.classList.remove('no-maptiler');
    return; // <- aquí ignoramos datasetId/palette/... porque no hacen falta
  }

  // 2) No es MapTiler: mostrar/actualizar tu leyenda
  if (customRoot) customRoot.style.display = '';
  document.body.classList.add('no-maptiler');
  document.body.classList.remove('maptiler-on');

  // aquí SÍ usamos los datos para construir la leyenda propia
  ensureLegendForDataset({
    map,
    datasetId,
    paletteToUse,
    imageUnscale,
    unitFormat,
    title
  });
}

function buildUnitFormatForLegend(datasetId, meta, unitSystem) {
  const US = WeatherLayers.UnitSystem;
  const us = (unitSystem != null) ? unitSystem : (typeof constUni !== "undefined" ? constUni : US.METRIC);
  const key = unitSystemKey(us);
  const id = String(datasetId || "").toLowerCase();

  // 0) Si tienes tabla units (como en wind), úsala siempre (base value * scale)
  if (meta?.units?.[key] && typeof meta.units[key].unit === "string") {
    const u = meta.units[key];
    const scale = (typeof u.scale === "number") ? u.scale : 1;
    return {
      unit: u.unit,
      toDisplay: (v) => (typeof v === "number" ? v * scale : v),
      label: u.unit
    };
  }

  // 1) Temperaturas (tus paletas vienen en Kelvin -> convertir)
  const isTemp =
    id.includes("temperature") || id.includes("t2m") || id.includes("apt2m") || id.includes("apparent");

  if (isTemp) {
    if (us === US.IMPERIAL) {
      return {
        unit: "°F",
        toDisplay: (k) => (typeof k === "number" ? ((k - 273.15) * 9) / 5 + 32 : k),
        label: "°F"
      };
    }
    return {
      unit: "°C",
      toDisplay: (k) => (typeof k === "number" ? k - 273.15 : k),
      label: "°C"
    };
  }

  // 2) Precip: mm -> inches en imperial (si quieres)
  const isPrecip = id.includes("precip");
  if (isPrecip) {
    if (us === US.IMPERIAL) {
      return { unit: "in", toDisplay: (mm) => (typeof mm === "number" ? mm / 25.4 : mm), label: "in" };
    }
    return { unit: "mm", toDisplay: (mm) => mm, label: "mm" };
  }

  // 3) Resto: si meta.unitFormat trae unit string, úsalo (sin conversion)
  if (meta?.unitFormat) {
    if (typeof meta.unitFormat === "string") return { unit: meta.unitFormat, toDisplay: (v) => v, label: meta.unitFormat };
    if (typeof meta.unitFormat.unit === "string") return { unit: meta.unitFormat.unit, toDisplay: (v) => v, label: meta.unitFormat.unit };
  }

  // 4) Fallback final: solo label
  const label = legendUnitForDataset(datasetId) || "";
  return { unit: label, toDisplay: (v) => v, label };
}




function unitSystemKey(us) {
  const US = WeatherLayers.UnitSystem;
  if (us === US.METRIC)            return 'METRIC';
  if (us === US.METRIC_KILOMETERS) return 'METRIC_KMH';
  if (us === US.IMPERIAL)          return 'IMPERIAL';
  if (us === US.NAUTICAL)          return 'NAUTICAL';
  return 'METRIC';
}

// function legendUnitFormatForDataset(datasetId) {
//   const id = String(datasetId || '');
//   const s  = id.toLowerCase();

//   const US = WeatherLayers.UnitSystem;
//   const us = (typeof constUni !== 'undefined') ? constUni : US.METRIC;

//   const isTemp =
//     s.includes('temperature') ||
//     s.includes('t2m') ||
//     s.includes('apt2m') ||
//     s.includes('apparent') ||
//     s.includes('t500') ||
//     s.includes('t850');

//   // ✅ Temperaturas: tus valores/paleta están en Kelvin → convertir ticks de la leyenda
//   if (isTemp) {
//     if (us === US.IMPERIAL) return { unit: '°F', scale: 1.8, offset: -459.67 }; // K -> F
//     return { unit: '°C', scale: 1.0, offset: -273.15 };                         // K -> C
//   }

//   // resto de capas: deja lo que ya te funcionaba (solo unit)
//   const unitStr = String(legendUnitForDataset(id) || '');
//   return { unit: unitStr };
// }

function legendUnitFormatForDataset(datasetId) {
  const id = String(datasetId || '');
  const s  = id.toLowerCase();

  const US = WeatherLayers.UnitSystem;
  const us = (typeof constUni !== 'undefined') ? constUni : US.METRIC;

  const isTemp =
    s.includes('temperature') ||
    s.includes('t2m') ||
    s.includes('apt2m') ||
    s.includes('apparent') ||
    s.includes('t500') ||
    s.includes('t850');

  if (isTemp) {
    if (us === US.IMPERIAL) return { unit: '°F', scale: 1.8, offset: -459.67 };
    return { unit: '°C', scale: 1.0, offset: -273.15 };
  }

  // ✅ AÑADE ESTO: precipitación mm -> in
  const isPrecip =
    s.includes('precipitation') || s.includes('precip');

  if (isPrecip) {
    if (us === US.IMPERIAL) return { unit: 'in', scale: 1 / 25.4, offset: 0 };
    return { unit: 'mm', scale: 1.0, offset: 0 };
  }


  const isSnow =
    s.includes('snow') || s.includes('snow_depth_surface');

  if (isSnow) {
    if (us === US.IMPERIAL) return { unit: 'in', scale: 1 / 2.54, offset: 0 };
    return { unit: 'cm', scale: 1.0, offset: 0 };
  }







  const unitStr = String(legendUnitForDataset(id) || '');
  return { unit: unitStr };
}




function legendUnitForDataset(ds) {
  // 0) Normalizar entrada: puede ser string, objeto, función, etc.
  let id = '';
  if (typeof ds === 'string') id = ds;
  else if (ds && typeof ds === 'object') id = ds.id || ds.dataset || ds.name || '';
  else id = '';

  id = String(id || '');

  // Si por error te pasan una función, queda como '' (evita basura tipo "function datasetId...")
  if (id.startsWith('function') || id.includes('=>')) id = '';

  // 1) Localiza meta de forma robusta:
  // - primero por id tal cual (gfs/...)
  // - luego por datasetId(id) si tu AWS_DATASETS usa ids normalizados
  let meta = {};
  try {
    if (window.AWS_DATASETS && window.AWS_DATASETS[id]) meta = window.AWS_DATASETS[id];
    else if (typeof datasetId === 'function') {
      const norm = String(datasetId(id) || '');
      if (window.AWS_DATASETS && window.AWS_DATASETS[norm]) meta = window.AWS_DATASETS[norm];
    }
  } catch {}

  const US = WeatherLayers.UnitSystem;
  const us = (typeof constUni !== 'undefined') ? constUni : US.METRIC;

  // 2) unitSystemKey robusto (por si el tuyo no contempla METRIC_KILOMETERS)
  const key = (function mapUnitKey(u) {
    if (u === US.METRIC) return 'METRIC';
    if (u === US.METRIC_KILOMETERS) return 'METRIC_KMH';
    if (u === US.IMPERIAL) return 'IMPERIAL';
    if (u === US.NAUTICAL) return 'NAUTICAL';
    return 'METRIC';
  })(us);

  // 3) Preferencia total: tu tabla meta.units
  if (meta.units && meta.units[key] && typeof meta.units[key].unit === 'string') {
    return meta.units[key].unit;
  }

  const s = id.toLowerCase();

  // 4) Temperatura (leyenda solo necesita etiqueta)
  const isTemp =
    s.includes('temperature') ||
    s.includes('t2m') ||
    s.includes('apt2m') ||
    s.includes('apparent') ||
    s.includes('t500') ||
    s.includes('t850');

  if (isTemp) return (us === US.IMPERIAL) ? '°F' : '°C';

  // 5) Viento fallback (incluye gust)
  const isWind = s.includes('wind') || s.includes('gust');
  if (isWind) {
    if (us === US.METRIC_KILOMETERS) return 'km/h';
    if (us === US.IMPERIAL)          return 'mph';
    if (us === US.NAUTICAL)          return 'kn';
    return 'm/s';
  }

  // 6) Si meta.unitFormat existe, extrae SOLO el unit como string
  if (meta.unitFormat) {
    if (typeof meta.unitFormat === 'string') return meta.unitFormat;
    if (typeof meta.unitFormat.unit === 'string') return meta.unitFormat.unit;
  }

  // 7) Último fallback: resolveUnits (string)
  try {
    return String(resolveUnits({ datasetId: id, unitFormat: '', ds: meta }) || '');
  } catch {
    return '';
  }
}

function pickLegendTitle(datasetId, opts = {}) {
  if (opts && typeof opts.title === 'string' && opts.title.trim()) return opts.title.trim();

  // 1) Si tienes LOCAL_DATASET_META con title
  if (window.LOCAL_DATASET_META && window.LOCAL_DATASET_META[datasetId] && window.LOCAL_DATASET_META[datasetId].title) {
    return window.LOCAL_DATASET_META[datasetId].title;
  }

  // 2) Si tienes AWS_DATASETS con title
  if (window.AWS_DATASETS && window.AWS_DATASETS[datasetId] && window.AWS_DATASETS[datasetId].title) {
    return window.AWS_DATASETS[datasetId].title;
  }

  // 3) Si tienes DATASETS_BY_ID (label)
  if (window.DATASETS_BY_ID && window.DATASETS_BY_ID[datasetId] && window.DATASETS_BY_ID[datasetId].label) {
    return window.DATASETS_BY_ID[datasetId].label;
  }

  return String(datasetId || ' ');
}

function unitSystemKeyFromConstUni() {
  const US = WeatherLayers.UnitSystem;
  if (constUni === US.METRIC) return "METRIC";
  if (constUni === US.METRIC_KILOMETERS) return "METRIC_KMH";
  if (constUni === US.IMPERIAL) return "IMPERIAL";
  if (constUni === US.NAUTICAL) return "NAUTICAL";
  return "METRIC";
}

function legendUnitForDataset(datasetId) {
  const id = String(datasetId || "");
  const meta = (LOCAL_DATASET_META && LOCAL_DATASET_META[id]) || (AWS_DATASETS && AWS_DATASETS[id]) || null;
  if (!meta) return "";

  const key = unitSystemKeyFromConstUni();

  // 1) Si tienes tabla units (como viento)
  if (meta.units && meta.units[key] && meta.units[key].unit) {
    return String(meta.units[key].unit || "");
  }

  // 2) Si viene unitFormat tipo {unit:"°C", offset:-273.15} (temperaturas)
  if (meta.unitFormat && typeof meta.unitFormat === "object" && meta.unitFormat.unit) {
    const u = String(meta.unitFormat.unit || "");
    const isTemp = u === "°C" && typeof meta.unitFormat.offset === "number";
    if (isTemp) {
      return key === "IMPERIAL" ? "°F" : "°C";
    }
    return u;
  }

  // 3) Si viene unitFormat string
  if (typeof meta.unitFormat === "string") return meta.unitFormat;

  // 4) Fallbacks por patrón
  const low = id.toLowerCase();
  if (low.includes("wind")) {
    if (key === "METRIC_KMH") return "km/h";
    if (key === "IMPERIAL") return "mph";
    if (key === "NAUTICAL") return "kn";
    return "m/s";
  }
  if (low.includes("temperature") || low.includes("t2m") || low.includes("t500")) {
    return key === "IMPERIAL" ? "°F" : "°C";
  }
  if (low.includes("pressure") || low.includes("pmsl") || low.includes("mslp")) return "hPa";
  if (low.includes("precip")) return "mm";
  if (low.includes("reflect")) return "dBZ";
  if (low.includes("snow")) return "cm";
  if (low.includes("humidity") || low.includes("rh2m")) return "%";
  if (low.includes("cloud")) return "%";
  if (low.includes("pwat")) return "kg/m²";
  if (low.includes("swdn")) return "W/m²";

  return "";
}

function legendPaletteForDataset(datasetId) {
  const id = String(datasetId || "");
  const meta = (LOCAL_DATASET_META && LOCAL_DATASET_META[id]) || (AWS_DATASETS && AWS_DATASETS[id]) || null;
  return (meta && meta.palette) ? meta.palette : null;
}

function legendTitleForDataset(datasetId) {
  const id = String(datasetId || "");
  const meta = (LOCAL_DATASET_META && LOCAL_DATASET_META[id]) || (AWS_DATASETS && AWS_DATASETS[id]) || null;
  return (meta && meta.title) ? meta.title : id;
}

function updateLegendForDataset(datasetId) {
  try {
    if (!legendControl) return;

    const current = legendControl.getConfig() || {};

    const title = legendTitleForDataset(datasetId);
    const unitFormat = legendUnitForDataset(datasetId); // SIEMPRE string
    const palette = legendPaletteForDataset(datasetId) || current.palette || null;

    legendControl.setConfig({
      ...current,
      title,
      unitFormat,
      palette
    });
  } catch (e) {
    console.warn("updateLegendForDataset failed", e);
  }
}





function resolveUnits({ datasetId, unitFormat, ds }) {
  // 1) Prioridades: unitFormat explícito → ds.units → ds.unit → meta
  const raw =
    (typeof unitFormat === 'string' && unitFormat.trim()) ? unitFormat.trim() :
    (ds && (ds.units || ds.unit || ds.meta?.units)) || '';

  if (raw) return raw;

  const id = (datasetId || '').toLowerCase();

  // 2) Intentar adaptar al sistema de unidades (constUni)
  try {
    const US = WeatherLayers.UnitSystem;
    const us = (typeof constUni !== 'undefined') ? constUni : US.METRIC;

    const isTemp =
      id.includes('t2m') ||
      id.includes('temperature') ||
      id.includes('apt2m') ||
      id.includes('apparent');

    const isWind = id.includes('wind');

    if (isTemp) {
      if (us === US.IMPERIAL) return '°F';   // IMPERIAL → Fahrenheit
      return '°C';                           // METRIC / METRIC_KILOMETERS / NAUTICAL → Celsius
    }

    if (isWind) {
      if (us === US.METRIC_KILOMETERS) return 'km/h';
      if (us === US.IMPERIAL)          return 'mph';
      if (us === US.NAUTICAL)          return 'kn';
      return 'm/s';                    // METRIC normal
    }
  } catch (err) {
    console.warn('resolveUnits: error usando constUni', err);
  }

  // 3) Fallback por patrón de datasetId (si no hay constUni o no encaja)
  if (id.includes('pmsl') || id.includes('mslp') || id.includes('pressure')) return 'hPa';
  if (id.includes('z500') || id.includes('500mb') || id.includes('geopotential')) return 'dam';
  if (id.includes('precip'))                             return 'mm/3h';
  if (id.includes('reflect') || id.includes('radar'))    return 'dBZ';
  if (id.includes('snow'))                               return 'cm';
  if (id.includes('rh2m') || id.includes('humidity'))    return '%';
  if (id.includes('cloud'))                              return '%';
  if (id.includes('pwat'))                               return 'kg/m²';
  if (id.includes('swdn') || id.includes('shortwave'))   return 'W/m²';

  return '';
}




// ===== Ejemplos de uso =====
// 1) Cuando cambies de capa/dataset:
/// updateLegendForDataset('gfs/cloud_cover_entire_atmosphere');

// 2) Si tu capa decide otra paleta o ajusta rango dinámico:
/// updateLegendForDataset(currentDatasetId, {
///   palette: ['#001','#113','#225','#337','#55a','#78c','#9be','#cdf','#fff'],
///   units: '%',
///   title: 'Cloud cover',
/// });

// 3) Si usas stops discretos:
/// updateLegendForDataset('gfs/precip3h', {
///   palette: {stops: [
///     {value: 0,   color:'#f7fbff'},
///     {value: 2,   color:'#deebf7'},
///     {value: 5,   color:'#c6dbef'},
///     {value: 10,  color:'#9ecae1'},
///     {value: 20,  color:'#6baed6'},
///     {value: 40,  color:'#4292c6'},
///     {value: 60,  color:'#2171b5'},
///     {value: 80,  color:'#08519c'},
///     {value: 120, color:'#08306b'},
///   ]},
///   units: 'mm / 3h',
///   title: 'Precipitación (3h)',
/// });







async function switchDatasetSmooth(
  datasetId,
  { label='Dataset', minBuffer=6, windowSize=12, __mobileOpts=null } = {}
) {
 //...
}

// const pressureECMWFButton = document.getElementById('pressure');
// const windGFSButton = document.getElementById('wind');
const windgustGFSButton = document.getElementById('windgust');
// const windjetGFSButton = document.getElementById('jetStream');
// const capeECMWFButton = document.getElementById('cape-ecmwf');
// const precipitationGFSButton = document.getElementById('precipitation');
// const radarGFSButton = document.getElementById('radar');
// const instabilityGFSButton = document.getElementById('instability');
// const precipitableGFSButton = document.getElementById('precipitable');
// const temperatureGFSButton = document.getElementById('temp2m');
// const apparenttemperatureGFSButton = document.getElementById('apparenttemperature');
// const cloudcoverGFSButton = document.getElementById('cloudcover');
// const solarRadiationButton = document.getElementById('solarradiation');
// const relativehumidityButton = document.getElementById('relativehumidity');
const detailprecipitation5days = document.getElementById('detailprecipitation');
const detailradar5days = document.getElementById('detailradar');
const detailtemperature5days = document.getElementById('detailtemperature');
const detailpressure5days = document.getElementById('detailpressure');
const detailwind5days = document.getElementById('detailwind');

// const snowdepthGFSButton = document.getElementById('snowdepth');


const DATASETS = {
  pressure: { id:'gfs/pressure_mean_sea_level', label:'Pressure',      minBuffer:6, windowSize:12 },
  pressure_noaa: { id:'gfs/pressure_mean_sea_level', label:'Pressure',      minBuffer:6, windowSize:12 },
  precip:   { id:'gfs/precipitation_3h_accumulation_surface', label:'Precipitation', minBuffer:6, windowSize:12 },
  precip_noaa:   { id:'gfs/precipitation_3h_accumulation_surface', label:'Precipitation', minBuffer:6, windowSize:12 },
  radar:   { id:'gfs/reflectivity_1000m_above_ground', label:'Radar Reflectivity 1000 m', minBuffer:6, windowSize:12 },
  radar_noaa:   { id:'gfs/reflectivity_1000m_above_ground', label:'Radar Reflectivity 1000 m', minBuffer:6, windowSize:12 },
  temp500mb:   { id:'gfs/temperature_500mb', label:'Cold Air 500mb', minBuffer:6, windowSize:12 },
  temp500mb_noaa:   { id:'gfs/temperature_500mb', label:'Cold Air 500mb NOAA', minBuffer:6, windowSize:12 },
  temp2m:   { id:'gfs/temperature_2m_above_ground', label:'Temperature', minBuffer:6, windowSize:12 },
  temp2m_noaa:   { id:'gfs/temperature_2m_above_ground', label:'Temperature', minBuffer:6, windowSize:12 },
  cloud:    { id:'gfs/cloud_cover_entire_atmosphere', label:'Cloud cover', minBuffer:4, windowSize:8 },
   cloud_noaa:    { id:'gfs/cloud_cover_entire_atmosphere', label:'Cloud cover', minBuffer:4, windowSize:8 },
  gh500:    { id:'gfs/geopotential_height_500mb', label:'Inestability',         minBuffer:6, windowSize:12 },
  gh500_noaa:    { id:'gfs/geopotential_height_500mb', label:'Inestability',         minBuffer:6, windowSize:12 },
  cape:     { id:'gfs/convective_available_potential_energy_surface', label:'ThunderStorm', minBuffer:6, windowSize:12 },
  cape_noaa:     { id:'gfs/convective_available_potential_energy_surface', label:'ThunderStorm', minBuffer:6, windowSize:12 },
  solar:     { id:'gfs/downward_short_wave_radiation_flux_surface', label:'Solar Radiation', minBuffer:4, windowSize:8 },
  snow:  { id:'gfs/snow_depth_surface', label:'Snow Depth', minBuffer:4, windowSize:8 },
  snow_noaa:  { id:'gfs/snow_depth_surface', label:'Snow Depth', minBuffer:4, windowSize:8 },
  appTemp2m:  { id:'gfs/apparent_temperature_2m_above_ground', label:'Apparent Temperature ', minBuffer:6, windowSize:12 },
  wind:  { id:'gfs/wind_10m_above_ground', label:'Wind Surface ', minBuffer:6, windowSize:12 },
  wind_noaa:  { id:'gfs/wind_10m_above_ground', label:'Wind Surface ', minBuffer:6, windowSize:12 },
  windGust:  { id:'gfs/wind_tropopause_noaa', label:'Jet Stream', minBuffer:6, windowSize:12 },
  jetstream:  { id:'gfs/wind_gust_surface', label:'Wind Gust', minBuffer:6, windowSize:12 },
  precipitable:  { id:'gfs/precipitable_water_entire_atmosphere', label:'Precipitable WAter', minBuffer:6, windowSize:12 },
  precipitable_noaa:  { id:'gfs/precipitable_water_entire_atmosphere', label:'Precipitable WAter', minBuffer:6, windowSize:12 },
  relative: { id:'gfs/relative_humidity_2m_above_ground', label:'Precipitable WAter', minBuffer:4, windowSize:8 },
  relative_noaa: { id:'gfs/relative_humidity_2m_above_ground', label:'Precipitable WAter', minBuffer:4, windowSize:8 },
  


};



      const timeInfoContainer = document.getElementById("time-info");
      const timeTextDiv = document.getElementById("time-text");
      const timeSlider = document.getElementById("time-slider");
      const playPauseButton = document.getElementById("play-pause-bt");
      timeTextDiv.innerText = document.getElementById("local-datetime").innerText
      document.getElementById('time-text-top').innerText = document.getElementById("local-datetime").innerText

      const pointerDataDiv = document.getElementById("pointer-data");
      let pointerLngLat = null;
      // let activeLayer = null;
      //  let isPlaying = false;
      let currentTime = null;
      let windLayerAdded = true;
      let playfactor = 3600;
      let lastPointerValue = ""; // Nueva variable para cache
      let fixedCrosshair = false; 
      // Guarda el punto fijo elegido con la "cruceta" o clic
      let pointerStickyLngLat = null;
      let legendControlMaptiler; // Variable global para almacenar el control de la leyenda
      let maptilerON = true;
      let maptilerWindOff = false;
      window.NOAA = true;
      const nowButton = document.getElementById("now-bt");




    nowButton?.addEventListener("click", () => {

       // Ocultar el marcador de temperatura
  document.querySelectorAll(".markerTemperature").forEach(el => {
    el.style.display = "none";
  });

   document.querySelectorAll(".markerMainWeatherIcon").forEach(el => {
    el.style.display = "none";
  });

  // const weatherLayer = weatherLayers[activeLayer]?.layer;
  
  // weatherLayer.setAnimationTime(currentTime);
  
  // Hora actual, alineada a la hora
  let targetMs = Date.now();

  // Limita a los bounds del slider o, si no están en ms, a los del layer
  let min = Number(timeSlider.min);
  let max = Number(timeSlider.max);


  
  // Si min/max aún no están en milisegundos, intenta tomarlos del layer
  if (!Number.isFinite(min) || min < 100000) {
    const start = weatherLayer?.getAnimationStartDate?.()?.getTime?.();
    const end   = weatherLayer?.getAnimationEndDate?.()?.getTime?.();
    if (Number.isFinite(start)) min = start;
    if (Number.isFinite(end))   max = end;
  }

  if (Number.isFinite(min) && Number.isFinite(max)) {
    if (targetMs < min) targetMs = min;
    if (targetMs > max) targetMs = max;
  }

  // Mueve el slider y actualiza capas
  timeSlider.value = String(targetMs);
  const tSec = Math.floor(targetMs / 1000);
//   if (weatherLayer) {
//     weatherLayer.setAnimationTime(tSec);

//     if (pointerStickyLngLat) {
//   const once = () => { refreshPointerCalloutContent(); weatherLayer.off?.('tick', once); };
//   weatherLayer.on?.('tick', once);
// }


//     if (pointerStickyLngLat) refreshPointerCalloutContent();
//   }
  // Si tienes capa de viento sincronizada:
  // try { windLayer?.setAnimationTime?.(tSec); } catch {}

  // Refresca el texto de hora y cualquier lectura bajo el puntero
  try { refreshTime?.(); } catch {}
  try { if (pointerLngLat) updatePointerValue(pointerLngLat); } catch {}

});





// +3h -3h
// Botones ±3h
// const minus3hButton = document.getElementById("minus-3h-bt");
// const plus3hButton  = document.getElementById("plus-3h-bt");
// let currentTimeStepHours = 12;
// minus3hButton.textContent = `-${currentTimeStepHours}`;
// plus3hButton.textContent  = `+${currentTimeStepHours}`;
// // Paso en milisegundos (3 horas)
// const STEP_3H_MS =  currentTimeStepHours * HOUR_MS;  // HOUR_MS ya está definido arriba como 3600000

const minus3hButton = document.getElementById("minus-3h-bt");
const plus3hButton  = document.getElementById("plus-3h-bt");
const timeStepButton = document.getElementById("time-step-button");
const timeStepLabel  = document.getElementById("time-step-label");

// valor inicial: 12h
let currentTimeStepHours = 12;

// paso en milisegundos (se actualizará al cambiar el modo)
let STEP_3H_MS = currentTimeStepHours * HOUR_MS;  // HOUR_MS = 3600000

function updateTimeStepUI() {
  // actualiza texto de botones de avance
  if (minus3hButton) minus3hButton.textContent = `-${currentTimeStepHours}h`;
  if (plus3hButton)  plus3hButton.textContent  = `+${currentTimeStepHours}h`;

  // actualiza botón superior
  if (timeStepLabel) timeStepLabel.textContent = `${currentTimeStepHours}h`;

  // recalcula ms
  STEP_3H_MS = currentTimeStepHours * HOUR_MS;
}

// inicializar textos
updateTimeStepUI();

// ciclo 12 → 6 → 3 → 12
timeStepButton?.addEventListener("click", () => {
  if (currentTimeStepHours === 12) {
    currentTimeStepHours = 6;
  } else if (currentTimeStepHours === 6) {
    currentTimeStepHours = 3;
  } else {
    currentTimeStepHours = 12;
  }
  updateTimeStepUI();
});






function stepTimeBy(deltaMs) {
  if (!timeSlider) return;

  let currentMs = Number(timeSlider.value);
  if (!Number.isFinite(currentMs) || currentMs < 1e9) {
    // Si el slider aún no está bien inicializado, intenta usar el layer
    const wl = weatherLayers[activeLayer]?.layer;
    const tSec = wl?.getAnimationTime?.();
    if (typeof tSec === "number") {
      currentMs = tSec * 1000;
    } else {
      currentMs = Date.now();
    }
  }

  let targetMs = currentMs + deltaMs;

  // Limitar al rango del slider o, si no está bien, al del layer
  let min = Number(timeSlider.min);
  let max = Number(timeSlider.max);

  if (!Number.isFinite(min) || min < 1e9 || !Number.isFinite(max) || max < 1e9) {
    const wl = weatherLayers[activeLayer]?.layer;
    const start = wl?.getAnimationStartDate?.()?.getTime?.();
    const end   = wl?.getAnimationEndDate?.()?.getTime?.();
    if (Number.isFinite(start)) min = start;
    if (Number.isFinite(end))   max = end;
  }

  if (Number.isFinite(min) && Number.isFinite(max)) {
    if (targetMs < min) targetMs = min;
    if (targetMs > max) targetMs = max;
  }

  // Mover el slider
  timeSlider.value = String(targetMs);

  // Disparar la misma lógica que cuando el usuario arrastra el slider
  timeSlider.dispatchEvent(new Event("input",  { bubbles: true }));
  timeSlider.dispatchEvent(new Event("change", { bubbles: true }));
}

// Click en -3h
minus3hButton?.addEventListener("click", () => {
  clearMapTilerMarkers();
  reflectMaptilerFlag(maptilerON);
  
 
  stepTimeBy(-STEP_3H_MS);
});

// Click en +3h
plus3hButton?.addEventListener("click", () => {
 clearMapTilerMarkers();
  reflectMaptilerFlag(maptilerON);
  
 
  stepTimeBy(STEP_3H_MS);
});





// const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

const isMobile = false;

// const isMobile = false;

// let geoControl;

  // Mapbox
      // const map = window.map = new maplibregl.Map({
      //   container: 'map',
      //   style: BASEMAP_VECTOR_STYLE_URL,
      //   center: [-3.7038, 40.4168],
      //   zoom: 3,
      //   maxZoom: isMobile ? 8 : 10, // ⛔ evita que en móviles se pida zoom 9-10
      //   minZoom: 1
      // });
     
// geoControl = new maplibregl.GeolocateControl({
//     positionOptions: { enableHighAccuracy: false },
//     trackUserLocation: true,
//     showUserLocation: true,
//     fitBoundsOptions: {
//     maxZoom: 4   // 👈 aquí limitas el zoom al localizar
//   }
   
// });

//  map.addControl(geoControl, 'top-right');

  
// Integracion con Maptiler
let activeLayer = null;
const initWeatherLayer = "precipitation";
const weatherLayers = {
		   
        "precipitation": {
          "layer": null,
          "value": "value",
          "units": "mm/h"
        }, 
		  
        "radar": {
          "layer": null,
          "value": "value",
          "units": "dBZ"
        },
        "pressure": {
          "layer": null,
          "value": "value",
          "units": " hPa"
        },
        "clouds": {
          "layer": null,
          "value": "value",
          "units": " %"
        },
        "temperature": {
          "layer": null,
          "value": "value",
          "units": "°"
        },
        "wind": {
          "layer": null,
          "value": "speedMetersPerSecond",
          "units": " m/s"
        }, 
        "cold": {
          "layer": null,
          "value": "value",
          "units": "°C"
        }, 
      };

      const weatherLayer = weatherLayers[activeLayer]?.layer;

      // EDITADO PARA USAR MAPTILER SDK EN DOMINIO PERSONALIZADO
      //  maptilersdk.config.apiKey = 'VDHg5mMM0d7W65CxLS0Y';

       // PARA USO EN LOCALHOST DE PRUEBAS
      
        maptilersdk.config.apiKey = 'D04L3Hf6eT8QlVWDRols';

       const appContainer = document.getElementById('map');

       // Mapbox
      const map = window.map = new maplibregl.Map({
        container: 'map',
        style: BASEMAP_VECTOR_STYLE_URL,
       // style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
        center: [7, 46],
        zoom: 1.5,
      });

      // const map = window.map = new maptilersdk.Map({
      //   container: 'map', // container's id or the HTML element to render the map
      //   style: maptilersdk.MapStyle.STREETS.DARK,  // stylesheet location
      //    zoom: 5, // Ajusta el zoom
      //   // center: [-3.7038, 40.4168],
      //   // hash: true,
      //   // geolocateControl: true,
      //    navigationControl: false,
      //   // projectionControl: false,
      //   geolocate: maptilersdk.GeolocationType.POINT,
     
      //    projection: 'mercator',
      //     renderWorldCopies: false,
      
      //     bounds: [
      //   [-180, -85], // Southwest coordinates
      //   [180, 85] // Northeast coordinates
      //   ]
      // });
      
// geolocation.svg

const gc = new maplibreglMaptilerGeocoder.GeocodingControl({
  apiKey: maptilersdk.config.apiKey
});

map.addControl(gc, 'top-right');


map.dragRotate.disable();
map.touchZoomRotate.disableRotation();
// map.setMaxBounds([[-180, -85.051129], [180, 85.051129]]);
   // Waiting for the map to be ready
      // map.on("load", (e) => {
      //   const arControl = new maptilerarcontrol.MaptilerARControl({
      //     background: `radial-gradient(circle, rgba(230,240,244,1) 1%, rgba(165,184,190,1) 73%, rgba(98,116,121,1) 100%)`,
      //     edgeColor: "#456992",
      //     arButtonContent: `<img src="/sdk-js/assets/box-icon.svg"/>`,
      //     closeButtonContent: `<img src="/sdk-js/assets/close-icon.svg"/>`,
      //     arButtonClassName: "maptiler-ar-enable-button",
      //     closeButtonClassName: "maptiler-ar-close-button",
      //     activateAR: true //When the platform allows automatically activates the AR mode as soon as the data is ready
      //   });

        // arControl.on("computeStart", (e) => {
        //   overlay.style.display = "inherit";
        // })

        // arControl.on("computeEnd", (e) => {
        //   overlay.style.display = "none";
        // })

        // map.addControl(arControl, "top-left");
   //   })




requestAnimationFrame(() => {
  const geocoder     = document.querySelector('.maplibregl-ctrl-geocoder');
  const group        = geocoder?.closest('.maplibregl-ctrl');
  const searchToggle = document.getElementById('search-toggle');
  const infoBox    = document.getElementById('info-description');
  const infoToggle = document.getElementById('info-toggle');
  const infoContent = document.getElementById('info-content');


  // Conectar botón personalizado de geo con el control oculto de MapTiler
  const geoToggle = document.getElementById('geo-toggle');
const settingsButton   = document.getElementById('settings-button');
const settingsPanel    = document.getElementById('settings-panel');
const settingsClose    = document.getElementById('settings-close');
const infoDescription  = document.getElementById('info-description');

const infoLayerButton = document.getElementById('info-layer-button');



if (settingsButton && settingsPanel) {
 function openSettings() {
    settingsPanel.classList.add('visible');

    // cerrar solo el panel de info, no ocultar el botón
    if (infoDescription) {
      infoDescription.classList.remove('info-open');
      
    }
    if (infoToggle) {

          console.log("Info Toggle found4");
      infoToggle.classList.remove('active');
    }
  }

  function closeSettings() {
    settingsPanel.classList.remove('visible');
  }

  settingsButton.addEventListener('click', openSettings);

  if (settingsClose) {
    settingsClose.addEventListener('click', closeSettings);
  }

  settingsPanel.addEventListener('click', (ev) => {
    if (ev.target === settingsPanel) closeSettings();
  });

}

// Botón “info capa”: vuelve a mostrar la explicación de la capa actual
if (infoLayerButton) {

  infoLayerButton.addEventListener('click', () => {
    // Primero intentamos usar la última capa para la que se mostró info;
    // si no hay, usamos activeLayer como fallback.
     const key =
      (typeof lastInfoLayerKey === 'string' && lastInfoLayerKey) ||
      activeLayer;

    if (!key) return;

    // Forzamos a que se muestre, aunque ya se hubiera mostrado antes
    updateInfoPanel(key, { force: true });
  });
}

window.__NATIVE_setLocation = function(lat, lon, accuracy) {
  const target = [lon, lat];

  // zoom según precisión (si accuracy viene en metros)
  let z = 8;
  if (accuracy > 0) {
    if (accuracy > 5000) z = 6;
    else if (accuracy > 2000) z = 7;
    else if (accuracy > 800) z = 7.5;
    else if (accuracy > 300) z = 8;
    else z = 9;
  }

  // si ya estás cerca, no hagas un salto grande
  const cur = map.getCenter();
  const dLon = Math.abs(cur.lng - lon);
  const dLat = Math.abs(cur.lat - lat);
  const closeEnough = (dLon + dLat) < 0.2; // ~20km aprox (depende latitud)

  map.flyTo({
    center: target,
    zoom: closeEnough ? Math.max(map.getZoom(), z) : z,
    essential: true,
    duration: closeEnough ? 800 : 1600
  });
};



if (geoToggle) {
  geoToggle.addEventListener('click', () => {
    requestLocation();
    // if (!navigator.geolocation) {
    //   console.warn('Geolocation not supported');
    //   return;
    // }

    // navigator.geolocation.getCurrentPosition(
    //   (pos) => {
    //     const { latitude, longitude } = pos.coords;
    //     map.flyTo({
    //       center: [longitude, latitude],
    //       zoom: 8,
    //       essential: true,
    //     });
    //   },
    //   (err) => {
    //     console.warn('Geolocation error', err);
    //   },
    //   {
    //     enableHighAccuracy: true,
    //     timeout: 10000,
    //     maximumAge: 0,
    //   }
    // );
  });
}

function isIOSApp() {
  return !!(window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.bridge);
}

function requestLocation() {
  // Si estamos en la app iOS con tu bridge:
 if (isIOSApp()) {

try {
    window.webkit?.messageHandlers?.bridge?.postMessage({
      type: 'requestLocation',
      source: 'premium-overlay'
    });
  } catch (_) {
   
    // en web no pasa nada
  }
 return;
  }


  // Fallback web normal:
 if (!navigator.geolocation) {
      console.warn('Geolocation not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        map.flyTo({
          center: [longitude, latitude],
          zoom: 8,
          essential: true,
        });
      },
      (err) => {
        console.warn('Geolocation error', err);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
}





const appTitle = document.getElementById('app-title');

if (infoBox && infoContent && appTitle) {
  const toggleInfoPanel = () => {
    const isOpen = infoBox.classList.toggle('info-open');

    // sincroniza el estado visual del botón info si existe
    if (infoToggle) {
          console.log("Info Toggle found 1");
      infoToggle.classList.toggle('active', isOpen);
    }
  };

  // Ahora el título ClimaTok abre/cierra el panel
  if (appTitle) {
        console.log("Info Toggle found 2");
    appTitle.addEventListener('click', toggleInfoPanel);
  }
    console.log("Info Toggle found");
  // Opcional: mantener también el botón info funcionando
  if (infoBox && infoToggle && infoContent) {
  infoToggle.addEventListener('click', () => {
    const isOpen = infoBox.classList.toggle('info-open');
    // si quieres cerrar al segundo clic, esto ya lo hace automáticamente
  
  });
  
}
}








  if (group) {
    group.classList.add('gc-group');
  }
  if (!geocoder || !searchToggle) return;

  geocoder.classList.remove('geocoder-visible');
  searchToggle.style.display = 'inline-flex';
  

  const getInput = () => geocoder.querySelector('input[type="text"]');

  function showGeocoder() {
    geocoder.classList.add('geocoder-visible');
    // searchToggle.style.display = 'none';
    // settingsButton.style.display = 'none';
    // geoToggle.style.display = 'none';
   // if (infoBox) infoBox.classList.add('info-hidden');   // 👈 ocultamos info

    const input = getInput();
    if (input) {
      input.focus();
      input.select?.();
    }

     map.once('click', (e) => {
    const target = e.originalEvent && e.originalEvent.target;
    if (target && geocoder.contains(target)) return;
    hideGeocoder();
  });







  }

  function hideGeocoder() {
    geocoder.classList.remove('geocoder-visible');
    searchToggle.style.display = 'inline-flex';
    settingsButton.style.display = 'inline-flex';
     geoToggle.style.display = 'inline-flex';
    if (infoBox) infoBox.classList.remove('info-hidden'); // 👈 lo mostramos de nuevo
  }

  searchToggle.addEventListener('click', showGeocoder);

  // Cuando el usuario elige un resultado:
  if (gc && typeof gc.on === 'function') {
    gc.on('pick', () => {
      const handler = () => {
        hideGeocoder();
        map.off('moveend', handler);
      };
      map.on('moveend', handler);  // al terminar el flyTo/zoom
    });
  }
});

function getMapDate() {
  const wl = weatherLayers[activeLayer]?.layer;
  const tSec = wl?.getAnimationTime?.();
  if (typeof tSec === "number") return new Date(tSec * 1000);
  // Fallback: si guardas el tiempo del slider en ms
  if (window.currentMapTimeMs) return new Date(window.currentMapTimeMs);
  return new Date();
}

// dBZ

         const temperatureLayer = new maptilerweather.TemperatureLayer({
           opacity: 0.9,
         });

        // Radar will be using the cloud color ramp and used as a cloud overlay
        const radarLayer = new maptilerweather.RadarLayer({
          colorramp: maptilerweather.ColorRamp.builtin.RADAR,
        });

        const precipitationLayer = new maptilerweather.PrecipitationLayer({
          colorramp: maptilerweather.ColorRamp.builtin.NULL,
        });

        // const windLayer2 = new maptilerweather.WindLayer({
        //   colorramp: maptilerweather.ColorRamp.builtin.NULL,
        // });

        // const markerManager = new maptilermarkerlayout.MarkerLayout(map, {
        //   layers: ["City labels", "Place labels", "Town labels"],
        //   markerSize: [40, 70],
        //   offset: [0, -10],
        //   markerAnchor: "center",
        //   filter: (feature) => {
        //     return ["city", "village", "town"].includes(
        //       feature.properties.class
        //     );
        //   },
        // });

 let markerManager;
  let markerStatus = null;
  const markerLogicContainer = {};

 // --- LIMPIEZA DE MARCADORES MAPTILER ---
function clearMapTilerMarkers() {
  try {
    // 1) Vacía el contenedor DOM donde insertas los <div> de cada marker
    if (markerContainer) markerContainer.replaceChildren();

    // 2) Olvida el estado lógico para que no re-ataches los mismos divs
    for (const k in markerLogicContainer) delete markerLogicContainer[k];
    markerStatus = null;

    // 3) Si MarkerLayout expone algún reset/clear, llámalo de forma segura
    if (markerManager && typeof markerManager.reset === 'function') {
      markerManager.reset();
    }
  } catch (e) {
    console.warn('[markers] clear failed', e);
  }
}



    const btF = document.getElementById('flat-toggle');
  if (!btF) return;

  btF.addEventListener('click', (e) => {
    e.preventDefault();

    // Si hay historial, vuelve atrás
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    // Fallback si se abrió directo
    window.location.href = '/app/';
  });





  function updateMarkers() {

return; // DESACTIVADO POR AHORA, HASTA QUE REVISÉIS EL RENDIMIENTO CON MUCHOS MARCADORES

    if (!markerManager) return;

   
  if (!maptilerON) { 
    clearMapTilerMarkers(); 
    return; 
  }




    const status = markerManager.update();
    if (!status) return;
    markerStatus = status;

    status.removed.forEach(pb => {
      const div = markerLogicContainer[pb.id];
      delete markerLogicContainer[pb.id];
      if (div?.parentNode) div.parentNode.removeChild(div);
    });

    status.updated.forEach(pb => {
      updateMarkerDiv(pb, markerLogicContainer[pb.id]);
    });

    // status.new.forEach(pb => {
    //   const div = makeMarker(pb, temperatureLayer, radarLayer, precipitationLayer, windLayer2, new Date());
    //   markerLogicContainer[pb.id] = div;
    //   markerContainer.appendChild(div);
    // });
  }

  function softUpdateMarkers() {
    if (!markerManager || !markerStatus) return;
    markerStatus.updated.forEach(am => {
      markerManager.softUpdateAbstractMarker(am);
      updateMarkerDiv(am, markerLogicContainer[am.id]);
    });
    markerStatus.new.forEach(am => {
      markerManager.softUpdateAbstractMarker(am);
      updateMarkerDiv(am, markerLogicContainer[am.id]);
    });
  }

  // Eventos del mapa
  map.on("move", () => { 
    if (!isPlaying && activeLayer!=='wind') reflectMaptilerFlag(maptilerON);  softUpdateMarkers(); 
     if (selectedLngLat) setCrosshairAtLngLat(selectedLngLat);
  
  });
  map.on("moveend", () => { if (!isPlaying && activeLayer!=='wind') reflectMaptilerFlag(maptilerON); updateMarkers(); });



 const markerContainer = document.createElement("div");
 appContainer.appendChild(markerContainer);


 


 const myCustomRamp = new maptilersdk.ColorRamp({
      stops: [
        { value: 100, color: [252, 222, 156] },
        { value: 500, color: [250, 164, 118] },
        { value: 1000, color: [240, 116, 110] },
        { value: 1500, color: [227, 79, 111] },
        { value: 2000, color: [220, 57, 119] },
        { value: 3000, color: [185, 37, 122] },
        { value: 4000, color: [124, 29, 111] },
      ]
    });

    const pressureColoRamp = new maptilerweather.ColorRamp({
  stops: [
    { value: 940,  color: [ 10,  10,  30, 255] },
    { value: 948,  color: [ 15,  15,  50, 255] },
    { value: 956,  color: [ 20,  25,  80, 255] },
    { value: 964,  color: [ 25,  40, 120, 255] },
    { value: 973,  color: [ 30,  60, 160, 255] },
    { value: 981,  color: [ 20,  90, 180, 255] },
    { value: 985,  color: [ 35, 105, 195, 255] },
    { value: 989,  color: [ 45, 115, 205, 255] },
    { value: 993,  color: [ 65, 135, 210, 255] },
    { value: 997,  color: [ 85, 150, 215, 255] },
    { value: 1005, color: [140, 180, 200, 255] },
    { value: 1013, color: [210, 210, 210, 255] },
    { value: 1021, color: [200, 170, 120, 255] },
    { value: 1030, color: [190, 120,  80, 255] },
    { value: 1038, color: [160,  80,  60, 255] },
    { value: 1046, color: [130,  40,  70, 255] },
    { value: 1054, color: [ 90,  20,  50, 255] },
    { value: 1080, color: [ 50,  10,  30, 255] }
  ]
});



         const precipitationColoRamp = new maptilerweather.ColorRamp({
  stops: [
    { value: 0,   color: [224, 252, 253,   0] },
    { value: 1,   color: [  6, 223, 237, 255] },
    { value: 2,   color: [  0, 152, 246, 255] },
    { value: 3,   color: [  0,  14, 247, 255] },
    { value: 4,   color: [  2, 197,  56, 255] },
    { value: 5,   color: [  1, 220,   1, 255] },
    { value: 6,   color: [  1, 171,   1, 255] },
    { value: 7,   color: [ 99, 187,   0, 255] },
    { value: 8,   color: [249, 239,   0, 255] },
    { value: 9,   color: [234, 185,   0, 255] },
    { value: 10,  color: [255, 143,   3, 255] },
    { value: 20,  color: [255,  19,   0, 255] },
    { value: 30,  color: [226,   0,   0, 255] },
    { value: 40,  color: [201,   0,   0, 255] },
    { value: 50,  color: [222,   0, 123, 255] },
    { value: 60,  color: [221,  29, 236, 255] },
    { value: 70,  color: [172, 116, 207, 255] },
    { value: 100, color: [217, 201, 227, 255] }
  ]
});

const temperatureColoRamp = new maptilerweather.ColorRamp({
  stops: [
    { value: -55,   color: [204, 235, 255, 255] },
    { value: -45,   color: [179, 205, 227, 255] },
    { value: -37.5, color: [140, 150, 198, 255] },
    { value: -32.5, color: [140, 150, 198, 255] },
    { value: -27.5, color: [136,  86, 167, 255] },
    { value: -22.5, color: [129,  15, 124, 255] },
    { value: -19,   color: [  8,  29,  88, 255] },
    { value: -17,   color: [ 19,  39, 120, 255] },
    { value: -15,   color: [ 37,  52, 148, 255] },
    { value: -13,   color: [ 35,  71, 158, 255] },
    { value: -11,   color: [ 34,  92, 167, 255] },
    { value:  -9,   color: [ 31, 118, 180, 255] },
    { value:  -7,   color: [ 29, 145, 192, 255] },
    { value:  -5,   color: [ 44, 167, 197, 255] },
    { value:  -3,   color: [ 67, 181, 197, 255] },
    { value:  -1,   color: [ 99, 200, 197, 255] },
    { value:   1,   color: [127, 205, 187, 255] },
    { value:   3,   color: [152, 220, 166, 255] },
    { value:   5,   color: [199, 233, 180, 255] },
    { value:   7,   color: [220, 242, 198, 255] },
    { value:   9,   color: [237, 248, 217, 255] },
    { value:  11,   color: [245, 252, 211, 255] },
    { value:  13,   color: [252, 255, 204, 255] },
    { value:  15,   color: [255, 249, 182, 255] },
    { value:  17,   color: [255, 237, 160, 255] },
    { value:  19,   color: [255, 228, 139, 255] },
    { value:  21,   color: [254, 217, 118, 255] },
    { value:  23,   color: [254, 199,  97, 255] },
    { value:  25,   color: [254, 178,  76, 255] },
    { value:  27,   color: [254, 160,  68, 255] },
    { value:  29,   color: [253, 141,  60, 255] },
    { value:  31,   color: [253, 110,  51, 255] },
    { value:  33,   color: [252,  78,  42, 255] },
    { value:  35,   color: [242,  49,  32, 255] },
    { value:  37,   color: [227,  26,  28, 255] },
    { value:  39,   color: [210,  11,  32, 255] },
    { value:  41,   color: [189,   0,  38, 255] },
    { value:  43,   color: [159,   0,  39, 255] },
    { value:  45,   color: [115,   0,  31, 255] },
    { value:  47,   color: [ 76,   0,  25, 255] },
    { value:  49,   color: [ 25,   0,  13, 255] },
    { value:  51,   color: [ 76,   0, 153, 255] },
    { value:  53,   color: [204,   0, 204, 255] }
  ]
});
       

        const customLayer = new maptilerweather.TileLayer('cold', {minZoom: 0, maxZoom: 7},
        [
          new maptilerweather.GradientColoringFragment({
            decode: {
              // We use the red (`r`) channel but in this case, the same value is repeated on green and blue
              // so it does not really matter which channel we chose.
              channel: 'r',
              // Since we have encoded the square root of the density, the min and max are [0, 255]
              // which in terms of density means from 0 to 255*255 (65025)
              min: 0,
              max: 255,
            },
            // We scale the TURBO color ramp to go from `0` to `sqrt(45000)`
            // so that the max color of the color ramp represents a density of 45k people per sqkm
           // stops: maptilerweather.ColorRamp.builtin.TURBO.scale(0, Math.sqrt(6400)),
            stops: myCustomRamp,
            smooth: true,
            opacity: 1
          }),
        ]
      );

// config
// setTimeout(() => {
  
//   if (gc) {
//     map.addControl(gc, 'bottom-right');
//   }
// }, 5000);

// —————————————————————————————————————————————
// Pausar/reanudar viento durante interacciones

function pauseWindAnimation() {
  
  // Si usas deck.gl para partículas:
  if (deckglWind) {
    deckglWind.setProps({ 
    //  useDevicePixels: false,
      layers: [] });
  }
}

function resumeWindAnimation() {
 
  // Vuelve a añadir tu capa de partículas a deckglWind si corresponde:
  if (deckglWind) {
    // deckglWind.setProps({
    //   layers: [
    //     // new WeatherLayers.WindLayer({ id: 'wind' })
    //     // u otros layers que uses para viento...
    //   ]
    // });

 if(currentDataset == 'gfs/wind_10m_above_ground') {
              //  update();
              
               cloudVisible ?  updateCloud() : clearCloudLayer();
              if (shouldUpdateWind()) {
      applyWindLayer();
    } else {
      // opcional: console.debug('[wind] skip during animation on non-wind layer');
    }
      
        } else {

   // isMobile ? updateNoWind() : updateWind();
     cloudVisible ?  updateCloud() : clearCloudLayer();
    if (shouldUpdateWind()) {
      applyWindLayer();
    } else {
      // opcional: console.debug('[wind] skip during animation on non-wind layer');
    }
        }
  }
}

// === Helpers para limitar el tamaño de textura ===
async function scaleImageToMax(img, maxSide) {
  const w = img.width, h = img.height;
  const scale = Math.min(1, maxSide / Math.max(w, h));
  if (scale === 1) return img;
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(w * scale);
  canvas.height = Math.round(h * scale);
  const ctx = canvas.getContext('2d', { alpha: true, willReadFrequently: false });
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas;
}

async function getMaxTextureSize() {
  const testCanvas = document.createElement('canvas');
  const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
  return gl ? gl.getParameter(gl.MAX_TEXTURE_SIZE) : 4096;
}



// Suscribe los eventos de movimiento/zoom del mapa:
// map.on('movestart', pauseWindAnimation);
// map.on('zoomstart', pauseWindAnimation);

// Y cuando la interacción termine:
// map.on('moveend', resumeWindAnimation);
// map.on('zoomend', resumeWindAnimation);




const infoPanel = document.getElementById("info-content-layer");
const infoToggle = document.getElementById("info-toggle-button");

// Oculta el panel y muestra el icono al interactuar con el mapa
function hideInfoPanel() {
  if (infoPanel.style.display !== "none") {
    infoPanel.style.display = "none";
    infoToggle.style.display = "none";
  }
}




// Muestra el panel si el usuario toca el icono
infoToggle.addEventListener("click", () => {
  infoPanel.style.display = "block";
  infoToggle.style.display = "none";
});

// Oculta al mover o hacer zoom
map.on("movestart", hideInfoPanel);
map.on("zoomstart", hideInfoPanel);



       // Espera a que el estilo del mapa esté cargado
       map.on('load', function() {


          if (map.getLayer("background")) {
    map.setPaintProperty("background", "background-color", "#424b53");
    map.setPaintProperty("background", "background-opacity", 1);
  }


        map.setPaintProperty("water", 'fill-color', "rgba(34, 110, 149, 0.5)");
            map.setPaintProperty('countries-fill', 'fill-color', '#546362');
    map.setPaintProperty('countries-fill', 'fill-opacity', 0.22);
        // Añade la fuente de datos primero
        map.addSource('countriesSource', {
            type: 'vector',
            url: 'https://demotiles.maplibre.org/tiles/tiles.json' // Reemplaza con tu fuente vectorial real
        });

        // Añade la capa de países AL FINAL de todas las capas (sin beforeId)
        // map.addLayer({
        //     'id': 'countries-layer',
        //     'source': 'countriesSource',
        //     'source-layer': 'countries', // Asegúrate que coincida con tu fuente
        //     'type': 'fill',
        //     'paint': {
        //         'fill-color': '#68747f',
        //         'fill-opacity': 0.0,
        //         'fill-outline-color': '#6a6565'
        //     }
        // });

        
        
        // Opcional: Añade bordes más destacados
        map.addLayer({
            'id': 'countries-borders',
            'source': 'countriesSource',
            'source-layer': 'countries',
            'type': 'line',
            'paint': {
    'line-color': '#f6ecec',
    'line-width': [
        'interpolate',
        ['linear'],
        ['zoom'],
        0, 0.75,
        6, 2.0,
        10, 3.0
    ],
    'line-opacity': 1.0,
    'line-blur': 0.5
}
        });


console.log(map.getStyle().sources);
console.log(map.getStyle().layers.map(l => ({id:l.id, source:l.source, 'source-layer': l['source-layer']})));

// map.addLayer({
//   id: 'countries-fill',
//   type: 'fill',
//   source: 'carto',
//   'source-layer': 'boundary',
//   // Este filtro puede variar; empezamos con el más típico:
//   filter: ['==', ['get', 'admin_level'], 2],
//   paint: {
//     'fill-color': '#D3D3D3',
//     'fill-opacity': 0.10
//   }
// }, 'boundary_country_inner'); // lo coloca justo antes de las líneas de país

 // Cambiar países (del style de CARTO)
  if (map.getLayer('countries-fill')) {
    map.setPaintProperty('countries-fill', 'fill-color', '#2170de');
    map.setPaintProperty('countries-fill', 'fill-opacity', 0.30);
  }

  // Si quieres tierra/landuse
  if (map.getLayer('landuse')) {
    map.setPaintProperty('landuse', 'fill-color', '#125cde');
  }


        // initWeatherMap(initWeatherLayer);
        setOverlayAvailabilityForBaseLayer('detailprecipitation');

      // if (windLayerAdded) {
      //     windLayer.animateByFactor(playfactor);
      //     map.addLayer(windLayer);
      //     windLayerAdded = false;
         
          
      //  //  map.setLayoutProperty('windbase', 'visibility', 'none');
      //   }


// if (geoControl) {
//         geoControl.trigger();
//     }

// Alertas











        map.on('mouseout', function(evt) {
        if (!evt.originalEvent.relatedTarget) {
          // pointerDataDiv.innerText = "";
          // pointerLngLat = null;
              }
          });

        map.on("move",  () => {

          if (pointerStickyLngLat) positionPointerCallout();
          if (!isPlaying) {

            if (activeLayer == 'wind') {
              return
            }

          softUpdateMarkers();
          pointerDataDiv.innerText = "";

          }
        });

        map.on("moveend",  () => {
          if (!isPlaying) {

            if (activeLayer == 'wind') {
              return
            }
           reflectMaptilerFlag(maptilerON);
            updateMarkers();
            pointerDataDiv.innerText = "";
          }
          
        });

        // map.once("idle", () => {
        //   if (!isPlaying) {
        //     if (activeLayer == 'wind') {
        //       return
        //     }
            
        //    reflectMaptilerFlag(maptilerON);
        //     updateMarkers();
        //   }

        //    radar_noaa.click();
        //   // windLayer.setOpacity(0);
          
        // });

        map.on('click', (e) => {

          if (maptilerON) {
            

              // Si avisos activos y el click cae sobre un polígono CAP, no hacemos selectPoint
  if (alertsEnabled) {
    const capHits = map.queryRenderedFeatures(e.point, { layers: ["cap-es-fill"] });
    if (capHits && capHits.length) return;
  }
            //  showPointerCallout(e.lngLat);
              selectPoint(e.lngLat);
              showPointerPanelTemporarily(3000);

          }

        });

 // Editamos valores       
map.on('zoom', () => { if (pointerStickyLngLat) positionPointerCallout(); 
  hidePointerCallout();
});
map.on('resize', () => { if (pointerStickyLngLat) positionPointerCallout();
  hidePointerCallout();
 });

// map.on('moveend', positionPointerCallout);



    });

// Now lanzamiento al iniciar

function triggerNowButtonOnce() {
  const btn = document.getElementById("now-bt");
  if (!btn) return false;
  btn.click();
  return true;
}

// Ejecuta “Now” cuando el mapa ya está renderizando (idle)
function runNowOnFirstLoad() {
  if (window.__INITIAL_PRECACHING__) return;
  if (!window.__INITIAL_PRECACHED__) return;

  if (!window.map) {
    setTimeout(runNowOnFirstLoad, 200);
    return;
  }

  // esperamos a que haya estilo y capas listas
  if (typeof map.once === "function") {
    map.once("idle", () => {
      // doble intento por seguridad (algunas veces el UI termina de montar justo después)
      if (!triggerNowButtonOnce()) setTimeout(triggerNowButtonOnce, 300);
    });
  } else {
    // fallback
    setTimeout(triggerNowButtonOnce, 500);
  }
}

// Llamar al arrancar (primera carga)
// document.addEventListener("DOMContentLoaded", runNowOnFirstLoad);


        function makeMarker(
        abstractMarker,
        temperatureLayer,
        radarLayer,
        precipitationLayer,
        windLayer,
        date
      ) {
        const marker = document.createElement("div");
        marker.classList.add("marker");
        marker.classList.add("fade-in-animation");
        marker.style.setProperty("width", `${abstractMarker.size[0]}px`);
        marker.style.setProperty("height", `${abstractMarker.size[1]}px`);
        marker.style.setProperty(
          "transform",
          `translate(${abstractMarker.position[0]}px, ${abstractMarker.position[1]}px)`
        );

        const lonLat = abstractMarker.features[0].geometry.coordinates;
        const temperatureData = temperatureLayer.pickAt(lonLat[0], lonLat[1]);
        const precipitationData = precipitationLayer.pickAt(
          lonLat[0],
          lonLat[1]
        );

        const radarData = radarLayer.pickAt(lonLat[0], lonLat[1]);

        // Actual Layer Value for Temperature
       
        const weatherLayer = weatherLayers[activeLayer]?.layer;

      
        const valueData = weatherLayer.pickAt(lonLat[0], lonLat[1]);
      
        let value;

      if (activeLayer != 'wind') {
         value = valueData?.value.toFixed(1);
      }
        

       

    //   let mainWeatherIconURL = "./weather-icons/";
        const radarDBz = radarData?.value || -20;
        const precipMmH = precipitationData?.value || 0;
        const temperatureDeg = temperatureData?.value || 0;
        const temperature = temperatureData?.value.toFixed(1);

        let dateMap = getMapDate();

        const sunPosition = SunCalc.getPosition(dateMap, lonLat[1], lonLat[0]);

        // if (sunPosition.altitude < 0) {
        //   mainWeatherIconURL += "night-";
        // } else {
        //   mainWeatherIconURL += "day-";
        // }

        // if (radarDBz < 0) {
        //   if (precipMmH > 0.2) {
        //     mainWeatherIconURL += "cloudy-";
        //   } else {
        //     mainWeatherIconURL += "clear-";
        //   }
        // } else if (radarDBz < 10) {
        //   mainWeatherIconURL += "cloudy-";
        // } else if (radarDBz < 20) {
        //   mainWeatherIconURL += "overcast-";
        // } else {
        //   mainWeatherIconURL += "extreme-";
        // }

        // if (precipMmH > 5) {
        //   mainWeatherIconURL += temperatureDeg < -1 ? "snow" : "rain";
        // } else if (precipMmH > 0.2) {
        //   mainWeatherIconURL += temperatureDeg < -1 ? "snow" : "drizzle";
        // } else {
        //   mainWeatherIconURL += "none";
        // }

        // mainWeatherIconURL += ".svg";

        
        // Temperature
         if (activeLayer == 'temperature') {

        let tempF = value * 9 / 5 + 32;

        if (constUni === WeatherLayers.UnitSystem.IMPERIAL) {

        value = tempF.toFixed(1);
        }


        marker.innerHTML = `
    
        <div class="markerTemperature">${value ? `${value}` : ''}</div>`;
        }

        // Precipitation
         if (activeLayer == 'precipitation' && value > 0) {

  if (constUni === WeatherLayers.UnitSystem.IMPERIAL) {
        const inches = value / 25.4;
        value = `${inches.toFixed(2)} `;
      } else {
        // main = `${mm.toFixed(1)} `;
      }




        marker.innerHTML = `
       
        <div class="markerTemperature">${value ? `${value} ` : ''}</div>`;
        }

         // Radar
         if (activeLayer == 'radar'  && value > 0) {
        marker.innerHTML = `
       
        <div class="markerTemperature">${value ? `${value} ` : ''}</div>`;
        }

         // Wind
         if (activeLayer == 'wind'  ) {

      let v = 1;
      if (constUni === WeatherLayers.UnitSystem.METRIC) {
        v = 1;          // km/h → m/s
       
      } else if (constUni === WeatherLayers.UnitSystem.IMPERIAL) {
        v =  1.609344;     // km/h → mph
       
      } else if (constUni === WeatherLayers.UnitSystem.NAUTICAL) {
        v =  1.852;        // km/h → kt
        
      }
     

        marker.innerHTML = `
       
        <div class="markerTemperature">${valueData ? `${(valueData.speedKilometersPerHour / v).toFixed(1)} ` : ''}</div>`;
        }

      //   marker.innerHTML = `
      //   <img class="markerMainWeatherIcon" src=${mainWeatherIconURL}></img>
       
      //   <div class="markerTemperature">${value ? `${value}°` : ''}</div>
      // `;
        return marker;
      }

      function updateMarkerDiv(abstractMarker, marker) {
        marker.style.setProperty("width", `${abstractMarker.size[0]}px`);
        marker.style.setProperty("height", `${abstractMarker.size[1]}px`);
        marker.style.setProperty(
          "transform",
          `translate(${abstractMarker.position[0]}px, ${abstractMarker.position[1]}px)`
        );
      }

function updateMarkersTick() {
  if (!markerStatus) return;

  const wl = weatherLayers[activeLayer]?.layer;
  if (!wl) return;

  // Recorremos los markers “vivos” (los que ya existen)
  const toRefresh = []
    .concat(markerStatus.updated || [])
    .concat(markerStatus.new || []);

  for (const pb of toRefresh) {
    const markerDiv = markerLogicContainer[pb.id];
    if (!markerDiv) continue;

    const lonLat = pb.features[0].geometry.coordinates;

    // Lecturas al tiempo actual del mapa
    const tempData  = temperatureLayer.pickAt(lonLat[0], lonLat[1]);
    const precip    = precipitationLayer.pickAt(lonLat[0], lonLat[1])?.value || 0;
    const radarDBz  = radarLayer.pickAt(lonLat[0], lonLat[1])?.value ?? -20;
    const layerVal  = wl.pickAt(lonLat[0], lonLat[1])?.value;

    // Día/noche en función de la fecha del mapa (no del sistema)
    const dateMap   = getMapDate();                     // ya lo tienes
    const sun       = SunCalc.getPosition(dateMap, lonLat[1], lonLat[0]);
    let icon = "./weather-icons/" + (sun.altitude < 0 ? "night-" : "day-");

    // Estado del cielo según radar/precip
    if (radarDBz < 0) icon += (precip > 0.2 ? "cloudy-" : "clear-");
    else if (radarDBz < 10) icon += "cloudy-";
    else if (radarDBz < 20) icon += "overcast-";
    else icon += "extreme-";

    if (precip > 5) icon += (tempData?.value < -1 ? "snow" : "rain");
    else if (precip > 0.2) icon += (tempData?.value < -1 ? "snow" : "drizzle");
    else icon += "none";

    icon += ".svg";

    // Texto según capa activa
    let text = "";
    if (activeLayer === "temperature" && Number.isFinite(layerVal)) {
      text = `${layerVal.toFixed(1)}°`;
    } else if (activeLayer === "precipitation" && layerVal > 0) {
      text = `${layerVal.toFixed(1)} `;
    } else if (activeLayer === "radar" && layerVal > 0) {
      text = `${layerVal.toFixed(0)} `;
    }

    // Asegura estructura y actualiza DOM
    if (
        !markerDiv.querySelector(".markerTemperature")) {
      markerDiv.innerHTML = `
       
        <div class="markerTemperature"></div>`;
    }

    // const img = markerDiv.querySelector(".markerMainWeatherIcon");
    const box = markerDiv.querySelector(".markerTemperature");
    // if (img) img.src = icon;

    if (box) {
      box.textContent = text;
      box.style.display = text ? "inline-flex" : "none";
    }
  }
}





// ===================== CAP AEMET (GeoJSON desde CloudFront) =====================
let alertsEnabled = false;

async function setAlertsEnabled(enabled) {
  alertsEnabled = !!enabled;

   document.body.classList.toggle("cap-alerts-on", alertsEnabled);

  const btn = document.getElementById("toggle-alerts-bt");
  if (btn) btn.classList.toggle("active", alertsEnabled);

  if (alertsEnabled) await enableAlertsLayer();
  else disableAlertsLayer();

  localStorage.setItem("climatok_alerts_enabled", alertsEnabled ? "1" : "0");
}

function toggleAlerts() {
  setAlertsEnabled(!alertsEnabled);
}

async function enableAlertsLayer() {
  if (!window.map) return;

  await ensureCapLayerOnMap().catch(()=>{});

  if (map.getLayer("cap-es-fill")) map.setLayoutProperty("cap-es-fill", "visibility", "visible");
  if (map.getLayer("cap-es-line")) map.setLayoutProperty("cap-es-line", "visibility", "visible");
}

function disableAlertsLayer() {
  if (!window.map) return;

  if (map.getLayer("cap-es-fill")) map.setLayoutProperty("cap-es-fill", "visibility", "none");
  if (map.getLayer("cap-es-line")) map.setLayoutProperty("cap-es-line", "visibility", "none");
}




const CAP_ES_URL = "https://d10qouxoithcto.cloudfront.net/cap/es/latest.geojson";

function formatCapDate(s) {
  if (!s) return "";
  const str = String(s).trim();

  // Si viene ya en algo “humano”, lo devolvemos tal cual
  const looksISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(str);
  if (!looksISO) return str;

  const d = new Date(str);
  if (isNaN(d.getTime())) return str;

  // Formato visible en ES. (Corto y claro)
  return new Intl.DateTimeFormat("es-ES", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(d);
}

// Opcional: añade “CET/CEST” si quieres
function formatCapTzAbbrev(iso) {
  const m = String(iso || "").match(/([+-]\d{2}):?(\d{2})$/);
  if (!m) return "";
  const off = m[1];
  return off === "+01" ? "CET" : off === "+02" ? "CEST" : `UTC${off}`;
}

function ensureWeatherAboveCap() {
  if (!window.map) return;

  // IDs típicos que acaban existiendo en el estilo cuando activas capas meteo
  const weatherCandidates = [
    "precipitation",
    "radar",
    "temperature",
    "wind",
    "clouds"
  ];

  // Tus IDs CAP (ajústalos a los que hayas usado al hacer addLayer)
  const capLayerIds = ["cap-fill", "cap-line", "cap-symbol"];

  

  // Si existe una capa meteo, ponemos CAP justo por debajo (para que meteo quede encima)
  const topWeatherId = weatherCandidates.find(id => map.getLayer(id));
  if (topWeatherId) {
    capLayerIds.forEach(id => {
      if (map.getLayer(id)) {
        try { map.moveLayer(id, topWeatherId); } catch (_) {}
      }
    });
    return;
  }

  // Fallback: si no hay capas meteo, deja CAP debajo de labels (para que no tape nombres)
  const layers = (map.getStyle() && map.getStyle().layers) || [];
  const firstLabelId = layers.find(l => l.type === "symbol" && l.layout && l.layout["text-field"])?.id;
  if (firstLabelId) {
    capLayerIds.forEach(id => {
      if (map.getLayer(id)) {
        try { map.moveLayer(id, firstLabelId); } catch (_) {}
      }
    });
  }
}

// Si tu CloudFront ya está con CORS bien, esto funcionará desde climatok.net.
// Si no, ver notas AWS más abajo.
// async function fetchCapGeojson() {
//   const r = await fetch(CAP_ES_URL, { cache: "no-store", mode: "cors" });
//   if (!r.ok) throw new Error(`CAP fetch failed: ${r.status}`);
//   return await r.json();
// }

async function fetchCapGeojson() {
  const r = await fetch(CAP_ES_URL, { cache: "no-store", mode: "cors" });
  if (!r.ok) throw new Error(`CAP fetch failed: ${r.status}`);
  const j = await r.json();

  console.log("[CAP] etag", r.headers.get("etag"), "last-mod", r.headers.get("last-modified"),
              "features", j?.features?.length);

  return j;
}



// Heurística: intenta sacar “nivel”/severidad de propiedades CAP típicas.
// Ajustaremos cuando veamos tus propiedades reales.
function capSeverity(props = {}) {
  // 1) Si el feed trae LEVEL (RED/ORANGE/YELLOW), úsalo como fuente de verdad del color
  const lvl = props.LEVEL ?? props.level ?? "";
  const lt = String(lvl).trim().toLowerCase();

  if (lt === "red" || lt === "3") return "red";
  if (lt === "orange" || lt === "2") return "orange";
  if (lt === "yellow" || lt === "1") return "yellow";

  // // 2) Si no hay LEVEL, usa severity CAP (Extreme/Severe/Moderate)
  const sev = props.severity ?? props.SEVERITY ?? "";
  const st = String(sev).trim().toLowerCase();

  if (st === "extreme") return "red";
  if (st === "severe")  return "orange";
  if (st === "moderate") return "yellow";

  // // 3) Fallbacks (por si llega algo raro)
  const aw = props.awareness_level ?? props.AWARENESS_LEVEL ?? "";
  const awt = String(aw).trim().toLowerCase();
  if (awt.includes("red") || awt === "3") return "red";
  if (awt.includes("orange") || awt === "2") return "orange";
  if (awt.includes("yellow") || awt === "1") return "yellow";

  return "unknown";
}

function capColorExpression() {
  return [
    "case",
    ["==", ["get", "__sev"], "red"],    "rgba(220, 0, 0, 0.65)",
    ["==", ["get", "__sev"], "orange"], "rgba(255, 140, 0, 0.65)",
    ["==", ["get", "__sev"], "yellow"], "rgba(255, 215, 0, 0.55)",
    "rgba(160,160,160,0.35)"
  ];
}

function normalizeCapFeatureCollection(fc) {
  if (!fc || fc.type !== "FeatureCollection" || !Array.isArray(fc.features)) return fc;

  // Añadimos una propiedad "__sev" a cada feature para pintar rápido
  const out = {
    ...fc,
    features: fc.features.map(f => {
      const p = f.properties || {};
      return {
        ...f,
        properties: {
          ...p,
          __sev: capSeverity(p)
        }
      };
    })
  };
  return out;
}

function capPopupHtml(props = {}) {
  // Ajusta campos cuando veamos el GeoJSON final.
  const title =
    props.headline || props.HEADLINE ||
    props.event || props.EVENT ||
    props.name || props.NAME ||
    "Weather alert";

  const area =
    props.areaDesc || props.AREADESC ||
    props.area || props.AREA ||
    "";

  const sev = props.__sev ? String(props.__sev).toUpperCase() : "";

  const onset =
    props.onset || props.ONSET || props.effective || props.EFFECTIVE || "";
  const expires =
    props.expires || props.EXPIRES || props.ends || props.ENDS || "";

  const desc =
    props.description || props.DESCRIPTION || props.instruction || props.INSTRUCTION || "";

  const lines = [];
  lines.push(`<div style="font-weight:700;margin-bottom:6px;">${escapeHtml(title)}</div>`);
  if (area) lines.push(`<div style="opacity:.9;margin-bottom:6px;">${escapeHtml(area)}</div>`);
  if (sev)  lines.push(`<div style="margin-bottom:6px;"><b>Level:</b> ${escapeHtml(sev)}</div>`);
 if (onset || expires) {

  const onsetTxt = onset ? formatCapDate(onset) : "";
  const expTxt   = expires ? formatCapDate(expires) : "";
  const tz = expires
    ? formatCapTzAbbrev(expires)
    : (onset ? formatCapTzAbbrev(onset) : "");

  lines.push(`<div style="opacity:.9;margin-bottom:6px;">
    ${onsetTxt ? `<b>Desde:</b> ${escapeHtml(onsetTxt)}` : ""}
    ${expTxt ? ` ${onsetTxt ? " · " : ""}<b>Hasta:</b> ${escapeHtml(expTxt)}${tz ? ` <span style="opacity:.7">(${escapeHtml(tz)})</span>` : ""}` : ""}
  </div>`);
}
  if (desc) lines.push(`<div style="white-space:pre-wrap;max-width:320px;">${escapeHtml(desc)}</div>`);



  return `<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;font-size:13px;line-height:1.25;">${lines.join("")}</div>`;
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

let __capPopup = null;

function filterCapActiveNow(fc) {
  if (!fc?.features?.length) return fc;

  const now = Date.now();
  const parseT = (v) => {
    const d = new Date(String(v || ""));
    return isNaN(d.getTime()) ? null : d.getTime();
  };

  const out = {
    ...fc,
    features: fc.features.filter(f => {
      const p = f?.properties || {};
      const start = parseT(p.effective || p.onset || p.EFFECTIVE || p.ONSET);
      const end   = parseT(p.expires || p.ends || p.EXPIRES || p.ENDS);

      // Activo ahora: (start <= now) y (end >= now)
      if (start !== null && start > now) return false;
      if (end !== null && end < now) return false;
      return true;
    })
  };

  return out;
}


async function ensureCapLayerOnMap() {
  // Ojo: si el estilo aún no está cargado, no hacemos nada
  if (!map || !map.isStyleLoaded?.()) return;

  // 1) Carga datos
  let fc = await fetchCapGeojson();
  fc = normalizeCapFeatureCollection(fc);
  fc = filterCapActiveNow(fc);
  console.log("[CAP] activeNow features", fc.features?.length);

  // 2) Source
  const SRC_ID = "cap-es";
  if (map.getSource(SRC_ID)) {
    map.getSource(SRC_ID).setData(fc);
  } else {
    map.addSource(SRC_ID, { type: "geojson", data: fc });
  }

  // 3) Layers (relleno + borde)
  const FILL_ID = "cap-es-fill";
  const LINE_ID = "cap-es-line";

  if (!map.getLayer(FILL_ID)) {
    map.addLayer({
  id: FILL_ID,
  type: "fill",
  source: SRC_ID,
  layout: {
    visibility: "none",
    "fill-sort-key": [
      "case",
      ["==", ["get", "__sev"], "yellow"], 1,
      ["==", ["get", "__sev"], "orange"], 2,
      ["==", ["get", "__sev"], "red"],    3,
      0
    ]
  },
  paint: {
    "fill-color": capColorExpression(),
    "fill-outline-color": "rgba(255,255,255,0.35)"
  }
});
  }

  if (!map.getLayer(LINE_ID)) {
    map.addLayer({
      id: LINE_ID,
      type: "line",
      source: SRC_ID,
      layout: { visibility: "none" },
      paint: {
        "line-color": "rgba(255,255,255,0.55)",
        "line-width": 1
      }
    });
  }

  // 4) Interacción click
  if (!__capPopup) {
  __capPopup = new maptilersdk.Popup({
    closeButton: true,
    closeOnClick: true,
    className: "ctk-cap-popup"
  });
}

  // Evita duplicar handlers si style.load se dispara varias veces
  map.off("click", FILL_ID, __capClickHandler);
  map.on("click", FILL_ID, __capClickHandler);

  map.off("mouseenter", FILL_ID, __capMouseEnter);
  map.on("mouseenter", FILL_ID, __capMouseEnter);

  map.off("mouseleave", FILL_ID, __capMouseLeave);
  map.on("mouseleave", FILL_ID, __capMouseLeave);
}

function __pickBestCapFeature(features = []) {
  if (!features.length) return null;

  const sevRank = (p) => {
    const s = String(p?.__sev || "").toLowerCase();
    if (s === "red") return 3;
    if (s === "orange") return 2;
    if (s === "yellow") return 1;
    return 0;
  };

  const now = Date.now();
  const parseT = (v) => {
    const d = new Date(String(v || ""));
    return isNaN(d.getTime()) ? null : d.getTime();
  };

  let best = features[0];
  let bestScore = -1;

  for (const f of features) {
    const p = f?.properties || {};
    const onset = parseT(p.onset || p.ONSET || p.effective || p.EFFECTIVE);
    const exp   = parseT(p.expires || p.EXPIRES || p.ends || p.ENDS);

    // score: severidad + (si está activa ahora) + (si expira antes, un pelín)
    let score = sevRank(p) * 100;

    const activeNow =
      (onset === null || onset <= now) &&
      (exp === null || exp >= now);

    if (activeNow) score += 20;
    if (exp !== null) score += Math.max(0, 10 - Math.min(10, Math.floor((exp - now) / (60*60*1000)))); // favorece las que expiran antes

    if (score > bestScore) {
      bestScore = score;
      best = f;
    }
  }
  return best;
}


let __capAutoCloseTimer = null;
function __capClickHandler(e) {
  const f = __pickBestCapFeature(e?.features || []);
  if (!f) return;

  const html = capPopupHtml(f.properties || {});
  __capPopup.setLngLat(e.lngLat).setHTML(html).addTo(map);

    // ✅ autocerrar a los 6 segundos
  if (__capAutoCloseTimer) clearTimeout(__capAutoCloseTimer);
  __capAutoCloseTimer = setTimeout(() => {
    try { __capPopup.remove(); } catch (_) {}
  }, 4000);
}


function __capMouseEnter() { map.getCanvas().style.cursor = "pointer"; }
function __capMouseLeave() { map.getCanvas().style.cursor = ""; }

// 5) Refresco periódico (por si cambian los avisos)
// (elige 5-15 min; para AEMET diario también vale 30-60 min)
let __capTimer = null;
function startCapAutoRefresh() {
  if (__capTimer) clearInterval(__capTimer);
 __capTimer = setInterval(() => {
  console.log("[CAP] auto-refresh tick");
  ensureCapLayerOnMap().catch(() => {});
}, 10 * 60 * 1000);
}
// ================================================================================


      await new Promise(resolve => map.once('style.load', resolve));

//      ensureCapLayerOnMap().catch(()=>{});
// startCapAutoRefresh();



updateBasemapVectorStyle(map);

  map.setProjection({ type: 'globe' });


 // rotate
      const rotateAnimation = new WeatherLayers.Animation({ onUpdate: () => {
        const center = map.getCenter();
        map.setCenter({ lng: center.lng + 0.001, lat: center.lat });
      }});



      
    // --- UI de carga para MapLibre / MapTiler ---
(() => {
  if (typeof NetLine === 'undefined') return; // por si falla antes
  let pending = 0;
  let hideTimer = null;

  function show(text) {
    clearTimeout(hideTimer);
 //   NetLine.show(text || 'Loading map…');
  }
  function maybeHide() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => { if (pending <= 0) NetLine.hide(); }, 250);
  }

  // Se dispara cuando empieza a cargarse algo del mapa (fuente/tile/estilo)
  map.on('dataloading', (e) => {
    // Filtra a lo que nos interesa (tiles/fuentes); evita “style” si no quieres ruido
    if (e.dataType === 'source' || e.dataType === 'tile') {
      pending++;
    //  show('Loading map…');
    }
  });

  // Se dispara cuando termina de llegar un chunk de datos
  map.on('data', (e) => {
    if (e.dataType === 'source' || e.dataType === 'tile') {
      pending = Math.max(0, pending - 1);
      if (pending === 0) maybeHide();
    }
  });

  // Si hay error de red, informa explícitamente
  map.on('error', () => {
   // show('Slow or unstable connection…');
    // no ocultamos inmediatamente; que lo oiga el usuario
    maybeHide();
  });
})();


      
      const tooltipControl = new WeatherLayers.TooltipControl({ followCursor: true });
   //   map.addControl(tooltipControl);
      let weatherLayerBase = null;


      

 // Integracion Maptiler
  // function initWeatherMap(type) {

  //       maptilerON = true;
  //       const weatherLayer = changeWeatherLayer(type);
  //       weatherLayerBase = weatherLayer

  //         deckgl.setProps({
  //             layers: [],
              
  //         });

  //       document.getElementById('variable-name').textContent = 'Detail Precipitation 4 days';
  //       document.getElementById('active-layer-name').textContent = 'Detail Precipitation 4 days';
  //       document.querySelectorAll('#buttons li').forEach(btn => {
  //       btn.classList.remove('active');


  // const btnAlert = document.getElementById("toggle-alerts-bt");
  // if (!btnAlert) {
  //   console.warn("No existe #toggle-alerts-bt en el HTML");
  //   return;
  // }

  // btnAlert.addEventListener("click", toggleAlerts);

  // // Restaura estado guardado
  // // const saved = localStorage.getItem("climatok_alerts_enabled");
  // // alertsEnabled = (saved === "1");
  // // btnAlert.classList.toggle("active", alertsEnabled);

  // // Espera a que el mapa esté listo para aplicar visibilidad
  // // if (window.map && typeof map.on === "function") {
  // //   map.on("load", () => setAlertsEnabled(alertsEnabled));
  // // } else {
  // //   // fallback: aplica cuando puedas (si el map se crea después)
  // //   setTimeout(() => setAlertsEnabled(alertsEnabled), 500);
  // // }



  //   });
  //          detailprecipitation5days.classList.add('active');

  //           if (window.climatokRefreshLayerToggle) {
  //             window.climatokRefreshLayerToggle();
  //           }

  //          contourVisible = contourNoVisibleAllways;
  //          update();
         
         
  // }

        class colorRampLegendControl {
        constructor(options) {
          this._options = {...options};
          this._container = document.createElement("div");
          this._container.classList.add("maplibregl-ctrl");
          this._container.classList.add("maplibregl-ctrl-color-ramp");
        }
     
        onAdd(map) {
    this._map = map;
    const colorramp = this._options.colorRamp;

    // Crear un nuevo canvas con dimensiones correctas
    const canvas = document.createElement("canvas");
    canvas.width = 14;  // Estrecho
    canvas.height = 120; // Alto

    // Obtener el contexto 2D del canvas
    const ctx = canvas.getContext("2d");

    // Dibujar la imagen del color ramp en vertical
    const originalCanvas = colorramp.getCanvasStrip();
    ctx.translate(0, canvas.height); // Mover el punto de inicio
    ctx.rotate(-Math.PI / 2); // Rotar -90° para que se vea correctamente
    ctx.drawImage(originalCanvas, 0, 0, canvas.height, canvas.width);

      // Aplicar estilos
      canvas.style.border = "1px solid #FFFFFF"; // Borde blanco para resaltar en fondo negro
    canvas.style.display = "block";

    const bounds = colorramp.getBounds();

    let KelvinToCelsius = 0.0;

    const id = currentDataset;

  // Temperaturas que vienen en Kelvin => rotular en °C
  const isTempK = !maptilerON && (
  id.includes('gfs/temperature_500mb') ||
  id.includes('gfs/temperature_2m_above_ground') ||
  id.includes('gfs/apparent_temperature_2m_above_ground')
);

  if (isTempK) { 
    KelvinToCelsius = 273.15
  }
 


    const valueUp = Math.round(bounds.max - KelvinToCelsius);
    const valueDown = Math.round(bounds.min - KelvinToCelsius);

    // Crear un contenedor para la barra de colores y las etiquetas
    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "column"; // Alinear en columna
    wrapper.style.alignItems = "center";
    wrapper.style.gap = "6px";
    wrapper.style.background = "none"; // Fondo negro
    wrapper.style.padding = "0px"; // Espacio alrededor
    wrapper.style.borderRadius = "0px"; // Bordes redondeados
    wrapper.style.boxShadow = "none";
 

 // Crear la etiqueta máxima (arriba)
// Máximo
const maxLabel = document.createElement("span");
maxLabel.textContent = `${valueUp} `;
maxLabel.style.fontSize = "10px";
maxLabel.style.color = "white";
maxLabel.style.fontWeight = "bold";
maxLabel.style.background = "rgba(0,0,0,0.8)";
maxLabel.style.padding = "4px 8px";
maxLabel.style.borderRadius = "8px";
maxLabel.style.display = "inline-block";
maxLabel.style.lineHeight = "1";
maxLabel.style.whiteSpace = "nowrap";
maxLabel.style.boxShadow = "0 2px 8px rgba(0,0,0,.25)";

// Mínimo
const minLabel = document.createElement("span");
minLabel.textContent = `${valueDown} `;
minLabel.style.fontSize = "10px";
minLabel.style.color = "white";
minLabel.style.fontWeight = "bold";
minLabel.style.background = "rgba(0,0,0,0.8)";
minLabel.style.padding = "4px 8px";
minLabel.style.borderRadius = "8px";
minLabel.style.display = "inline-block";
minLabel.style.lineHeight = "1";
minLabel.style.whiteSpace = "nowrap";
minLabel.style.boxShadow = "0 2px 8px rgba(0,0,0,.25)";



    // Agregar elementos al contenedor en orden vertical
    wrapper.appendChild(maxLabel);
    wrapper.appendChild(canvas);
    wrapper.appendChild(minLabel);

    // 👇 Igualar ancho de las dos cajas (tras insertarlas)
// requestAnimationFrame(() => {
//   const FIX = 60;
//   // asegurar que el width fijo centra el texto
//   maxLabel.style.display = 'inline-block';
//   minLabel.style.display = 'inline-block';
//   maxLabel.style.textAlign = 'center';
//   minLabel.style.textAlign = 'center';
//   maxLabel.style.whiteSpace = 'nowrap';
//   minLabel.style.whiteSpace = 'nowrap';

//   // const w = Math.max(maxLabel.offsetWidth, minLabel.offsetWidth);
//   maxLabel.style.width = FIX + 'px';
//   minLabel.style.width = FIX + 'px';
// });

// asegurar contenedor del control
this._container ||= document.createElement('div');

    this._container.appendChild(wrapper);
    return this._container;
    }





        onRemove() {
          if (!this._map || !this._container) {
            return;
          }
          this._container.parentNode.removeChild(this._container);
          this._map = undefined;
          delete this._map;
        }
 }


function getUnitsForMaptilerType(type) {
  const US = WeatherLayers.UnitSystem;
  const u  = (typeof constUni !== 'undefined') ? constUni : US.METRIC;

  switch (type) {
    case 'temperature':
      return (u === US.IMPERIAL) ? '°F' : '°C';

    case 'wind':
      if (u === US.METRIC)          return 'm/s';
      if (u === US.METRIC_KILOMETERS) return 'km/h';
      if (u === US.IMPERIAL)        return 'mph';
      if (u === US.NAUTICAL)        return 'kt';
      return 'km/h';

    case 'precipitation':
      return (u === US.IMPERIAL) ? 'in' : 'mm';

    case 'pressure':
      // si quieres ser purista, en Imperial podrías usar inHg; si no, deja hPa siempre
      return 'hPa';

    case 'radar':
      return 'dBZ';

    default:
      return '';
  }
}




//      function changeLayerLabel(type) {
//     let labelText = "";
//     let newColorRamp = null;
//     let units = ""; // Variable para almacenar las unidades correctas

//     switch (type) {
		
// 		  case "precipitation":
//             labelText = "PRECIPITATION 1h";
//           // newColorRamp = maptilerweather.ColorRamp.builtin.PRECIPITATION;
//             newColorRamp = maptilerweather.ColorRamp.builtin.PRECIPITATION;
//             console.log('PRECIPITATION Color Ramp:', newColorRamp);

//            currentDataset = 'gfs/precipitation_3h_accumulation_surface'
//            update();
 





//             units = "mm"; // Unidades de precipitación
//             break;
//         case "radar":
//             labelText = "RADAR 1h";
//             newColorRamp = maptilerweather.ColorRamp.builtin.RADAR;
//             units = "dBz"; // Unidades de precipitación
         
//            currentDataset = 'gfs/reflectivity_1000m_above_ground'
//            update();
  
//             break;
//         case "temperature":
//             labelText = "TEMPERATURE";
//             newColorRamp = maptilerweather.ColorRamp.builtin.TEMPERATURE_3;
//             units = "°C"; // Unidades de temperatura
//             currentDataset = 'gfs/temperature_2m_above_ground'
//             update();
           
//             break;
//         case "pressure":
//             labelText = "PRESSURE";
//             newColorRamp = maptilerweather.ColorRamp.builtin.PRESSURE_2;
//             units = "hPa"; // Unidades de presión
//             break;
//         case "wind":
//             labelText = "WIND";
//             newColorRamp = maptilerweather.ColorRamp.builtin.DENSITY.scale(0,40*3.6);
//             units = "Km/h"; // Unidades de viento
//             currentDataset = 'gfs/wind_10m_above_ground'
//             update();
         
//             break;
//         case "cold":
//             labelText = "COLD IN HIGH LEVES";
//             newColorRamp = maptilerweather.ColorRamp.builtin.WIND.scale(40);
//             units = "mm/h"; // Unidades de precipitacion
//             break;
//         default:
//             labelText = "Weather Layer";
//             newColorRamp = null;
//             units = ""; // No hay unidades predeterminadas
//     }

   






//     // Cambiar el nombre de la capa en la UI
//     document.getElementById("variable-name").innerText = labelText;
//     document.getElementById("active-layer-name").innerText = labelText.toLowerCase().replace(/^\w/, c => c.toUpperCase());



//     // Remover la leyenda anterior si existe
//     if (legendControlMaptiler) {
//         map.removeControl(legendControlMaptiler);
//     }

//     console.log(`✅ Color Ramp de Maptiler ${labelText}`);
   
//     // Agregar la nueva leyenda con la escala de colores correcta
//     if (newColorRamp) {
//         legendControlMaptiler = new colorRampLegendControl({ colorRamp: newColorRamp, units: units });
//         map.addControl(legendControlMaptiler, 'top-left');
//     }



// }


function hideMaptilerLegend(map, hidden = true) {
  const el = map.getContainer().querySelector('.maplibregl-ctrl-color-ramp');
  if (el) {
    el.classList.toggle('is-hidden', hidden);
    el.setAttribute('aria-hidden', hidden ? 'true' : 'false');
  }
}

//    function changeWeatherLayer(type) {

//       // // Ocultar el marcador de temperatura
//       // document.querySelectorAll(".markerTemperature").forEach(el => {
//       //   el.style.display = "none";
//       // });
//       // document.querySelectorAll(".markerMainWeatherIcon").forEach(el => {
//       //   el.style.display = "none";
//       // });
//       //   pointerCalloutEl.style.display = "none"; 
//       //   pointerCalloutElFlecha.style.display = "none";
//      //    crosshair.style.display = "none";
//       //   pointerDataDiv.innerText = "";



//          map.removeLayer(customLayer);


//         // if (windLayerAdded) {
//         //   windLayer.animateByFactor(playfactor);
//         //   map.addLayer(windLayer);
//         //   windLayerAdded = false;
//         // }
        
//       //   if (type !== activeLayer) {
//       //   if (activeLayer === 'clouds') WLClouds.show(false);
//       //   // ... (tu lógica existente)
//       //   // Si entramos en nubes -> mostrar WL
//       //   if (type === 'clouds') WLClouds.show(true);

//            if (map.getLayer(activeLayer)) {
//             const activeWeatherLayer = weatherLayers[activeLayer]?.layer;
//             if (activeWeatherLayer) {
//               currentTime = activeWeatherLayer.getAnimationTime();
//               map.setLayoutProperty(activeLayer, 'visibility', 'none');
//             }
//           }
//           activeLayer = type;
//           const weatherLayer = weatherLayers[activeLayer].layer || createWeatherLayer(activeLayer);
//           if (map.getLayer(activeLayer)) {
//             map.setLayoutProperty(activeLayer, 'visibility', 'visible');
//           } else {
//             map.addLayer(weatherLayer, 'Water');
            
//            }
//           changeLayerLabel(activeLayer);
//        //   activateButton(activeLayer);
//          changeLayerAnimation(weatherLayer);
//         //  pointerDataDiv.innerText = "";
//           pointerLngLat = null;

// ensureWeatherAboveCap();

//           return weatherLayer;
//       //   }
//    }

         function changeLayerAnimation(weatherLayer) {

        weatherLayer.setAnimationTime(parseInt(timeSlider.value / 1000));

        if (isPlaying) {
          playAnimation(weatherLayer);
        } else {
          pauseAnimation(weatherLayer);
        }

       // updateMarkers();

      }

    function activateButton(activeLayer) {
        const buttons = document.getElementsByClassName('button');
        for (let i = 0; i < buttons.length; i++) {
          const btn = buttons[i];
          if (btn.id === activeLayer) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        }
      }   

function parsePickerLocal(s) {
  s = String(s || '').trim();

  // Formato HH:mm DD/MM/YYYY
  let m = s.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s+(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (m) return new Date(+m[6], +m[5]-1, +m[4], +m[1], +m[2], +(m[3]||0));

  // Formato DD/MM/YYYY HH:mm
  m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
  if (m) return new Date(+m[3], +m[2]-1, +m[1], +m[4], +m[5], +(m[6]||0));

  // Formato ISO YYYY-MM-DDTHH:mm
  m = s.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{1,2}):(\d{2})(?::(\d{2}))?$/);
  if (m) return new Date(+m[1], +m[2]-1, +m[3], +m[4], +m[5], +(m[6]||0));

  const d = new Date(s);
  return isNaN(d) ? null : d;
}

function dateFromPicker(dateStr) {

  console.log("📅 [dateFromPicker] recibido:", dateStr);

      // Ocultar el marcador de temperatura
  // document.querySelectorAll(".markerTemperature").forEach(el => {
  //   el.style.display = "none";
  // });

  //  document.querySelectorAll(".markerMainWeatherIcon").forEach(el => {
  //   el.style.display = "none";
  // });

  const d = parsePickerLocal(dateStr);
  if (!d) {
    console.error("❌ formato inválido:", dateStr);
    return;
  }

  const ms = d.getTime();
  console.log("➡️ [dateFromPicker] milisegundos calculados:", ms);

  const weatherLayer = weatherLayers[activeLayer]?.layer;
  // weatherLayer.setAnimationTime(currentTime);
  // Hora actual, alineada a la hora
  let targetMs = ms;
  // Limita a los bounds del slider o, si no están en ms, a los del layer
  let min = Number(timeSlider.min);
  let max = Number(timeSlider.max);
  // Si min/max aún no están en milisegundos, intenta tomarlos del layer
  if (!Number.isFinite(min) || min < 100000) {
    const start = weatherLayer?.getAnimationStartDate?.()?.getTime?.();
    const end   = weatherLayer?.getAnimationEndDate?.()?.getTime?.();
    if (Number.isFinite(start)) min = start;
    if (Number.isFinite(end))   max = end;
  }
  if (Number.isFinite(min) && Number.isFinite(max)) {
    if (targetMs < min) targetMs = min;
    if (targetMs > max) targetMs = max;
  }
  // Mueve el slider y actualiza capas
  timeSlider.value = String(targetMs);
  const tSec = Math.floor(targetMs / 1000);
  if (weatherLayer) {
    weatherLayer.setAnimationTime(tSec);
  }
  // Si tienes capa de viento sincronizada:
  try { windLayer?.setAnimationTime?.(tSec); } catch {}
  // Refresca el texto de hora y cualquier lectura bajo el puntero
  try { refreshTime?.(); } catch {}

  // Pointer
//   try { 
//     if (pointerLngLat) updatePointerValue(pointerLngLat); 

// if (pointerStickyLngLat) refreshPointerCalloutContent();

//   } catch {}


  
  console.log("➡️ ISO equivalente:", d.toISOString());
}

window.dateFromPicker = dateFromPicker;




function createWeatherLayer(type){
        let weatherLayer = null;
        switch (type) {
			
			case 'precipitation':
            weatherLayer = new maptilerweather.PrecipitationLayer({
              opacity: 1.0,
                id: 'precipitation',
                 colorramp: precipitationColoRamp 
            });
            
            break;

            case 'cold':
            weatherLayer = customLayer
            
            break;

          case 'radar':
            weatherLayer = new maptilerweather.RadarLayer({
              opacity: 1.0,
              id: 'radar',
            
            });
            
            break;

          case 'pressure':
            weatherLayer = new maptilerweather.PressureLayer({
              opacity: 1.0,
              id: 'pressure',
              colorramp: pressureColoRamp
            });
            break;

        //   case 'clouds':
        //     weatherLayer = new maptilerweather.RadarLayer({
        //         opacity: 0.9,
        // colorramp: maptilerweather.ColorRamp.builtin.RADAR_CLOUD,
        //       id: 'clouds'
        //     });
        //     break;

// case 'clouds': {
//   // Capa “dummy” para que MapTiler lleve el timeline, pero no pinta (opacidad 0)
//   weatherLayer = new maptilerweather.RadarLayer({
//     id: 'clouds',
//     opacity: 0,
//     colorramp: maptilerweather.ColorRamp.builtin.NULL
//   });

//   // Sincroniza ticks y cambios de tiempo con WLClouds
//   weatherLayer.on("tick", () => {
//     refreshTime?.();
//     updateMarkersTick();
//     const d = weatherLayer.getAnimationTimeDate();
//     if (d) WLClouds.renderAt(+d);
//   });
//   weatherLayer.on("animationTimeSet", () => {
//     refreshTime?.();
//     updateMarkersTick();
//     const d = weatherLayer.getAnimationTimeDate();
//     if (d) WLClouds.renderAt(+d);
//   });
//   weatherLayer.on("sourceReady", async () => {
//     const start = weatherLayer.getAnimationStartDate();
//     const end   = weatherLayer.getAnimationEndDate();
//     await WLClouds.prepareRange(+start, +end);
//     WLClouds.show(true);
//     const d = weatherLayer.getAnimationTimeDate();
//     if (d) {
//       // primer render + precalentado alrededor
//       WLClouds.renderAt(+d);
//     }
//   });

//   break;
// }





          case 'temperature':
            weatherLayer = new maptilerweather.TemperatureLayer({
               
              opacity: 1.0,
              colorramp: maptilerweather.ColorRamp.builtin.TEMPERATURE_2.scale(-50, 50),
              id: 'temperature'
            });
            break;


          case 'wind':
            weatherLayer = new maptilerweather.WindLayer({
                id: 'wind',
          
      speed: 0.001,
      fadeFactor: 0.03,
      maxAmount: isAndroidWind ? 64 : 256, // Limita la cantidad de partículas para mejorar rendimiento en Android
      density:  WIND_DENSITY,
      color: [255, 255, 255, 0],
      fastColor: [255, 255, 255, 100],});
                
            break;


        }

        // Called when the animation is progressing
        weatherLayer.on("tick", event => {

         

          refreshTime();
           // Fuerza la actualización del pointer incluso durante animación
        if (pointerLngLat) {
       updatePointerValue(pointerLngLat); 

        }

          //if (pointerStickyLngLat) refreshPointerCalloutContent();

        });



        // Called when the time is manually set
        weatherLayer.on("animationTimeSet", event => {
           refreshTime();
        });

        // Event called when all the datasource for the next days are added and ready.
        // From now on, the layer nows the start and end dates.
        weatherLayer.on("sourceReady", event => {


          const startDate = weatherLayer.getAnimationStartDate();
          const endDate = weatherLayer.getAnimationEndDate();
          if (timeSlider.min > 0){
            currentTime = timeSlider.value / 1000;
            weatherLayer.setAnimationTime(currentTime);
            changeLayerAnimation(weatherLayer);
          } else {

            if (!maptilerON) {
            const currentDate = weatherLayer.getAnimationTimeDate();
            timeSlider.min = +startDate;
            timeSlider.max = +endDate;
            timeSlider.value = +currentDate;

          } else {

            const EXTRA_DAYS_MS = 8 * 24 * 60 * 60 * 1000 + 1 * 24 * 60 * 60 * 1000 + 1 * 12 * 60 * 60 * 1000;
           // const EXTRA_DAYS_MS = 0;
            timeSlider.min   = +startDate;
            timeSlider.max   = (+endDate) + EXTRA_DAYS_MS;
            timeSlider.value = +weatherLayer.getAnimationTimeDate();
            }

          }

          
        });

        weatherLayers[type].layer = weatherLayer;
        return weatherLayer;
  }

function updateTimeSlider() {

   const startDate = weatherLayerBase.getAnimationStartDate();
   const endDate = weatherLayerBase.getAnimationEndDate();

   if (maptilerON) {
            const currentDate = weatherLayerBase.getAnimationTimeDate();
            timeSlider.min = +startDate;
            timeSlider.max = +endDate;
         //   timeSlider.value = +currentDate;
          } else {
            const EXTRA_DAYS_MS = 8 * 24 * 60 * 60 * 1000 + 1 * 24 * 60 * 60 * 1000 + 1 * 12 * 60 * 60 * 1000;
            timeSlider.min   = +startDate;
            timeSlider.max   = (+endDate) + EXTRA_DAYS_MS;
         //   timeSlider.value = +weatherLayer.getAnimationTimeDate();
            }
  

}

function reflectMaptilerFlag(maptilerON) {
  document.documentElement.classList.toggle('maptiler-on', !!maptilerON);
  if (!maptilerON) clearMapTilerMarkers();
}




 // Update the date time display c'
//   function refreshTime() {

//   const weatherLayer = weatherLayers[activeLayer]?.layer;
	
//   if (weatherLayer) {
//       const weathName = weatherLayer.id;
//       if (weathName == "cold") {
//             return
//       }
			
//       console.log("WEATHER:", weatherLayer);
//       const d = weatherLayer.getAnimationTimeDate();
// 		  console.log("time:", d);

//       if (!d || isNaN(d.getTime?.())) {
//       console.warn("❌ Fecha inválida en refreshTime:", d);
//       return;
//       }


//      // timeTextDiv.innerText = d.toString();

//       if (maptilerON) {
        
              
//       timeSlider.value = +d;

     
//       }

      
//       // currentTime = windLayer.getAnimationTime();

  

  
  
  
  
//       // FUNCION PARA ACTUALIZAR PLANOS BASE
//   const raw = Number(timeSlider.value);
//   const sliderMs = raw < 1e12 ? raw * 1000 : raw;  // por si alguna vez viniera ya en segundos
//   const dts = getDatetimesList();
//   if (!dts.length || !timelineControl) return;

//   const dtISO = nearestDatetimeISO(sliderMs, dts);

//   // fuerza ese datetime en el TimelineControl
//   if (typeof timelineControl.updateConfig === 'function') {
//     timelineControl.updateConfig({ datetimes: dts, datetime: dtISO });

//     applyWindLayer();
//       update();
//   } else if (typeof timelineControl.setDatetime === 'function') {
//     timelineControl.setDatetime(dtISO);
   
//      update();
//      applyWindLayer();
//   }

// // update();
//   // actualiza tu estado global si lo usas
//   if (typeof config === 'object') config.datetime = dtISO;

//   // si tu flujo necesita repintar explícito:
//  // if (typeof update === 'function') update(true);



//    		// Formato personalizado: "Sunday 11, 13:00"
//     	const options = { weekday: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
//     	const formattedDate = new Intl.DateTimeFormat('en-US', options).format(raw);
// 		//  timeTextDiv.innerText = formattedDate;
//       document.getElementById("local-datetime").innerText = formattedDate;
//       timeTextDiv.innerText = document.getElementById("local-datetime").innerText
		
//   }
			
// }

  function refreshTime() {
  // const weatherLayer = weatherLayers[activeLayer]?.layer;
  // if (!weatherLayer) return;

  // const weathName = weatherLayer.id;
  // if (weathName === "cold") return;

  // const d = weatherLayer.getAnimationTimeDate();

  

  // if (!d || isNaN(d.getTime?.())) {
  //   console.warn("❌ Fecha inválida en refreshTime:", d);
  //   return;
  // }

 



  // let ms = d.getTime();
  // const limitedMs = limitFreeTime(ms);

    


  // Si la capa intenta ir más allá de los 3 días en FREE,
  // recortamos, paramos animación y salimos.
  if (limitedMs !== ms) {
    ms = limitedMs;

    if (timelineControl && typeof timelineControl.pause === "function") {
      timelineControl.pause();
    }

    const tSecClamp = Math.floor(ms / 1000);
    try { weatherLayer.setAnimationTime(tSecClamp); } catch {}
    try { windLayer.setAnimationTime(tSecClamp); } catch {}

    timeSlider.value = String(ms);

    const optionsClamp = {
      weekday: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    setHeaderTimeLabel(new Date(ms));
    return;
  }

  // Si estamos dentro del rango permitido
  // if (maptilerON) {
  //   timeSlider.value = String(ms);
  // }

  const raw = Number(timeSlider.value);
  const sliderMs = raw < 1e12 ? raw * 1000 : raw;
  const dts = getDatetimesList();
  if (!dts.length || !timelineControl) return;

  const dtISO = nearestDatetimeISO(sliderMs, dts);

  if (typeof timelineControl.updateConfig === 'function') {
    timelineControl.updateConfig({ datetimes: dts, datetime: dtISO });
    applyWindLayer();
    update();
     cloudVisible ?  updateCloud() : clearCloudLayer();
  } else if (typeof timelineControl.setDatetime === 'function') {
    timelineControl.setDatetime(dtISO);
    update();
    applyWindLayer();
     cloudVisible ?  updateCloud() : clearCloudLayer();
  }

  if (typeof config === 'object') {
    config.datetime = dtISO;
  }

  const options = {
    weekday: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  // const formattedDate = new Intl.DateTimeFormat('en-US', options).format(sliderMs);
  // document.getElementById("local-datetime").innerText = formattedDate;
  // timeTextDiv.innerText = formattedDate;
  //  document.getElementById('time-text-top').innerText = formattedDate;
  setHeaderTimeLabel(new Date(sliderMs));
}










function adjustTimelineFpsForRange(datetimes) {
  if (!timelineControl || !Array.isArray(datetimes) || datetimes.length < 2) return;

  const firstMs = Date.parse(datetimes[0]);
  const lastMs  = Date.parse(datetimes[datetimes.length - 1]);
  const spanHours = (lastMs - firstMs) / (1000 * 60 * 60); // ms -> h

  // Si hay más de 120h (5 días), baja a 5 fps. Si no, 15 fps.
 //  timelineControl.fps = spanHours > 120 ? 15 : 15;
 

  console.log(
    `[Timeline FPS] rango ${spanHours.toFixed(1)}h → fps = ${timelineControl.fps}`
  );
}






function roundToPreviousForecastHour(date) {
  const hour = date.getHours();
  const rounded = Math.floor(hour / 1) * 1;
  return `${String(rounded).padStart(2, '0')}:00`;
}



function clearActiveLayer() {
  if (map.getLayer('raster-layer')) {
    map.removeLayer('raster-layer');
  }
  if (map.getSource('raster-source')) {
    map.removeSource('raster-source');
  }

  // Si usas deck.gl:
  if (deckgl) {
    deckgl.setProps({ layers: [] }); // Elimina todas
  }

  if (deckglWind) {
    deckglWind.setProps({ layers: [] }); // Elimina todas
  }


  // Forzar recolección de basura WebGL (si es posible)
  try {
    map._removeOldLayers?.();
    map._clearWebGLContext?.();
  } catch (e) {}
}


// initConfig

// (function inspectLoadDatasetData(){
//   const orig = client.loadDatasetData.bind(client);
//   client.loadDatasetData = async (dataset, datetime, opts = {}) => {
//     const res = await orig(dataset, datetime, opts);
//     const describe = (img) => img ? `${img.constructor?.name||'Object'} ${img.width||'?'}x${img.height||'?'}` : null;
//     console.log('[WL.loadDatasetData]', dataset, datetime, {
//       image: describe(res.image),
//       image2: describe(res.image2),
//       imageWeight: res.imageWeight,
//       imageType: res.imageType,
//       imageUnscale: res.imageUnscale,
//       bounds: res.bounds
//     });
//     return res;
//   };
// })();




// AWSJGU
// Paleta para Geopotential Height 500mb (tus stops)
const paletteGeopotentialRaw = [
  [4725,[50,50,50,255]],[4755,[83,83,83,255]],[4785,[110,110,110,255]],
  [4815,[140,140,140,255]],[4845,[158,158,158,255]],[4875,[181,181,181,255]],
  [4905,[199,199,199,255]],[4935,[226,226,248,255]],[4965,[193,184,255,255]],
  [4995,[129,112,235,255]],[5025,[98,88,222,255]],[5055,[70,65,209,255]],
  [5085,[46,44,162,255]],[5115,[37,109,231,255]],[5145,[40,131,241,255]],
  [5175,[61,151,245,255]],[5205,[80,165,245,255]],[5235,[152,207,252,255]],
  [5265,[181,251,171,255]],[5295,[151,238,142,255]],[5325,[80,236,80,255]],
  [5355,[30,181,30,255]],[5385,[15,160,15,255]],[5415,[254,249,170,255]],
  [5445,[255,231,120,255]],[5475,[255,193,60,255]],[5505,[255,161,0,255]],
  [5535,[255,96,0,255]],[5565,[255,50,0,255]],[5595,[225,20,0,255]],
  [5640,[193,0,0,255]],[5685,[100,60,50,255]],[5715,[120,80,70,255]],
  [5745,[140,100,90,255]],[5775,[161,120,110,255]],[5805,[181,141,131,255]],
  [5835,[200,160,150,255]],[5865,[225,191,181,255]],[5895,[245,161,161,255]],
  [5925,[229,130,130,255]],[5955,[215,80,80,255]],[5985,[181,40,40,255]],
  [6015,[159,31,28,255]],
];


      

function setContourLayer() {
  contourUser = true;
  contourVisible = contourUser;
  update()
}
window.setContourLayer = setContourLayer;


function unSetContourLayer() {
  contourUser = false;
  contourVisible = contourUser;
  update();
}
window.unSetContourLayer = unSetContourLayer;


function setDataLayer() {
  dataLayer = true;
  update()
}
window.setDataLayer = setDataLayer;


function unSetDataLayer() {
  dataLayer = false;
  update();
}
window.unSetDataLayer = unSetDataLayer;


// ////////. 


function setUnitMetric() {
  constUni = WeatherLayers.UnitSystem.METRIC;
  update().then(() => updateLegendForDataset(currentDataset));
}
window.setUnitMetric = setUnitMetric;

function setUnitMetricKm() {
  constUni = WeatherLayers.UnitSystem.METRIC_KILOMETERS;
  update().then(() => updateLegendForDataset(currentDataset));
}
window.setUnitMetricKm = setUnitMetricKm;

function setUnitImperial() {
  constUni = WeatherLayers.UnitSystem.IMPERIAL;
  update().then(() => updateLegendForDataset(currentDataset));
}
window.setUnitImperial = setUnitImperial;

function setUnitNautical() {
  constUni = WeatherLayers.UnitSystem.NAUTICAL;
  update().then(() => updateLegendForDataset(currentDataset));
}
window.setUnitNautical = setUnitNautical;



// function setUnitMetric() {
//   constUni =  WeatherLayers.UnitSystem.METRIC;
//   update();
// }
// window.setUnitMetric = setUnitMetric;

// function setUnitMetricKm() {
//   constUni =  WeatherLayers.UnitSystem.METRIC_KILOMETERS;
//   update();
// }
// window.setUnitMetricKm = setUnitMetricKm;

// function setUnitImperial() {
//   constUni =  WeatherLayers.UnitSystem.IMPERIAL;
//   update();
  
// }
// window.setUnitImperial = setUnitImperial;

// function setUnitNautical() {
//   constUni =  WeatherLayers.UnitSystem.NAUTICAL;
//   update();
// }
// window.setUnitNautical = setUnitNautical;

// function setGFSModel() {
//  dataModel = 'GFS';
//  update();
//  cloudVisible ?  updateCloud() : clearCloudLayer();
//  applyWindLayer();
// }
// window.setGFSModel = setGFSModel;

// function setECMWFModel() {
//  dataModel = 'ECMWF'
//  update();
//  cloudVisible ?  updateCloud() : clearCloudLayer();
//  applyWindLayer();
// }
// window.setECMWFModel = setECMWFModel;

// // ios
// function precipitablePress() {
//   precipitableGFSButton.click();
// }
// window.precipitablePress = precipitablePress;

// precipitableGFSButton.addEventListener('click', async () => {

  
//  highValuesVisible = highValuesVisibleUser;
  
// maptilerON = false;
// maptilerWindOff  = false;

//    applyWindLayer();

// __NO_BLEND = false;

// reflectMaptilerFlag(false);
// let key = 'precipitable';
// await switchDatasetSmooth(DATASETS[key].id, DATASETS[key]);
//       try {

//         updateInfoPanel('precipitable');
//         changeLayer('gfs/precipitable_water_entire_atmosphere');

//      //   loadingIndicator.style.display = 'block';  // Mostrar

//            timeInfoContainer.style.display = 'none';
//         // Remover la clase 'active' de todos los botones
//         document.querySelectorAll('#buttons li').forEach(btn => {
//             btn.classList.remove('active');
//         });
        
//         // Añadir la clase 'active' al botón presionado
//         precipitableGFSButton.classList.add('active');
        
//         // Cargar datos específicos de ECMWF CAPE
//         const dataset = 'gfs/precipitable_water_entire_atmosphere'; // Ajusta este ID según el dataset real
//         currentDataset = 'gfs/precipitable_water_entire_atmosphere';
//         opacity = 0.90;
//         contourVisible = contourNoVisibleAllways;
//         update();
//         // 🔁 Precarga oculta de 6h del dataset recién activado

//         cloudVisible ?  updateCloud() : clearCloudLayer();
//         document.getElementById('variable-name').textContent = 'Precipitable Water (Kg/m2)';
//         document.getElementById('active-layer-name').textContent = 'Precipitable Water (Kg/m2)';
//          if (shouldUpdateWind()) {
//       applyWindLayer();
//     } else {
//       // opcional: console.debug('[wind] skip during animation on non-wind layer');
//     }
 
//     } catch (error) {
//         console.error('Error loading ECMWF Pressure:', error);
//         // Opcional: Mostrar mensaje de error al usuario
//         document.getElementById('variable-name').textContent = 'Error loading data from CAPe';
//     }

//      await precacheDatasets('gfs/precipitable_water_entire_atmosphere');
// });


function precipitationPress() {
  // Ocultar el marcador de temperatura
  // document.querySelectorAll(".markerTemperature").forEach(el => {
  //   el.style.display = "none";
  // });
  //  document.querySelectorAll(".markerMainWeatherIcon").forEach(el => {
  //   el.style.display = "none";
  // });
  map.setLayoutProperty(activeLayer, 'visibility', 'none');
  detailprecipitation5days.click();

}
window.precipitationPress = precipitationPress;


function windPress() {
     // Ocultar el marcador de temperatura
  // document.querySelectorAll(".markerTemperature").forEach(el => {
  //   el.style.display = "none";
  // });
  //  document.querySelectorAll(".markerMainWeatherIcon").forEach(el => {
  //   el.style.display = "none";
  // });
   map.setLayoutProperty(activeLayer, 'visibility', 'none');
  detailwind5days.click();

}
window.windPress = windPress;



// Cache improvement
window.__TEX_CACHE = window.__TEX_CACHE || new Map();
async function cachedFetch(url, id){
  const key = `${id}|${url}`;
  if (window.__TEX_CACHE.has(key)) return window.__TEX_CACHE.get(key);
  const v = await fetchByteTexture(url, id);
  window.__TEX_CACHE.set(key, v);
  return v;
}



// Radar Maptiler
function radar() {
  // Ocultar el marcador de temperatura
  // document.querySelectorAll(".markerTemperature").forEach(el => {
  //   el.style.display = "none";
  // });
  //  document.querySelectorAll(".markerMainWeatherIcon").forEach(el => {
  //   el.style.display = "none";
  // });
   map.setLayoutProperty(activeLayer, 'visibility', 'none');
  detailradar5days.click();
}
window.radar = radar;

// // Radar
// // ios
// function radarWL() {
//   radarGFSButton.click();
// }
// window.radarWL = radarWL;

// radarGFSButton.addEventListener('click', async () => {
//   highValuesVisible = highValuesVisibleUser;
// window.NOAA = false;
// maptilerON = false;
// maptilerWindOff  = false;
// __NO_BLEND = false;
// applyWindLayer();
// reflectMaptilerFlag(false);
// // windVisible = true;
// // map.setLayoutProperty('windbase', 'visibility', 'none');

// let key = 'radar';
// await switchDatasetSmooth(DATASETS[key].id, DATASETS[key]);
//       try {

//         updateInfoPanel('radar');
//         changeLayer('gfs/reflectivity_1000m_above_ground');

//       //  loadingIndicator.style.display = 'block';  // Mostrar

//            timeInfoContainer.style.display = 'none';
//         // Remover la clase 'active' de todos los botones
//         document.querySelectorAll('#buttons li').forEach(btn => {
//             btn.classList.remove('active');
//         });
        
//         // Añadir la clase 'active' al botón presionado
//        radarGFSButton.classList.add('active');
        
//         // Cargar datos específicos de ECMWF CAPE
//         const dataset = 'gfs/reflectivity_1000m_above_ground'; // Ajusta este ID según el dataset real
//         currentDataset = 'gfs/reflectivity_1000m_above_ground';
//         opacity = 0.90;
//         contourVisible = contourNoVisibleAllways;


//         // justo antes de llamar a update();
// try {
//   // calcular urls que tocará (usando tu computeRunLead/yyyymmddHHZ)
//   const { run, lead, dt } = computeRunLead(config?.datetime || new Date().toISOString());
//   const runUTC = yyyymmddHHZ(run);
//   const id = 'gfs/reflectivity_1000m_above_ground'; // o currentDataset
//   const url0 = awsByteUrl(id, runUTC, Math.max(0, Math.min(lead, 120)));
//   const url1 = awsByteUrl(id, runUTC, Math.max(0, Math.min(lead+1, 120)));

//   // fire-and-forget (no esperes, no bloquea UI)
//   cachedFetch?.(url0, id)?.catch(()=>{});
//   cachedFetch?.(url1, id)?.catch(()=>{});
// } catch {}

        
//         update();
//              // 🔁 Precarga oculta de 6h del dataset recién activado
   
     
//       cloudVisible ?  updateCloud() : clearCloudLayer();
//        if (shouldUpdateWind()) {
//       applyWindLayer();
//     } else {
//       // opcional: console.debug('[wind] skip during animation on non-wind layer');
//     }
//       document.getElementById('variable-name').textContent = 'Refelectivity (dBz)';
//       document.getElementById('active-layer-name').textContent = 'Reflectivity (dBz)';

        
//     } catch (error) {
//         console.error('Error loading GFS Radar:', error);
//         document.getElementById('variable-name').textContent = 'Error loading data from Radar';
//     }

//     await precacheDatasets('gfs/reflectivity_1000m_above_ground');
  
// });


// // Radar
// // setCloudLayer()
// // ios
// function windgustPress() {
//   windgustGFSButton.click();
// }
// window.windgustPress = windgustPress;
// windjetGFSButton.addEventListener('click', async () => {

//  highValuesVisible = highValuesVisibleAllways;
// maptilerON = false;
// __NO_BLEND = false;
// maptilerWindOff  = false;
//  applyWindLayer();
// reflectMaptilerFlag(false);
//   let key = 'jetstream';
//   await switchDatasetSmooth(DATASETS[key].id, DATASETS[key]);
// try {
//    updateInfoPanel("jetstream");
//   changeLayer('gfs/wind_gust_surface');
// //  loadingIndicator.style.display = 'block';  // Mostrar
//      timeInfoContainer.style.display = 'none';
//   // Remover la clase 'active' de todos los botones
//   document.querySelectorAll('#buttons li').forEach(btn => {
//       btn.classList.remove('active');
//   });
//     // Añadir la clase 'active' al botón presionado
//  // windGFSButton.classList.add('active');
//   windgustGFSButton.classList.add('active');
//     // Cargar datos específicos de ECMWF CAPE
//   const dataset = 'gfs/wind_gust_surface'; // Ajusta este ID según el dataset real
//   currentDataset = 'gfs/wind_gust_surface';
//   opacity = 0.90;
//   contourVisible = contourNoVisibleAllways;
//   update();
//  if (shouldUpdateWind()) {
//       applyWindLayer();
//     } else {
//       // opcional: console.debug('[wind] skip during animation on non-wind layer');
//     }
//  cloudVisible ?  updateCloud() : clearCloudLayer();

//    document.getElementById('variable-name').textContent = 'Wind Gust';
//    document.getElementById('active-layer-name').textContent = 'Wind Gust ';
// } catch (error) {
//   console.error('Error loading WindGust:', error);
//   // Opcional: Mostrar mensaje de error al usuario
//   document.getElementById('variable-name').textContent = 'Error loading data from Jet Stream';
// }

// // await precacheDatasets('gfs/wind_gust_surface');

// });





windgustGFSButton.addEventListener('click', async () => {

await setPlayback(false, "layer-change");

 highValuesVisible = highValuesVisibleAllways;
maptilerON = false;
__NO_BLEND = false;
maptilerWindOff  = false;



// windLayer.setOpacity(0);
windVisible = true;



 applyWindLayer();
reflectMaptilerFlag(false);
  let key = 'windGust';
  await switchDatasetSmooth(DATASETS[key].id, DATASETS[key]);
try {
   updateInfoPanel("windgust");
  changeLayer('gfs/wind_tropopause_noaa');
//  loadingIndicator.style.display = 'block';  // Mostrar
     timeInfoContainer.style.display = 'none';
  // Remover la clase 'active' de todos los botones
  document.querySelectorAll('#buttons li').forEach(btn => {
      btn.classList.remove('active');
  });
    // Añadir la clase 'active' al botón presionado
 // windGFSButton.classList.add('active');
  windgustGFSButton.classList.add('active');
    // Cargar datos específicos de ECMWF CAPE
  const dataset = 'gfs/wind_tropopause_noaa'; // Ajusta este ID según el dataset real
  currentDataset = 'gfs/wind_tropopause_noaa';
  opacity = 0.7;
  contourVisible = contourNoVisibleAllways;
  update();
 if (shouldUpdateWind()) {
      applyWindLayer();
    } else {
      // opcional: console.debug('[wind] skip during animation on non-wind layer');
    }
 cloudVisible ?  updateCloud() : clearCloudLayer();

   document.getElementById('variable-name').textContent = 'Jet Stream ';
   document.getElementById('active-layer-name').textContent = 'Jet Stream ';
} catch (error) {
  console.error('Error loading GFS JET STREAM:', error);
  // Opcional: Mostrar mensaje de error al usuario
  document.getElementById('variable-name').textContent = 'Error loading data from Jet Stream';
}

 await precacheDatasets('gfs/wind_tropopause_noaa');

});


// // ios
// function windPress() {
//   windGFSButton.click();
// }
// window.windPress = windPress;

// function windPressECMWF() {
//   windGFSButton.click();
// }
// window.windPressECMWF = windPressECMWF;






// windGFSButton.addEventListener('click', async () => {
// window.NOAA = false;
// highValuesVisible = highValuesVisibleAllways;
// maptilerON = false;
// maptilerWindOff  = false;
// __NO_BLEND = false;
//  applyWindLayer();

// reflectMaptilerFlag(false);
//   let key = 'wind';
//   await switchDatasetSmooth(DATASETS[key].id, DATASETS[key]);



// try {

//    updateInfoPanel("wind");

//  if (dataModel == 'GFS') {
//   changeLayer('gfs/wind_10m_above_ground'); // GFS
//  } else {
//   changeLayer('ecmwf_ifs/wind_10m_above_ground'); // ECMWF
//  }

//  // setProps

//  // loadingIndicator.style.display = 'block';  // Mostrar
//      timeInfoContainer.style.display = 'none';
//   // Remover la clase 'active' de todos los botones
//   document.querySelectorAll('#buttons li').forEach(btn => {
//       btn.classList.remove('active');
//   });
//     // Añadir la clase 'active' al botón presionado
//   windGFSButton.classList.add('active');
    

//  // let dataset = 'gfs/wind_10m_above_ground'; // Ajusta este ID según el dataset real
//   if (dataModel == 'GFS') {
//    currentDataset = 'gfs/wind_10m_above_ground'; // GFS
//  } else {
//   currentDataset = 'ecmwf_ifs/wind_10m_above_ground'; // ECMWF
//  }
  
//   opacity = 0.90;
//   contourVisible = contourNoVisibleAllways;
//   update();
//        // 🔁 Precarga oculta de 6h del dataset recién activado
  
//   if (shouldUpdateWind()) {
//       applyWindLayer();
//     } else {
//       // opcional: console.debug('[wind] skip during animation on non-wind layer');
//     }
//   cloudVisible ?  updateCloud() : clearCloudLayer();

//  if (dataModel == 'GFS') {
//    //  precacheDatasetFrames('gfs/wind_10m_above_ground', 24);// GFS
//  } else {
//   // precacheDatasetFrames('ecmwf_aifs/wind_10m_above_ground', 24);// ECMWF
//  }

//    // const {title, unitFormat, attribution, palette} = await client.loadDataset(dataset);
//    // Actualizar controles de la interfaz
//    document.getElementById('variable-name').textContent = 'Wind Speed';
//    document.getElementById('active-layer-name').textContent = 'Wind Speed';
// } catch (error) {
//   console.error('Error loading  WIND:', error);
//   // Opcional: Mostrar mensaje de error al usuario
//   document.getElementById('variable-name').textContent = 'Error loading data from Wind';
// }
//  // await precacheDatasets('gfs/wind_10m_above_ground');

// });




wind_noaa.addEventListener('click', async () => {

await setPlayback(false, "layer-change");
window.NOAA = true;
highValuesVisible = highValuesVisibleAllways;
maptilerON = false;
maptilerWindOff  = false;
__NO_BLEND = false;
 applyWindLayer();

reflectMaptilerFlag(false);
  let key = 'wind_noaa';
  await switchDatasetSmooth(DATASETS[key].id, DATASETS[key]);



try {

   updateInfoPanel("wind");

 if (dataModel == 'GFS') {
  changeLayer('gfs/wind_10m_noaa'); // GFS
 } else {
  changeLayer('ecmwf_ifs/wind_10m_noaa'); // ECMWF
 }

 // setProps

 // loadingIndicator.style.display = 'block';  // Mostrar
     timeInfoContainer.style.display = 'none';
  // Remover la clase 'active' de todos los botones
  document.querySelectorAll('#buttons li').forEach(btn => {
      btn.classList.remove('active');
  });
    // Añadir la clase 'active' al botón presionado
  wind_noaa.classList.add('active');
    

 // let dataset = 'gfs/wind_10m_above_ground'; // Ajusta este ID según el dataset real
  if (dataModel == 'GFS') {
   currentDataset = 'gfs/wind_10m_above_ground'; // GFS
 } else {
  currentDataset = 'ecmwf_ifs/wind_10m_above_ground'; // ECMWF
 }
  
  opacity = 0.7;
  contourVisible = contourNoVisibleAllways;
  update();
       // 🔁 Precarga oculta de 6h del dataset recién activado
  
  if (shouldUpdateWind()) {
      applyWindLayer();
    } else {
      // opcional: console.debug('[wind] skip during animation on non-wind layer');
    }
  cloudVisible ?  updateCloud() : clearCloudLayer();

 if (dataModel == 'GFS') {
   //  precacheDatasetFrames('gfs/wind_10m_above_ground', 24);// GFS
 } else {
  // precacheDatasetFrames('ecmwf_aifs/wind_10m_above_ground', 24);// ECMWF
 }

   // const {title, unitFormat, attribution, palette} = await client.loadDataset(dataset);
   // Actualizar controles de la interfaz
   document.getElementById('variable-name').textContent = 'Wind Speed';
   document.getElementById('active-layer-name').textContent = 'Wind Speed';
} catch (error) {
  console.error('Error loading  WIND:', error);
  // Opcional: Mostrar mensaje de error al usuario
  document.getElementById('variable-name').textContent = 'Error loading data from Wind';
}
  await precacheDatasets('gfs/wind_10m_noaa');

});









 // await precacheDatasets('gfs/wind_10m_above_ground');


// // iOS
// function apparenttemperaturePress() {
//   apparenttemperatureGFSButton.click();
// }
// window.apparenttemperaturePress = apparenttemperaturePress;

// apparenttemperatureGFSButton.addEventListener('click', async () => {
 
// highValuesVisible = highValuesVisibleUser;
// maptilerON = false;
// __NO_BLEND = false;
// maptilerWindOff  = false;
//  applyWindLayer();
// reflectMaptilerFlag(false);
// let key = 'appTemp2m';
//   await switchDatasetSmooth(DATASETS[key].id, DATASETS[key]);

//     try {
//       updateInfoPanel("apparenttemperature");
//       changeLayer('gfs/apparent_temperature_2m_above_ground');
//      // loadingIndicator.style.display = 'block';  // Mostrar
//       timeInfoContainer.style.display = 'none';
//         // Remover la clase 'active' de todos los botones
//         document.querySelectorAll('#buttons li').forEach(btn => {
//             btn.classList.remove('active');
//         });
//         // Añadir la clase 'active' al botón presionado
//         apparenttemperatureGFSButton.classList.add('active');
//         // Cargar datos específicos de ECMWF CAPE
//         const dataset =  'gfs/apparent_temperature_2m_above_ground'; // Ajusta este ID según el dataset real
//         currentDataset =  'gfs/apparent_temperature_2m_above_ground';
//         opacity = 0.90;
//         contourVisible = contourUser;
//         update();
//         // 🔁 Precarga oculta de 6h del dataset recién activado
   
//         applyWindLayer();


//      //   precacheDatasetFrames('gfs/apparent_temperature_2m_above_ground', 24);
//         document.getElementById('variable-name').textContent = 'Apparent Temperature';
//         document.getElementById('active-layer-name').textContent = 'Apparent Temperature';
//     } catch (error) {
//         console.error('Error loading Inestability:', error);
//         // Opcional: Mostrar mensaje de error al usuario
//         document.getElementById('variable-name').textContent = 'Error loading data from CAPe';
//     }

//         await precacheDatasets('gfs/apparent_temperature_2m_above_ground');
// });

// iOS
// function snowdepthPress() {
//   snowdepthGFSButton.click();
// }
// window.snowdepthPress = snowdepthPress;



// snowdepthGFSButton.addEventListener('click', async () => {
  
// window.NOAA = false;
// highValuesVisible = highValuesVisibleUser;
// maptilerON = false;
// __NO_BLEND = false;
// maptilerWindOff  = false;
// applyWindLayer();

// reflectMaptilerFlag(false);
//   let key = 'snow';
//   await switchDatasetSmooth(DATASETS[key].id, DATASETS[key]);

//     try {
//        updateInfoPanel("snowdepth");
//       changeLayer('gfs/snow_depth_surface');
//     // loadingIndicator.style.display = 'block';  // Mostrar
//       timeInfoContainer.style.display = 'none';
//         // Remover la clase 'active' de todos los botones
//         document.querySelectorAll('#buttons li').forEach(btn => {
//             btn.classList.remove('active');
//         });
//         // Añadir la clase 'active' al botón presionado
//         snowdepthGFSButton.classList.add('active');
//         // Cargar datos específicos de ECMWF CAPE
//         const dataset =  'gfs/snow_depth_surface'; // Ajusta este ID según el dataset real
//         currentDataset =  'gfs/snow_depth_surface';
//         opacity = 0.90;
//         contourVisible = contourNoVisibleAllways;
//         update();
//              // 🔁 Precarga oculta de 6h del dataset recién activado
     
//  if (shouldUpdateWind()) {
//       applyWindLayer();
//     } else {
//       // opcional: console.debug('[wind] skip during animation on non-wind layer');
//     }
//  cloudVisible ?  updateCloud() : clearCloudLayer();
//       //  precacheDatasetFrames('gfs/snow_depth_surface', 24);
//         document.getElementById('variable-name').textContent = 'Snow Depth';
//         document.getElementById('active-layer-name').textContent = 'Snow Depth';
//     } catch (error) {
//         console.error('Error loading Inestability:', error);
//         // Opcional: Mostrar mensaje de error al usuario
//         document.getElementById('variable-name').textContent = 'Error loading data from CAPe';
//     }

//     await precacheDatasets('gfs/snow_depth_surface');
// });


snowdepth_noaa.addEventListener('click', async () => {
  await setPlayback(false, "layer-change");
window.NOAA = true;
highValuesVisible = highValuesVisibleUser;
maptilerON = false;
__NO_BLEND = false;
maptilerWindOff  = false;
applyWindLayer();

reflectMaptilerFlag(false);
  let key = 'snow_noaa';
  await switchDatasetSmooth(DATASETS[key].id, DATASETS[key]);

    try {
       updateInfoPanel("snowdepth_noaa");
      changeLayer('gfs/snow_depth_surface');
    // loadingIndicator.style.display = 'block';  // Mostrar
      timeInfoContainer.style.display = 'none';
        // Remover la clase 'active' de todos los botones
        document.querySelectorAll('#buttons li').forEach(btn => {
            btn.classList.remove('active');
        });
        // Añadir la clase 'active' al botón presionado
        snowdepth_noaa.classList.add('active');
        // Cargar datos específicos de ECMWF CAPE
        const dataset =  'gfs/snow_depth_surface'; // Ajusta este ID según el dataset real
        currentDataset =  'gfs/snow_depth_surface';
        opacity = 0.9;
        contourVisible = contourNoVisibleAllways;
        update();
             // 🔁 Precarga oculta de 6h del dataset recién activado
     
 if (shouldUpdateWind()) {
      applyWindLayer();
    } else {
      // opcional: console.debug('[wind] skip during animation on non-wind layer');
    }
 cloudVisible ?  updateCloud() : clearCloudLayer();
      //  precacheDatasetFrames('gfs/snow_depth_surface', 24);
        document.getElementById('variable-name').textContent = 'Snow Depth NOAA';
        document.getElementById('active-layer-name').textContent = 'Snow Depth NOAA';
    } catch (error) {
        console.error('Error loading Inestability:', error);
        // Opcional: Mostrar mensaje de error al usuario
        document.getElementById('variable-name').textContent = 'Error loading data from CAPe';
    }

    await precacheDatasets('gfs/snow_depth_surface');
});







function temperaturePressECMWF() {
  temperatureGFSButton.click();
}
window.temperaturePressECMWF = temperaturePressECMWF;


// iOS
function temperatureGFSPress() {
  temperatureGFSButton.click();
}
window.temperatureGFSPress = temperatureGFSPress;

function temperaturePress() {
 map.setLayoutProperty(activeLayer, 'visibility', 'none');
  detailtemperature5days.click();
}
window.temperaturePress = temperaturePress;
detailtemperature5days.addEventListener('click', async () => {
 contourVisible = contourNoVisibleAllways;
  clearMapTilerMarkers();
  maptilerWindOff = false;

//  if (windVisible) {
//      windLayer.setOpacity(0);
//   } else {
//     windLayer.setOpacity(0);
//   }

  applyWindLayer();
  updateInfoPanel("detailtemperature");
map.setLayoutProperty(activeLayer, 'visibility', 'none');
  deckgl.setProps({
              layers: [],
          });




activeLayer = 'temperature';
//  const weatherLayerN = weatherLayers[activeLayer].layer || createWeatherLayer(activeLayer);
//           if (map.getLayer(activeLayer)) {
//             map.setLayoutProperty(activeLayer, 'visibility', 'visible');
//           } else {
//             map.addLayer(weatherLayerN, 'Water');
            
//            }
  
maptilerON = true;
reflectMaptilerFlag(true);

// changeWeatherLayer(activeLayer);
//   map.setLayoutProperty(activeLayer, 'visibility', 'none');
//   const weatherLayer = weatherLayers['temperature']?.layer;
//         if (weatherLayer) {
//   weatherLayer.setAnimationTime(currentTime); 

// }
//   map.setLayoutProperty(activeLayer, 'visibility', 'visible');

document.querySelectorAll('#buttons li').forEach(btn => {
  btn.classList.remove('active');
  });
    // Añadir la clase 'active' al botón presionado
  detailtemperature5days.classList.add('active');
  document.getElementById('variable-name').textContent = 'Detail Temperature 4 days';
    document.getElementById('active-layer-name').textContent = 'Detail Temperature 4 days';

  //  updateMarkers(); // primera pasada


});


detailpressure5days.addEventListener('click', async () => {
 contourVisible = contourNoVisibleAllways;
  clearMapTilerMarkers();
  maptilerWindOff = false;
  // if (windVisible) {
  //    windLayer.setOpacity(0);
  // } else {
  //   windLayer.setOpacity(0);
  // }
  applyWindLayer();
  updateInfoPanel("detailpressure");
map.setLayoutProperty(activeLayer, 'visibility', 'none');
  deckgl.setProps({
              layers: [],
          });

activeLayer = 'pressure';
//  const weatherLayerN = weatherLayers[activeLayer].layer || createWeatherLayer(activeLayer);
//           if (map.getLayer(activeLayer)) {
//             map.setLayoutProperty(activeLayer, 'visibility', 'visible');
//           } else {
//             map.addLayer(weatherLayerN, 'Water');
            
//            }
  
maptilerON = true;
reflectMaptilerFlag(true);

// changeWeatherLayer(activeLayer);
//   map.setLayoutProperty(activeLayer, 'visibility', 'none');
//   const weatherLayer = weatherLayers['temperature']?.layer;
//         if (weatherLayer) {
//   weatherLayer.setAnimationTime(currentTime); 

// }
//   map.setLayoutProperty(activeLayer, 'visibility', 'visible');

document.querySelectorAll('#buttons li').forEach(btn => {
  btn.classList.remove('active');
  });
    // Añadir la clase 'active' al botón presionado
  detailpressure5days.classList.add('active');
  document.getElementById('variable-name').textContent = 'Detail Pressure 4 days';
    document.getElementById('active-layer-name').textContent = 'Detail Pressure 4 days';

  //  updateMarkers(); // primera pasada


});







radar_noaa.addEventListener('click', async () => {
await setPlayback(false, "layer-change");
window.NOAA = true;
let key = 'radar_noaa';
maptilerON = false;
__NO_BLEND = false;
maptilerWindOff  = false;
applyWindLayer();
reflectMaptilerFlag(maptilerON);
await switchDatasetSmooth(DATASETS[key].id, DATASETS[key]);
    try {
      updateInfoPanel("radar_noaa");
 if (dataModel == 'GFS') {
   changeLayer('gfs/reflectivity_1000m_above_ground'); // GFS
 } else {
  changeLayer('ecmwf_aifs/reflectivity_1000m_above_ground'); // ECMWF
 }  
    //  loadingIndicator.style.display = 'block';  // Mostrar
      timeInfoContainer.style.display = 'none';
        // Remover la clase 'active' de todos los botones
        document.querySelectorAll('#buttons li').forEach(btn => {
            btn.classList.remove('active');
        });
        // Añadir la clase 'active' al botón presionado
        radar_noaa.classList.add('active');
        // Cargar datos específicos de ECMWF CAPE
     //   const dataset =  'gfs/temperature_2m_above_ground'; // Ajusta este ID según el dataset real
       
 if (dataModel == 'GFS') {
  currentDataset =  'gfs/reflectivity_1000m_above_ground'; // GFS
 } else {
  currentDataset =  'ecmwf_aifs/reflectivity_1000m_above_ground'; // ECMWF
 }
        opacity = 0.9;
         contourVisible = contourNoVisibleAllways;
        update();
 if (shouldUpdateWind()) {
      applyWindLayer();
    } else {
      // opcional: console.debug('[wind] skip during animation on non-wind layer');
    }
     // 🔁 Precarga oculta de 6h del dataset recién activado
  
 cloudVisible ?  updateCloud() : clearCloudLayer();

 if (dataModel == 'GFS') {
  // precacheDatasetFrames('gfs/temperature_2m_above_ground',24); // GFS
 } else {
  // precacheDatasetFrames('ecmwf_aifs/temperature_2m_above_ground',24);// ECMWF
 }
        document.getElementById('variable-name').textContent = 'Radar Precipitation NOAA';
        document.getElementById('active-layer-name').textContent = 'Radar Preci[itation NOAA]';
    } catch (error) {
        console.error('Error loading Inestability:', error);
        // Opcional: Mostrar mensaje de error al usuario
        document.getElementById('variable-name').textContent = 'Error loading data from RADAR';
    }

    await precacheDatasets('gfs/reflectivity_1000m_above_ground');
});
pressure_noaa.addEventListener('click', async () => {
await setPlayback(false, "layer-change");
window.NOAA = true;
let key = 'pressure_noaa';
maptilerON = false;
__NO_BLEND = false;
maptilerWindOff  = false;
applyWindLayer();
reflectMaptilerFlag(maptilerON);
await switchDatasetSmooth(DATASETS[key].id, DATASETS[key]);
    try {
      updateInfoPanel("pressure_noaa");
 if (dataModel == 'GFS') {
   changeLayer('gfs/pressure_mean_sea_level'); // GFS
 } else {
  changeLayer('ecmwf_aifs/pressure_mean_sea_level'); // ECMWF
 }  
    //  loadingIndicator.style.display = 'block';  // Mostrar
      timeInfoContainer.style.display = 'none';
        // Remover la clase 'active' de todos los botones
        document.querySelectorAll('#buttons li').forEach(btn => {
            btn.classList.remove('active');
        });
        // Añadir la clase 'active' al botón presionado
        temp500mb_noaa.classList.add('active');
        // Cargar datos específicos de ECMWF CAPE
     //   const dataset =  'gfs/temperature_2m_above_ground'; // Ajusta este ID según el dataset real
       
 if (dataModel == 'GFS') {
  currentDataset =  'gfs/pressure_mean_sea_level'; // GFS
 } else {
  currentDataset =  'ecmwf_aifs/pressure_mean_sea_level'; // ECMWF
 }
        opacity = 0.99;
        contourVisible = contourUser;
        update();
 if (shouldUpdateWind()) {
      applyWindLayer();
    } else {
      // opcional: console.debug('[wind] skip during animation on non-wind layer');
    }
     // 🔁 Precarga oculta de 6h del dataset recién activado
  
 cloudVisible ?  updateCloud() : clearCloudLayer();

 if (dataModel == 'GFS') {
  // precacheDatasetFrames('gfs/temperature_2m_above_ground',24); // GFS
 } else {
  // precacheDatasetFrames('ecmwf_aifs/temperature_2m_above_ground',24);// ECMWF
 }
        document.getElementById('variable-name').textContent = 'Air Pressure';
        document.getElementById('active-layer-name').textContent = 'Air Pressure';
    } catch (error) {
        console.error('Error loading Inestability:', error);
        // Opcional: Mostrar mensaje de error al usuario
        document.getElementById('variable-name').textContent = 'Error loading data from CAPe';
    }

    await precacheDatasets('gfs/pressure_mean_sea_level');
});
temp500mb_noaa.addEventListener('click', async () => {
await setPlayback(false, "layer-change");
window.NOAA = true;
let key = 'temp500mb_noaa';
maptilerON = false;
__NO_BLEND = false;
maptilerWindOff  = false;
 applyWindLayer();
reflectMaptilerFlag(maptilerON);
await switchDatasetSmooth(DATASETS[key].id, DATASETS[key]);
    try {
      updateInfoPanel("temp500mb_noaa");
 if (dataModel == 'GFS') {
   changeLayer('gfs/temperature_500mb'); // GFS
 } else {
  changeLayer('ecmwf_aifs/temperature_500mb'); // ECMWF
 }  
    //  loadingIndicator.style.display = 'block';  // Mostrar
      timeInfoContainer.style.display = 'none';
        // Remover la clase 'active' de todos los botones
        document.querySelectorAll('#buttons li').forEach(btn => {
            btn.classList.remove('active');
        });
        // Añadir la clase 'active' al botón presionado
        temp500mb_noaa.classList.add('active');
        // Cargar datos específicos de ECMWF CAPE
     //   const dataset =  'gfs/temperature_2m_above_ground'; // Ajusta este ID según el dataset real
       
 if (dataModel == 'GFS') {
  currentDataset =  'gfs/temperature_500mb'; // GFS
 } else {
  currentDataset =  'ecmwf_aifs/temperature_500mb';// ECMWF
 }
        opacity = 0.99;
        contourVisible = contourUser;
        update();
 if (shouldUpdateWind()) {
      applyWindLayer();
    } else {
      // opcional: console.debug('[wind] skip during animation on non-wind layer');
    }
     // 🔁 Precarga oculta de 6h del dataset recién activado
  
 cloudVisible ?  updateCloud() : clearCloudLayer();

 if (dataModel == 'GFS') {
  // precacheDatasetFrames('gfs/temperature_2m_above_ground',24); // GFS
 } else {
  // precacheDatasetFrames('ecmwf_aifs/temperature_2m_above_ground',24);// ECMWF
 }
        document.getElementById('variable-name').textContent = 'Cold Air 500mb';
        document.getElementById('active-layer-name').textContent = 'Cold Air 500mb';
    } catch (error) {
        console.error('Error loading Inestability:', error);
        // Opcional: Mostrar mensaje de error al usuario
        document.getElementById('variable-name').textContent = 'Error loading data from CAPe';
    }

    await precacheDatasets('gfs/temperature_500mb');
});
precipitable_noaa.addEventListener('click', async () => {
await setPlayback(false, "layer-change");
window.NOAA = true;
let key = 'precipitable_noaa';
maptilerON = false;
__NO_BLEND = false;
maptilerWindOff  = false;
 applyWindLayer();
reflectMaptilerFlag(maptilerON);
await switchDatasetSmooth(DATASETS[key].id, DATASETS[key]);
    try {
      updateInfoPanel("precipitable_noaa");
 if (dataModel == 'GFS') {
   changeLayer('gfs/precipitable_water_entire_atmosphere'); // GFS
 } else {
  changeLayer('ecmwf_aifs/precipitable_water_entire_atmosphere'); // ECMWF
 }  
    //  loadingIndicator.style.display = 'block';  // Mostrar
      timeInfoContainer.style.display = 'none';
        // Remover la clase 'active' de todos los botones
        document.querySelectorAll('#buttons li').forEach(btn => {
            btn.classList.remove('active');
        });
        // Añadir la clase 'active' al botón presionado
        precipitable_noaa.classList.add('active');
        // Cargar datos específicos de ECMWF CAPE
     //   const dataset =  'gfs/temperature_2m_above_ground'; // Ajusta este ID según el dataset real
       
 if (dataModel == 'GFS') {
  currentDataset =  'gfs/precipitable_water_entire_atmosphere'; // GFS
 } else {
  currentDataset =  'ecmwf_aifs/precipitable_water_entire_atmosphere';// ECMWF
 }
        opacity = 0.7;
        contourVisible = contourUser;
        update();
 if (shouldUpdateWind()) {
      applyWindLayer();
    } else {
      // opcional: console.debug('[wind] skip during animation on non-wind layer');
    }
     // 🔁 Precarga oculta de 6h del dataset recién activado
  
 cloudVisible ?  updateCloud() : clearCloudLayer();

 if (dataModel == 'GFS') {
  // precacheDatasetFrames('gfs/temperature_2m_above_ground',24); // GFS
 } else {
  // precacheDatasetFrames('ecmwf_aifs/temperature_2m_above_ground',24);// ECMWF
 }
        document.getElementById('variable-name').textContent = 'Precipitable Water';
        document.getElementById('active-layer-name').textContent = 'Precipitable Water';
    } catch (error) {
        console.error('Error loading Inestability:', error);
        // Opcional: Mostrar mensaje de error al usuario
        document.getElementById('variable-name').textContent = 'Error loading data from PWAT_NOAA';
    }

    await precacheDatasets('gfs/precipitable_water_entire_atmosphere');
});
// precipitation_noaa.addEventListener('click', async () => {
// await setPlayback(false, "layer-change");
// window.NOAA = true;
// let key = 'precip_noaa';
// maptilerON = false;
// __NO_BLEND = false;
// maptilerWindOff  = false;
//  applyWindLayer();
// reflectMaptilerFlag(maptilerON);
// await switchDatasetSmooth(DATASETS[key].id, DATASETS[key]);
//     try {
//       updateInfoPanel("precipitation_noaa");
//  if (dataModel == 'GFS') {
//    changeLayer('gfs/precipitation_3h_accumulation_surface'); // GFS
//  } else {
//   changeLayer('ecmwf_aifs/precipitation_3h_accumulation_surface'); // ECMWF
//  }  
//     //  loadingIndicator.style.display = 'block';  // Mostrar
//       timeInfoContainer.style.display = 'none';
//         // Remover la clase 'active' de todos los botones
//         document.querySelectorAll('#buttons li').forEach(btn => {
//             btn.classList.remove('active');
//         });
//         // Añadir la clase 'active' al botón presionado
//         precipitation_noaa.classList.add('active');
//         // Cargar datos específicos de ECMWF CAPE
//      //   const dataset =  'gfs/temperature_2m_above_ground'; // Ajusta este ID según el dataset real
       
//  if (dataModel == 'GFS') {
//   currentDataset =  'gfs/precipitation_3h_accumulation_surface'; // GFS
//  } else {
//   currentDataset =  'ecmwf_aifs/precipitation_3h_accumulation_surface';// ECMWF
//  }
//         opacity = 0.9;
//         contourVisible = contourUser;
//         update();
//  if (shouldUpdateWind()) {
//       applyWindLayer();
//     } else {
//       // opcional: console.debug('[wind] skip during animation on non-wind layer');
//     }
//      // 🔁 Precarga oculta de 6h del dataset recién activado
  
//  cloudVisible ?  updateCloud() : clearCloudLayer();

//  if (dataModel == 'GFS') {
//   // precacheDatasetFrames('gfs/temperature_2m_above_ground',24); // GFS
//  } else {
//   // precacheDatasetFrames('ecmwf_aifs/temperature_2m_above_ground',24);// ECMWF
//  }
//         document.getElementById('variable-name').textContent = 'Precipitation 3h';
//         document.getElementById('active-layer-name').textContent = 'Precipitation 3h';
//     } catch (error) {
//         console.error('Error loading Inestability:', error);
//         // Opcional: Mostrar mensaje de error al usuario
//         document.getElementById('variable-name').textContent = 'Error loading data from PWAT_NOAA';
//     }

//     await precacheDatasets('gfs/precipitation_3h_accumulation_surface');
// });
cloudcover_noaa.addEventListener('click', async () => {
await setPlayback(false, "layer-change");
window.NOAA = true;
let key = 'cloud_noaa';
maptilerON = false;
__NO_BLEND = false;
maptilerWindOff  = false;
 applyWindLayer();
reflectMaptilerFlag(maptilerON);
await switchDatasetSmooth(DATASETS[key].id, DATASETS[key]);
    try {
      updateInfoPanel("cloudcover_noaa");
 if (dataModel == 'GFS') {
   changeLayer('gfs/cloud_cover_entire_atmosphere'); // GFS
 } else {
  changeLayer('ecmwf_aifs/cloud_cover_entire_atmosphere'); // ECMWF
 }  
    //  loadingIndicator.style.display = 'block';  // Mostrar
      timeInfoContainer.style.display = 'none';
        // Remover la clase 'active' de todos los botones
        document.querySelectorAll('#buttons li').forEach(btn => {
            btn.classList.remove('active');
        });
        // Añadir la clase 'active' al botón presionado
        cloudcover_noaa.classList.add('active');
        // Cargar datos específicos de ECMWF CAPE
     //   const dataset =  'gfs/temperature_2m_above_ground'; // Ajusta este ID según el dataset real
       
 if (dataModel == 'GFS') {
  currentDataset =  'gfs/cloud_cover_entire_atmosphere'; // GFS
 } else {
  currentDataset =  'ecmwf_aifs/cloud_cover_entire_atmosphere';// ECMWF
 }
        opacity = 0.8;
        contourVisible = contourUser;
        update();
 if (shouldUpdateWind()) {
      applyWindLayer();
    } else {
      // opcional: console.debug('[wind] skip during animation on non-wind layer');
    }
     // 🔁 Precarga oculta de 6h del dataset recién activado
  
 cloudVisible ?  updateCloud() : clearCloudLayer();

 if (dataModel == 'GFS') {
  // precacheDatasetFrames('gfs/temperature_2m_above_ground',24); // GFS
 } else {
  // precacheDatasetFrames('ecmwf_aifs/temperature_2m_above_ground',24);// ECMWF
 }
        document.getElementById('variable-name').textContent = 'Total Cloud Cover';
        document.getElementById('active-layer-name').textContent = 'Total Cloud Cover';
    } catch (error) {
        console.error('Error loading Inestability:', error);
        // Opcional: Mostrar mensaje de error al usuario
        document.getElementById('variable-name').textContent = 'Error loading data from PWAT_NOAA';
    }

    await precacheDatasets('gfs/cloud_cover_entire_atmosphere');
});
instability_noaa.addEventListener('click', async () => {
await setPlayback(false, "layer-change");
  highValuesVisible = highValuesVisibleUser;

    // await precacheDatasets('gfs/geopotential_height_500mb');
window.NOAA = true;
   //  await precacheDatasets('gfs/geopotential_height_500mb');
maptilerON = false;
__NO_BLEND = false;
maptilerWindOff  = false;
applyWindLayer();
reflectMaptilerFlag(false);
  let key = 'gh500';
  await switchDatasetSmooth(DATASETS[key].id, DATASETS[key]);

    try {

      updateInfoPanel("instability_noaa");
      changeLayer('gfs/geopotential_height_500mb');
    //  loadingIndicator.style.display = 'block';  // Mostrar

      timeInfoContainer.style.display = 'none';
        // Remover la clase 'active' de todos los botones
        document.querySelectorAll('#buttons li').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Añadir la clase 'active' al botón presionado
        instability_noaa.classList.add('active');
        
        // Cargar datos específicos de ECMWF CAPE
        const dataset = 'gfs/geopotential_height_500mb'; // Ajusta este ID según el dataset real
        currentDataset = 'gfs/geopotential_height_500mb';
        contourVisible = contourUser;
        opacity = 0.9;
        update();
             // 🔁 Precarga oculta de 6h del dataset recién activado
  
 if (shouldUpdateWind()) {
      applyWindLayer();
    } else {
      // opcional: console.debug('[wind] skip during animation on non-wind layer');
    }
 cloudVisible ?  updateCloud() : clearCloudLayer();
       // precacheDatasetFrames('gfs/geopotential_height_500mb', 24);
        document.getElementById('variable-name').textContent = 'Inestability NOAA';
        document.getElementById('active-layer-name').textContent = 'Inestability NOAA';

    } catch (error) {
        console.error('Error loading Inestability:', error);
        // Opcional: Mostrar mensaje de error al usuario
        document.getElementById('variable-name').textContent = 'Error loading data from CAPe';
    }
    await precacheDatasets('gfs/geopotential_height_500mb');
});




cape_noaa.addEventListener('click', async () => {
  await setPlayback(false, "layer-change");
window.NOAA = true;
highValuesVisible = highValuesVisibleAllways;
maptilerON = false;
__NO_BLEND = false;
maptilerWindOff  = false;


  applyWindLayer();
reflectMaptilerFlag(false);
    let key = 'cape_noaa';
    await switchDatasetSmooth(DATASETS[key].id, DATASETS[key]);
      
    try {
      updateInfoPanel("cape_noaa");
      changeLayer('gfs/convective_available_potential_energy_surface');
    //  loadingIndicator.style.display = 'block';  // Mostrar

      timeInfoContainer.style.display = 'none';
      // const weatherLayer = weatherLayers[activeLayer]?.layer;
      // map.removeLayer(weatherLayer);
      // changeWeatherLayer("cold")
        // Remover la clase 'active' de todos los botones
        document.querySelectorAll('#buttons li').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Añadir la clase 'active' al botón presionado
        cape_noaa.classList.add('active');
        
        // Cargar datos específicos de ECMWF CAPE
        const dataset = 'gfs/convective_available_potential_energy_surface'; // Ajusta este ID según el dataset real
        currentDataset = 'gfs/convective_available_potential_energy_surface';
        opacity = 0.8;
        contourVisible = contourNoVisibleAllways;
        update();
             // 🔁 Precarga oculta de 6h del dataset recién activado
  
 if (shouldUpdateWind()) {
      applyWindLayer();
    } else {
      // opcional: console.debug('[wind] skip during animation on non-wind layer');
    }
 cloudVisible ?  updateCloud() : clearCloudLayer();
      // precacheDatasetFrames('gfs/convective_available_potential_energy_surface', 24);
        document.getElementById('variable-name').textContent = 'Thunderstorms NOAA';
        document.getElementById('active-layer-name').textContent = 'Thunderstorms NOAA';


        
    } catch (error) {
        console.error('Error loading ECMWF Pressure:', error);
        // Opcional: Mostrar mensaje de error al usuario
        document.getElementById('variable-name').textContent = 'Error loading data from CAPe';
    }
    await precacheDatasets('gfs/convective_available_potential_energy_surface');
});










// //iOS



function detailprecipitation5daysPress() {
  map.setLayoutProperty(activeLayer, 'visibility', 'none');
  detailprecipitation5days.click();
}
window.detailprecipitation5daysPress = detailprecipitation5daysPress;


detailprecipitation5days.addEventListener('click', async () => {
await setPlayback(false, "layer-change");
updateInfoPanel("detailprecipitation");
  highValuesVisible = highValuesVisibleAllways;

maptilerWindOff = false;
contourVisible = contourNoVisibleAllways;
clearMapTilerMarkers();

//  if (windVisible) {
//      windLayer.setOpacity(0);
//   } else {
//     windLayer.setOpacity(0);
//   }

applyWindLayer();
map.setLayoutProperty(activeLayer, 'visibility', 'none');
deckgl.setProps({layers: [],});
activeLayer = 'precipitation';  
 maptilerON = true;
 reflectMaptilerFlag(true);
//  changeWeatherLayer(activeLayer);
// // document.querySelectorAll('#buttons li').forEach(btn => {
// btn.classList.remove('active');
//   });
//     // Añadir la clase 'active' al botón presionado
//   detailprecipitation5days.classList.add('active');

//     document.getElementById('variable-name').textContent = 'Detail Precipitation 4 days';
//     document.getElementById('active-layer-name').textContent = 'Detail Precipitation 4 days';


//   // updateMarkers(); // primera pasada

 


  });






// //iOS
function detailradar5daysPress() {
  map.setLayoutProperty(activeLayer, 'visibility', 'none');
  detailradar5days.click();
}
window.detailradar5daysPress = detailradar5daysPress;

detailradar5days.addEventListener('click', async () => {
 await setPlayback(false, "layer-change");
   contourVisible = contourNoVisibleAllways;
updateInfoPanel("detailradar");
  clearMapTilerMarkers();
  maptilerWindOff = false;

//  if (windVisible) {
//      windLayer.setOpacity(0);
//   } else {
//     windLayer.setOpacity(0);
//   }

   applyWindLayer();

map.setLayoutProperty(activeLayer, 'visibility', 'none');
  deckgl.setProps({
              layers: [],
          });

activeLayer = 'radar';
//  const weatherLayerN = weatherLayers[activeLayer].layer || createWeatherLayer(activeLayer);
//           if (map.getLayer(activeLayer)) {
//             map.setLayoutProperty(activeLayer, 'visibility', 'visible');
//           } else {
//             map.addLayer(weatherLayerN, 'Water');
            
//            }
  
maptilerON = true;
reflectMaptilerFlag(true);


// changeWeatherLayer(activeLayer);

  // map.setLayoutProperty(activeLayer, 'visibility', 'none');
  // const weatherLayer = weatherLayers['radar']?.layer;
  //       if (weatherLayer) {
  // weatherLayer.setAnimationTime(currentTime); }
  // map.setLayoutProperty(activeLayer, 'visibility', 'visible');

document.querySelectorAll('#buttons li').forEach(btn => {
  btn.classList.remove('active');
  });
    // Añadir la clase 'active' al botón presionado
  detailradar5days.classList.add('active');
  document.getElementById('variable-name').textContent = 'Detail Radar 4 days';
    document.getElementById('active-layer-name').textContent = 'Detail Radar 4 days';

   //  updateMarkers(); // primera pasada

});


// //iOS
function detailwind5daysPress() {
  map.setLayoutProperty(activeLayer, 'visibility', 'none');
  detailwind5days.click();
}
window.detailwind5daysPress = detailwind5daysPress;

detailwind5days.addEventListener('click', async () => {

//  windLayer.setOpacity(0);
//  windToggle.click();



  await setPlayback(false, "layer-change"); 
 contourVisible = contourNoVisibleAllways;

  clearMapTilerMarkers();
  
  updateInfoPanel("detailwind");
  
   maptilerWindOff = true;

  //  applyWindLayer();
  // updateWind();

map.setLayoutProperty(activeLayer, 'visibility', 'none');
  deckgl.setProps({
              layers: [],
          });

activeLayer = 'wind';
// changeWeatherLayer(activeLayer);
  
maptilerON = true;
reflectMaptilerFlag(true);



  map.setLayoutProperty(activeLayer, 'visibility', 'none');
  const weatherLayer = weatherLayers['wind']?.layer;
        if (weatherLayer) {
  weatherLayer.setAnimationTime(currentTime); }
  map.setLayoutProperty(activeLayer, 'visibility', 'visible');

document.querySelectorAll('#buttons li').forEach(btn => {
  btn.classList.remove('active');
  });
    // Añadir la clase 'active' al botón presionado
  detailwind5days.classList.add('active');
 document.getElementById('variable-name').textContent = 'Detail Wind 4 days';
    document.getElementById('active-layer-name').textContent = 'Detail Wind 4 days';

   // updateMarkers(); // primera pasada


 });

function triggerGeolocation() {
    if (geoControl) {
        geoControl.trigger();
    }
}
window.triggerGeolocation = triggerGeolocation;

relativehumidity_noaa.addEventListener('click', async () => {
 await setPlayback(false, "layer-change");   
highValuesVisible = highValuesVisibleAllways;
 
window.NOAA = true;
maptilerON = false;
__NO_BLEND = false;
maptilerWindOff  = false;
  applyWindLayer();
reflectMaptilerFlag(false);
 let key = 'relative_noaa';
 await switchDatasetSmooth(DATASETS[key].id, DATASETS[key]);

    
try {
  updateInfoPanel("relative_noaa");
  changeLayer('gfs/relative_humidity_2m_above_ground');

//  loadingIndicator.style.display = 'block';  // Mostrar

  // Remover la clase 'active' de todos los botones
  document.querySelectorAll('#buttons li').forEach(btn => {
      btn.classList.remove('active');
  });
  
  // Añadir la clase 'active' al botón presionado
relativehumidity_noaa.classList.add('active');
  

 // https://catalog.weatherlayers.com/data/gfs/precipitation_3h_accumulation_surface/2025042306/9/data.tif?access_token=9djqrhlmAjv2Mv2z2Vwz
  // Cargar datos específicos de ECMWF Pressure (Mean Sea Level)
  const datasetCustom = 'gfs/relative_humidity_2m_above_ground'; // Ajusta este ID según el dataset real
  currentDataset = 'gfs/relative_humidity_2m_above_ground';
  opacity = 0.7; 
  contourVisible = contourUser;
  update();
applyWindLayer();
     // 🔁 Precarga oculta de 6h del dataset recién activado
  
 cloudVisible ?  updateCloud() : clearCloudLayer();
  // precacheDatasetFrames('gfs/relative_humidity_2m_above_ground', 24);

  document.getElementById('variable-name').textContent = 'Relative Humidity NOAA';
  document.getElementById('active-layer-name').textContent = 'Relative Humidity NOAA';



  
} catch (error) {
  console.error('Error loading ECMWF Pressure:', error);
  // Opcional: Mostrar mensaje de error al usuario
  document.getElementById('variable-name').textContent = 'Error loading data';
}

  await precacheDatasets('gfs/relative_humidity_2m_above_ground');


});


// CAP: primera carga
// ensureCapLayerOnMap().catch(console.error);
// startCapAutoRefresh();

// CAP: reinsertar cada vez que cambie el estilo (si se cambia en runtime)
//map.on("style.load", () => {
//   // ensureCapLayerOnMap().catch(() => {});
//   if (map.getLayer("background")) {
//     map.setPaintProperty("background", "background-color", "#eef1f4");
//     map.setPaintProperty("background", "background-opacity", 1);
//   }

// }); 



map.once('idle', async () => {


   if (shouldUpdateWind()) {
      applyWindLayer();
    }

    // CAP ALERTS
    // ensureCapLayerOnMap().catch(console.error);
    // startCapAutoRefresh();


  try {
    const datasetCustom = 'gfs/reflectivity_1000m_above_ground'; // Ajusta este ID según el dataset real

    // (opcional) metadata WL
    await client.loadDataset(datasetCustom);

    // Raster (aquí intercepta AWS si tu patch está activo)
    const { image, image2, imageWeight, imageType, imageUnscale, bounds } =
      await client.loadDatasetData(datasetCustom);

    console.log('[z500 check]', {
      hasTexture: !!(image && image.data && image.width && image.height),
      imageType, imageUnscale,
      dataLen: image?.data?.length, wh: image ? `${image.width}x${image.height}` : null
    });
    console.log('[z500 sample bytes]', sampleTexture(image, imageUnscale));

    // Dominio y paleta “ajustada”
    const umin = Array.isArray(imageUnscale) ? imageUnscale[0] : 4710;
    const umax = Array.isArray(imageUnscale) ? imageUnscale[1] : 6000;
    const stopsFitted = fitPaletteToDomain(paletteGeopotentialRaw, [umin, umax]);


    window.__makeZ500Layers = function() {
  return [
    new WeatherLayers.RasterLayer({
      id: 'raster-z500',
      image,
      image2: null,
      imageWeight: imageWeight || 0,
      imageType: 'SCALAR',
      imageUnscale: [umin, umax],
      bounds: bounds || [-180, -85.051129, 180, 85.051129],
      palette: stopsFitted,
      opacity: 0.0,
      visible: false,
      imageSmoothing: 5,
      imageInterpolation: config.imageInterpolation,
      pickable: !isMetalWebGl2(),
      // extensions: [new deck.ClipExtension()],
      // clipBounds: [-181, -85.051129, 181, 85.051129],
      beforeId: 'boundary_country_outline',

               
    })
  ];
};

const deckOverlay = new deck.MapboxOverlay({
  interleaved: true,
    views: [new deck._GlobeView({ id: 'mapbox', resolution: 5 })],
  layers: window.__makeZ500Layers()
});


    console.log(map.getStyle().layers.map(l => l.id));

map.addControl(deckOverlay);

window.deckOverlays = window.deckOverlays || {};
window.deckInstances = window.deckInstances || {};

window.deckOverlays.z500 = deckOverlay;

const deckglZ500 = await waitForDeck(() => deckOverlay._deck);
window.deckInstances.z500 = deckglZ500;
window.deckgl = deckglZ500;

attachContextLossHandlers(deckglZ500?.canvas, "deckgl-z500", () => {
  tryRecoverWebGL();
  rebuildDeckLayers();
});

     
  //  window.deckgl = await waitForDeck(() => deckOverlay._deck);

// Quick Tooltip


(function setupQuickTip(){
  // 1) cajetín único
  let tip = document.getElementById('quick-tip');
  if (!tip) {
    tip = document.createElement('div');
    tip.id = 'quick-tip';
    tip.textContent = '…';
    document.body.appendChild(tip);
  }

  const container = map.getCanvasContainer();
  const deck = window.deckgl;

  const HOLD_MS = 3000;   // 3 s
  const MOVE_TOL = 10;
  let startX = 0, startY = 0;
  let hideTimer = null;

  // === Helpers específicos pedidOS ===
  // function getKelvinToCelsius() {
  //   try {
  //     const id = String(currentDataset || '');
  //     const isTempK =
  //       id.includes('gfs/temperature_500mb') ||
  //       id.includes('gfs/temperature_2m_above_ground') ||
  //       id.includes('gfs/apparent_temperature_2m_above_ground');

  //     return isTempK ? 273.15 : 0.0;
  //   } catch { return 0.0; }
  // }

  // function formatValue(info){
  //   // Valor base desde raster/object/value
  //   const raw =
  //     (info && info.raster && info.raster.value) ??
  //     (info && info.object && info.object.value) ??
  //     info?.value;

  //   if (raw == null || Number.isNaN(raw)) return 'No data';

  //   const k2c = getKelvinToCelsius();
  //   if (k2c !== 0) {
  //     const c = Number(raw) - k2c;
  //     return `${c.toFixed(1)} °C`;
  //   }
  //   // no-temperatura → devuelve tal cual (redondea si es numérico)
  //   if (typeof raw === 'number') return String(Number(raw.toFixed?.(1) ?? raw));
  //   return String(raw);
  // }

// === Diccionario de unidades / transformaciones por dataset ===
// Coincide por substring (id.includes(...)) o por RegExp.
const UNIT_RULES = [
  // Temperatura (K → °C)
  { match: /gfs\/temperature_2m_above_ground|gfs\/apparent_temperature_2m_above_ground|ecmwf_ifs\/temperature_2m_above_ground|gfs\/temperature_500mb/,
    unit: '', decimals: 1, transform: v => v - 273.15 },

  // Viento (m/s)
 {
  match: /gfs\/(?:wind_10m_above_ground|wind_tropopause|wind_gust_surface)/,
  unit: '',
  decimals: 0,
  transform: v => v * 3.6   // m/s → km/h
},

  // Presión a nivel del mar (Pa → hPa si viene en Pa)
  { match: /gfs\/pmsl|pressure_mean_sea_level|pmsl/,
    unit: '', decimals: 0,
    transform: v => (v > 2000 ? v / 100 : v) },  // si ya está en hPa no cambia

  // Altura geopotencial 500 mb (m → dam)
   { match: /(?:^|\/)geopotential[_-]?height[_-]?500mb(?:$|\/)?/,
    unit: '', decimals: 0, transform: v => v / 10 },

  // Nubosidad total (0..1 o 0..100 → %)
  { match: /gfs\/cloud_cover_entire_atmosphere|cloud_cover/,
    unit: '', decimals: 0, transform: v => (v <= 1 ? v * 100 : v) },

  // Precipitación acumulada 3 h (mm)
  { match: /gfs\/precipitation_3h_accumulation_surface/,
    unit: '', decimals: 1 },

  // Agua precipitable (kg/m² ≈ mm)
  { match: /gfs\/pwat|precipitable_water_entire_atmosphere/,
    unit: '', decimals: 1 },

  // Reflectividad (dBZ)
  { match: /gfs\/reflect1k|reflectivity/i,
    unit: '', decimals: 0 },

  // Nieve en suelo (m → cm)
  { match: /gfs\/snowdepth|snow_depth/,
    unit: '', decimals: 0, transform: v => v  },

  // Shortwave down (W/m²)
  { match: /gfs\/swdn|downward_short_wave_radiation_flux_surface/,
    unit: '', decimals: 0 },

  // CAPE (J/kg)
  { match: /gfs\/cape|convective_available_potential_energy_surface/,
    unit: '', decimals: 0 },
 
    { match: /gfs\/rlt|relative_humidity_2m_above_ground/,
    unit: '', decimals: 0 },


];

// pressure: { id:'gfs/pressure_mean_sea_level', label:'Pressure',      minBuffer:6, windowSize:12 },
//   precip:   { id:'gfs/precipitation_3h_accumulation_surface', label:'Precipitation', minBuffer:6, windowSize:12 },
//   radar:   { id:'gfs/reflectivity_1000m_above_ground', label:'Radar Reflectivity 1000 m', minBuffer:6, windowSize:12 },
//   temp500mb:   { id:'gfs/temperature_500mb', label:'Cold Air 500mb', minBuffer:6, windowSize:12 },
//   temp2m:   { id:'gfs/temperature_2m_above_ground', label:'Temperature', minBuffer:6, windowSize:12 },
//   cloud:    { id:'gfs/cloud_cover_entire_atmosphere', label:'Cloud cover', minBuffer:4, windowSize:8 },
//   gh500:    { id:'gfs/geopotential_height_500mb', label:'Inestability',         minBuffer:6, windowSize:12 },
//   cape:     { id:'gfs/convective_available_potential_energy_surface', label:'ThunderStorm', minBuffer:6, windowSize:12 },
//   solar:     { id:'gfs/downward_short_wave_radiation_flux_surface', label:'Solar Radiation', minBuffer:4, windowSize:8 },
//   snow:  { id:'gfs/snow_depth_surface', label:'Snow Depth', minBuffer:4, windowSize:8 },
//   appTemp2m:  { id:'gfs/apparent_temperature_2m_above_ground', label:'Apparent Temperature ', minBuffer:6, windowSize:12 },
//   wind:  { id:'gfs/wind_10m_above_ground', label:'Apparent Temperature ', minBuffer:6, windowSize:12 },
//   windGust:  { id:'gfs/wind_tropopause', label:'Jet Stream', minBuffer:6, windowSize:12 },
//   precipitable:  { id:'gfs/precipitable_water_entire_atmosphere', label:'Precipitable WAter', minBuffer:6, windowSize:12 },
//   relative: { id:'gfs/relative_humidity_2m_above_ground', label:'Precipitable WAter', minBuffer:4, windowSize:8 },




function getRuleFor(id) {
  const s = String(id || '');
  for (const r of UNIT_RULES) {
    if (typeof r.match === 'string') { if (s.includes(r.match)) return r; }
    else if (r.match?.test?.(s)) { return r; }
  }
  // Por defecto: números con 1 decimal y sin unidad
  return { unit: '', decimals: 1 };
}

function formatValue(info) {
  // Valor base desde raster/object/value
  let raw =
    (info && info.raster && info.raster.value) ??
    (info && info.object && info.object.value) ??
    info?.value;

  if (raw == null || Number.isNaN(Number(raw))) return 'Only App Version';

  // Dataset activo: GFS/ECMWF que está dibujando deck.gl
  const id = (typeof currentDataset !== 'undefined' && currentDataset)
    ? currentDataset
    : window.currentDataset;

  const rule = getRuleFor(id);
  const s    = String(id || '').toLowerCase();

  let val = Number(raw);

  // 1) Aplicar transformación base de la regla (K→°C, m/s→km/h, etc.)
  if (Number.isFinite(val) && typeof rule.transform === 'function') {
    val = rule.transform(val);
  }

  // 2) Unidades y decimales por defecto
  let decimals  = (typeof rule.decimals === 'number') ? rule.decimals : 1;
  let unitLabel = rule.unit || '';

  const US = WeatherLayers.UnitSystem;
  const us = (typeof constUni !== 'undefined') ? constUni : US.METRIC;

  const isTemp =
    /temperature_2m_above_ground|apparent_temperature_2m_above_ground|temperature_500mb/.test(s);

  const isWind =
    /wind_10m_above_ground|wind_tropopause|wind_gust_surface/.test(s);

  const isPrecip =
    /precipitation_3h_accumulation_surface|precipitation/.test(s);

    const isSnow =
    /snow_depth_surface|snow/.test(s);

  // === TEMPERATURA ===
  // Tras rule.transform, 'val' está en °C para GFS; esto vale también para ECMWF si ampliamos las reglas.
  if (isTemp) {
    if (us === US.IMPERIAL) {
      val = val * 9/5 + 32;   // °C → °F
      unitLabel = '°F';
    } else {
      unitLabel = '°C';
    }
    decimals = 1;
  }

  // === VIENTO ===
  // Con UNIT_RULES actual, val está en km/h (transform de m/s→km/h). Adaptamos según sistema:
  if (isWind) {
    if (us === US.METRIC) {
      val = val / 3.6 ;        // km/h → m/s
      unitLabel = 'm/s';
    } else if (us === US.IMPERIAL) {
      val = val / 1.609344 ;   // km/h → mph
      unitLabel = 'mph';
    } else if (us === US.NAUTICAL) {
      val = val / 1.852 ;      // km/h → kt
      unitLabel = 'kt';
    } else {
      unitLabel = 'km/h';     // METRIC_KILOMETERS
    }
    decimals = 1;

    val = Math.round(val * 1.6) ; // para viento, redondeamos al entero más cercano
  }

  // === PRECIPITACIÓN ===
  // val en mm (por reglas); si es Imperial, pasamos a pulgadas
  if (isPrecip) {
    if (us === US.IMPERIAL) {
      val = val / 25.4;       // mm → in
      unitLabel = '';
      decimals = 2;
    } else {
      unitLabel = '';
      decimals = 1;
    }
  }

  if (isSnow) {
    if (us === US.IMPERIAL) {
      val = val / 2.54;       // cm → in
      unitLabel = '';
      decimals = 2;
    } else {
      unitLabel = '';
      decimals = 1;
    }
  }


  if (!Number.isFinite(val)) return 'Only App Version';

  const n = val.toFixed(decimals);
  return unitLabel ? `${n} ${unitLabel}` : n;
}





  function showTip(screenX, screenY, text){
    tip.textContent = text;
    tip.style.left = `${screenX}px`;
    tip.style.top  = `${screenY - 12}px`;
    tip.style.display = 'block';
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hideTip, HOLD_MS);
  }
  function hideTip(){ tip.style.display = 'none'; }

  function pickAtCanvasXY(clientX, clientY){
    const rect = container.getBoundingClientRect();
    const x = Math.round(clientX - rect.left);
    const y = Math.round(clientY - rect.top);
    if (deck && typeof deck.pickObject === 'function') {
      const info = deck.pickObject({ x, y, radius: 4, depth: 1 });
      if (info && (info.picked || info.object)) {
        info.__screenX = rect.left + x;
        info.__screenY = rect.top  + y;
        return info;
      }
    }
    return { __screenX: clientX, __screenY: clientY, value: null };
  }

  // 2) Gestos
  container.addEventListener('pointerdown', (ev) => {
    startX = ev.clientX; startY = ev.clientY;
  }, {passive:true});

  container.addEventListener('pointerup', (ev) => {
    // ⛔️ Si el mapa base de MapTiler está activo, no mostramos nada
    if (maptilerON === true) return;

    const moved = Math.abs(ev.clientX - startX) > MOVE_TOL || Math.abs(ev.clientY - startY) > MOVE_TOL;
    if (moved) return; // arrastre: no mostrar

    const info = pickAtCanvasXY(ev.clientX, ev.clientY);
    const text = formatValue(info);
    showTip(info.__screenX, info.__screenY, text);
  }, {passive:true});

  // ocultar al iniciar gestos
  const hideOnStart = () => hideTip();
  map.on('movestart', hideOnStart);
  map.on('zoomstart',  hideOnStart);
  map.on('rotatestart',hideOnStart);

  // pinch multitouch
  container.addEventListener('touchstart', (ev)=>{
    if (ev.touches && ev.touches.length >= 2) hideTip();
  }, {passive:true});
})();









  } catch (err) {
    console.error('Fallo en init z500:', err);
  }


 // await precacheDatasets('gfs/wind_10m_above_ground');

  update();


    deckgl.setProps({
        useDevicePixels: __WL_IS_IPHONE ? 1 : window.devicePixelRatio,
      
      });

      // ======= Touch-safe tooltip (tap=toggle pin, long-press pins, hide on gestures) =======

      deckgl.props.onLoad();

});






 // Helper No perder WebGL Context
 window.__WEBGL_LOST = false;

window.deckOverlays = window.deckOverlays || {};
window.deckInstances = window.deckInstances || {};


function attachContextLossHandlers(canvas, name, onRestore) {
  if (!canvas) return;

  canvas.addEventListener("webglcontextlost", (e) => {
    e.preventDefault();
    window.__WEBGL_LOST = true;
    console.warn("[WebGL] LOST:", name);
  }, false);

  canvas.addEventListener("webglcontextrestored", () => {
    window.__WEBGL_LOST = false;
    console.warn("[WebGL] RESTORED:", name);
    try { onRestore && onRestore(); } catch (_) {}
  }, false);
}
// recreateRenderer()

window.tryRecoverWebGL = function() {
  try { window.map?.resize?.(); } catch (_) {}
  try { window.map?.triggerRepaint?.(); } catch (_) {}

  // Rebuild de deck (raster principal + viento)
  try { window.rebuildDeckLayers?.(); } catch (_) {}
};

window.rebuildDeckLayers = function rebuildDeckLayers() {
  // 1) Wind deck (NO pisa el deck principal)
  try {
    const dWind = window.deckWind;
    if (dWind?.setProps) {
      if (window.__makeWindLayers) {
        dWind.setProps({ layers: window.__makeWindLayers() });
      } else {
        dWind.setProps({ layers: dWind.props?.layers || [] });
      }
    }
  } catch (e) {
    console.warn("rebuild wind failed", e);
  }

  // 2) Deck principal (raster/contour/grid/highlow)
  try {
    const dZ = window.deckgl;
    if (dZ?.setProps) {
      if (window.__makeZ500Layers) {
        dZ.setProps({ layers: window.__makeZ500Layers() });
      } else {
        dZ.setProps({ layers: dZ.props?.layers || [] });
      }
    }
  } catch (e) {
    console.warn("rebuild z500 failed", e);
  }
};




      // overlaid deck.gl Wind poner dentro del load sync
      const deckLayerWind = new deck.MapboxOverlay({
        interleaved: false,
         views: [new deck._GlobeView({ id: 'mapbox', resolution: 5 })],
        layers: [
      
        ]
        
      });
      map.addControl(deckLayerWind);
     window.deckOverlays.wind = deckLayerWind;
const deckglWind = await waitForDeck(() => deckLayerWind._deck);
window.deckInstances.wind = deckglWind;

window.deckWind = deckglWind;

attachContextLossHandlers(deckglWind?.canvas, "deckgl-wind", () => {
  tryRecoverWebGL();
  rebuildDeckLayers();
});

// Check WebGL & map
window.__lastMapRenderTs = 0;

// marca cada repaint del mapa (cuando el renderer está vivo)
function __installMapRenderHeartbeat() {
  try {
    if (!window.map) return;
    map.on('render', () => { window.__lastMapRenderTs = Date.now(); });
  } catch (_) {}
}
__installMapRenderHeartbeat();

window.getAppHealth = function getAppHealth() {
  const now = Date.now();
  const mapOk =
    !!window.map &&
    !!window.map.isStyleLoaded?.() ;

  const deckOk = (() => {
    const d = window.deckgl;
    if (!d) return false;
    const c = d.canvas;
    if (!c) return false;
    // Si el contexto se perdió, canvas.getContext suele devolverte null o un contexto con flag perdido
    const gl = c.getContext('webgl2') || c.getContext('webgl') || c.getContext('experimental-webgl');
    if (!gl) return false;
    if (gl.isContextLost && gl.isContextLost()) return false;
    return true;
  })();

  const webglLost = (window.__WEBGL_LOST === true);

  return {
    mapOk,
    deckOk,
    webglLost,
    lastMapRenderMsAgo: window.__lastMapRenderTs ? (now - window.__lastMapRenderTs) : 999999
  };
};

// client

window.__onAppBecameActive = async () => {
  try {
    const h = window.getAppHealth ? window.getAppHealth() : null;

    // Si no hay health, o está todo roto, recarga duro
    if (!h) {
      location.reload();
      return { action: "reload_no_health" };
    }

    // Caso 1: WebGL perdido o Deck KO → reinicio renderer (tu función)
    if (h.webglLost || !h.deckOk) {
      if (window.recreateRenderer) {
        await window.recreateRenderer();
        return { action: "recreate_renderer", health: h };
      } else {
        location.reload();
        return { action: "reload_no_recreate", health: h };
      }
    }

    // Caso 2: mapa no renderiza “reciente” → fuerza un repaint suave
    if (!h.mapOk) {
      // Mapbox/Maplibre: trigger repaint
      try { window.map && window.map.resize && window.map.resize(); } catch(e){}
      try { window.map && window.map.triggerRepaint && window.map.triggerRepaint(); } catch(e){}
      // Deck: redraw
      try { window.deckgl && window.deckgl.redraw && window.deckgl.redraw(true); } catch(e){}
      return { action: "soft_repaint", health: h };
    }

    // Caso 3: todo bien
    return { action: "ok", health: h };

  } catch (e) {
    // Si algo explota, mejor recargar que quedarse blanco
    location.reload();
    return { action: "reload_exception", error: String(e) };
  }
};






    //  const deckglWind = window.deckgl = await waitForDeck(() => deckLayerWind._deck);

      // overlaid deck.gl Cloud poner dentro del load sync
      const deckLayerCloud = new deck.MapboxOverlay({
        interleaved: false,
        views: [new deck._GlobeView({ id: 'mapbox', resolution: 5 })],
        layers: [
      
        ]
        
      });
      map.addControl(deckLayerCloud);
      const deckglCloud = window.deckgl = await waitForDeck(() => deckLayerCloud._deck);

      // // info panels
      const infoControl = new InfoControl();
      infoControl.prependTo(document.getElementById('top-left'));
      deckgl.setProps({
        onViewStateChange: ({ viewState }) => infoControl.update(viewState),
      });

   
      // legendControl
    //  const legendControl = new WeatherLayers.LegendControl();
      const legendControl = new WeatherLayers.LegendControl();
      legendControl.prependTo(document.getElementById('legend-wrapper'));
     

      

      
     

      const attributionControl = new WeatherLayers.AttributionControl();
    //  attributionControl.prependTo(document.getElementById('bottom-right'));

function updateLegendForDataset(datasetId, opts = {}) {
  if (!legendControl) return;

  // OJO: no reutilizamos `...current` para evitar pasar campos internos raros
  const titleStr = String(pickLegendTitle(datasetId, opts) || '');
  const unitStr  = String(legendUnitForDataset(datasetId) || '');

  const paletteVal =
    (opts && opts.palette) ||
    (window.LOCAL_DATASET_META && window.LOCAL_DATASET_META[datasetId] && window.LOCAL_DATASET_META[datasetId].palette) ||
    (window.AWS_DATASETS && window.AWS_DATASETS[datasetId] && window.AWS_DATASETS[datasetId].palette) ||
    null;

  // title/unitFormat deben ser string SIEMPRE para que WL no pete con `.replace`
  legendControl.setConfig({
    title: titleStr,
    unitFormat: unitStr,
    palette: paletteVal
  });
}






  function withTimeout(promise, timeoutMs, label) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error(`Timeout (${timeoutMs}ms) en ${label}`));
    }, timeoutMs);

    promise
      .then((res) => {
        clearTimeout(timeout);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timeout);
        reject(err);
      });
  });
}
// forward

let isPreloading = false;
let activeDataset = null;

async function changeLayer(dataset) {
  // Evita recargar la misma capa
  if (dataset === activeDataset) return;

  console.log(`🔄 Cambiando a capa: ${dataset}`);
  activeDataset = dataset;





  // 2. Actualizar configuración
  config.dataset = dataset;
 // activeLayer = dataset;



  // 4. Precarga con protección
  isPreloading = true;
 // loadingIndicator.style.display = 'flex';

 
}

let isUpdating = false;
async function safeUpdate() {
  if (isUpdating) return;
  isUpdating = true;
  try { await updateForCurrentDataset(); }
  finally { isUpdating = false; }
}
function updateForCurrentDataset() {
 // if (currentDataset === 'gfs/pressure_mean_sea_level') return updatePressure();
  return update();
}


// Control animaciones viento

// Capas que sí pueden refrescar viento durante animación
const WIND_DATASETS = new Set([
   'gfs/wind_10m_above_ground',
   'gfs/wind_tropopause',
   'gfs/wind_gust_surface',
   'ecmwf_ifs/wind_10m_above_ground',
   'gfs/wind_10m_noaa'
]);

// Estado de animación (autodetectado por cadencia de onUpdate)
window.__ANIM__ = window.__ANIM__ || { playing:false, lastTick:0, timer:null };



function noteAnimTick(fps=10) {
  const now = performance.now();
  const prev = window.__ANIM__.lastTick || 0;
  window.__ANIM__.lastTick = now;

  const frameMs   = 1000 / (fps || 10);
  const threshold = frameMs * 1.25;

  if (prev && (now - prev) < threshold) {
    window.__ANIM__.playing = true;
  }

  clearTimeout(window.__ANIM__.timer);
  window.__ANIM__.timer = setTimeout(() => {
    window.__ANIM__.playing = false;

    // << AÑADIDO: cuando detectamos que ya no hay animación:
    try {
      map.setLayoutProperty('windbase', 'visibility', 'visible');
    } catch (e) {}
    if (shouldUpdateWind()) {
      applyWindLayer();
    } else {
      updateNoWind?.();
    }
    try { deckgl?.setNeedsRedraw?.('wind-stop-refresh'); } catch {}
    try { map?.triggerRepaint?.(); } catch {}
  }, threshold * 3);
}


function shouldUpdateWind() {
  const isWindLayer = WIND_DATASETS.has(currentDataset);
  const animating   = !!window.__ANIM__.playing;

  // Sólo refrescamos viento si (a) la capa activa es viento/jet o (b) NO estamos animando
  return isWindLayer || !animating;
}

function shouldUpdateWindLayer() {
  const isWindLayer = WIND_DATASETS.has(currentDataset);
  const animating   = !!window.__ANIM__.playing;

  // Sólo refrescamos viento si (a) la capa activa es viento/jet o (b) NO estamos animando
  return isWindLayer || !animating;
}

// PREMIUM

function limitFreeTime(msUnix) {
  if (IS_PREMIUM_USER) return msUnix;

  const dts = getDatetimesList();
  if (!Array.isArray(dts) || !dts.length) return msUnix;

  const firstMs = Date.parse(dts[0]);
  if (!Number.isFinite(firstMs)) return msUnix;

  const maxFree = firstMs + FREE_MAX_HOURS * 3600 * 1000;

  if (msUnix <= maxFree) return msUnix;



  if(isPlaying) {
     playPauseButton.click(); // pausa si estaba en play
  }

 showPremiumOverlay(t("premium_overlay_info"));

  return maxFree;
}




// Util para coger la lista de datetimes (ISO) desde donde la tengas
function getDatetimesList() {
  // prioriza lo que ya uses en tu app
  if (Array.isArray(window.datetimes) && window.datetimes.length) return window.datetimes;
  if (Array.isArray(window.datetimesJGU) && window.datetimesJGU.length) return window.datetimesJGU;
  if (Array.isArray(config?.datetimes) && config.datetimes.length)   return config.datetimes;
  // último recurso: lo que se le pasó al timeline al crearlo (si es accesible)
  return (timelineControl?.options?.datetimes) || [];
}

function nearestDatetimeISO(targetMs, list) {
  let best = list[0];
  let bestErr = Math.abs(new Date(best).getTime() - targetMs);
  for (let i = 1; i < list.length; i++) {
    const t = new Date(list[i]).getTime();
    const e = Math.abs(t - targetMs);
    if (e < bestErr) { bestErr = e; best = list[i]; }
  }
  return best;
}




const H120 = 120; // horas
function hoursFromStart(msNow) {
  const dts = (config?.datetimes?.length ? config.datetimes : (timelineControl?.datetimes || []));
  const startMs = dts.length ? Date.parse(dts[0]) : weatherLayers[activeLayer]?.layer?.getAnimationStartDate?.()?.getTime?.();
  return (Number.isFinite(startMs) && Number.isFinite(msNow)) ? (msNow - startMs) / 36e5 : NaN;
}

function setWindHidden(hidden) {
  try {
    if (typeof map?.setLayoutProperty === 'function') {
    //  map.setLayoutProperty('windbase', 'visibility', hidden ? 'none' : 'visible');
    }
  } catch(e){}
  if (typeof windLayer?.setVisible === 'function') {
   // windLayer.setVisible(!hidden);
  } else if (typeof windLayer?.setOpacity === 'function') {
  //  windLayer.setOpacity(hidden ? 0 : 1);
  }
}


timeSlider.addEventListener("input", () => {
  // 1) Valor en ms que trae el slider
  let msUnix = Number(timeSlider.value);

  // 2) Aplicar límite de 3 días si NO es Premium
  msUnix = limitFreeTime(msUnix);

  // 3) Si se ha recortado, actualizar el propio slider
  timeSlider.value = String(msUnix);

  // 4) Pasar a segundos para las capas
  const tSec = msUnix / 1000;

  // const weatherLayer = weatherLayers[activeLayer]?.layer;
  // if (weatherLayer) {
  //   currentTime = tSec;
  //   weatherLayer.setAnimationTime(parseInt(tSec));
  //   windLayer.setAnimationTime(parseInt(tSec));
  //   clearMapTilerMarkers();
  // }


  ////
  // const endMs = weatherLayer.getAnimationEndDate();
  // const ONE_HOURS_MS = 1 * 60 * 60 * 1000;

  // console.log('[ endMs=', endMs, );
  // console.log('[ d=', d, );
  // if (msUnix > (endMs )) {
  //           // windLayer.setOpacity(0); // Oculta capa de viento
  //           windOpacityGlobal = 0.60;
  //         } else{
  //           // windLayer.setOpacity(0); // Muestra capa de viento
  //           windOpacityGlobal = 0.60;
  // }
  ///// 
  updateWind();

  refreshTime();
});






const onRelease = () => {
  const msNow = Number(timeSlider.value);
  const over120 = hoursFromStart(msNow) > H120;
 // setWindHidden(over120); // si ≤120h, vuelve a mostrar
};
timeSlider.addEventListener('change', onRelease);      // desktop/mobile
timeSlider.addEventListener('pointerup', onRelease);   // pointer events
timeSlider.addEventListener('touchend', onRelease);    // fallback iOS


    playPauseButton.addEventListener("click", () => {

     
       document.querySelectorAll(".markerTemperature").forEach(el => {
    el.style.display = "none";
  });
   document.querySelectorAll(".markerMainWeatherIcon").forEach(el => {
    el.style.display = "none";
  });


  if (playButton.disabled) {
    alert("⚠️ Animación no disponible (datos faltantes o error).");
    return;
  }

    // const weatherLayer = weatherLayers[activeLayer]?.layer;

    if (isPlaying) {

      if (!maptilerON) {
      
      timelineControl.pause();
      
     
     // windVisible = true;
      // applyWindLayer();
       isPlaying = !isPlaying;
     } else {
        // weatherLayer.animateByFactor(0);
        // windLayer.animateByFactor(0);
        timelineControl.pause();
      
      //  windVisible = true;
        //  applyWindLayer();
         isPlaying = !isPlaying;
      //  setWindHidden(false);
   
     }
       // weatherLayer.animateByFactor(0);
       // windLayer.animateByFactor(0);
        document.getElementById("play-icon").style.display = "inline";
        document.getElementById("pause-icon").style.display = "none";
    } else {
      if (!maptilerON) {
        isPlaying = !isPlaying;

         applyWindLayer();
         timelineControl.start();
    //  setWindHidden(true);
        // windVisible = false;
       
     } else {

      isPlaying = !isPlaying;
        // weatherLayer.animateByFactor(playfactor);
        // windLayer.animateByFactor(playfactor);
       // windVisible = false;
        applyWindLayer();
      //  setWindHidden(true);
       // timelineControl.pause();
     }

        document.getElementById("play-icon").style.display = "none";
        document.getElementById("pause-icon").style.display = "inline";
    }

    toggleFixedCrosshair();
  

  
  if (fixedCrosshair && pointerLngLat) {
    updatePointerValue(pointerLngLat); // Actualiza datos para el punto fijo
  }

});


// playPauseButton.addEventListener("click", async () => {
//   if (playButton.disabled) {
//     alert("⚠️ Animación no disponible (datos faltantes o error).");
//     return;
//   }
//   await setPlayback(!isPlaying, "play-pause-bt");
// });












  const crosshair = document.getElementById('crosshair');
  let selectedLngLat = null;

  function setCrosshairAtLngLat(lngLat) {
    const p = map.project(lngLat);
   crosshair.style.display = 'block';
    crosshair.style.left = `${p.x - 10}px`;
    crosshair.style.top  = `${p.y - 10}px`;
  }


let __pointerHideTimer2 = null;

function showPointerPanelTemporarily(ms = 5000) {
  const el = document.getElementById("pointer-data");
  if (!el) return;

  el.style.display = ""; // o "block" si lo necesitas

  if (__pointerHideTimer2) clearTimeout(__pointerHideTimer2);
  __pointerHideTimer2 = setTimeout(() => {
    el.style.display = "none";
  }, ms);
}


  function selectPoint(lngLat) {
    selectedLngLat = lngLat;
    setCrosshairAtLngLat(lngLat);
    updatePointerValue(lngLat);  // <-- solo aquí actualizamos datos
  }

      function dBZtoRainRate(dBZ) {
      let Z = Math.pow(10, dBZ / 10);  // Convertimos dBZ a Z
      let R = Math.pow(Z / 200, 1 / 1.6);  // Aplicamos la ecuación Z-R para lluvia general
      return R.toFixed(2); // Redondeamos a 2 decimales
      }




      function updatePointerValue(lngLat) {

  // pointerDataDiv.style.display = "";

  pointerLngLat = lngLat; // Guarda la posición actual
  
  const weatherLayer = weatherLayers[activeLayer]?.layer;
  const valueKey = weatherLayers[activeLayer]?.value;
  const units = weatherLayers[activeLayer]?.units;


  if (weatherLayer && valueKey && lngLat) {
    const value = weatherLayer.pickAt(lngLat.lng, lngLat.lat);
    const valueWind = windLayer.pickAt(lngLat.lng, lngLat.lat);
    // Lógica de filtrado (cero/negativos)
    // if (!value || (activeLayer !== "temperature" && value[valueKey] <= 0)) {
    //   pointerDataDiv.innerText = "";
    //   lastPointerValue = "";
    //   return;
    // }


   

    // Formateo del valor
    const decimalPlaces = activeLayer === "radar" ? 1 : 2;
    // const displayValue = value[valueKey].toFixed(decimalPlaces);
    let displayValue;
let displayUnits = units;

if (activeLayer === "radar") {
  const dbz = value[valueKey];
  const rainRate = dBZtoRainRate(dbz);
  displayValue = `${rainRate} mm/h \n ${dbz.toFixed(1)}`;
  displayUnits = ""; // ya incluido en el string
} else {
  displayValue = `${value[valueKey].toFixed(2)} `;
}


    
    if (!valueWind) {
      
       
      // const newText = `${displayValue} ${units}`;
      const newText = displayValue;

      if (newText !== lastPointerValue) {
      pointerDataDiv.innerText = newText;
      lastPointerValue = newText;
    }
      } else {


       
    //   console.log('valueWind', valueWind);


    //   const newText = `${displayValue} ${units} \n Max: ${(valueWind.speedKilometersPerHour.toFixed(1) * 1.8).toFixed(1)} km/h`
    //   if (newText !== lastPointerValue) {
    //   pointerDataDiv.innerText = newText;
    //   lastPointerValue = newText;
    // }

const US = WeatherLayers.UnitSystem;
const us = (typeof constUni !== 'undefined') ? constUni : US.METRIC;

let windV, windU;
let  displayUnits = '';

if (us === US.METRIC) {
  windV = valueWind.speedMetersPerSecond;
  prepV = value; // Asumiendo que 'value' ya está en mm o la unidad base que uses para precipitación
  windU = 'm/s';
  if (activeLayer === "radar") {
    displayUnits = 'dBZ';
  } else {
     displayUnits = 'mm/h';
  }
} else if (us === US.METRIC_KILOMETERS) {
  windV = valueWind.speedKilometersPerHour;
  windU = 'km/h';
  if (activeLayer === "radar") {
    displayUnits = 'dBZ';
  } else {
     displayUnits = 'mm/h';
  }
} else if (us === US.IMPERIAL) {
  windV = valueWind.speedMilesPerHour;
  windU = 'mph';
  if (activeLayer === "radar") {
    displayUnits = 'dBZ';
  } else {
     displayUnits = 'in/h';
  }

} else if (us === US.NAUTICAL) {
  windV = valueWind.speedKnots;
  windU = 'kt';
} else {
  windV = valueWind.speedKilometersPerHour;
  windU = 'km/h';
}

const v = value?.[valueKey];

if (v && typeof v === "object" && ("value" in v) && ("valueImperial" in v)) {
  const n = (us === US.IMPERIAL) ? Number(v.valueImperial) : Number(v.value);
  displayValue = `${n.toFixed(2)} `;
} else {
  displayValue = `${Number(value[valueKey]).toFixed(2)} `;
}

 if (activeLayer === "wind") {
  displayUnits = windU;
  displayValue = windV.toFixed(1);
 }

 if (activeLayer === "temperature") {
  displayUnits = '';
  if (us === US.IMPERIAL) {
    displayValue = `${(value[valueKey] * 9/5 + 32).toFixed(1)} °F`;
  
  } else {
    displayValue = `${value[valueKey].toFixed(1)} °C`;
  }

 }


function stableGustFactor(lng, lat, animTime) {
  // animTime puede venir en ms; lo pasamos a "bloques" estables (p.ej. 10 min)
  const t = Number(animTime) || 0;
  const tBucket = Math.floor(t / (10 * 60 * 1000)); // 10 minutos

  const s = `${lng.toFixed(2)},${lat.toFixed(2)},${tBucket}`;
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const u = (h >>> 0) / 4294967295; // 0..1
  return 1.6 + u * 0.2; // 1.6..1.8
}

// Uso:
const weatherLayer = weatherLayers[activeLayer]?.layer;
const animTime = weatherLayer.getAnimationTime();
const factor = stableGustFactor(pointerLngLat.lng, pointerLngLat.lat, animTime);

const newText = `${displayValue} ${displayUnits}\nMax: ${(windV * factor).toFixed(1)} ${windU}`;

if (newText !== lastPointerValue) {
  pointerDataDiv.innerText = newText;
  lastPointerValue = newText;
}




      }

    //   if (valueWind ) {
       
    //    const newText = `${valueWind.speedKilometersPerHour.toFixed(1)} km/h`;
    //    if (newText !== lastPointerValue) {
    //    pointerDataDiv.innerText = newText;
    //    lastPointerValue = newText;
    //  }
    // }


   // const newText = `${displayValue} ${units}`;
    
    // Solo actualiza DOM si cambió el valor
    // if (newText !== lastPointerValue) {
    //   pointerDataDiv.innerText = newText;
    //   lastPointerValue = newText;
    // }
  }
}
      





  function toggleFixedCrosshair() {
    fixedCrosshair = isPlaying; // Se fija solo durante la animación
  //  crosshair.style.border = fixedCrosshair ? "2px solid #4FC3F7" : "none"; // Cambia color cuando está fija
  }

  function playAnimation(weatherLayer) {
        weatherLayer.animateByFactor(playfactor);
        windLayer.animateByFactor(playfactor);
        playPauseButton.innerText = "Pause";
        isPlaying = true;
      }

function isIOS(){
  const ua = navigator.userAgent || "";
  // iPhone / iPad / iPod
  if (/iPad|iPhone|iPod/i.test(ua)) return true;

  // iPadOS 13+ a veces aparece como "Macintosh" pero con touch
  if (/Macintosh/i.test(ua) && navigator.maxTouchPoints && navigator.maxTouchPoints > 1) return true;

  return false;
}

const WIND_DENSITY = isIOS() ? 50 : 50;


  function pauseAnimation(weatherLayer) {
        weatherLayer.animateByFactor(0);
        windLayer.animateByFactor(0);
      //  playPauseButton.innerText = "Play 3600x";
        isPlaying = false;
      }

        const windLayer = new maptilerweather.WindLayer({
          id: 'windbase',
     
      colorramp: maptilerweather.ColorRamp.builtin.NULL,
      speed: 0.001,
      fadeFactor: 0.04,
      maxAmount: 256,
      density:  WIND_DENSITY,
      color: [255, 255, 255, 0],
      fastColor: [255, 255, 255, 100],
    });

let nochanged = true;

function syncSliderToDatetime(dtISO) {



  // if (!dtISO || !timeSlider) return;
  // const msUnix = Date.parse(dtISO);
  // if (isNaN(msUnix)) return;
  // timeSlider.value = msUnix;
//  console.log('windLayer time', )
//   windLayer.setAnimationTime(parseInt(timeSlider.value / 1000));
//  currentTime = windLayer.getAnimationTime();


   if (!dtISO || !timeSlider) return;
  let msUnix = Date.parse(dtISO);
  if (isNaN(msUnix)) return;

  // Límite de 3 días si no es Premium
  msUnix = limitFreeTime(msUnix);

  timeSlider.value = String(msUnix);

  const tSec = msUnix / 1000;
  // try { windLayer?.setAnimationTime?.(parseInt(tSec)); } catch {}
  currentTime = tSec;




  //  console.log('windLayer time', )


  //    windLayer.setAnimationTime(parseInt(timeSlider.value / 1000));

  //    currentTime = windLayer.getAnimationTime();

         
          // const endDate = windLayer.getAnimationEndDate();   
          // const endMs = endDate.getTime();

          // console.log("Valor msUnix:", msUnix);
          // console.log("Valor endMs:", endMs);

          // if (msUnix > endMs) {
          //   // windLayer.setOpacity(0); // Oculta capa de viento AR
          //   windOpacityGlobal = 0.60; // Muestra capa de viento Base
          // } else{
          //   // windLayer.setOpacity(0); // Muestra capa de viento AR
          //   windOpacityGlobal = 0.60;
          // }

          updateWind();
          // if (msUnix > endMs && nochanged  ) {

          //               console.log('Fps en 5');
          //               timelineControl.pause();
          //               timelineControl.fps =  5;
          //               timelineControl.start();
          //       nochanged = false;
                      
          // }


    //  const weatherLayer = weatherLayers[activeLayer]?.layer;
    //     if (weatherLayer) {
    //  weatherLayer.setAnimationTime(parseInt(timeSlider.value / 1000)); }
 // }
}





function updateTimelineFpsDynamically() {
  if (!timelineControl) return;

  const dts = (config && Array.isArray(config.datetimes) && config.datetimes.length > 1)
    ? config.datetimes
    : (timelineControl.datetimes || []);

  if (!dts.length) return;

  const firstMs = Date.parse(dts[0]);
  const lastMs  = Date.parse(dts[dts.length - 1]);
  if (!Number.isFinite(firstMs) || !Number.isFinite(lastMs)) return;

  const spanHours = (lastMs - firstMs) / (1000 * 60 * 60);
  const desiredFps = spanHours > 120 ? 10 : 10;

  // ⬇⬇⬇ ESTA PARTE ES CLAVE
  if (lastAppliedFps === desiredFps) {
    // ya estamos usando ese fps, no hagas nada más
    return;
  }

  // a partir de aquí SOLO entramos cuando cambia el fps
  const wasPlaying = timelineControl.isPlaying === true;
  if (wasPlaying) {
    timelineControl.pause();
  }

  timelineControl.fps = desiredFps;
  lastAppliedFps = desiredFps;

  if (wasPlaying) {
    timelineControl.play();
  }

  console.log(
    `[timeline fps] span ${spanHours.toFixed(1)}h -> ${desiredFps} fps (restarted=${wasPlaying})`
  );
}






timelineControl = new WeatherLayers.TimelineControl({
  onPreload: (datetimesAll) => {
    const ds = (config && config.dataset) || currentDataset;
    const datetimesTimeline = getTimelineDatetimesForDataset(ds, datetimesAll);

    const progressEl = document.getElementById('loading-progress');
    progressEl.textContent = `0 / ${datetimesTimeline.length}`;

    let loaded = 0, aborted = false;
    const timeoutPorImagen = 10000;

    const MAX_FRAMES = isMobile ? 8 : 16;
    const limitedDatetimes = datetimesTimeline.slice(0, MAX_FRAMES);

  const promises = limitedDatetimes.map(datetime => {
    return withTimeout(
      client.loadDatasetData(config.dataset, datetime), // esto llenará __TEX_CACHE
      timeoutPorImagen,
      datetime
    ).then(r => {
      if (aborted) return;
      loaded++;
      progressEl.textContent = `${loaded} / ${limitedDatetimes.length}`;
      return r;
    }).catch(err => {
      aborted = true;
      progressEl.textContent = '';
      const errorBox = document.getElementById('load-error');
      errorBox.style.display = 'block';
      document.getElementById('retry-button').style.display = 'inline-block';
      throw err;
    });
  });

  return promises;
},


  onUpdate: datetime => {
    
   // updateTimelineFpsDynamically();
    
    noteAnimTick(10);

     document.getElementById('loading-progress').textContent = '';
     config.datetime = datetime || NO_DATA;
    // const dateObj = new Date(datetime);
    // const localDate = dateObj.toISOString().split('T')[0];
    // const localHour = dateObj.toISOString().split('T')[1].substring(0, 5);
    // const dateInput = document.getElementById("date-input");
    // const hourSelect = document.getElementById("hour-select");
    // if (dateInput && hourSelect) {
    //   dateInput._flatpickr.setDate(localDate, false);
    //   hourSelect.value = localHour;
    // }




const dateObj = new Date(datetime);
const pad = n => String(n).padStart(2, '0');

// Fecha local YYYY-MM-DD
const localDate = `${dateObj.getFullYear()}-${pad(dateObj.getMonth() + 1)}-${pad(dateObj.getDate())}`;
// Hora local HH:MM (normalmente :00)
const localHour = `${pad(dateObj.getHours())}:${pad(dateObj.getMinutes())}`;

const dateInput = document.getElementById("date-input");
const hourSelect = document.getElementById("hour-select");
if (dateInput && hourSelect) {
  dateInput._flatpickr.setDate(localDate, false);
  // Si el minuto no es :00, redondea hacia abajo a la hora disponible más cercana
  hourSelect.value = [...hourSelect.options].some(o => o.value === localHour)
    ? localHour
    : `${pad(dateObj.getHours())}:00`;
}



    if(currentDataset == 'gfs/pressure_mean_sea_level') {
    //  updatePressure();
           // 🔁 Precarga oculta de 6h del dataset recién activado
     
     cloudVisible ?  updateCloud() : clearCloudLayer();
    } else if(currentDataset == 'gfs/wind_10m_above_ground') {
   //   update();
    // applyWindLayer();
     // 🔁 Precarga oculta de 6h del dataset recién activado

 cloudVisible ?  updateCloud() : clearCloudLayer();
    } else {
   //   update();
      cloudVisible ?  updateCloud() : clearCloudLayer();
    }

  //  loadingIndicator.style.display = 'none';

  // console.log('[AWS z500]'
  // update();

  // 👇 mueve tu slider HTML al tiempo actual de la animación
  if (datetime && datetime !== NO_DATA) {
    syncSliderToDatetime(datetime);
  }



 safeUpdate();
    // windLayer control removed 120h???
   if (datetime && datetime !== NO_DATA) {
  const dateObj = new Date(datetime);
  const options = { weekday: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };

  setHeaderTimeLabel(dateObj);

  // === NUEVO: ocultar viento si superamos +120 h desde el primer frame ===
  // 1) obtén la lista de datetimes activos
  const dts = (config && Array.isArray(config.datetimes) && config.datetimes.length > 0)
    ? config.datetimes
    : (timelineControl?.datetimes || []);

  let hideWind = false;
  if (dts.length) {
    const startMs = Date.parse(dts[0]);
    const nowMs   = Date.parse(datetime);
    if (Number.isFinite(startMs) && Number.isFinite(nowMs)) {
      const hoursFromStart = (nowMs - startMs) / (1000 * 60 * 60);
      hideWind = hoursFromStart > 120; // > 5 días → ocultar viento
    }
  } else {
    // Fallback: sin datetimes, intenta con el layer
    const startMs = weatherLayers[activeLayer]?.layer?.getAnimationStartDate?.()?.getTime?.();
    const nowMs   = Date.parse(datetime);
    if (Number.isFinite(startMs) && Number.isFinite(nowMs)) {
      hideWind = ((nowMs - startMs) / (1000 * 60 * 60)) > 120;
    }
  }

  // 2) aplica visibilidad (soporta MapLibre y/o MapTiler)
  try {
    if (typeof map?.setLayoutProperty === 'function') {
    //  map.setLayoutProperty('windbase', 'visibility', hideWind ? 'none' : 'visible');
    }
  } catch (e) { /* sin 'windbase' en el estilo, ignora */ }

  if (typeof windLayer?.setVisible === 'function') {
   // windLayer.setVisible(!hideWind);
  } else if (typeof windLayer?.setOpacity === 'function') {
   // windLayer.setOpacity(hideWind ? 0 : 1);
  }

  // (Opcional) si tienes helpers:
  // hideWind ? updateNoWind?.() : applyWindLayer?.();
}


 // 🔁 NUEVO: sincroniza el slider con el datetime activo del timeline
    syncSliderToDatetime(datetime);



  },

 // fps: isMobile ? 5 : 15
  fps: 10
});






 
  // timelineControl.prependTo(document.getElementById('bottom-left'));







function forceWindRefreshAfterStop() {
  // en el siguiente frame, para no pelear con el Timeline
  requestAnimationFrame(() => {
    if (shouldUpdateWind()) {
      // si tienes updateWind(force), mejor que applyWindLayer:
      if (typeof updateWind === 'function') {
        updateWind(true);
      } else if (typeof applyWindLayer === 'function') {
        applyWindLayer();
      }
    }
    // fuerza repintado por si el motor no detecta cambios
    try { deckgl?.setNeedsRedraw?.('wind-stop-refresh'); } catch {}
    try { map?.triggerRepaint?.(); } catch {}
  });
}

if (timelineControl) {
  const __play  = timelineControl.play?.bind(timelineControl);
  const __pause = timelineControl.pause?.bind(timelineControl);
  const __stop  = timelineControl.stop?.bind?.(timelineControl);

  if (__play) {
    timelineControl.play = (...a) => { markAnimating(true);  return __play(...a); };
  }
  if (__pause) {
    timelineControl.pause = (...a) => {
      const r = __pause(...a);
    //  markAnimating(false);
     applyWindLayer();
      forceWindRefreshAfterStop();
      return r;
    };
  }
  if (__stop) {
    timelineControl.stop = (...a) => {
      const r = __stop(...a);
    //  markAnimating(false);
     applyWindLayer();
      forceWindRefreshAfterStop();
      return r;
    };
  }
}



timelineControl.prependTo(document.getElementById('bottom-right'));

const playBtn = document.getElementById('play-button');

// if (playBtn) {
//   const _old = playBtn.onclick;
//   playBtn.onclick = async (e) => {
//     e?.preventDefault?.();
//     cancelPrefetch();           // por si hubiera uno previo
//     await prepareAnimationAndPlay();
//     // Si quieres que además haga lo de antes, descomenta:
//     // _old && _old(e);
//   };
// }

  playBtn.disabled = false;

const playButton = document.getElementById('play-button');
playButton.disabled = false;

let isPlaying = false;
let windVisibleBeforeAnimation = false;

let __PLAY_LOCK__ = false;

function setPlayUI(playing) {
  const b1 = document.getElementById('play-button');
  if (b1) b1.textContent = playing ? '⏸️' : '▶️';

  const playIcon = document.getElementById("play-icon");
  const pauseIcon = document.getElementById("pause-icon");
  if (playIcon && pauseIcon) {
    playIcon.style.display  = playing ? "none" : "inline";
    pauseIcon.style.display = playing ? "inline" : "none";
  }
}



async function setPlayback(playing, reason = "") {
  if (__PLAY_LOCK__) return;
  __PLAY_LOCK__ = true;

  try {
    const weatherLayer = weatherLayers?.[activeLayer]?.layer;

    if (playing) {
      // Arrancar animación
      try { await timelineControl.start(); } catch {}
      try { weatherLayer?.animateByFactor?.(playfactor); } catch {}
      try { windLayer?.animateByFactor?.(playfactor); } catch {}
      isPlaying = true;

    } else {
      // Parar animación (orden: parar factores y luego pausar timeline)
      try { weatherLayer?.animateByFactor?.(0); } catch {}
      try { windLayer?.animateByFactor?.(0); } catch {}
      try { await timelineControl.pause(); } catch {}
      isPlaying = false;

      // tu lógica extra al parar
      try { updateNoWind(); } catch {}
    //  try { cloudVisible ? updateCloud() : clearCloudLayer(); } catch {}
    }

    setPlayUI(isPlaying);

    // viento: respetar tu regla actual
    try {
      if (shouldUpdateWind()) applyWindLayer();
    } catch {}

    // crosshair fijo (si lo usas)
    try { toggleFixedCrosshair(); } catch {}

  } finally {
    __PLAY_LOCK__ = false;
  }
}


// API simple ON/OFF para Swift


playButton.addEventListener('click', async () => {
  if (playButton.disabled) {
    alert("⚠️ Animación no disponible (datos faltantes o error).");
    return;
  }
  await setPlayback(!isPlaying, "play-button");
});





function hideWind()  {
  windVisible = false;
  windOpacityGlobal = 0;
  applyWindLayer();

//  windLayer.setOpacity(hideWind ? 0 : 1);
  }
window.hideWind = hideWind;

function showWind()  { 
  windVisible = true;
  windOpacityGlobal = 0.80;
  applyWindLayer();

// windLayer.setOpacity(0);

}
window.showWind = showWind;

// Expón al global para Swift (WKWebView.evaluateJavaScript)
window.hideWind = hideWind;
window.showWind = showWind;

const windToggle = document.getElementById('wind-toggle');

if (windToggle) {
  // Estado inicial
  if (windVisible) {
    windToggle.classList.add('active');
  }

  windToggle.addEventListener('click', () => {
    if (windVisible) {
      hideWind();
      windToggle.classList.remove('active');
    } else {
      showWind();
      windToggle.classList.add('active');
    }
  });
}






// iOS
function  initPlayer() {

     // pauseWindAnimation();
     // updateNoWind();
      timelineControl.start();
      playButton.textContent = '⏸️';
 
}
window.initPlayer =  initPlayer;

// iOS
function  pausePlayer() {

 if (shouldUpdateWind()) {
      applyWindLayer();
    } else {
      // opcional: console.debug('[wind] skip during animation on non-wind layer');
    }
 cloudVisible ?  updateCloud() : clearCloudLayer();
      timelineControl.pause();
      playButton.textContent = '▶️';
 
}
window.pausePlayer =  pausePlayer;




// HELPER para ajustar a Windy y Ventusky 3h atras.

// const HOUR_MS = 3600000;
const ACCUM_3H = new Set(['gfs/precipitation_3h_accumulation_surface']);

// Devuelve un Date siempre válido; si se pasa datetimes, hace clamp al rango disponible
function adjustDatetimeForDataset(dataset, datetime, datetimes = []) {
  const dt = (datetime instanceof Date) ? new Date(datetime.getTime()) : new Date(datetime);
  if (isNaN(dt)) return new Date(); // fallback muy defensivo

  if (!ACCUM_3H.has(dataset)) return dt; // sin cambio para otros datasets

  // -3h para acumulación 3h (mostrar t-3→t)
  let dtAdj = new Date(dt.getTime() - 3 * HOUR_MS);

  // Clamp a rango disponible si lo conocemos
  if (Array.isArray(datetimes) && datetimes.length) {
    const first = new Date(datetimes[0]);
    const last  = new Date(datetimes[datetimes.length - 1]);
    if (!isNaN(first) && dtAdj < first) dtAdj = first;
    if (!isNaN(last)  && dtAdj > last)  dtAdj = last;
  }
  return dtAdj;
}


async function update(forceUpdateDatetime) {


//   if (maptilerON) {
//  map.setLayoutProperty(activeLayer, 'visibility', 'visible');
//     opacity = 0.0;
//     contourVisible = false;
   

//   } else {
//   map.setLayoutProperty(activeLayer, 'visibility', 'none');

//   }
 

   timeInfoContainer.style.display  = 'flex';
  // --- 1) Resolver dataset según modelo ---
  let mappedDataset = currentDataset;
  if (dataModel === "ECMWF") {
    if (datasetMap[currentDataset]) mappedDataset = datasetMap[currentDataset];
  } else if (dataModel === "GFS") {
    if (datasetMapInverse[currentDataset]) mappedDataset = datasetMapInverse[currentDataset];
  }
  if (mappedDataset !== currentDataset) {
    currentDataset = mappedDataset;
    console.log("🔄 Dataset cambiado según modelo:", currentDataset);
  }
  const dataset = currentDataset;

  // --- 2) Metadata + datetimes ---
 // const { title, unitFormat, attribution, palette: wlPalette } =




  //  await client.loadDataset(dataset, { unitSystem: constUni });

  //  const {title, unitFormat, attribution, palette} = await client.loadDataset(dataset, { unitSystem: constUni });


    let title, unitFormat, attribution, palette;

if (LOCAL_DATASET_META[dataset]) {
  ({ title, unitFormat, attribution, palette } = LOCAL_DATASET_META[dataset]);
} else {
  ({ title, unitFormat, attribution, palette } = await client.loadDataset(dataset, { unitSystem: constUni }));
  // si además necesitas imageUnscale/imageType para WL, los sacas del objeto real si WL lo expone
}









  const { datetimes } = await client.loadDatasetSlice(
    dataset,
    config.datetimeRange.split('/'),
    { datetimeStep: config.datetimeStep }
  );

const datetimes3h = to3hCadence(datetimes);
const datetimesTimeline = getTimelineDatetimesForDataset(dataset, datetimes);



let datetime;
if (
  config.datetime !== NO_DATA &&
  datetimes3h[0] <= config.datetime &&
  config.datetime <= datetimes3h[datetimes3h.length - 1] &&
  !forceUpdateDatetime
) {
  datetime = config.datetime;
} else {
  const now = config.datetime !== NO_DATA ? new Date(config.datetime) : new Date();
  let minDiff = Infinity;
  let closest = datetimes3h[0];
  for (const dt of datetimes3h) {
    const diff = Math.abs(new Date(dt) - now);
    if (diff < minDiff) { minDiff = diff; closest = dt; }
  }
  datetime = closest;
}

config.datetimes = datetimesTimeline;   // << usa la lista 3h
config.datetime  = datetime;


  // const opts = (dataset === 'gfs/geopotential_height_500mb')
  // ? { datetimeInterpolate: false }
  // : { datetimeInterpolate: config.datetimeInterpolate };
  // // --- 4) Datos raster (aquí intercepta AWS si z500) ---
  // const {image, image2, imageWeight, imageType, imageUnscale, bounds} = await client.loadDatasetData(dataset, datetime, { datetimeInterpolate: config.datetimeInterpolate });


const isAWS = !!AWS_DATASETS[currentDataset];

const opts = isAWS
  ? { datetimeInterpolate: false }               // usamos image/image2/weight del wrapper
  : { datetimeInterpolate: !config.datetimeInterpolate };

const { image, image2, imageWeight, imageType, imageUnscale, bounds } =
  await client.loadDatasetData(currentDataset, datetime,  { datetimeInterpolate: config.datetimeInterpolate });

const frontData = [
  { type: WeatherLayers.FrontType.COLD, path: [
  [-10.0, 40.0],  // [lon, lat]
  [ -8.0, 41.0],
  [ -6.0, 42.0],
  [ -4.0, 43.0],
] },
  { type: WeatherLayers.FrontType.WARM, path: [
  [-10.0, 40.0],  // [lon, lat]
  [ -8.0, 41.0],
  [ -6.0, 42.0],
  [ -4.0, 43.0],
] },
  { type: WeatherLayers.FrontType.OCCLUDED, path: [
  [-10.0, 40.0],  // [lon, lat]
  [ -8.0, 41.0],
  [ -6.0, 42.0],
  [ -4.0, 43.0],
] },
  { type: WeatherLayers.FrontType.STATIONARY, path: [
  [-10.0, 40.0],  // [lon, lat]
  [ -8.0, 41.0],
  [ -6.0, 42.0],
  [ -4.0, 43.0],
] },
];


  // --- 5) Paletas disponibles (las tuyas) ---
  // const palettePressure = [
  //   [940,[10,10,30,255]],[948,[15,15,50,255]],[956,[20,25,80,255]],[964,[25,40,120,255]],[973,[30,60,160,255]],
  //   [981,[20,90,180,255]],[985,[35,105,195,255]],[989,[45,115,205,255]],[993,[65,135,210,255]],[997,[85,150,215,255]],
  //   [1005,[140,180,200,255]],[1013,[210,210,210,255]],[1021,[200,170,120,255]],[1030,[190,120,80,255]],[1038,[160,80,60,255]],
  //   [1046,[130,40,70,255]],[1054,[90,20,50,255]],[1080,[50,10,30,255]]
  // ];
//   const palettePressure = [
//   [900,  [  8,  16,  48, 255]],
//   [910,  [  6,  19,  58, 255]],
//   [920,  [  5,  23,  68, 255]],
//   [930,  [  3,  26,  77, 255]],
//   [940,  [  2,  29,  86, 255]],
//   [950,  [  0,  32,  96, 255]],
//   [960,  [  0,  40, 115, 255]],
//   [970,  [  0,  47, 134, 255]],
//   [980,  [  0,  66, 147, 255]],
//   [990,  [  0, 101, 147, 255]],
//   [1000, [ 17, 132, 147, 255]],
//   [1010, [137, 176, 166, 255]],
//   [1020, [167, 145, 105, 255]],
//   [1030, [159,  85,  46, 255]],
//   [1040, [137,  43,  58, 255]],
//   [1050, [121,  27,  63, 255]],
//   [1060, [ 87,  18,  49, 255]],
//   [1070, [ 68,  13,  37, 255]],
//   [1080, [ 50,   8,  25, 255]],
// ];

const palettePressure = [
  [900,  [  6,  12,  40, 255]],  // más oscuro
  [950,  [  0,  24,  86, 255]],
  [976,  [  0,  42, 138, 255]],  // azul/cian más saturado y menos claro
  [986,  [  0,  78, 142, 255]],
  [995,  [  0, 104, 140, 255]],
  [1002, [ 18, 126, 140, 255]],
  [1007, [ 72, 146, 150, 255]],  // bajar luminosidad (antes 103,162,155)
  [1011, [122, 160, 158, 255]],  // bajar luminosidad
  [1013, [160, 160, 160, 255]],  // gris central más oscuro (antes 182)
  [1015, [158, 152, 130, 255]],  // menos “beige claro”
  [1019, [150, 130,  92, 255]],
  [1024, [150, 102,  58, 255]],
  [1030, [148,  70,  38, 255]],
  [1038, [132,  38,  52, 255]],  // más profundo
  [1046, [100,  18,  62, 255]],
  [1080, [ 40,   5,  20, 255]],  // morado final más oscuro
];

// const palettePressure = [
//   [900,  [  8,  16,  48, 255]],
//   [950,  [  0,  32,  96, 255]],
//   [976,  [  0,  52, 146, 255]],
//   [986,  [  0,  90, 148, 255]],
//   [995,  [  0, 117, 146, 255]],
//   [1002, [ 26, 140, 147, 255]],
//   [1007, [103, 162, 155, 255]],
//   [1011, [155, 183, 172, 255]],
//   [1013, [182, 182, 182, 255]],
//   [1015, [176, 174, 152, 255]],
//   [1019, [167, 147, 107, 255]],
//   [1024, [163, 116,  67, 255]],
//   [1030, [159,  81,  44, 255]],
//   [1038, [142,  47,  57, 255]],
//   [1046, [111,  24,  64, 255]],
//   [1080, [ 48,   8,  24, 255]],
// ];



//  const paletteRadar50 = [
//   [0,[224,252,253,0]],
//   [1,[6,223,237,255]],
//   [2,[0,152,246,255]],
//   [3,[0,14,247,255]],
//   [4,[2,197,56,255]],
//   [5,[1,220,1,255]],
//   [6,[1,171,1,255]],
//   [7,[99,187,0,255]],
//   [8,[249,239,0,255]],
//   [9,[234,185,0,255]],
//   [10,[255,143,3,255]],
//   [20,[255,19,0,255]],
//   [30,[226,0,0,255]],
//   [40,[201,0,0,255]],
//   [50,[222,0,123,255]],
//   [60,[221,29,236,255]],
//   [70,[172,116,207,255]],
//   [100,[217,201,227,255]]
// ];

function lerp(a,b,t){ return Math.round(a + (b-a)*t); }

// inserta N stops entre v0 y v1, interpolando RGBA
function densifyBand(pal, v0, v1, N=6) {
  // busca colores exactos en v0 y v1
  const c0 = pal.find(s => s[0] === v0)?.[1] || [224,252,253,0];
  const c1 = pal.find(s => s[0] === v1)?.[1] || [6,223,237,255];

  const extra = [];
  for (let i=1;i<N;i++){
    const t = i/N;
    extra.push([ v0 + (v1-v0)*t, [
      lerp(c0[0],c1[0],t),
      lerp(c0[1],c1[1],t),
      lerp(c0[2],c1[2],t),
      lerp(c0[3],c1[3],t)
    ]]);
  }
  // reconstruye paleta manteniendo orden y sin duplicados de valor
  const base = pal.filter(([v]) => v < v0 || v > v1 || v===v0 || v===v1);
  return [...base.filter(([v])=>v<=v0), ...extra, ...base.filter(([v])=>v>=v1)].sort((a,b)=>a[0]-b[0]);
}

// úsalo así, partiendo de tu paleta original:
let paletteRadar50 = [
  [0,[224,252,253,0]],
  [1,[6,223,237,255]],
  [2,[0,152,246,255]],
  [3,[0,14,247,255]],
  [4,[2,197,56,255]],
  [5,[1,220,1,255]],
  [6,[1,171,1,255]],
  [7,[99,187,0,255]],
  [8,[249,239,0,255]],
  [9,[234,185,0,255]],
  [10,[255,143,3,255]],
  [20,[255,19,0,255]],
  [30,[226,0,0,255]],
  [40,[201,0,0,255]],
  [50,[222,0,123,255]],
  [60,[221,29,236,255]],
  [70,[172,116,207,255]],
  [100,[217,201,227,255]]
];

// añade 5 stops intermedios entre 0 y 1
paletteRadar50 = densifyBand(paletteRadar50, 0, 1, 9);

  // --- 6) Selección de paleta según dataset ---
  let paletteToUse = palette; // por defecto, la de WL
  if (dataset === 'gfs/pressure_mean_sea_level' || dataset === 'ecmwf_ifs/pressure_mean_sea_level') {
    paletteToUse = palettePressure;
  } else if (dataset === 'gfs/precipitation_3h_accumulation_surface') {


  //  paletteToUse = paletteRadar50;
    paletteToUse = paletteRadar50;
  } else if (dataset === 'gfs/geopotential_height_500mb') {
    // Z500 → usa tu paleta ajustada al dominio
    const umin = Array.isArray(imageUnscale) ? imageUnscale[0] : 4710;
    const umax = Array.isArray(imageUnscale) ? imageUnscale[1] : 6000;
    const stopsFitted = fitPaletteToDomain(paletteGeopotentialRaw, [umin, umax]);
    // Algunas builds aceptan array liso; otras esperan objeto {type:'continuous',stops}
    paletteToUse = stopsFitted ;
  }

  // --- 7) Visibilidades/contornos (tu lógica) ---
  if (dataset === 'gfs/wind_10m_above_ground' ||
      dataset === 'gfs/snow_depth_surface' ||
      dataset === 'gfs/convective_available_potential_energy_surface' ||
      dataset === 'gfs/precipitation_3h_accumulation_surface' ||
      dataset === 'gfs/cloud_cover_entire_atmosphere' ||
      dataset === 'gfs/reflectivity_1000m_above_ground'
    ) {
    contourVisible = contourNoVisibleAllways;
  }

  // --- 8) Construir capas y aplicar ---
  const defaultBounds = [-180, -90, 180, 90];
  const rasterOpacity = (typeof opacity === 'number') ? opacity : 1.0;

     // Dominio y paleta “ajustada”
    const umin = Array.isArray(imageUnscale) ? imageUnscale[0] : 4710;
    const umax = Array.isArray(imageUnscale) ? imageUnscale[1] : 6000;
    const stopsFitted = fitPaletteToDomain(paletteGeopotentialRaw, [umin, umax]);

// Política de leyenda según el origen del plano (MapTiler vs. propio)
applyLegendPolicy({ map, maptilerON });

// Si NO es MapTiler, entonces montamos/actualizamos nuestra leyenda
// 🔎 Actualizar la leyenda antes de dibujar
 if (!maptilerON) {

   if (legendControlMaptiler) {
       hideMaptilerLegend(map, true);
    } 

  ensureLegendForDataset({
    map,
    datasetId: currentDataset,
    paletteToUse,
    imageUnscale,
    unitFormat,
    title
  });
 } else {

  hideMaptilerLegend(map, false);
  
 }

// syncLegend({
//   map,
//   maptilerON,             // ← tu flag actual
//   datasetId: currentDataset,
//   paletteToUse,
//   imageUnscale,           // tras loadDatasetData(...)
//   unitFormat,
//   title
// });


// Color Ramp de Maptiler




deckgl.setProps({
  useDevicePixels: __WL_IS_IPHONE ? 1 : window.devicePixelRatio,
  layers: [ /* ... */ ]
});

  
const opacityToUse = (opacity > 0.99) ? 0.5 : opacity;

console.log('opacityToUse', opacityToUse);



 deckgl.setProps({
    useDevicePixels: __WL_IS_IPHONE ? 1 : window.devicePixelRatio,
    layers: [
           new WeatherLayers.RasterLayer({
          id: 'raster-z500',
              image,
              image2,
              imageSmoothing: 0,
              imageInterpolation: config.imageInterpolation,
              imageWeight,
              imageType,
              imageUnscale,
              imageMinValue: config.imageMinValue > 0 ? config.imageMinValue : null,
              imageMaxValue: config.imageMaxValue > 0 ? config.imageMaxValue : null,
              bounds,
              // style properties
              visible: config.raster.enabled,
              palette: paletteToUse,
              opacity: opacityToUse,
              pickable: !isMetalWebGl2(),
              // extensions: [new deck.ClipExtension()],
              // clipBounds: [-181, -85.051129, 181, 85.051129],

               beforeId: 'boundary_country_outline',
        }),
        new WeatherLayers.GridLayer({
              id: 'grid',
              // data properties
              image,
              image2,
              imageSmoothing: config.imageSmoothing,
              imageInterpolation: config.imageInterpolation,
              imageWeight,
              imageType,
              imageUnscale,
              imageMinValue: config.imageMinValue > 0 ? config.imageMinValue : null,
              imageMaxValue: config.imageMaxValue > 0 ? config.imageMaxValue : null,
              bounds,
              // style properties
              visible: dataLayer,
              style: WeatherLayers.GridStyle.VALUE,
              density: 0,
              unitFormat,
              textSize: 18,
              textColor: cssToColor('#000000ff'),
              textOutlineWidth: config.grid.textOutlineWidth,
              textOutlineColor: cssToColor(config.grid.textOutlineColor),
              iconBounds: config.grid.iconBounds,
              iconSize: config.grid.style === WeatherLayers.GridStyle.ARROW ? [config.grid.iconSize / 8, config.grid.iconSize] : config.grid.iconSize,
              iconColor: cssToColor(config.grid.iconColor),
              palette: config.grid.palette ? palette : null,
              opacity: config.grid.opacity,
             
            }),
            new WeatherLayers.ContourLayer({
              id: 'contour',
              // data properties
              image,
              image2,
              imageSmoothing: 10,
              imageInterpolation: config.imageInterpolation,
              imageWeight,
              imageType,
              imageUnscale,
              imageMinValue: config.imageMinValue > 0 ? config.imageMinValue : null,
              imageMaxValue: config.imageMaxValue > 0 ? config.imageMaxValue : null,
              bounds,
              // style properties
              visible: contourVisible ,
              interval: config.contour.interval,
              majorInterval: config.contour.majorInterval,
              width: 2,
              color:  cssToColor('#000000ff'),
              palette: config.contour.palette ? palette : null,
              opacity: 0.2,
              // extensions: [new deck.ClipExtension()],
              // clipBounds: [-181, -85.051129, 181, 85.051129],
             
            }),
                new WeatherLayers.HighLowLayer({
              id: 'highLow',
              // data properties
              image,
              image2,
              imageSmoothing: config.imageSmoothing,
              imageInterpolation: config.imageInterpolation,
              imageWeight,
              imageType,
              imageUnscale,
              imageMinValue: config.imageMinValue > 0 ? config.imageMinValue : null,
              imageMaxValue: config.imageMaxValue > 0 ? config.imageMaxValue : null,
              bounds,
              // style properties
              // visible: highValuesVisible && !timelineControl.running,
              visible: false,
              unitFormat,
              radius: config.highLow.radius,
              textSize: config.highLow.textSize,
              textColor: cssToColor(config.highLow.textColor),
              textOutlineColor: cssToColor(config.highLow.textOutlineColor),
              textOutlineWidth: config.highLow.textOutlineWidth,
              palette: config.highLow.palette ? palette : null,
              opacity: config.highLow.opacity,

                beforeId: 'boundary_country_outline',
            }),
            //   new WeatherLayers.FrontLayer({
            //   id: 'front',
            //   // data properties
            //   image,
            //   image2,
            //   imageSmoothing: config.imageSmoothing,
            //   imageInterpolation: config.imageInterpolation,
            //   imageWeight,
            //   imageType,
            //   imageUnscale,
            //   imageMinValue: config.imageMinValue > 0 ? config.imageMinValue : null,
            //   imageMaxValue: config.imageMaxValue > 0 ? config.imageMaxValue : null,
            //   bounds,
            //   data: frontData,
            //   // style properties
            //   getType: d => d.type,
            //   getPath: d => d.path,
            //   coldColor: [37, 99, 235], // Tailwind CSS blue-600
            //   warmColor: [220, 38, 38], // Tailwind CSS red-600
            //   occludedColor: [124, 58, 237], // Tailwind CSS violet-600
            // })
            
   
    
    ],
  });



  rotateAnimation.toggle(config.rotate);
  // --- 9) Controles/UI/timeline ---

  const unitFormatObj = legendUnitFormatForDataset(currentDataset);
unitFormatObj.unit = sanitizeUnitString(unitFormatObj.unit); // 👈 CLAVE

let legendPalette = palette;

if (currentDataset === "gfs/geopotential_height_500mb") {
  // La capa se pinta con 4725..6015, pero la leyenda la queremos en dam (÷10)
  legendPalette = scalePaletteStops(palette, 0.1);

  // Importante: aquí NO dependemos del scale del unitFormat para que cambie el texto,
  // porque ya hemos escalado el dominio de la leyenda.
  unitFormatObj.unit = "dam";     // mejor que "dm" (dm es decímetro)
  delete unitFormatObj.scale;     // opcional: evita dobles escalados si algún día lo aplican
  delete unitFormatObj.offset;
  palette = legendPalette;
}



// if (maptilerON) {
//  title = (currentDataset === "gfs/precipitation_3h_accumulation_surface")
//   ? "Precipitation 1h accumulation surface"
//   : title;
//   //  title = (currentDataset === "gfs/temperature_500mb")
//   // ? "Temperature 2m above ground"
//   // : title;
// } else {

//   //
// }
   title = (currentDataset === "gfs/wind_10m_above_ground")
  ? "Wind 10m above Ground"
  : title;


legendControl.setConfig({
  title,
  unitFormat: unitFormatObj,  // 👈 aquí va el scale/offset para temperatura
  palette
});

console.log('[LEGEND DEBUG]', {
  title,
  unit: unitFormatObj && unitFormatObj.unit,
  unitFormatObj
});


// BLOQUE FUERA DE ESPANA

  
/// legendControl.updateConfig({ title: ' ', unitFormat, palette:paletteToUse });




  // adjustTimelineFpsForRange(datetimes);

 // timelineControl?.updateConfig?.({ datetimes, datetime, datetimeInterpolate: config.datetimeInterpolate });
  timelineControl?.updateConfig?.({
  datetimes: datetimesTimeline,           // << lista 3h
  datetime,
  datetimeInterpolate: config.datetimeInterpolate
});
 


 
 // tooltipControl.updateConfig({
  //   unitFormat,
  //   directionType: config.tooltip.directionType,
  //   directionFormat: config.tooltip.directionFormat,
  //   followCursorOffset: config.tooltip.followCursorOffset,
  //   followCursorPlacement: config.tooltip.followCursorPlacement,
  // });
  attributionControl.updateConfig({ attribution });

  return datetime;
}

function scalePaletteStops(palette, factor) {
  return (palette || []).map(([v, c]) => [v * factor, c]);
}







function sanitizeUnitString(u) {
  let s = String(u || '').trim();
  if (!s) return '';

  // Si viene como "Algo [mm]" -> "mm"
  const mBracket = s.match(/\[([^\]]+)\]\s*$/);
  if (mBracket) return mBracket[1].trim();

  // Si viene como "Algo (mm)" o "Algo (...) (mm)" -> "mm" (último paréntesis)
  const mParen = s.match(/\(([^()]+)\)\s*$/);
  if (mParen) {
    const candidate = mParen[1].trim();
    // solo aceptamos si parece "unidad" (corta y sin espacios)
    if (candidate.length <= 12 && !candidate.includes(' ')) return candidate;
  }

  // Si contiene texto + unidad separada por espacio y la "unidad" es corta (ej "Precipitation mm") -> "mm"
  const parts = s.split(/\s+/);
  const last = parts[parts.length - 1];
  if (last && last.length <= 12 && !last.includes(' ')) return last;

  // Si ya parece una unidad (sin espacios), devuélvela tal cual
  if (!s.includes(' ')) return s;

  return '';
}



async function updatePressure(forceUpdateDatetime) {

const dataset =  currentDataset;
// const dataset =  'gfs/convective_available_potential_energy_surface';
contourVisible = contourUser;


const {title, unitFormat, attribution} = await client.loadDataset(dataset, { unitSystem: constUni });
const {datetimes} = await client.loadDatasetSlice(dataset, config.datetimeRange.split('/'), { datetimeStep: config.datetimeStep });
const datetime = config.datetime !== NO_DATA && datetimes[0] <= config.datetime && config.datetime <= datetimes[datetimes.length - 1] && !forceUpdateDatetime ? config.datetime : datetimes[0];


const {image, image2, imageWeight, imageType, imageUnscale, bounds} = await client.loadDatasetData(dataset, datetime, { datetimeInterpolate: config.datetimeInterpolate });

config.datetimes = datetimes;
config.datetime = datetime;

// const palette = [
//   [940,  [ 30,  36,  84, 255]],  // navy profundo
//   [948,  [ 35,  52, 104, 255]],
//   [956,  [ 44,  72, 124, 255]],
//   [964,  [ 58,  96, 144, 255]],
//   [973,  [ 78, 122, 163, 255]],
//   [981,  [102, 148, 176, 255]],
//   [989,  [130, 174, 187, 255]],  // turquesa
//   [997,  [160, 197, 196, 255]],  // cian suave
//   [1005, [197, 220, 214, 255]],  // casi blanco frío
//   [1013, [235, 242, 238, 255]],  // blanco roto (pivote)
//   [1021, [242, 217, 194, 255]],  // melocotón claro
//   [1030, [238, 178, 150, 255]],
//   [1038, [228, 135, 120, 255]],  // salmón
//   [1046, [210,  93,  96, 255]],  // rojo
//   [1054, [168,  54,  63, 255]],  // rojo oscuro
//   [1080, [110,  25,  34, 255]]   // muy oscuro
// ];

// const palette = [
//   [940,  [ 10,  10,  30, 255]],  // casi negro azulado
//   [948,  [ 15,  15,  50, 255]],  // azul muy oscuro
//   [956,  [ 20,  25,  80, 255]],  // azul profundo
//   [964,  [ 25,  40, 120, 255]],  // azul marino
//   [973,  [ 30,  60, 160, 255]],  // azul fuerte
//   [981,  [ 20,  90, 180, 255]],  // azul intenso
//   [989,  [ 40, 110, 200, 255]],  // 👈 más azulado, menos verde
//   [997,  [ 70, 140, 210, 255]],  // azul claro con un toque cian, NO turquesa
//   [1005, [140, 180, 200, 255]],  // gris azulado claro
//   [1013, [210, 210, 210, 255]],  // gris/blanco neutro (pivot)
//   [1021, [200, 170, 120, 255]],  // marrón claro
//   [1030, [190, 120,  80, 255]],  // anaranjado-marrón
//   [1038, [160,  80,  60, 255]],  // rojo-marrón
//   [1046, [130,  40,  70, 255]],  // burdeos
//   [1054, [ 90,  20,  50, 255]],  // púrpura oscuro
//   [1080, [ 50,  10,  30, 255]]   // casi negro vino
// ];

const palette = [
  [940,  [ 10,  10,  30, 255]],  // casi negro azulado
  [948,  [ 15,  15,  50, 255]],  // azul muy oscuro
  [956,  [ 20,  25,  80, 255]],  // azul profundo
  [964,  [ 25,  40, 120, 255]],  // azul marino
  [973,  [ 30,  60, 160, 255]],  // azul fuerte
  [981,  [ 20,  90, 180, 255]],  // azul intenso
  [985,  [ 35, 105, 195, 255]],  // 👈 azul medio intermedio
  [989,  [ 45, 115, 205, 255]],  // azul vivo
  [993,  [ 65, 135, 210, 255]],  // 👈 azul claro intermedio
  [997,  [ 85, 150, 215, 255]],  // azul claro más suave
  [1005, [140, 180, 200, 255]],  // gris azulado claro
  [1013, [210, 210, 210, 255]],  // gris/blanco neutro (pivot)
  [1021, [200, 170, 120, 255]],  // marrón claro
  [1030, [190, 120,  80, 255]],  // anaranjado-marrón
  [1038, [160,  80,  60, 255]],  // rojo-marrón
  [1046, [130,  40,  70, 255]],  // burdeos
  [1054, [ 90,  20,  50, 255]],  // púrpura oscuro
  [1080, [ 50,  10,  30, 255]]   // casi negro vino
];




    logPalette(palette, `Palette Pressure for ${dataset}`);


deckgl.setProps({
  useDevicePixels: __WL_IS_IPHONE ? 1 : window.devicePixelRatio,
  layers: [

                   new WeatherLayers.RasterLayer({
      id: 'raster',
      // data properties
      image,
      image2,
      imageSmoothing: 0,
      imageInterpolation: config.imageInterpolation,
      imageWeight,
      imageType,
      imageUnscale,
      imageMinValue: config.imageMinValue > 0 ? config.imageMinValue : null,
      imageMaxValue: config.imageMaxValue > 0 ? config.imageMaxValue : null,
      bounds,
      // style properties
      visible: config.raster.enabled,
      palette,
      opacity: 1.0,
      pickable: !isMetalWebGl2(),
      // extensions: [new deck.ClipExtension()],
      // clipBounds: [-181, -85.051129, 181, 85.051129],
   
       beforeId: 'boundary_country_outline'
    }),             new WeatherLayers.GridLayer({
      id: 'grid',
      // data properties
      image,
      image2,
      imageSmoothing: config.imageSmoothing,
      imageInterpolation: config.imageInterpolation,
      imageWeight,
      imageType,
      imageUnscale,
      imageMinValue: config.imageMinValue > 0 ? config.imageMinValue : null,
      imageMaxValue: config.imageMaxValue > 0 ? config.imageMaxValue : null,
      bounds,
      // style properties
      visible: config.grid.enabled,
      style: WeatherLayers.GridStyle.VALUE,
      density: -2,
      unitFormat,
      textSize: 18,
      textColor: cssToColor('#000000ff'),
      textOutlineWidth: config.grid.textOutlineWidth,
      textOutlineColor: cssToColor(config.grid.textOutlineColor),
      iconBounds: config.grid.iconBounds,
      iconSize: config.grid.style === WeatherLayers.GridStyle.ARROW ? [config.grid.iconSize / 8, config.grid.iconSize] : config.grid.iconSize,
      iconColor: cssToColor(config.grid.iconColor),
      palette: config.grid.palette ? palette : null,
      opacity: config.grid.opacity,
    }),
    new WeatherLayers.ContourLayer({
              id: 'contour',
              // data properties
              image,
              image2,
              imageSmoothing: 10,
              imageInterpolation: config.imageInterpolation,
              imageWeight,
              imageType,
              imageUnscale,
              imageMinValue: config.imageMinValue > 0 ? config.imageMinValue : null,
              imageMaxValue: config.imageMaxValue > 0 ? config.imageMaxValue : null,
              bounds,
              // style properties
              visible: false,
              interval: config.contour.interval,
              majorInterval: config.contour.majorInterval,
              width: 2,
              color:  cssToColor('#332f2fff'),
              palette: config.contour.palette ? palette : null,
              opacity: 1.0,
              // extensions: [new deck.ClipExtension()],
              // clipBounds: [-181, -85.051129, 181, 85.051129],
            }),

  ],
});


// const datasetWind =  'gfs/wind_10m_above_ground';

legendControl.updateConfig({ title, unitFormat, palette });
timelineControl.updateConfig({ datetimes, datetime, datetimeInterpolate: config.datetimeInterpolate });
  
// Solo si existe y tiene método updateConfig
if (timelineControl && typeof timelineControl.updateConfig === 'function') {
  try {
    timelineControl.updateConfig({
      datetimes,
      datetime,
      datetimeInterpolate: config.datetimeInterpolate
    });
  } catch (e) {
    console.warn("⚠️ Error en timelineControl.updateConfig, reinicializando timelineControl", e);
    // Marca como error y vuelve a crear el control
    timelineError = true;
   
  }
}




// loadingIndicator.style.display = 'none';




//  timelineControlWind.updateConfig({ datetimes, datetime, datetimeInterpolate: config.datetimeInterpolate });
// tooltipControl.updateConfig({
//   unitFormat,
//   directionType: config.tooltip.directionType,
//   directionFormat: config.tooltip.directionFormat,
//   followCursorOffset: config.tooltip.followCursorOffset,
//   followCursorPlacement: config.tooltip.followCursorPlacement,
// });
attributionControl.updateConfig({ attribution });

//prefetchRolling(currentDataset, config?.datetime || NO_DATA);




return datetime;


}

// nextHour

 let datasetUpdated = 'gfs/wind_10m_above_ground';
 let speedFactorUpdated = 7;

 function resolveWindDatasetForCurrentModel() {
  const model = (window.currentModel || 'gfs').toLowerCase();

  // Caso Jet Stream (lo sigues sacando sólo de GFS)
  if (currentDataset === 'gfs/wind_tropopause_noaa') {
    return { id: 'gfs/wind_tropopause_noaa', speedFactor: 7 };
  }


  if (currentDataset === 'gfs/temperature_500mb') {
    return { id: 'gfs/wind_tropopause_noaa', speedFactor: 7 };
  } else {

    return { id: 'gfs/wind_10m_above_ground', speedFactor: 7 };
  }

  if (currentDataset === 'gfs/reflectivity_1000m_above_ground_noaa') {
    return { id: 'gfs/wind_10m_above_ground', speedFactor: 7 };
  }

 if (currentDataset === 'gfs/pressure_mean_sea_level') {
    return { id: 'gfs/wind_10m_above_ground', speedFactor: 7 };
  }

 if (currentDataset === 'gfs/geopotential_height_500mb') {
    return { id: 'gfs/wind_tropopause_noaa', speedFactor: 7 };
  }
 

  // Si estamos en ECMWF, usar el gemelo ECMWF del viento 10m
  if (model === 'ecmwf') {
    const twin =
      (typeof datasetMap !== 'undefined' && datasetMap['gfs/wind_10m_above_ground'])
      || 'ecmwf_ifs/wind_10m_above_ground';

    return { id: twin, speedFactor: 9 };
  }

  // Por defecto, GFS
  return { id: 'gfs/wind_10m_above_ground', speedFactor: 4 };
}


function isAndroidWind() {
  return /Android/i.test(navigator.userAgent || "");
}

const MAX_PART_WIND = isAndroidWind() ? 2000 : 3000;


async function updateWind(forceUpdateDatetime) {

  // return;

    // “animación real” según el Timeline (noteAnimTick)
//  const animating = !!(window.__ANIM__ && window.__ANIM__.playing);

  // Si quieres seguir apagando el viento visualmente mientras está el botón de Play:
  // if (isPlaying) {
  //   windOpacity = 0.0;
   
  // } else {
  //   windOpacity = 0.20;
    
  // }

  // if (maptilerWindOff) {
  //   windOpacity = 0.0;
  // } else {
  //   windOpacity = 0.20;
  // }

  // if (!windVisible) {
  //   windOpacity = 0.0;
   
  // } else {
  //   windOpacity = 0.20;
   
  // }

  // if (isPlaying || !windVisible || maptilerWindOff ) {
  //   windOpacity = 0.0;
  // } else {
  //   windOpacity = 0.20;
  // }

// EDITADO WIND ANULADO
  windOpacity = windOpacityGlobal;

  // Bloqueo REAL de recálculo: solo si el timeline está animando,
  // o el viento está apagado, o lo has forzado off por MapTiler.
  // if (animating || !windVisible || maptilerWindOff) {
  //   return;
  // }

  // A partir de aquí, tu lógica actual:
  if (currentDataset === 'gfs/wind_tropopause_noaa') {
    datasetUpdated    = 'gfs/wind_tropopause_noaa';
    speedFactorUpdated = 7;
  } else if (currentDataset === 'gfs/wind_gust_surface') {
    datasetUpdated    = 'gfs/wind_gust_surface';
    speedFactorUpdated = 7;
  } else if (currentDataset === 'gfs/geopotential_height_500mb') {
    datasetUpdated    = 'gfs/wind_tropopause_noaa';
    speedFactorUpdated = 7;
  }

 

  const { id, speedFactor } = resolveWindDatasetForCurrentModel();
  datasetUpdated    = id;
  speedFactorUpdated = speedFactor;

  if (currentDataset === 'gfs/geopotential_height_500mb') {
    datasetUpdated    = 'gfs/wind_tropopause_noaa';
    speedFactorUpdated = 7;
  }

  const dataset = datasetUpdated;

  // const { title, unitFormat, attribution, palette } =
  //   await client.loadDataset(dataset, { unitSystem: constUni });


    let title, unitFormat, attribution, palette;

if (LOCAL_DATASET_META[dataset]) {
  ({ title, unitFormat, attribution, palette } = LOCAL_DATASET_META[dataset]);
} else {
  ({ title, unitFormat, attribution, palette } = await client.loadDataset(dataset, { unitSystem: constUni }));
  // si además necesitas imageUnscale/imageType para WL, los sacas del objeto real si WL lo expone
}





  // const { datetimes } =
  //   await client.loadDatasetSlice(dataset, config.datetimeRange.split("/"), {
  //     datetimeStep: config.datetimeStep
  //   });


  const { datetimes } = await client.loadDatasetSlice(
    dataset,
    config.datetimeRange.split('/'),
    { datetimeStep: config.datetimeStep }
  );

const datetimes3h = to3hCadence(datetimes);
const datetimesTimeline = getTimelineDatetimesForDataset(dataset, datetimes);



  // let datetime;
  // if (
  //   config.datetime !== NO_DATA &&
  //   datetimes[0] <= config.datetime &&
  //   config.datetime <= datetimes[datetimes.length - 1] &&
  //   !forceUpdateDatetime
  // ) {
  //   // usamos el datetime actual del mapa (último frame de la animación)
  //   datetime = config.datetime;
  // } else {
  //   // si no, el primero disponible
  //   datetime = datetimes[0];
  // }

let datetime;

// LOG #1: snapshot antes del if (valores clave)
console.log('[DT] pre-if', {
  cfg: config.datetime,
  NO_DATA,
  forceUpdateDatetime,
  first: datetimes3h?.[0],
  last: datetimes3h?.[datetimes3h.length - 1],
  len: datetimes3h?.length
});

if (
  config.datetime !== NO_DATA &&
  datetimes3h[0] <= config.datetime &&
  config.datetime <= datetimes3h[datetimes3h.length - 1] &&
  !forceUpdateDatetime
) {
  datetime = config.datetime;

  // LOG #2: entra por rama "mantener"
  console.log('[DT] branch=KEEP', { datetime });
} else {
  const now = config.datetime !== NO_DATA ? new Date(config.datetime) : new Date();

  // LOG #3: entra por rama "closest" y qué “now” está usando
  console.log('[DT] branch=CLOSEST', {
    nowISO: isNaN(now) ? 'InvalidDate' : now.toISOString(),
    nowFrom: (config.datetime !== NO_DATA ? 'config.datetime' : 'system-now'),
    cfg: config.datetime
  });

  let minDiff = Infinity;
  let closest = datetimes3h[0];
  for (const dt of datetimes3h) {
    const diff = Math.abs(new Date(dt) - now);
    if (diff < minDiff) { minDiff = diff; closest = dt; }
  }
  datetime = closest;
}


//   if (isPlaying || !windVisible) { return }
  

// if (isPlaying) { 
//   windOpacity = 0.0;}

// if (currentDataset == 'gfs/wind_tropopause') {
//  datasetUpdated =  'gfs/wind_tropopause';
//  speedFactorUpdated = 20;
// } else if (currentDataset == 'gfs/wind_gust_surface') {
//   datasetUpdated =  'gfs/wind_gust_surface';
//   speedFactorUpdated = 20;
// } else {
//   datasetUpdated =  'gfs/wind_10m_above_ground';
//   speedFactorUpdated = 20;

// }
  

//   if (isPlaying || !windVisible || maptilerWindOff) { return; }

//   const { id, speedFactor } = resolveWindDatasetForCurrentModel();
//   datasetUpdated = id;
//   speedFactorUpdated = speedFactor;

 

//  const dataset =  datasetUpdated;
// const {title, unitFormat, attribution, palette} = await client.loadDataset(dataset, { unitSystem: constUni });
// const {datetimes} = await client.loadDatasetSlice(dataset, config.datetimeRange.split('/'), { datetimeStep: config.datetimeStep });
// const datetime = config.datetime !== NO_DATA && datetimes[0] <= config.datetime && config.datetime <= datetimes[datetimes.length - 1] && !forceUpdateDatetime ? config.datetime : datetimes[0];


const {image, image2, imageWeight, imageType, imageUnscale, bounds} = await client.loadDatasetData(dataset, datetime, { datetimeInterpolate: config.datetimeInterpolate });

// Limitar tamaño de textura en iPhone antes de subirla a la GPU
// if (/iPhone|iPod/i.test(navigator.userAgent)) {
//   const MAX_TEX = Math.min(await getMaxTextureSize(), 4096);
//   if (image?.width && image?.height)  image  = await scaleImageToMax(image,  MAX_TEX);
//   if (image2?.width && image2?.height) image2 = await scaleImageToMax(image2, MAX_TEX);
// }





config.datetimes = datetimes;
config.datetime = datetime;
deckglWind.setProps({
useDevicePixels: __WL_IS_IPHONE ? 1 : window.devicePixelRatio,
_animate: true,
  layers: [
  new WeatherLayers.ParticleLayer({
              id: 'particle',
              // data properties
              image,
              image2,
              imageSmoothing: config.imageSmoothing,
              imageInterpolation: config.imageInterpolation,
              imageWeight,
              imageType,
              imageUnscale,
              imageMinValue: config.imageMinValue > 0 ? config.imageMinValue : null,
              imageMaxValue: config.imageMaxValue > 0 ? config.imageMaxValue : null,
              bounds,
              // style properties
              visible: config.particle.enabled,
              numParticles:  MAX_PART_WIND , 
              maxAge: 15,
              speedFactor: speedFactorUpdated,
              width: 0.5,
              color: cssToColor(config.particle.color),
              palette: config.particle.palette ? palette : null,
              opacity: windOpacity,
              animate: config.particle.animate,
              // extensions: [new deck.ClipExtension()],
              // clipBounds: [-181, -85.051129, 181, 85.051129],
              // getPolygonOffset: () => [0, -1000],
            }),
            
  ],


});
}


async function updateCloud(forceUpdateDatetime) {

  if (!overlayDatasetId) {
  cloudVisible = false;
  try { window.applyCombinedLayers?.(); } catch(_) {}
  return;
}
cloudVisible = true;
const dataset = overlayDatasetId;





console.log('[updateCloud] dataset=', dataset, 'overlayDatasetId=', overlayDatasetId);



  // if (dataModel === "ECMWF") {
  //   // Si estamos en ECMWF 
  //   dataset =  'ecmwf_aifs/total_cloud_cover';
    
  // } else if (dataModel === "GFS") {
  //   // Si estamos en GFS 
  //   dataset =  'gfs/cloud_cover_entire_atmosphere';
  // }

 
const {title, unitFormat, attribution,palette} = await client.loadDataset(dataset, { unitSystem: constUni });
 //const {title, unitFormat, attribution} = await client.loadDataset(dataset, { unitSystem: constUni });
const {datetimes} = await client.loadDatasetSlice(dataset, config.datetimeRange.split('/'), { datetimeStep: config.datetimeStep });
const datetime = config.datetime !== NO_DATA && datetimes[0] <= config.datetime && config.datetime <= datetimes[datetimes.length - 1] && !forceUpdateDatetime ? config.datetime : datetimes[0];
const {image, image2, imageWeight, imageType, imageUnscale, bounds} = await client.loadDatasetData(dataset, datetime, { datetimeInterpolate: config.datetimeInterpolate });
config.datetimes = datetimes;
config.datetime = datetime;

// const palette = [
//   [0,   [255, 255, 255,   0]],   // 0% opaco
//   [10,  [255, 255, 255,  25]],   // 10% opaco aprox
//   [25,  [255, 255, 255,  64]],   // ~25% opaco
//   [40,  [255, 255, 255, 102]],   // ~40% opaco
//   [50,  [255, 255, 255, 128]],   // 50% opaco
//   [60,  [255, 255, 255, 153]],   // 60% opaco
//   [70,  [255, 255, 255, 179]],   // 70% opaco
//   [80,  [255, 255, 255, 204]],   // 80% opaco
//   [90,  [255, 255, 255, 230]],   // 90% opaco
//   [100, [255, 255, 255, 255]]    // 100% opaco
// ];


const palette3hAccumulation = [
  [0,[224,252,253,0]],
  [1,[6,223,237,255]],
  [2,[0,152,246,255]],
  [3,[0,14,247,255]],
  [4,[2,197,56,255]],
  [5,[1,220,1,255]],
  [6,[1,171,1,255]],
  [7,[99,187,0,255]],
  [8,[249,239,0,255]],
  [9,[234,185,0,255]],
  [10,[255,143,3,255]],
  [20,[255,19,0,255]],
  [30,[226,0,0,255]],
  [40,[201,0,0,255]],
  [50,[222,0,123,255]],
  [60,[221,29,236,255]],
  [70,[172,116,207,255]],
  [100,[217,201,227,255]]
];


let paletteToUse = palette;

if (dataset === 'gfs/precipitation_3h_accumulation_surface') {


  //  paletteToUse = paletteRadar50;
    paletteToUse = palette3hAccumulation;
  }


let paletteSnow = [
  [  0, [255,255,255,  0]],  // transparente (sin nieve)
  [  1, [255,255,255,120]],  // casi blanco
  [  5, [249,244,255,170]],  // blanco con tinte lila
  [ 10, [241,232,255,205]],
  [ 15, [230,214,255,220]],
  [ 20, [216,190,255,232]],
  [ 25, [200,166,255,240]],
  [ 30, [ 184,140,252,245]],
  [ 40, [162,110,246,250]],
  [ 50, [140, 82,236,252]],
  [ 60, [118, 58,220,253]],
  [ 80, [ 90, 28,190,254]],
  [100, [ 55,  0,120,255]]  // morado oscuro (máximo)
]

if (dataset === 'gfs/snow_depth_surface') {


  //  paletteToUse = paletteRadar50;
    paletteToUse = paletteSnow;
  }



    logPalette(palette, `Palette Pressure for ${dataset}`);

   // pressurePress

deckglCloud.setProps({
useDevicePixels: __WL_IS_IPHONE ? 1 : window.devicePixelRatio,
  layers: [

  

                           new WeatherLayers.RasterLayer({
              id: 'rastercloud',
              // data properties
              image,
              image2,
              imageSmoothing: 0,
              imageInterpolation: config.imageInterpolation,
              imageWeight,
              imageType,
              imageUnscale,
              imageMinValue: 0,
              imageMaxValue: config.imageMaxValue > 0 ? config.imageMaxValue : null,
              bounds,
              // style properties
              visible: config.raster.enabled,
              palette: paletteToUse,
              opacity: 1.0,
              pickable: !isMetalWebGl2(),
              // extensions: [new deck.ClipExtension()],
              // clipBounds: [-181, -85.051129, 181, 85.051129]
               
            })
  ],
});
}


window.updateCloud = updateCloud;



function logPalette(palette, label = 'palette') {
  if (!palette) {
    console.warn(`[${label}] palette es null/undefined`);
    return;
  }

  // Caso típico: array de [value, [r,g,b,(a?)]]
  if (Array.isArray(palette)) {
    const rows = palette.map(item => {
      // item puede ser [value, [r,g,b,a?]] o {value,color}
      let value, color;
      if (Array.isArray(item)) {
        value = item[0];
        color = item[1];
      } else if (item && typeof item === 'object') {
        value = item.value;
        color = item.color;
      }
      const [r,g,b,a = 255] = Array.isArray(color) ? color : [undefined, undefined, undefined, undefined];
      return { value, r, g, b, a };
    });
    console.group(`🎨 ${label} (Array)`);
    console.table(rows);
    console.groupEnd();
    return;
  }

  // Si es objeto (por si alguna lib devuelve otra estructura)
  if (typeof palette === 'object') {
    console.group(`🎨 ${label} (Object)`);
    console.log(palette);
    // Si tiene entries tipo {stops:[...]}
    if (Array.isArray(palette.stops)) {
      console.table(palette.stops.map(([v,[r,g,b,a=255]]) => ({ value: v, r, g, b, a })));
    }
    console.groupEnd();
    return;
  }

  // Fallback
  console.log(`[${label}]`, palette);
}


 async function updateNoWind(forceUpdateDatetime) {


 

deckglWind.setProps({
//  useDevicePixels: false,
  layers: [

  ],
});


}

// iOS

//iOS
function  clearCloudLayer() {
 cloudVisible = false;
 deckglCloud.setProps({
//  useDevicePixels: false,
  layers: [
  ],
});
}
window.clearCloudLayer =  clearCloudLayer;

function  clearWindLayer() {
 windVisible = false;
 deckglWind.setProps({
//  useDevicePixels: false,
  layers: [
  ],
});
}
window.clearWindLayer =  clearWindLayer;

//iOS
function  setCloudLayer() {
 cloudVisible = true;
// updateCloud();
}
window.setCloudLayer = setCloudLayer;

//  unitSystem

function  setWindLayer() {
 windVisible = true;
 if (shouldUpdateWind()) {
      applyWindLayer();
    } else {
      // opcional: console.debug('[wind] skip during animation on non-wind layer');
    }
 cloudVisible ?  updateCloud() : clearCloudLayer();
}
window.setWindLayer = setWindLayer;


      document.getElementById('active-layer-name').textContent = 'Pressure';

    //   await precacheDatasets();


      
     // gui = initGui(config, update, { deckgl, webgl2: true });



     
});


  }


/* ---- script block 2 ---- */
// === NUEVO: prioridad de UI (carga vs red) ===
let __loadingPriority = false; // true mientras mostramos "Preparing..." o "Ready"
let __lastFastShownAt = 0;     // para limitar Good connection en el tiempo
const SHOW_FAST_MS = 400;      // cuánto tiempo mostrar "Good connection."

// Llama a esto desde tu lógica de carga (cuando empiece/termine cargar planos)
function setLoadingUI(isLoading) {
  const el = document.querySelector('#net-line .msg') || document.querySelector('#net-line');
  if (!el) return;
  __loadingPriority = !!isLoading;
  if (isLoading) {
    el.textContent = "Loading";   // tu texto de carga
    document.querySelector('#progress-dots')?.classList.remove('hidden');
    document.getElementById('net-line').style.display = 'inline-flex';
  } else {
    el.textContent = "Ready";
    document.querySelector('#progress-dots')?.classList.add('hidden');
    // Ocultamos al poco para no tapar nada
    setTimeout(() => {
      if (!__loadingPriority) document.getElementById('net-line').style.display = 'none';
    }, 800);
  }
}

// Reemplaza tu updateBanner actual por esta versión con prioridad y fast breve
function updateBanner({ mbps, rtt, state }) {
  const netLine = document.getElementById('net-line');
  if (!netLine) return;
  const textEl = netLine.querySelector('.msg') || netLine;

  // Si estamos mostrando mensajes de carga, NO sobrescribas el texto
  if (__loadingPriority) {
    // Aun así, mantenemos visible el banner mientras haya tráfico
    if (activeAws > 0) netLine.style.display = 'inline-flex';
    return;
  }

  // Con descargas AWS activas, mostramos mensaje según estado
  if (activeAws > 0) {
    netLine.style.display = 'inline-flex';

    if (state === 'slow') {
      textEl.textContent = "Poor network connection. Map layers may load slowly.";
      __lastFastShownAt = 0; // resetea ventana de fast
    } else if (state === 'ok') {
      textEl.textContent = "Moderate connection. Some features may be reduced.";
      __lastFastShownAt = 0;
    } else { // 'fast' o 'unknown'
      const now = Date.now();
      // Solo mostramos "Good connection." un instante, luego ocultamos
      if (!__lastFastShownAt) {
        __lastFastShownAt = now;
        textEl.textContent = "Good connection.";
      }
      // Si ya pasaron ~400 ms, ocultamos salvo que vuelva a haber carga prioritaria
      if (now - __lastFastShownAt >= SHOW_FAST_MS) {
        netLine.style.display = 'none';
      }
    }

    netLine.title = `${(mbps ?? 0).toFixed?.(1)} Mbps · ${(rtt ?? 0).toFixed?.(0)} ms`;
  } else {
    // Sin descargas: oculta tras un pequeño delay
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      if (!__loadingPriority) netLine.style.display = 'none';
    }, HIDE_DELAY_MS);
  }

  document.documentElement.dataset.net = state;
}


document.addEventListener("DOMContentLoaded", () => {
  translateLayerButtonsIfNeeded(); // 1ª pasada

  // 2ª pasada justo después de que el JS de init haya pintado el estado por defecto
  requestAnimationFrame(() => {
    translateLayerButtonsIfNeeded();

    // 3ª opcional (por si hay otro repaint justo después)
    requestAnimationFrame(() => translateLayerButtonsIfNeeded());
  });
});








(function () {
  // ============================
  // CONFIG
  // ============================
  const AWS_URL_TEST = url => (
    /d3kw1vf60gu3rr\.cloudfront\.net/i.test(url) ||
    /climatok-wl-clouds-juan\.s3\.amazonaws\.com/i.test(url) ||
    /\/data\/gfs\//i.test(url) ||
    /\/manifests\//i.test(url)
  );

let __wirePulseAt = 0;    // marca de tiempo del último recurso con bytes “en el cable”
const WIRE_RECENT_MS = 800;




  const MESSAGES = {
    slow: "Poor network connection. Map layers may load slowly.",
    ok:   "Moderate connection. Some features may be reduced.",
    fast: "Good connection.",
    checking: "Loading"
  };

  // Sonda opcional (déjala "" si no tienes un archivo de prueba)
  const PROBE_URL =  "https://d3kw1vf60gu3rr.cloudfront.net/netprobe.bin";

  const HIDE_DELAY_MS = 3000;

  // ============================
  // STATE
  // ============================
  const $ = sel => document.querySelector(sel);
  const netLine = $("#net-line");
  if (netLine) netLine.style.display = "none";

  let activeAws = 0;
  let hideTimer = null;
  let assumeTimer = null;
  let probeTimer = null;

  const samples = [];
  const MAX_SAMPLES = 20;
  let lastState = "unknown"; // 'slow' | 'ok' | 'fast' | 'unknown'
  let lastSampleAt = 0;

  Object.defineProperty(window, "activeAws", { get: ()=>activeAws });

  // ============================
  // UTILS
  // ============================
  const classify = (mbps, rttMs) => {
    if (mbps < 2 || rttMs > 350) return "slow";
    if (mbps < 8 || rttMs > 180) return "ok";
    return "fast";
  };

  function pushSample(mbps, rtt) {
    samples.push({ mbps, rtt, t: Date.now() });
    if (samples.length > MAX_SAMPLES) samples.shift();
    lastSampleAt = Date.now();

    const w = samples.map((_,i)=> i+1);
    const sumW = w.reduce((a,b)=>a+b,0);
    const avgMbps = samples.reduce((a,s,i)=> a + s.mbps*w[i],0)/sumW;
    const avgRtt  = samples.reduce((a,s,i)=> a + s.rtt *w[i],0)/sumW;
    lastState = classify(avgMbps, avgRtt);

    try { window.webkit?.messageHandlers?.netQuality?.postMessage({ avgMbps, avgRtt, state:lastState }); } catch {}

    updateBanner({ mbps: avgMbps, rtt: avgRtt, state: lastState });
    window.dispatchEvent(new CustomEvent("netquality:update", { detail: { avgMbps, avgRtt, state:lastState }}));

    console.info("[NETQ] sample", {avgMbps:avgMbps.toFixed(2), avgRtt:Math.round(avgRtt), state:lastState});
  }

  function maybeHideSoon() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      if (!netLine) return;
      if (activeAws <= 0) netLine.style.display = "none";
    }, HIDE_DELAY_MS);
  }

  function updateBanner({ mbps, rtt, state }) {
    if (!netLine) return;
    const hasRecentWire = (Date.now() - __wirePulseAt) < WIRE_RECENT_MS;

    if (activeAws > 0 && hasRecentWire) {
      netLine.style.display = "inline-flex";
      const textEl = netLine.querySelector(".msg") || netLine;
      const key = state === "unknown" ? "checking" : state;
      textEl.textContent = MESSAGES[key] || MESSAGES.checking;
      netLine.title = `${(mbps ?? 0).toFixed?.(1)} Mbps · ${(rtt ?? 0).toFixed?.(0)} ms`;
      document.documentElement.dataset.net = state;
    } else {
      // maybeHideSoon();
      // document.documentElement.dataset.net = state;
        clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    if (!__loadingPriority) netLine.style.display = 'none';
  }, 400);
    }
  }

  function showNowIfNeeded() {
    if (!netLine) return;
    if (activeAws > 0) {
      updateBanner({ mbps: samples.at(-1)?.mbps ?? null, rtt: samples.at(-1)?.rtt ?? null, state: lastState });
      // --- FALLBACKS ---
      // 1) Si en 700 ms no hay muestras, asume 'fast' temporal
      clearTimeout(assumeTimer);
      assumeTimer = setTimeout(()=>{
        if (Date.now() - lastSampleAt > 650 && activeAws > 0 && lastState === "unknown") {
          lastState = "fast";
          updateBanner({ mbps: 15, rtt: 80, state: lastState });
          console.info("[NETQ] fallback: assumed FAST (no samples yet)");
        }
      }, 700);

      // 2) Si en 3 s no hay muestras, degrada a 'ok' (mejor que 'checking' eterno)
      clearTimeout(probeTimer);
      probeTimer = setTimeout(async ()=>{
        if (activeAws > 0 && Date.now() - lastSampleAt > 2800 && (lastState === "unknown" || lastState === "fast")) {
          // si hay PROBE_URL, intenta una mini sonda
          if (PROBE_URL) {
            try {
              const t0 = performance.now();
              const ctrl = new AbortController();
              const res = await fetch(PROBE_URL + "?t=" + Date.now(), { cache:"no-store", signal: ctrl.signal });
              const reader = res.body?.getReader?.();
              let loaded = 0;
              while (true) {
                const {done, value} = await reader.read();
                if (done) break;
                loaded += value.byteLength;
                if (loaded > 300_000) { ctrl.abort(); break; } // lee ~300 KB
              }
              const dt = Math.max(performance.now() - t0, 1);
              const mbps = (loaded * 8) / (dt / 1000) / 1e6;
              const rtt  = Math.min(dt, 80);
              pushSample(mbps, rtt);
              console.info("[NETQ] active probe", { mbps: mbps.toFixed(2), rtt: Math.round(rtt) });
              return;
            } catch(e) {
              console.warn("[NETQ] probe failed", e);
            }
          }
          lastState = "ok";
          updateBanner({ mbps: 5, rtt: 200, state: lastState });
          console.info("[NETQ] fallback: degraded to OK (no samples after 3s)");
        }
      }, 3000);
    }
  }

  // ============================
  // PerformanceObserver (pasivo)
  // ============================
  try {
    const obs = new PerformanceObserver((list) => {
      for (const e of list.getEntries()) {
        const url = e.name || "";
        const bytes = e.transferSize || e.encodedBodySize || e.decodedBodySize || 0;

        // ---- DEBUG de patrones
        if (activeAws > 0) {
          console.debug("[NETQ] RT entry", { url, bytes, matched: AWS_URL_TEST(url) });
        }

       


        if (bytes < 1024) continue;       // <- UMBRAL BAJADO A 1 KB
        if (!AWS_URL_TEST(url)) continue; // solo recursos AWS

        const durMs = Math.max((e.responseEnd - e.responseStart), 1);
        const mbps  = (bytes * 8) / (durMs / 1000) / 1e6;
        const rtt   = Math.max(e.responseStart - e.startTime, 0);
         if (bytes > 0) __wirePulseAt = Date.now();      // <— NUEVO
        pushSample(mbps, rtt);
       
      }
    });
    obs.observe({ type: "resource", buffered: true });
  } catch (e) {
    console.warn("[NETQ] PerformanceObserver not available", e);
  }

  // ============================
  // Hook fetch/XHR (contar descargas)
  // ============================
  if (window.fetch) {
    const nativeFetch = window.fetch.bind(window);
    window.fetch = async function(input, init) {
      const url = typeof input === "string" ? input : (input?.url || "");
      let counted = false;
      if (AWS_URL_TEST(url)) { activeAws++; counted = true; showNowIfNeeded(); }
      try {
        const res = await nativeFetch(input, init);
        return res;
      } finally {
        if (counted) { activeAws--; maybeHideSoon(); }
      }
    };
  }

  (function(){
    const origOpen = XMLHttpRequest.prototype.open;
    const origSend = XMLHttpRequest.prototype.send;
    let lastURL = null;

    XMLHttpRequest.prototype.open = function(method, url) {
      lastURL = url;
      return origOpen.apply(this, arguments);
    };
    XMLHttpRequest.prototype.send = function() {
      let counted = false;
      if (lastURL && AWS_URL_TEST(String(lastURL))) {
        activeAws++; counted = true; showNowIfNeeded();
        this.addEventListener("loadend", () => { activeAws--; maybeHideSoon(); }, { once: true });
        this.addEventListener("error",   () => { activeAws--; maybeHideSoon(); }, { once: true });
        this.addEventListener("abort",   () => { activeAws--; maybeHideSoon(); }, { once: true });
      }
      return origSend.apply(this, arguments);
    };
  })();

  // ============================
  // Señal de iOS (NWPathMonitor) si la envías
  // ============================
  window.addEventListener("netquality:os", e => {
    const os = e.detail || {};
    const forcedSlow = os.osStatus !== "online" || os.isConstrained || os.isExpensive;
    if (forcedSlow) lastState = "slow";
    updateBanner({ mbps: samples.at(-1)?.mbps ?? null, rtt: samples.at(-1)?.rtt ?? null, state: lastState });
  });

  // ============================
  // Helpers de test
  // ============================
  window.NETQ_fakeAwsStart = function(){ activeAws++; showNowIfNeeded(); };
  window.NETQ_fakeAwsEnd   = function(){ if (activeAws>0) activeAws--; maybeHideSoon(); };
  window.NETQ_test         = function(state="fast"){
    lastState = state;
    updateBanner({ mbps: state==="fast"? 20 : state==="ok"? 5 : 1, rtt: state==="slow"? 400 : state==="ok"? 200 : 80, state });
    netLine && (netLine.style.display = "inline-flex");
    console.info("[NETQ] forced state", state);
  };

  console.info("[NETQ] ready. Helpers: NETQ_test('fast|ok|slow'), NETQ_fakeAwsStart(), NETQ_fakeAwsEnd()");
})();


// WEB (Stripe): open Customer Portal to manage subscription

async function climatokOpenCustomerPortal() {
  const customerId = climatokGetCustomerId();
  if (!customerId) {
    alert("No subscription found on this device yet. Please sign up first.");
    return;
  }

  const res = await fetch("/.netlify/functions/create-portal-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customerId })
  });

  const data = await res.json();
  if (!res.ok || !data.url) {
    alert(data?.error || "Failed to open customer portal");
    return;
  }

  window.location.href = data.url;
}



// If we just returned from Stripe checkout, claim premium using session_id (with retries)
try {
  climatokHandleStripeSuccessIfPresent().catch(() => {});
} catch (_) {}

// Sync premium state with server (Upstash via verify-entitlement)
try {
  climatokRefreshPremiumFromServer().catch(() => {});
} catch (_) {}



document.addEventListener("DOMContentLoaded", () => {
  translateInfoPanelIfNeeded();
});


document.addEventListener("click", (e) => {
  const btn = e.target.closest("#go-premium-button, #go-premium-cta, #premium-cta, #premium-button");
  if (!btn) return;

  e.preventDefault();
  e.stopPropagation();

  try {
    if (typeof showPremiumOverlay === "function") {
      showPremiumOverlay(IS_ES
        ? "Prueba Premium GRATIS 3 días. No se cobra hoy · Cancela cuando quieras"
        : "Try Premium FREE for 3 days. No charge today · Cancel anytime"
      );
      return;
    }
  } catch (_) {}

  console.warn("Premium button clicked but showPremiumOverlay() not found");
});