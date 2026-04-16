



    const client = window.client = new WeatherLayersClient.Client({
      accessToken: '0yXeXlD6l9XYG4AqpHB3',
      // localhost: Jzq9V6IPnwLvPO6JPBMF
      // climatok: qmsdlj9tw7fpxiBEGXEc
    });
    WeatherLayersClient.setLibrary('geotiff', GeoTIFF);


    function toggleMiniView() {
  const iframe = document.getElementById("mini-frame");
  iframe.style.display = iframe.style.display === "none" ? "block" : "none";
}



    


    let currentDataset = 'gfs/temperature_2m_above_ground';
    let opacity = 0.9;
    const initWeatherLayer = "cold";
    let activeLayer = null;
    let isPlaying = false;
    let currentTime = null;
    let playfactor = 5800;
    let startTimePre = null;
    let contourVisible = false;
  
    let timelineControl = null;
    let timelineError = false;


   


  



    window.addEventListener('DOMContentLoaded', async () => {

// const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

const layerDescriptions = {
  "apparenttemperature":"APPARENT TEMPERATURE LAYER displays the ‘feels-like’ temperature—a human-perceived value derived from air temperature combined with humidity and wind",
  "instability":"INESTABILITY LAYER shows the height (in decameters) at which the 500 mb pressure level is found. Lower values (530–550) indicate cold and unstable air, often linked to storms and low pressure systems. Higher values (570–590) reflect warm and stable air, typical of high pressure zones",
  "cape": "THUNDERSTORMS LAYER measures the positive buoyancy available to an air parcel—higher CAPE values indicate greater potential for strong convection and thunderstorms.",
  "temperature": "TEMPERATURE LAYER displays surface temperature in °C, derived from ground-based measurements or model output, indicating thermal conditions at the Earth’s surface.",
  "wind": "WIND LAYER shows wind speed and direction at 10 m above ground, in Km/h, revealing surface wind conditions and patterns.",
  "precipitation": "PRECIPITATION LAYER shows the total precipitation accumulated over a specific period (3h), based on NOAA’s quantitative precipitation forecasts.",
  "solarRadiation": "SOLAR RADIATION LAYER shows the amount of solar radiation reaching the surface (shortwave, 0.3–3 µm), measured by NOAA pyranometers.",
  "cloudcover": "CLOUD COVER LAYER indicates the fraction of sky covered by clouds, from clear (0%) to overcast (100%), based on NOAA cloud observations.",
  "relativehumidity": "RELATIVE HUMIDITY LAYER shows the percentage of moisture in the air relative to saturation at current temperature—higher RH means more humid air.",
  "detailprecipitation5days": "This layer shows detailed precipitation totals over the next 5 days, based on NOAA’s quantitative precipitation forecast models.",
  "precipitable": "PRECIPITABLE WATER LAYER displays the total column water vapor (mm) in the atmosphere; higher values indicate more moisture available for precipitation.",
"snowdepth": "SNOW DEPTH LAYER shows the depth of snow on the ground, measured in inches or cm—key for understanding snowpack and runoff potential.",
"windgust": "WIND GUST LAYER displays the maximum 3‑second wind speed (at 10 m) within a 2‑minute window, indicating sudden bursts of stronger wind.",
"pressure": "PRESSURE LAYER shows atmospheric (sea‑level) pressure in millibars or inches Hg; typical sea‑level value is ~1013 mb, reflecting high/low pressure systems.",
"relative": "RELATIVE HUMIDITY LAYER shows the percentage of water vapor in the air relative to the maximum it could hold at the same temperature—higher values mean more moisture and a feeling of mugginess."

};

function updateInfoPanel(layerKey) {
  const description = layerDescriptions[layerKey] || "No hay información disponible para esta capa.";
  document.getElementById("info-content-layer").textContent = description;
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
  maxDate: new Date().fp_incr(15),
  position: "above",
  disableMobile: true
});


      // Inicializa con fecha y hora actual
const now = new Date();
document.getElementById('date-input').value = now.toISOString().slice(0, 10);
document.getElementById('hour-select').value = now.toISOString().slice(11, 16);


function loadSelectedDatetime() {
  const date = document.getElementById('date-input').value;
  const hour = document.getElementById('hour-select').value;
  if (!date || !hour) return;

  const localDateTime = new Date(`${date}T${hour}`);
  const datetimeUTC = new Date(localDateTime.getTime() - localDateTime.getTimezoneOffset() * 60000).toISOString();
  config.datetime = datetimeUTC;

  loadingIndicator.style.display = 'block';

  (async () => {
    try {
      if(currentDataset === 'gfs/pressure_mean_sea_level') {
        await updatePressure();
        isMobile ? updateNoWind() : updateWind();
        
      } else {
        await update();
        if(currentDataset === 'gfs/wind_10m_above_ground') {
           isMobile ? updateNoWind() : updateWind();
        } else {
        //  updateNoWind();
           isMobile ? updateNoWind() : updateWind();
        }
      }

      const formatted = new Intl.DateTimeFormat('es-ES', {
        weekday: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
      }).format(localDateTime);

      document.getElementById("local-datetime").innerText = formatted;
    } catch (e) {
      console.error("Error al cargar plano:", e);
      // alert("The map layer is not available for the selected time");
    }
    loadingIndicator.style.display = 'none';
  })();
}

// Llamar cuando el usuario cambia la fecha o la hora
document.getElementById('date-input').addEventListener('change', loadSelectedDatetime);
document.getElementById('hour-select').addEventListener('change', loadSelectedDatetime);


function getNextForecastHour(currentHour, direction) {
  const steps = ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"];
  let idx = steps.indexOf(currentHour);
  let newDate = new Date(fp.selectedDates[0] || new Date());

  idx += direction;

  if (idx < 0) {
    idx = steps.length - 1;
    newDate.setDate(newDate.getDate() - 1);
  } else if (idx >= steps.length) {
    idx = 0;
    newDate.setDate(newDate.getDate() + 1);
  }

  // Establecer nueva fecha y hora en el picker y select
  fp.setDate(newDate, true); // true = trigger change event
  document.getElementById('hour-select').value = steps[idx];

  // Cargar plano
  loadSelectedDatetime();
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











      // Agrega este código en tu sección JavaScript, preferiblemente al inicio del event listener DOMContentLoaded

// Referencias a los elementos
const toggleLayersButton = document.getElementById('toggle-layers');
const layersButtons = document.getElementById('buttons');
const selectedLayerText = document.getElementById('selected-layer-text');

// Función para manejar el clic en cualquier botón de capa
function handleLayerButtonClick(event) {
  // Obtener el texto del botón clickeado (sin el icono)
  // const buttonText = event.currentTarget.textContent.trim();
  
  // // Actualizar el texto del botón principal
  // selectedLayerText.textContent = buttonText;
  
  // Ocultar la lista de botones
  layersButtons.classList.remove('show');
  
  // Aquí iría el resto de tu lógica para cambiar las capas...
  // (tu código existente para manejar los clicks en los botones)
}

// Evento para mostrar/ocultar la lista de capas
toggleLayersButton.addEventListener('click', function() {
  layersButtons.classList.toggle('show');
});

// Asignar el evento click a todos los botones de capa
document.querySelectorAll('#buttons li').forEach(button => {
  button.addEventListener('click', handleLayerButtonClick);
});

// Inicializar con el texto de la capa por defecto
selectedLayerText.textContent = 'Layers';


// Animacion no disponible



      const datasets = await client.loadCatalog();
      const config = await initConfig({ datasets, deckgl: true, webgl2: true });
      let gui;


      if (/Mobi|Android/i.test(navigator.userAgent)) {
    config.imageSmoothing = 2; // en lugar de 5
    }




      const loadingIndicator = document.getElementById('loading-indicator');
      async function precacheDatasets() {

        loadingIndicator.style.display = 'block';  // Mostrar
  const datasetsToPreload = [
    // 'gfs/precipitable_water_entire_atmosphere',
    // 'gfs/temperature_2m_above_ground',
    // 'gfs/geopotential_height_500mb',
    // 'gfs/convective_available_potential_energy_surface',
    // 'gfs/pressure_mean_sea_level',
    // 'gfs/cloud_cover_entire_atmosphere',
    'gfs/precipitation_3h_accumulation_surface',
   
  ];

  const hoursToPreload = 24; // 1 días
  const batchSize = 10; // Peticiones paralelas controladas
  const log = (msg) => console.log(`[Precache] ${msg}`);

  for (const dataset of datasetsToPreload) {
    try {
      log(`⏳ Loading datetimes for ${dataset}`);
      const { datetimes } = await client.loadDatasetSlice(dataset, config.datetimeRange.split('/'), {
        datetimeStep: config.datetimeStep
      });

      const datetimesToLoad = datetimes.slice(0, hoursToPreload);

      for (let i = 0; i < datetimesToLoad.length; i += batchSize) {
        const batch = datetimesToLoad.slice(i, i + batchSize);

        const promises = batch.map(datetime =>
          client.loadDatasetData(dataset, datetime, {
            datetimeInterpolate: config.datetimeInterpolate
          }).then(() => log(`✅ Cached ${dataset} at ${datetime}`))
            .catch(err => console.warn(`⚠️ Error ${dataset} at ${datetime}`, err))
        );

        await Promise.all(promises); // Espera a que se descargue este grupo antes de seguir
      }
    } catch (err) {
      console.warn(`❌ Failed to preload ${dataset}`, err);
    }
  }

  log('✅ Finished preloading all datasets.');
  loadingIndicator.style.display = 'none';  
}


async function precacheDatasetFrames(datasetId, frameCount = 24, batchSize = 10) {

  // frameCount = 360;

  frameCount = isMobile ? 120 : 360;

  // clearActiveLayer();

  const playBtn = document.getElementById('play-button');
  playBtn.disabled = true;

  try {
    console.log(`⏳ Iniciando precarga para ${datasetId} (${frameCount} frames)...`);

    const { datetimes } = await client.loadDatasetSlice(datasetId, config.datetimeRange.split('/'), {
      datetimeStep: config.datetimeStep
    });

    const toPreload = datetimes.slice(0, frameCount);

    for (let i = 0; i < toPreload.length; i += batchSize) {
      const batch = toPreload.slice(i, i + batchSize);
      await Promise.all(batch.map(dt =>
        client.loadDatasetData(datasetId, dt, {
          datetimeInterpolate: config.datetimeInterpolate
        }).catch(err => console.warn(`⚠️ Error precargando ${datasetId} @ ${dt}`, err))
      ));
    }

    console.log(`✅ Precarga completa para ${datasetId}`);
  } catch (err) {
    console.error(`❌ Error en precarga de ${datasetId}:`, err);
  } finally {
   playBtn.disabled = false;
  }
}







      // New Button 
      // Dentro del event listener DOMContentLoaded, después de definir los datasets:

// Obtener referencia al nuevo botón
const pressureECMWFButton = document.getElementById('pressure-ecmwf');
const windGFSButton = document.getElementById('wind');
const windgustGFSButton = document.getElementById('windgust');
const capeECMWFButton = document.getElementById('cape-ecmwf');
const precipitationGFSButton = document.getElementById('precipitation');
const instabilityGFSButton = document.getElementById('instability');
const precipitableGFSButton = document.getElementById('precipitable');
const temperatureGFSButton = document.getElementById('temperature');
const apparenttemperatureGFSButton = document.getElementById('apparenttemperature');
const cloudcoverGFSButton = document.getElementById('cloudcover');
const solarRadiationButton = document.getElementById('solarradiation');
const relativehumidityButton = document.getElementById('relativehumidity');
const detailprecipitation5days = document.getElementById('detailprecipitation');
const snowdepthGFSButton = document.getElementById('snowdepth');



const timeInfoContainer = document.getElementById("time-info");
      const timeTextDiv = document.getElementById("time-text");
      const timeSlider = document.getElementById("time-slider");
      const playPauseButton = document.getElementById("play-pause-bt");


      timeSlider.addEventListener("input", (evt) => {
      const weatherLayer = weatherLayers[activeLayer]?.layer;
      const timeslider =   timeSlider.value / 1000
      if (weatherLayer) {
       weatherLayer.setAnimationTime(parseInt(timeSlider.value / 1000));
     // windLayer.setAnimationTime(parseInt(timeSlider.value / 1000));
      }
    });



const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
// const isMobile = false;

let geoControl;

  // Mapbox
      const map = window.map = new maplibregl.Map({
        container: 'map',
        style: BASEMAP_VECTOR_STYLE_URL,
        center: [7, 46],
        zoom: 1.5,
         maxZoom: isMobile ? 8 : 10, // ⛔ evita que en móviles se pida zoom 9-10
         minZoom: 1
      });
     
geoControl = new maplibregl.GeolocateControl({
    positionOptions: { enableHighAccuracy: true },
    trackUserLocation: true,
    showUserLocation: true
});
map.addControl(geoControl, 'top-right');

  


       maptilersdk.config.apiKey = '372tLF2j7JUD7SR2o3mu';

    //   const map = window.map = new maptilersdk.Map({
    //     container: 'map', // container's id or the HTML element to render the map
    //     style: maptilersdk.MapStyle.STREETS.DARK,  // stylesheet location
    //     zoom: 3, // Ajusta el zoom
    //     center: [-3.7038, 40.4168],
    //     hash: true,
    //  geolocateControl: false,
    //     navigationControl: false,
    //     projectionControl: false,
    //     projection: 'mercator',
    //     doubleClickZoom: false,
    //     maxZoom: isMobile ? 5 : 10, // ⛔ evita que en móviles se pida zoom 9-10
    //     minZoom: 3
      
    //   //   bounds: [
    //   //   [-180, -60], // Southwest coordinates
    //   //   [180, 60] // Northeast coordinates
    //   // ]
    //   });

map.doubleClickZoom.disable();
// map.touchZoomRotate.disable();








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
                 isMobile ? updateNoWind() : updateWind();
              //   updateWind();
  

        } else {

    isMobile ? updateNoWind() : updateWind();

        }

    
  }
}

