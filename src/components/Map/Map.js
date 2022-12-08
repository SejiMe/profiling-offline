import React from 'react';
import 'leaflet/dist/leaflet.css';
import styles from '../../styles/Map.module.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

function Map() {
  return (
    <MapContainer
      className={styles.map}
      center={[15.44791, 120.71627]}
      zoom={18}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={[15.44791, 120.71627]}>
        <Popup content={'Caramutan'} />
      </Marker>
    </MapContainer>
  );
}

export default Map;
