import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './GPSMap.css';

// Fix Leaflet marker icons
L.Icon.Default.prototype._getIconUrl = function() {
  return {
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
  }[this._iconType];
};

// Mati City Barangay Coordinates Mapping with Street Info
const matiBarangays = {
  'Doña Rosa II Street, Barangay Central': { lat: 6.9533, lng: 126.2133, bounds: { minLat: 6.950, maxLat: 6.958, minLng: 126.210, maxLng: 126.220 } },
  'Logpond Magapo, Barangay Central': { lat: 6.9520, lng: 126.2120, bounds: { minLat: 6.948, maxLat: 6.956, minLng: 126.208, maxLng: 126.218 } },
  'Rizal Street, Barangay Sainz': { lat: 6.9544, lng: 126.2150, bounds: { minLat: 6.952, maxLat: 6.960, minLng: 126.212, maxLng: 126.222 } },
};

const getBarangayFromCoordinates = (lat, lng) => {
  for (const [address, data] of Object.entries(matiBarangays)) {
    const { bounds } = data;
    if (lat >= bounds.minLat && lat <= bounds.maxLat && lng >= bounds.minLng && lng <= bounds.maxLng) {
      return address;
    }
  }
  return null;
};
const customMarkerIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function GPSMap({ onLocationSelect, onAddressUpdate }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  
  // Mati City, Davao Oriental - actual coordinates
  const [latitude, setLatitude] = useState(6.9533);
  const [longitude, setLongitude] = useState(126.2133);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('Mati City, Davao Oriental');

  // Initialize map
  useEffect(() => {
    if (mapInstanceRef.current) return;

    // Create map with proper initial state
    const map = L.map(mapRef.current).setView([latitude, longitude], 18);
    mapInstanceRef.current = map;

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    // Add initial marker with red icon
    markerRef.current = L.marker([latitude, longitude], {
      icon: customMarkerIcon,
      draggable: false,
    }).addTo(map).bindPopup(
      `<div><strong>Coordinates:</strong><br />
      Lat: ${latitude.toFixed(6)}<br />
      Lng: ${longitude.toFixed(6)}</div>`
    ).openPopup();

    // Handle map clicks
    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      handleLocationSelect(lat, lng);
    });

    // Get current location on mount
    getCurrentLocation();

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  const getAddressFromCoordinates = async (lat, lng) => {
    try {
      // Get detailed address from OpenStreetMap
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      const addressData = data.address || {};
      
      // Get street/road name
      const streetName = addressData.road || addressData.street || addressData.pedestrian || '';
      
      // Get barangay/local area name
      const localBarangay = getBarangayFromCoordinates(lat, lng);
      
      // Construct complete address with street + barangay
      let completeAddress = '';
      if (streetName && localBarangay) {
        completeAddress = `${streetName}, ${localBarangay}`;
      } else if (localBarangay) {
        completeAddress = localBarangay;
      } else if (streetName) {
        completeAddress = streetName;
      } else {
        // Fallback to other address components
        completeAddress = addressData.hamlet ||
                         addressData.suburb ||
                         addressData.village ||
                         addressData.neighbourhood ||
                         addressData.district ||
                         addressData.county ||
                         data.display_name || 
                         'Mati City, Davao Oriental';
      }
      
      setAddress(completeAddress);
      if (onAddressUpdate) {
        onAddressUpdate(completeAddress);
      }
      return completeAddress;
    } catch (error) {
      console.log('Error getting address:', error);
      setAddress('Mati City, Davao Oriental');
      if (onAddressUpdate) {
        onAddressUpdate('Mati City, Davao Oriental');
      }
      return 'Mati City, Davao Oriental';
    }
  };

  const handleLocationSelect = async (lat, lng) => {
    // Return early if map doesn't exist (component was unmounted)
    if (!mapInstanceRef.current) {
      return;
    }

    setLatitude(lat);
    setLongitude(lng);
    
    // Remove old marker and add new one
    if (markerRef.current) {
      mapInstanceRef.current.removeLayer(markerRef.current);
    }
    
    // Create new marker at the selected location with red icon
    markerRef.current = L.marker([lat, lng], {
      icon: customMarkerIcon,
      draggable: false,
    }).addTo(mapInstanceRef.current).bindPopup(
      `<div><strong>Coordinates:</strong><br />
      Lat: ${lat.toFixed(6)}<br />
      Lng: ${lng.toFixed(6)}</div>`
    );

    // Update map view
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([lat, lng], 18);
    }

    await getAddressFromCoordinates(lat, lng);
    onLocationSelect({ latitude: lat, longitude: lng });
  };

  const getCurrentLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      // Request high accuracy GPS
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
          console.log('GPS Location:', lat, lng);
          
          await handleLocationSelect(lat, lng);
          setLoading(false);
        },
        (error) => {
          console.log('Error getting location:', error);
          alert('Could not get your location. Please check your GPS is enabled.');
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
      setLoading(false);
    }
  };

  return (
    <div className="gps-map-container">
      <div className="gps-map-header">
        <h3>Select Issue Location</h3>
        <button
          type="button"
          className="btn-current-location"
          onClick={getCurrentLocation}
          disabled={loading}
        >
          {loading ? 'Getting location...' : 'Use Current Location'}
        </button>
      </div>

      <div className="gps-map-wrapper">
        <div ref={mapRef} className="gps-map"></div>
      </div>

      <div className="gps-info">
        <div className="gps-coordinates">
          <div className="coord-pair">
            <label>Latitude:</label>
            <span>{latitude.toFixed(6)}</span>
          </div>
          <div className="coord-pair">
            <label>Longitude:</label>
            <span>{longitude.toFixed(6)}</span>
          </div>
        </div>
        {address && <div className="gps-address">📍 {address}</div>}
      </div>

      <p className="gps-hint">Click on the map to select a location, or press "Use Current Location" for your GPS position</p>
    </div>
  );
}

export default GPSMap;