// Suscribe los eventos de movimiento/zoom del mapa:
// map.on('movestart', pauseWindAnimation);
// map.on('zoomstart', pauseWindAnimation);

// // Y cuando la interacción termine:
// map.on('moveend', resumeWindAnimation);
// map.on('zoomend', resumeWindAnimation);


// —————————————————————————————————————————————
// Opcional: si además usas el timelineControl directamente:
// map.on('movestart', () => {
//   if (timelineControl && !playButton.disabled) {
//     timelineControl.pause();
//   }
// });
// map.on('moveend', () => {
//   if (timelineControl && !timelineError) {
//     timelineControl.start();
//   }
// });

// selectedLayerDescription

// Suscribe los eventos de movimiento/zoom del mapa:
map.on('movestart', pauseWindAnimation);
map.on('zoomstart', pauseWindAnimation);

// Y cuando la interacción termine:
map.on('moveend', resumeWindAnimation);
map.on('zoomend', resumeWindAnimation);

// —————————————————————————————————————————————
// Opcional: si además usas el timelineControl directamente:
// map.on('movestart', () => {
//   if (timelineControl && !playButton.disabled) {
//     timelineControl.pause();
//   }
// });
// map.on('moveend', () => {
//   if (timelineControl && !timelineError) {
//     timelineControl.start();
//   }
// });


