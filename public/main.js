import maplibregl from 'maplibre-gl';
// import { MapboxOverlay } from '@deck.gl/mapbox';
// import {  RasterLayer, loadTextureData } from 'weatherlayers-gl';
// import { ClipExtension } from '@deck.gl/extensions';
// import * as WeatherLayers from 'weatherlayers-gl';
// import * as WeatherLayersClient from 'weatherlayers-gl/client';

import { WEATHER_LAYERS_ACCESS_TOKEN } from '/auth.js';
import { NO_DATA, initConfig, initGui, cssToColor, waitForDeck, isMetalWebGl2 } from './config.js';
import { BASEMAP_VECTOR_STYLE_URL, updateBasemapVectorStyle } from './basemap.js';
// import { InfoControl } from './info-control.js';
// import { FpsControl } from './fps-control.js';




// Asegúrate de que las rutas a los archivos CSS sean correctas
import 'maplibre-gl/dist/maplibre-gl.css';

// Token de acceso para WeatherLayersClient
// const accessToken = 'SvCqZfqf8Zkqg5OYEca0';

async function initMap() {
    // Inicializa el mapa
    const map = new maplibregl.Map({
        container: 'map',
        style: 'https://demotiles.maplibre.org/style.json',
        center: [30, 10],
        zoom: 2,
    });

    // Carga la imagen de textura
    const url = '/images/TEMP500_20250313_1000.png';
    // const image = await loadTextureData(url);

    const client = new WeatherLayersClient.Client({
        accessToken: WEATHER_LAYERS_ACCESS_TOKEN,
      });

    //   WeatherLayersClient.setLibrary('geotiff', GeoTIFF);
  
  
        const datasets = await client.loadCatalog();
        const config = await initConfig({ datasets, deckgl: true, webgl2: true });

    // Configura la capa raster
    // const rasterLayer = new RasterLayer({
    //     id: 'raster',
    //     image: image,
    //     bounds: [-180, -90, 180, 90],
    //     palette: [


    //         // [0, [255, 255, 255]],
    //         // [5, [127, 255, 255]],
    //         // [10, [127, 255, 127]],
    //         // [15, [255, 255, 127]],
    //         // [20, [255, 127, 127]],
    //         // [25, [127, 0, 0]],

    //         [  -65, [49, 54, 149] ],
    //         [ -40,  [69, 117, 180] ],
    //         [ -30,  [116, 173, 209] ],
    //         [ -20,  [171, 217, 233] ],
    //         [-10,  [224, 243, 248] ],
    //         [ 0,  [255, 255, 255] ],
    //         [  12,  [255, 255, 191] ],
    //         [  20,  [254, 224, 144] ],
    //         [  25,  [253, 174, 97] ],
    //         [ 30,  [244, 109, 67] ],
    //         [  40,  [215,48,39] ],
    //         [ 55,  [165, 0, 38] ],



    //     ],
    //     extensions: [new ClipExtension()],
    //     clipBounds: [-181, -85.051129, 181, 85.051129],
    //     opacity: 0.8,
    // });

    // Crea la superposición de Deck.gl
    const deckOverlay = new deck.MapboxOverlay({
        interleaved: false,
        layers:   [],
    });

    // Agrega la superposición al mapa
    map.addControl(deckOverlay);


    // const deckLayer = new deck.MapboxOverlay({
    //     interleaved: false,
    //     layers: [],
    //   });
    //   map.addControl(deckLayer);



}

// Espera a que el DOM esté completamente cargado antes de inicializar el mapa
window.addEventListener('DOMContentLoaded', initMap);
