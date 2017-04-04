const mapa = L.map('example2').setView([51.505, -0.09], 9);

const pontos = [];

const pontos2 = [];


mapa.on('pm:create', (e) => {
    //alert('pm: Criar evento disparado. Consulte o console para obter detalhes');
    pontos.push(e.layer);
});

const m1 = L.circleMarker([51.50313, -0.091223], { radius: 10 }).bindPopup("EU sou m3.");
const m2 = L.marker([51.50614, -0.0989]).bindPopup("EU sou m1.");;
const m3 = L.marker([51.50915, -0.096112]).bindPopup("EU sou o m2");

const mGroup = L.layerGroup([m1, m2, m3]).addTo(mapa);
mGroup.pm.enable();

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mapa);



mapa.pm.addControls({
    drawMarker: true,
    drawPolygon: true,
    editPolygon: true,
    drawPolyline: true,
    deleteLayer: true,
});

mapa.pm.enableDraw('Poly', {
    snappable: true,
    templineStyle: {
        color: 'blue',
    },
    hintlineStyle: {
        color: 'blue',
        dashArray: [5, 5],
    },
    pathOptions: {
        color: 'red',
        fillColor: 'orange',
        fillOpacity: 0.2,
    },
});
mapa.pm.disableDraw('Poly');
mapa.pm.enableDraw('Poly');

// GEOSJON EXAMPLE
const geoJsonData = {
    'type': 'FeatureCollection',
    'features': [{
        'type': 'Feature',
        'properties': {},
        'geometry': {
            'type': 'Polygon',
            'coordinates': [
                [
                    [-0.15483856201171872,
                        51.527329038465936,
                    ],
                    [-0.16977310180664062,
                        51.51643437722083,
                    ],
                    [-0.15964508056640625,
                        51.50094238217541,
                    ],
                    [-0.15483856201171872,
                        51.527329038465936,
                    ],
                ],
            ],
        },
    }, ],
};

// const geoJsonButton = document.getElementById('test-geojson');
const geoJsonLayer = L.geoJson().addTo(mapa);
geoJsonLayer.addData(geoJsonData);
geoJsonLayer.addTo(mapa);
geoJsonLayer.pm.toggleEdit({
    draggable: true,
    snappable: true,
});
const bounds = geoJsonLayer.getBounds();
mapa.fitBounds(bounds);
geoJsonLayer.addEventListener('click', () => {
    geoJsonLayer.pm.toggleEdit();
});

geoJsonLayer.on('pm:edit', (e) => {
    console.log(e);
});

geoJsonLayer.on('pm:dragstart', (e) => {
    console.log(e);
});
// geoJsonLayer.on('pm:drag', (e) => {
//     console.log(e);
// });
geoJsonLayer.on('pm:dragend', (e) => {
    console.log(e);
});


// Polygon Example

const polygonLayer = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047],
]).addTo(mapa).bindPopup("EU sou o numero 7.");
polygonLayer.pm.toggleEdit();


// Layer Group Example

const layerGroupItem1 = L.polyline([
    [51.51, -0.09],
    [51.513, -0.08],
    [51.514, -0.11],
]).bindPopup("EU sou o numero 1.");
const layerGroupItem2 = L.polygon([
    [51.52, -0.06],
    [51.51, -0.07],
    [51.52, -0.05],
]).bindPopup("EU sou o numero 2.");

const layerGroupItem3 = L.polygon([
    [
        51.51549835365031, -0.06450164634969281,
    ],
    [
        51.51944818307178, -0.08425079345703125,
    ],
    [
        51.51868369995795, -0.06131630004205801,
    ],
    [
        51.51549835365031, -0.06450164634969281,
    ],
]).bindPopup("EU sou o numero 3.");
const layerGroupItem4 = L.polygon([
    [
        51.51549835365031, -0.06450164634969281,
    ],
    [
        51.51944818307178, -0.08425079345703125,
    ],
    [
        51.51868369995795, -0.06131630004205801,
    ],
    [
        51.51549835365031, -0.06450164634969281,
    ],
]).bindPopup("EU sou o numero 4.");;
const layerGroupItem5 = L.polygon([
    [
        51.51549835365031, -0.06450164634969281,
    ],
    [
        51.51944818307178, -0.08425079345703125,
    ],
    [
        51.51868369995795, -0.06131630004205801,
    ],
    [
        51.51549835365031, -0.06450164634969281,
    ],
]).bindPopup("EU sou o numero 5.");

const layerGroup = L.featureGroup([layerGroupItem1]).addTo(mapa);
layerGroup.pm.toggleEdit({
    draggable: true,
    snappable: true,
    snapDistance: 30,
});

layerGroup.on('pm:snap', (e) => {
    console.log('snap');
    console.log(e);
});
layerGroup.on('pm:unsnap', (e) => {
    console.log('unsnap');
    console.log(e);
});

mapa.pm.addControls({
    position: 'topright',
});

// map4.pm.setPathOptions({
//     color: 'orange',
//     fillColor: 'green',
//     fillOpacity: 0.4,
// });

layerGroup.addLayer(layerGroupItem2);
layerGroup.addLayer(layerGroupItem3);
// layerGroup.addLayer(layerGroupItem4);
// layerGroup.addLayer(layerGroupItem5);

layerGroup.on('pm:dragstart', (e) => {
    console.log("dragstart", e);
});
layerGroup.on('pm:drag', (e) => {
    console.log("drag", e);
});
layerGroup.on('pm:dragend', (e) => {
    console.log("dragend", e);
});
layerGroup.on('pm:markerdragstart', (e) => {
    console.log("markerdragstart", e);
});
layerGroup.on('pm:markerdragend', (e) => {
    console.log("markerdragend", e);
});

// test with markercluster
// var markers = L.markerClusterGroup();
// markers.addLayer(L.marker([51.505, -0.07]));
// markers.addLayer(L.marker([51.505, -0.08]));
// markers.addLayer(L.marker([51.505, -0.09]));
// map4.addLayer(markers);

//ADICINA UM POLIGONO COM TOOLTYPE
L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(mapa).bindPopup("I am a polygon.");


//ADICONA FUNÇÃO DE TOOTIP AO CLICAR NO MAPA
var popup = L.popup();

function onMapClick(e) {

    console.log(e.latlng);

    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mapa);
}

mapa.on('click', onMapClick);