const infoPanel = document.getElementById("info-content-layer");
const infoToggle = document.getElementById("info-toggle-button");

// Oculta el panel y muestra el icono al interactuar con el mapa
function hideInfoPanel() {
  if (infoPanel.style.display !== "none") {
    infoPanel.style.display = "none";
    infoToggle.style.display = "flex";
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
        map.setPaintProperty("water", 'fill-color', "rgba(0, 0, 0, 0.4)");
        // Añade la fuente de datos primero
        map.addSource('countriesSource', {
            type: 'vector',
            url: 'https://demotiles.maplibre.org/tiles/tiles.json' // Reemplaza con tu fuente vectorial real
        });

        // Añade la capa de países AL FINAL de todas las capas (sin beforeId)
        map.addLayer({
            'id': 'countries-layer',
            'source': 'countriesSource',
            'source-layer': 'countries', // Asegúrate que coincida con tu fuente
            'type': 'fill',
            'paint': {
                'fill-color': '#D3D3D3',
                'fill-opacity': 0.1,
                'fill-outline-color': '#000'
            }
        });
        
        // Opcional: Añade bordes más destacados
        map.addLayer({
            'id': 'countries-borders',
            'source': 'countriesSource',
            'source-layer': 'countries',
            'type': 'line',
            'paint': {
    'line-color': '#ffffff',
    'line-width': [
        'interpolate',
        ['linear'],
        ['zoom'],
        0, 0.5,
        6, 1.5,
        10, 2.5
    ],
    'line-opacity': 1.0,
    'line-blur': 0.5
}
        });


        // initWeatherMap(initWeatherLayer);
if (geoControl) {
        geoControl.trigger();
    }


    });


      await new Promise(resolve => map.once('style.load', resolve));
      updateBasemapVectorStyle(map);
    

      
      const tooltipControl = new WeatherLayers.TooltipControl({ followCursor: true });


     







