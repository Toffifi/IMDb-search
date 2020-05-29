/* eslint-disable no-undef */
export default function drowMap(longitude, latitude) {
  document.querySelector('.map').innerHTML = '';
  mapboxgl.accessToken = 'pk.eyJ1IjoiYmxhemFycXNvIiwiYSI6ImNrNDJraGI3dTAxYTMzbHFpZXA5ZTN0b3IifQ.MNNE20R0ZfNS1EuSVEcs1g';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [longitude, latitude],
    zoom: 9,
  });
  map.on('load', () => {
    map.setLayoutProperty('country-label', 'text-field', [
      'format',
      ['get', 'name_ru'],
      { 'font-scale': 1.2 },
    ]);
  });

  new mapboxgl.Marker()
    .setLngLat([longitude, latitude])
    .addTo(map);
}
