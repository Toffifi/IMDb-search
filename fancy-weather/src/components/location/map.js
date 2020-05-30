/* eslint-disable no-undef */
export default function drowMap(longitude, latitude) {
  document.querySelector('#map').innerHTML = '';
  mapboxgl.accessToken = 'pk.eyJ1IjoidG9mZmlmaSIsImEiOiJja2F0czZ3MmoweGFkMndvNWU0MnMybjA5In0.FYFD3Y2Y-60AnKzcbRrbuQ';
  console.log(longitude, latitude);
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