function roundToPreviousForecastHour(date) {
  const hour = date.getHours();
  const rounded = Math.floor(hour / 3) * 3;
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







    // overlaid deck.gl Custom
    map.once('idle', async () => {

         updateInfoPanel("temperature");

        precacheDatasetFrames('gfs/temperature_2m_above_ground', 360);
    
        const datasetCustom = currentDataset; // Ajusta este ID según el dataset real
        document.getElementById('variable-name').textContent = 'Temperature  (ºC)';
        document.getElementById('active-layer-name').textContent = 'Temperature  (ºC) ';
        const {title, unitFormat, attribution, palette} = await client.loadDataset(datasetCustom);
        const {image, image2, imageWeight, imageType, imageUnscale, bounds} = await client.loadDatasetData(datasetCustom);
        
        // Actualizar la configuración del mapa
        config.dataset = datasetCustom;
        config.raster.enabled = true;
        config.contour.enabled = false;
        config.highLow.enabled = false;

      const deckLayer = new deck.MapboxOverlay({
        interleaved: true,
        layers: [  new WeatherLayers.RasterLayer({
                    id: 'raster',
                    image,
                    image2,
                    imageSmoothing: 5,
                    imageInterpolation: config.imageInterpolation,
                    imageWeight,
                    imageType,
                    imageUnscale,
                    bounds,
                    visible: config.raster.enabled,
                    palette,
                    opacity: 0.0,
                    pickable: !isMetalWebGl2(),
                    extensions: [new deck.ClipExtension()],
                    clipBounds: [-181, -85.051129, 181, 85.051129],
                    beforeId: 'water'  ,
                  
                }),

              ]
       
      });
      map.addControl(deckLayer);
      const deckgl = window.deckgl = await waitForDeck(() => deckLayer._deck);

      // Select

       isMobile ? updateNoWind() : updateWind();
      
      // info panels
      const infoControl = new InfoControl();
      infoControl.prependTo(document.getElementById('top-left'));
      deckgl.setProps({
      //  useDevicePixels: false,
        onViewStateChange: ({ viewState }) => infoControl.update(viewState),
      });


// ios
function precipitablePress() {
  precipitableGFSButton.click();
}
window.precipitablePress = precipitablePress;




      precipitableGFSButton.addEventListener('click', async () => {

      try {

         updateInfoPanel("precipitable");


        changeLayer('gfs/precipitable_water_entire_atmosphere');

        loadingIndicator.style.display = 'block';  // Mostrar

           timeInfoContainer.style.display = 'none';
        // Remover la clase 'active' de todos los botones
        document.querySelectorAll('#buttons li').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Añadir la clase 'active' al botón presionado
        precipitableGFSButton.classList.add('active');
        
        // Cargar datos específicos de ECMWF CAPE
        const dataset = 'gfs/precipitable_water_entire_atmosphere'; // Ajusta este ID según el dataset real
        currentDataset = 'gfs/precipitable_water_entire_atmosphere';
        opacity = 0.90;
        contourVisible = false;
        update();
      //  updateNoWind();
         isMobile ? updateNoWind() : updateWind();
        precacheDatasetFrames( 'gfs/precipitable_water_entire_atmosphere', 360);
         // const {title, unitFormat, attribution, palette} = await client.loadDataset(dataset);
         // Actualizar controles de la interfaz
         document.getElementById('variable-name').textContent = 'Precipitable Water (Kg/m2)';
         document.getElementById('active-layer-name').textContent = 'Precipitable Water (Kg/m2)';



        
    } catch (error) {
        console.error('Error loading ECMWF Pressure:', error);
        // Opcional: Mostrar mensaje de error al usuario
        document.getElementById('variable-name').textContent = 'Error loading data from CAPe';
    }
});

// ios
function windgustPress() {
  windgustGFSButton.click();
}
window.windgustPress = windgustPress;

windgustGFSButton.addEventListener('click', async () => {
try {
   updateInfoPanel("windgust");
  changeLayer('gfs/wind_gust_surface');
  loadingIndicator.style.display = 'block';  // Mostrar
     timeInfoContainer.style.display = 'none';
  // Remover la clase 'active' de todos los botones
  document.querySelectorAll('#buttons li').forEach(btn => {
      btn.classList.remove('active');
  });
    // Añadir la clase 'active' al botón presionado
  windGFSButton.classList.add('active');
    // Cargar datos específicos de ECMWF CAPE
  const dataset = 'gfs/wind_gust_surface'; // Ajusta este ID según el dataset real
  currentDataset = 'gfs/wind_gust_surface';
  opacity = 0.90;
  contourVisible = false;
  update();
 // updateWind();
   isMobile ? updateNoWind() : updateWind();
  precacheDatasetFrames('gfs/wind_gust_surface', 360);
   // const {title, unitFormat, attribution, palette} = await client.loadDataset(dataset);
   // Actualizar controles de la interfaz
   document.getElementById('variable-name').textContent = 'Wind Gust Speed (Km/h)';
   document.getElementById('active-layer-name').textContent = 'Wind Gust Speed (Km/h)';
} catch (error) {
  console.error('Error loading GFS WIND:', error);
  // Opcional: Mostrar mensaje de error al usuario
  document.getElementById('variable-name').textContent = 'Error loading data from Wind';
}
});


// ios
function windPress() {
  windGFSButton.click();
}
window.windPress = windPress;

windGFSButton.addEventListener('click', async () => {
try {
   updateInfoPanel("wind");
  changeLayer('gfs/wind_10m_above_ground');
  loadingIndicator.style.display = 'block';  // Mostrar
     timeInfoContainer.style.display = 'none';
  // Remover la clase 'active' de todos los botones
  document.querySelectorAll('#buttons li').forEach(btn => {
      btn.classList.remove('active');
  });
    // Añadir la clase 'active' al botón presionado
  windGFSButton.classList.add('active');
    // Cargar datos específicos de ECMWF CAPE
  const dataset = 'gfs/wind_10m_above_ground'; // Ajusta este ID según el dataset real
  currentDataset = 'gfs/wind_10m_above_ground';
  opacity = 0.90;
  contourVisible = false;
  update();
 // updateWind();
   isMobile ? updateNoWind() : updateWind();
  precacheDatasetFrames('gfs/wind_10m_above_ground', 360);
   // const {title, unitFormat, attribution, palette} = await client.loadDataset(dataset);
   // Actualizar controles de la interfaz
   document.getElementById('variable-name').textContent = 'Wind Speed (Km/h)';
   document.getElementById('active-layer-name').textContent = 'Wind Speed (Km/h)';
} catch (error) {
  console.error('Error loading GFS WIND:', error);
  // Opcional: Mostrar mensaje de error al usuario
  document.getElementById('variable-name').textContent = 'Error loading data from Wind';
}
});

// iOS
function apparenttemperaturePress() {
  apparenttemperatureGFSButton.click();
}
window.apparenttemperaturePress = apparenttemperaturePress;

apparenttemperatureGFSButton.addEventListener('click', async () => {
    try {
      updateInfoPanel("apparenttemperature");
      changeLayer('gfs/apparent_temperature_2m_above_ground');
      loadingIndicator.style.display = 'block';  // Mostrar
      timeInfoContainer.style.display = 'none';
        // Remover la clase 'active' de todos los botones
        document.querySelectorAll('#buttons li').forEach(btn => {
            btn.classList.remove('active');
        });
        // Añadir la clase 'active' al botón presionado
        temperatureGFSButton.classList.add('active');
        // Cargar datos específicos de ECMWF CAPE
        const dataset =  'gfs/apparent_temperature_2m_above_ground'; // Ajusta este ID según el dataset real
        currentDataset =  'gfs/apparent_temperature_2m_above_ground';
        opacity = 0.90;
        contourVisible = false;
        update();
      //  updateNoWind();
        isMobile ? updateNoWind() : updateWind();
        precacheDatasetFrames('gfs/apparent_temperature_2m_above_ground', 360);
        document.getElementById('variable-name').textContent = 'Apparent Temperature  (ºC) ';
        document.getElementById('active-layer-name').textContent = 'Apparent Temperature (ºC)';
    } catch (error) {
        console.error('Error loading Inestability:', error);
        // Opcional: Mostrar mensaje de error al usuario
        document.getElementById('variable-name').textContent = 'Error loading data from CAPe';
    }
});

// iOS
function snowdepthPress() {
  snowdepthGFSButton.click();
}
window.snowdepthPress = snowdepthPress;

snowdepthGFSButton.addEventListener('click', async () => {
    try {
       updateInfoPanel("snowdepth");
      changeLayer('gfs/snow_depth_surface');
      loadingIndicator.style.display = 'block';  // Mostrar
      timeInfoContainer.style.display = 'none';
        // Remover la clase 'active' de todos los botones
        document.querySelectorAll('#buttons li').forEach(btn => {
            btn.classList.remove('active');
        });
        // Añadir la clase 'active' al botón presionado
        temperatureGFSButton.classList.add('active');
        // Cargar datos específicos de ECMWF CAPE
        const dataset =  'gfs/snow_depth_surface'; // Ajusta este ID según el dataset real
        currentDataset =  'gfs/snow_depth_surface';
        opacity = 0.90;
        contourVisible = false;
        update();
      //  updateNoWind();
        isMobile ? updateNoWind() : updateWind();
        precacheDatasetFrames('gfs/snow_depth_surface', 360);
        document.getElementById('variable-name').textContent = 'Snow Depth (cm)';
        document.getElementById('active-layer-name').textContent = 'Snow Depth (cm)';
    } catch (error) {
        console.error('Error loading Inestability:', error);
        // Opcional: Mostrar mensaje de error al usuario
        document.getElementById('variable-name').textContent = 'Error loading data from CAPe';
    }
});



// iOS
function temperaturePress() {
  temperatureGFSButton.click();
}
window.temperaturePress = temperaturePress;

temperatureGFSButton.addEventListener('click', async () => {
    try {
      updateInfoPanel("temperature");
      changeLayer('gfs/temperature_2m_above_ground');
      loadingIndicator.style.display = 'block';  // Mostrar
      timeInfoContainer.style.display = 'none';
        // Remover la clase 'active' de todos los botones
        document.querySelectorAll('#buttons li').forEach(btn => {
            btn.classList.remove('active');
        });
        // Añadir la clase 'active' al botón presionado
        temperatureGFSButton.classList.add('active');
        // Cargar datos específicos de ECMWF CAPE
        const dataset =  'gfs/temperature_2m_above_ground'; // Ajusta este ID según el dataset real
        currentDataset =  'gfs/temperature_2m_above_ground';
        opacity = 0.90;
        contourVisible = false;
        update();
      //  updateNoWind();
        isMobile ? updateNoWind() : updateWind();
        precacheDatasetFrames('gfs/temperature_2m_above_ground', 360);
        document.getElementById('variable-name').textContent = 'Temperature  (ºC) ';
        document.getElementById('active-layer-name').textContent = 'Temperature (ºC)';
    } catch (error) {
        console.error('Error loading Inestability:', error);
        // Opcional: Mostrar mensaje de error al usuario
        document.getElementById('variable-name').textContent = 'Error loading data from CAPe';
    }
});

// ios
function inestabilityPress() {
  instabilityGFSButton.click();
}
window.inestabilityPress = inestabilityPress;

      instabilityGFSButton.addEventListener('click', async () => {
    try {

  
      updateInfoPanel("instability");
      changeLayer('gfs/geopotential_height_500mb');
      loadingIndicator.style.display = 'block';  // Mostrar

      timeInfoContainer.style.display = 'none';
        // Remover la clase 'active' de todos los botones
        document.querySelectorAll('#buttons li').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Añadir la clase 'active' al botón presionado
        instabilityGFSButton.classList.add('active');
        
        // Cargar datos específicos de ECMWF CAPE
        const dataset = 'gfs/geopotential_height_500mb'; // Ajusta este ID según el dataset real
        currentDataset = 'gfs/geopotential_height_500mb';
        contourVisible = false;
        opacity = 0.90;
        update();
      //  updateNoWind();
         isMobile ? updateNoWind() : updateWind();
        precacheDatasetFrames('gfs/geopotential_height_500mb', 360);
        document.getElementById('variable-name').textContent = 'Inestability (dm)';
        document.getElementById('active-layer-name').textContent = 'Inestability (dm)';


       
    } catch (error) {
        console.error('Error loading Inestability:', error);
        // Opcional: Mostrar mensaje de error al usuario
        document.getElementById('variable-name').textContent = 'Error loading data from CAPe';
    }
});

// ios
function capePress() {
  capeECMWFButton.click();
}
window.capePress = capePress;

    capeECMWFButton.addEventListener('click', async () => {
    try {
      updateInfoPanel("cape");
      changeLayer('gfs/convective_available_potential_energy_surface');
      loadingIndicator.style.display = 'block';  // Mostrar

      timeInfoContainer.style.display = 'none';
      // const weatherLayer = weatherLayers[activeLayer]?.layer;
      // map.removeLayer(weatherLayer);
      // changeWeatherLayer("cold")
        // Remover la clase 'active' de todos los botones
        document.querySelectorAll('#buttons li').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Añadir la clase 'active' al botón presionado
        capeECMWFButton.classList.add('active');
        
        // Cargar datos específicos de ECMWF CAPE
        const dataset = 'gfs/convective_available_potential_energy_surface'; // Ajusta este ID según el dataset real
        currentDataset = 'gfs/convective_available_potential_energy_surface';
        opacity = 0.90;
        contourVisible = false;
        update();
     //   updateNoWind();
        isMobile ? updateNoWind() : updateWind();
        precacheDatasetFrames('gfs/convective_available_potential_energy_surface', 360);
        document.getElementById('variable-name').textContent = 'Thunderstorms (J/Kg)';
        document.getElementById('active-layer-name').textContent = 'Thunderstorms (J/Kg)';


        
    } catch (error) {
        console.error('Error loading ECMWF Pressure:', error);
        // Opcional: Mostrar mensaje de error al usuario
        document.getElementById('variable-name').textContent = 'Error loading data from CAPe';
    }
});

// ios
function solarRadiationPress() {
  solarRadiationButton.click();
}
window.solarRadiationPress = solarRadiationPress;


solarRadiationButton.addEventListener('click', async () => {
  try {
    updateInfoPanel("solarRadiation");
    changeLayer('gfs/downward_short_wave_radiation_flux_surface');

    loadingIndicator.style.display = 'block';  // Mostrar
    // Ocultar datos anteriores
    timeInfoContainer.style.display = 'none';

    // Quitar clase activa de otros botones
    document.querySelectorAll('#buttons li').forEach(btn => {
        btn.classList.remove('active');
    });

    // Activar este botón
    solarRadiationButton.classList.add('active');

    // Actualizar dataset y opacidad
    currentDataset = 'gfs/downward_short_wave_radiation_flux_surface';
    opacity = 0.90;
    contourVisible = false;
    update();
   // updateNoWind();
     isMobile ? updateNoWind() : updateWind();
    precacheDatasetFrames('gfs/downward_short_wave_radiation_flux_surface', 360);
    document.getElementById('variable-name').textContent = 'Solar Radiation (W/m2)';
    document.getElementById('active-layer-name').textContent = 'Solar Radiation (W/m2)';


  } catch (error) {
    console.error('Error loading solar radiation data:', error);
    document.getElementById('variable-name').textContent = 'Error loading data';
  }
});

function pressurePress() {
  pressureECMWFButton.click();
}
window.pressurePress = pressurePress;

pressureECMWFButton.addEventListener('click', async () => {
    try {



      updateInfoPanel("pressure");
      changeLayer('gfs/downward_short_wave_radiation_flux_surface');

      loadingIndicator.style.display = 'block';  // Mostrar

      timeInfoContainer.style.display = 'none';

        // Remover la clase 'active' de todos los botones
        document.querySelectorAll('#buttons li').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Añadir la clase 'active' al botón presionado
        pressureECMWFButton.classList.add('active');
        

       // https://catalog.weatherlayers.com/data/gfs/precipitation_3h_accumulation_surface/2025042306/9/data.tif?access_token=9djqrhlmAjv2Mv2z2Vwz
        // Cargar datos específicos de ECMWF Pressure (Mean Sea Level)
        const datasetCustom = 'gfs/pressure_mean_sea_level'; // Ajusta este ID según el dataset real
        currentDataset = 'gfs/pressure_mean_sea_level';
        contourVisible = true;
        opacity = 0.90;
        updatePressure();
       // updateNoWind();
         isMobile ? updateNoWind() : updateWind();



        precacheDatasetFrames('gfs/pressure_mean_sea_level', 360);

        document.getElementById('variable-name').textContent = 'Pressure (hPa)';
        document.getElementById('active-layer-name').textContent = 'Pressure (hPa)';



        
    } catch (error) {
        console.error('Error loading ECMWF Pressure:', error);
        // Opcional: Mostrar mensaje de error al usuario
        document.getElementById('variable-name').textContent = 'Error loading data';
    }
});

//iOS
function detailprecipitation5daysPress() {
  detailprecipitation5days.click();
  
}
window.detailprecipitation5daysPress = detailprecipitation5daysPress;


detailprecipitation5days.addEventListener('click', async () => {
 window.location.href = './ClimaTok/index.html';

  });

function triggerGeolocation() {
    if (geoControl) {
        geoControl.trigger();
    }
}
window.triggerGeolocation = triggerGeolocation;





// ios
function precipitationPress() {
  precipitationGFSButton.click();
}
window.precipitationPress = precipitationPress;


precipitationGFSButton.addEventListener('click', async () => {

 // window.location.href = './ClimaTok/index.html';

 try {
updateInfoPanel("precipitation");
changeLayer('gfs/precipitation_3h_accumulation_surface');

    loadingIndicator.style.display = 'block';  // Mostrar
    // Ocultar datos anteriores
    timeInfoContainer.style.display = 'none';

    // Quitar clase activa de otros botones
    document.querySelectorAll('#buttons li').forEach(btn => {
        btn.classList.remove('active');
    });

    // Activar este botón
    precipitationGFSButton.classList.add('active');

    // Actualizar dataset y opacidad
    currentDataset = 'gfs/precipitation_3h_accumulation_surface';
    opacity = 0.90;
    contourVisible = false;
    update();
   // updateNoWind();
     isMobile ? updateNoWind() : updateWind();
    precacheDatasetFrames('gfs/precipitation_3h_accumulation_surface', 360);
    document.getElementById('variable-name').textContent = 'Precipitation 3h Accumulation (mm)';
    document.getElementById('active-layer-name').textContent = 'Precipitation 3h Accumulation (mm)';


  } catch (error) {
    console.error('Error loading precipitation data:', error);
    document.getElementById('variable-name').textContent = 'Error loading data';
  }

  });

//iOS
function relativehumidityPress() {
  relativehumidityButton.click();
}
window.relativehumidityPress = relativehumidityPress;


  relativehumidityButton.addEventListener('click', async () => {
try {
updateInfoPanel("relative");
  changeLayer('gfs/relative_humidity_2m_above_ground');

  loadingIndicator.style.display = 'block';  // Mostrar

  // Remover la clase 'active' de todos los botones
  document.querySelectorAll('#buttons li').forEach(btn => {
      btn.classList.remove('active');
  });
  
  // Añadir la clase 'active' al botón presionado
relativehumidityButton.classList.add('active');
  

 // https://catalog.weatherlayers.com/data/gfs/precipitation_3h_accumulation_surface/2025042306/9/data.tif?access_token=9djqrhlmAjv2Mv2z2Vwz
  // Cargar datos específicos de ECMWF Pressure (Mean Sea Level)
  const datasetCustom = 'gfs/relative_humidity_2m_above_ground'; // Ajusta este ID según el dataset real
  currentDataset = 'gfs/relative_humidity_2m_above_ground';
  opacity = 0.9; 
  contourVisible = false;
  update();
 // updateNoWind();
   isMobile ? updateNoWind() : updateWind();
   precacheDatasetFrames('gfs/relative_humidity_2m_above_ground', 360);

  document.getElementById('variable-name').textContent = 'Relative Humidity (%)';
  document.getElementById('active-layer-name').textContent = 'Relative Humidity (%)';



  
} catch (error) {
  console.error('Error loading ECMWF Pressure:', error);
  // Opcional: Mostrar mensaje de error al usuario
  document.getElementById('variable-name').textContent = 'Error loading data';
}
});

//iOS
function  cloudcoverPress() {
  cloudcoverGFSButton.click();
}
window. cloudcoverPress =  cloudcoverPress;

  cloudcoverGFSButton.addEventListener('click', async () => {
try {
  updateInfoPanel("cloudcover");
  changeLayer('gfs/cloud_cover_entire_atmosphere');

  loadingIndicator.style.display = 'block';  // Mostrar

  // Remover la clase 'active' de todos los botones
  document.querySelectorAll('#buttons li').forEach(btn => {
      btn.classList.remove('active');
  });
  
  // Añadir la clase 'active' al botón presionado
 cloudcoverGFSButton.classList.add('active');
  

 // https://catalog.weatherlayers.com/data/gfs/precipitation_3h_accumulation_surface/2025042306/9/data.tif?access_token=9djqrhlmAjv2Mv2z2Vwz
  // Cargar datos específicos de ECMWF Pressure (Mean Sea Level)
  const datasetCustom = 'gfs/cloud_cover_entire_atmosphere'; // Ajusta este ID según el dataset real
  currentDataset = 'gfs/cloud_cover_entire_atmosphere';
  opacity = 0.9; 
  contourVisible = false;
  update();
 // updateNoWind();
   isMobile ? updateNoWind() : updateWind();
    precacheDatasetFrames('gfs/cloud_cover_entire_atmosphere', 360);
  document.getElementById('variable-name').textContent = 'Cloud Cover (%)';
  document.getElementById('active-layer-name').textContent = 'Cloud Cover (%)';



  
} catch (error) {
  console.error('Error loading ECMWF Pressure:', error);
  // Opcional: Mostrar mensaje de error al usuario
  document.getElementById('variable-name').textContent = 'Error loading data';
}
});

// const tooltipControl = new WeatherLayers.TooltipControl({ followCursor: true });
      deckgl.setProps({
        //useDevicePixels: false,
        onLoad: () => deckgl.getCanvas() && tooltipControl.addTo(deckgl.getCanvas().parentElement),
        onHover: event => tooltipControl.updatePickingInfo(event),
      });
      deckgl.props.onLoad();



      // changeWeatherLayer("radar");
      // timeInfoContainer.style.display = 'flex';
// Muestra tiempo al abrir 
// Muestra tiempo al abrir (ahora ya no usaremos `now`)
let usedDatetime;



if (currentDataset == 'gfs/pressure_mean_sea_level') {
 
  // usedDatetime = await updatePressure();
  precacheDatasetFrames('gfs/pressure_mean_sea_level', 360); // 🔁 precarga
    usedDatetime = await updatePressure();
} else {

  usedDatetime = await update();
}




if (usedDatetime) {
  const dt = new Date(usedDatetime);

  // 🟢 Fecha (esto siempre es válido)
  document.getElementById('date-input').value = dt.toISOString().slice(0, 10);

  // 🟢 Hora (ajustada a las opciones del selector)
  const roundedHour = roundToPreviousForecastHour(dt);
  document.getElementById('hour-select').value = roundedHour;

  // 🟢 Mostrar banner con hora local
  const formatted = new Intl.DateTimeFormat('es-ES', {
    weekday: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  }).format(dt);

  timeTextDiv.innerText = formatted;
  document.getElementById("local-datetime").innerText = formatted;
}




});


    // const datasetWind = 'gfs/wind_10m_above_ground'; // Ajusta este ID según el dataset real
    //     const {title, unitFormat, attribution, palette} = await client.loadDataset(datasetWind);
    //     const {image, image2, imageWeight, imageType, imageUnscale, bounds} = await client.loadDatasetData(datasetWind);



      // overlaid deck.gl Wind poner dentro del load sync
      const deckLayerWind = new deck.MapboxOverlay({
        interleaved: false,
        layers: [
      
        ]
        
      });
      map.addControl(deckLayerWind);
      const deckglWind = window.deckgl = await waitForDeck(() => deckLayerWind._deck);








      // // info panels
      // const infoControl = new InfoControl();
      // infoControl.prependTo(document.getElementById('top-left'));
      // deckgl.setProps({
      //   onViewStateChange: ({ viewState }) => infoControl.update(viewState),
      // });

      // logo
      const logoControl = new WeatherLayers.LogoControl();
      logoControl.prependTo(document.getElementById('bottom-left'));

      // legend
      const legendControl = new WeatherLayers.LegendControl();
    // legendControl.prependTo(document.getElementById('bottom-right'));

          const attributionControl = new WeatherLayers.AttributionControl();
      attributionControl.prependTo(document.getElementById('bottom-right'));


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

  // 1. Limpiar capas anteriores
  try {
    if (map.getLayer('raster-layer')) map.removeLayer('raster-layer');
    if (map.getSource('raster-source')) map.removeSource('raster-source');
  } catch (e) {
    console.warn("⚠️ Fallo al limpiar capa anterior", e);
  }

  if (deckgl) {
    try {
      deckgl.setProps({ layers: [] }); // Limpia Deck.gl si lo usas
    } catch (e) {
      console.warn("⚠️ Error limpiando deckgl", e);
    }
  }

  if (deckglWind) {
    try {
      deckglWind.setProps({ layers: [] }); // Limpia Deck.gl si lo usas
    } catch (e) {
      console.warn("⚠️ Error limpiando deckglWind", e);
    }
  }



  // 2. Actualizar configuración
  config.dataset = dataset;
  activeLayer = dataset;

  // // 3. Obtener fechas disponibles
  // const datetimes = await client.getDatasetDatetimes(dataset);

  // // 🧹 Recorta si estás en móvil
  // const safeDatetimes = isMobile ? datetimes.slice(0, 12) : datetimes;

  // 4. Precarga con protección
  isPreloading = true;
  loadingIndicator.style.display = 'flex';

  // try {
  //   for (const datetime of safeDatetimes) {
  //     await withTimeout(client.loadDatasetData(dataset, datetime), 10000, datetime);
  //   }
  //   console.log("✅ Precarga completa");
  // } catch (err) {
  //   console.error("❌ Fallo durante precarga:", err);
  //   alert("Error al cargar los datos de la capa. Inténtalo de nuevo.");
  // } finally {
  //   loadingIndicator.style.display = 'none';
  //   isPreloading = false;
  // }

  // 5. Forzar resize en móviles para evitar glitches
  setTimeout(() => {
    try { map.resize(); } catch (_) {}
  }, 100);
}

timelineControl = new WeatherLayers.TimelineControl({
  onPreload: (datetimes) => {
    loadingIndicator.style.display = 'flex';
    const progressEl = document.getElementById('loading-progress');
    progressEl.textContent = `0 / ${datetimes.length}`;

    let loaded = 0;
    let aborted = false;
    const timeoutPorImagen = 10000;

    // Mostrar botón de reintento si ocurre error
    const retryButton = document.getElementById('retry-button');
    retryButton.style.display = 'none';

    // ✅ Limitar la cantidad de frames a precargar
    const MAX_FRAMES = isMobile ? 6 : 12;  // 6 horas móviles, 12 escritorio
    const limitedDatetimes = datetimes.slice(0, MAX_FRAMES);

    const promises = limitedDatetimes.map(datetime => {
      return withTimeout(client.loadDatasetData(config.dataset, datetime), timeoutPorImagen, datetime)
        .then(result => {
          if (aborted) return;
          loaded++;
          progressEl.textContent = `${loaded} / ${limitedDatetimes.length}`;
          return result;
        })
        .catch(err => {
          aborted = true;
          loadingIndicator.style.display = 'none';
          progressEl.textContent = '';
          const errorBox = document.getElementById('load-error');
          errorBox.style.display = 'block';
          retryButton.style.display = 'inline-block';
          throw err;
        });
    });

    return promises;
  },

  onUpdate: datetime => {
    document.getElementById('loading-progress').textContent = '';
    loadingIndicator.style.display = 'none';
    config.datetime = datetime || NO_DATA;

    const dateObj = new Date(datetime);
    const localDate = dateObj.toISOString().split('T')[0];
    const localHour = dateObj.toISOString().split('T')[1].substring(0, 5);

    const dateInput = document.getElementById("date-input");
    const hourSelect = document.getElementById("hour-select");

    if (dateInput && hourSelect) {
      dateInput._flatpickr.setDate(localDate, false);
      hourSelect.value = localHour;
    }

    if(currentDataset == 'gfs/pressure_mean_sea_level') {
      updatePressure();
    } else if(currentDataset == 'gfs/wind_10m_above_ground') {
      update();
        isMobile ? updateNoWind() : updateWind();
    } else {
      update();
    }

    loadingIndicator.style.display = 'none';

    if (datetime && datetime !== NO_DATA) {
      const dateObj = new Date(datetime);
      const options = { weekday: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      const localDate = new Intl.DateTimeFormat('en-US', options).format(dateObj);
      document.getElementById('local-datetime').innerText = localDate;
    }
  },

  fps: isMobile ? 5 : 10
});


// timelineControl = new WeatherLayers.TimelineControl({
//   onPreload: async (datetimes) => {
//     loadingIndicator.style.display = 'flex';
//     const timeoutPorImagen = 10000;

//     for (const datetime of datetimes) {
//       try {
//         await withTimeout(client.loadDatasetData(config.dataset, datetime), timeoutPorImagen, datetime);
//       } catch (err) {
//         console.warn(`❌ Falló la carga para ${datetime}`, err);
//         loadingIndicator.style.display = 'none';
//         throw err;
//       }
//     }
//   },

//   onUpdate: datetime => {
//     document.getElementById('loading-progress').textContent = '';
//     loadingIndicator.style.display = 'none';
//     config.datetime = datetime || NO_DATA;

//     const dateObj = new Date(datetime);
//     const localDate = dateObj.toISOString().split('T')[0];
//     const localHour = dateObj.toISOString().split('T')[1].substring(0, 5); // formato HH:MM

//     const dateInput = document.getElementById("date-input");
//     const hourSelect = document.getElementById("hour-select");

//     if (dateInput && hourSelect) {
//       dateInput._flatpickr.setDate(localDate, false);
//       hourSelect.value = localHour;
//     }

//     if (currentDataset == 'gfs/pressure_mean_sea_level') {
//       updatePressure();
//     } else {
//       if (currentDataset == 'gfs/wind_10m_above_ground') {
//         update();
//         updateWind();
//       } else {
//         update();
//       }
//     }

//     if (datetime && datetime !== NO_DATA) {
//       const options = { weekday: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
//       const localDateFormatted = new Intl.DateTimeFormat('en-US', options).format(dateObj);
//       document.getElementById('local-datetime').innerText = localDateFormatted;
//     }
//   },

//   fps: isMobile ? 10 : 15
// });



     




     timelineControl.prependTo(document.getElementById('bottom-right'));

const playBtn = document.getElementById('play-button');
  playBtn.disabled = false;












const playButton = document.getElementById('play-button');
playButton.disabled = false;
let isPlaying = false;

playButton.addEventListener('click', async () => {
  if (playButton.disabled ) {
    alert("⚠️ Animación no disponible (datos faltantes o error).");
    return;
  }
  try {
    if (isPlaying) {
// resumeWindAnimation();
 isMobile ? updateNoWind() : updateWind();
      await timelineControl.pause();
      playButton.textContent = '▶️';
    } else {
pauseWindAnimation();
updateNoWind();
      await timelineControl.start();
      playButton.textContent = '⏸️';
    }
    isPlaying = !isPlaying;
  } catch (err) {
    console.error("Error en play/pause:", err);
    timelineError = true;
  }
});





     
 //    timelineControl.prependTo(document.getElementById('bottom-right'));

   

      // attribution
      // const attributionControl = new WeatherLayers.AttributionControl();
      // attributionControl.prependTo(document.getElementById('bottom-right'));


      // Interceptar y ampliar el método pause original
// const originalPause = timelineControl.pause.bind(timelineControl);

// timelineControl.pause = async () => {
//   await originalPause();
//  // updateWind(); // ✅ Solo al detener animación
// };
















      // config
      async function update(forceUpdateDatetime) {

        const dataset =  currentDataset;
       // const dataset =  'gfs/convective_available_potential_energy_surface';
        
        const {title, unitFormat, attribution, palette} = await client.loadDataset(dataset, { unitSystem: config.unitSystem });
       
     //   const {datetimes} = await client.loadDatasetSlice(dataset, config.datetimeRange.split('/'), { datetimeStep: config.datetimeStep });
     //   const datetime = config.datetime !== NO_DATA && datetimes[0] <= config.datetime && config.datetime <= datetimes[datetimes.length - 1] && !forceUpdateDatetime ? config.datetime : datetimes[0];
        const {datetimes} = await client.loadDatasetSlice(dataset, config.datetimeRange.split('/'), { datetimeStep: config.datetimeStep });

let datetime;

// Si ya hay un datetime válido y está dentro del rango, úsalo
if (
  config.datetime !== NO_DATA &&
  datetimes[0] <= config.datetime &&
  config.datetime <= datetimes[datetimes.length - 1] &&
  !forceUpdateDatetime
) {
  datetime = config.datetime;
} else {
  // Si no, seleccionamos el datetime más cercano a la hora actual
  const now = config.datetime !== NO_DATA ? new Date(config.datetime) : new Date();
  let minDiff = Infinity;
  let closest = datetimes[0];

  for (const dt of datetimes) {
    const diff = Math.abs(new Date(dt) - now);
    if (diff < minDiff) {
      minDiff = diff;
      closest = dt;
    }
  }

  datetime = closest;
}

config.datetime = datetime;
        
        const {image, image2, imageWeight, imageType, imageUnscale, bounds} = await client.loadDatasetData(dataset, datetime, { datetimeInterpolate: config.datetimeInterpolate });

        config.datetimes = datetimes;
        config.datetime = datetime;

        deckgl.setProps({
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
              opacity: opacity,
              pickable: !isMetalWebGl2(),
              extensions: [new deck.ClipExtension()],
              clipBounds: [-181, -85.051129, 181, 85.051129],
               beforeId: 'countries-borders'
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
              opacity: 1.0,
              extensions: [new deck.ClipExtension()],
              clipBounds: [-181, -85.051129, 181, 85.051129],
            }),
            



          ],
        });


       // const datasetWind =  'gfs/wind_10m_above_ground';
        
        legendControl.updateConfig({ title, unitFormat, palette });
       // timelineControl.updateConfig({ datetimes, datetime, datetimeInterpolate: config.datetimeInterpolate });


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



        loadingIndicator.style.display = 'none';




      //  timelineControlWind.updateConfig({ datetimes, datetime, datetimeInterpolate: config.datetimeInterpolate });
        tooltipControl.updateConfig({
          unitFormat,
          directionType: config.tooltip.directionType,
          directionFormat: config.tooltip.directionFormat,
          followCursorOffset: config.tooltip.followCursorOffset,
          followCursorPlacement: config.tooltip.followCursorPlacement,
        });
        attributionControl.updateConfig({ attribution });

        return datetime;
       
      }



      async function updatePressure(forceUpdateDatetime) {

const dataset =  currentDataset;
// const dataset =  'gfs/convective_available_potential_energy_surface';

const {title, unitFormat, attribution, palette} = await client.loadDataset(dataset, { unitSystem: config.unitSystem });
const {datetimes} = await client.loadDatasetSlice(dataset, config.datetimeRange.split('/'), { datetimeStep: config.datetimeStep });
const datetime = config.datetime !== NO_DATA && datetimes[0] <= config.datetime && config.datetime <= datetimes[datetimes.length - 1] && !forceUpdateDatetime ? config.datetime : datetimes[0];
const {image, image2, imageWeight, imageType, imageUnscale, bounds} = await client.loadDatasetData(dataset, datetime, { datetimeInterpolate: config.datetimeInterpolate });

config.datetimes = datetimes;
config.datetime = datetime;

deckgl.setProps({
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
      opacity: opacity,
      pickable: !isMetalWebGl2(),
      extensions: [new deck.ClipExtension()],
      clipBounds: [-181, -85.051129, 181, 85.051129],
       beforeId: 'countries-borders'
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
              visible: contourVisible,
              interval: config.contour.interval,
              majorInterval: config.contour.majorInterval,
              width: 2,
              color:  cssToColor('#332f2fff'),
              palette: config.contour.palette ? palette : null,
              opacity: 1.0,
              extensions: [new deck.ClipExtension()],
              clipBounds: [-181, -85.051129, 181, 85.051129],
            }),



  ],
});


// const datasetWind =  'gfs/wind_10m_above_ground';

legendControl.updateConfig({ title, unitFormat, palette });
//timelineControl.updateConfig({ datetimes, datetime, datetimeInterpolate: config.datetimeInterpolate });
  
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




loadingIndicator.style.display = 'none';




//  timelineControlWind.updateConfig({ datetimes, datetime, datetimeInterpolate: config.datetimeInterpolate });
tooltipControl.updateConfig({
  unitFormat,
  directionType: config.tooltip.directionType,
  directionFormat: config.tooltip.directionFormat,
  followCursorOffset: config.tooltip.followCursorOffset,
  followCursorPlacement: config.tooltip.followCursorPlacement,
});
attributionControl.updateConfig({ attribution });

return datetime;


}



















      async function updateWind(forceUpdateDatetime) {



const dataset =  'gfs/wind_10m_above_ground';
const {title, unitFormat, attribution, palette} = await client.loadDataset(dataset, { unitSystem: config.unitSystem });
const {datetimes} = await client.loadDatasetSlice(dataset, config.datetimeRange.split('/'), { datetimeStep: config.datetimeStep });
const datetime = config.datetime !== NO_DATA && datetimes[0] <= config.datetime && config.datetime <= datetimes[datetimes.length - 1] && !forceUpdateDatetime ? config.datetime : datetimes[0];
const {image, image2, imageWeight, imageType, imageUnscale, bounds} = await client.loadDatasetData(dataset, datetime, { datetimeInterpolate: config.datetimeInterpolate });

config.datetimes = datetimes;
config.datetime = datetime;

deckglWind.setProps({
//  useDevicePixels: false,
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
              numParticles: 2000,
              maxAge: 30,
              speedFactor: 20,
              width: config.particle.width,
              color: cssToColor(config.particle.color),
              palette: config.particle.palette ? palette : null,
              opacity: 0.20,
              animate: config.particle.animate,
              extensions: [new deck.ClipExtension()],
              clipBounds: [-181, -85.051129, 181, 85.051129],
              getPolygonOffset: () => [0, -1000],
            })
  ],
});
}

 async function updateNoWind(forceUpdateDatetime) {

// const dataset =  'gfs/wind_10m_above_ground';
// const {title, unitFormat, attribution, palette} = await client.loadDataset(dataset, { unitSystem: config.unitSystem });
// const {datetimes} = await client.loadDatasetSlice(dataset, config.datetimeRange.split('/'), { datetimeStep: config.datetimeStep });
// const datetime = config.datetime !== NO_DATA && datetimes[0] <= config.datetime && config.datetime <= datetimes[datetimes.length - 1] && !forceUpdateDatetime ? config.datetime : datetimes[0];
// const {image, image2, imageWeight, imageType, imageUnscale, bounds} = await client.loadDatasetData(dataset, datetime, { datetimeInterpolate: config.datetimeInterpolate });

// config.datetimes = datetimes;
// config.datetime = datetime;

deckglWind.setProps({
//  useDevicePixels: false,
  layers: [

 
  ],
});
}


      // await update();
     // isMobile ? updateNoWind() : updateWind();
      document.getElementById('active-layer-name').textContent = 'Pressure (hPa)';

   //   await precacheDatasets();


      
     // gui = initGui(config, update, { deckgl, webgl2: true });

document.getElementById('info-toggle').addEventListener('click', function() {
    this.classList.toggle('active');
    const content = document.getElementById('info-content');
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
});

     
});


    
