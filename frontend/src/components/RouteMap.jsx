import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons
const createCustomIcon = (color, index) => {
  const html = index !== undefined 
    ? `<div style="
        background: ${color}; 
        width: 30px; 
        height: 30px; 
        border-radius: 50%; 
        border: 3px solid white; 
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 12px;
      ">${index}</div>`
    : `<div style="
        background: ${color}; 
        width: 25px; 
        height: 25px; 
        border-radius: 50%; 
        border: 3px solid white; 
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      "></div>`;
  
  return L.divIcon({
    html,
    className: 'custom-marker',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });
};

const startIcon = createCustomIcon('#10B981');

// Component to handle map events
function MapEventHandler({ onMapClick, mapMode }) {
  const map = useMap();
  
  useEffect(() => {
    if (mapMode === 'add' && onMapClick) {
      const handleClick = (e) => {
        onMapClick(e.latlng);
      };
      
      map.on('click', handleClick);
      return () => map.off('click', handleClick);
    }
  }, [map, onMapClick, mapMode]);

  return null;
}

// Component to fit bounds when route changes
function FitBounds({ bounds }) {
  const map = useMap();
  
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [map, bounds]);

  return null;
}

export function RouteMap({ pickup, dropoffs, optimizedRoute, onMapClick, mapMode }) {
  const mapRef = useRef(null);
  
  // Calculate bounds for all points
  const bounds = React.useMemo(() => {
    const allPoints = [pickup, ...dropoffs];
    if (allPoints.length === 0) return null;
    
    const latlngs = allPoints.map(p => [p.lat, p.lng]);
    return L.latLngBounds(latlngs);
  }, [pickup, dropoffs]);

  // Get route coordinates for polyline
  const routeCoordinates = React.useMemo(() => {
    if (!optimizedRoute?.route?.coordinates) return [];
    
    // OSRM returns coordinates as [lng, lat], but Leaflet expects [lat, lng]
    return optimizedRoute.route.coordinates.map(coord => [coord[1], coord[0]]);
  }, [optimizedRoute]);

  return (
    <div className="relative h-full w-full">
      <MapContainer
        ref={mapRef}
        center={[pickup.lat, pickup.lng]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        className="rounded-xl z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapEventHandler onMapClick={onMapClick} mapMode={mapMode} />
        <FitBounds bounds={bounds} />
        
        {/* Pickup marker */}
        <Marker position={[pickup.lat, pickup.lng]} icon={startIcon}>
          <Popup>
            <div className="p-2">
              <div className="font-semibold text-green-700 mb-1">📍 Pickup Location</div>
              <div className="text-sm text-gray-600 max-w-xs">
                {pickup.address}
              </div>
            </div>
          </Popup>
        </Marker>
        
        {/* Dropoff markers */}
        {dropoffs.map((dropoff, index) => {
          const isOptimized = optimizedRoute?.waypoints.some(w => w.id === dropoff.id);
          const optimizedIndex = optimizedRoute?.waypoints.findIndex(w => w.id === dropoff.id);
          const displayIndex = isOptimized && optimizedIndex !== undefined ? optimizedIndex : index + 1;
          
          return (
            <Marker 
              key={dropoff.id} 
              position={[dropoff.lat, dropoff.lng]} 
              icon={createCustomIcon(isOptimized ? '#F59E0B' : '#6B7280', displayIndex)}
            >
              <Popup>
                <div className="p-2">
                  <div className="font-semibold text-orange-700 mb-1">
                    🚚 Stop {displayIndex}
                    {isOptimized && ' (Optimized)'}
                  </div>
                  <div className="text-sm text-gray-600 max-w-xs">
                    {dropoff.address}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
        
        {/* Optimized route polyline */}
        {routeCoordinates.length > 0 && (
          <Polyline
            positions={routeCoordinates}
            color="#F59E0B"
            weight={5}
            opacity={0.8}
            smoothFactor={1}
          />
        )}
      </MapContainer>
      
      {/* Map mode indicator */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg z-10">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${mapMode === 'add' ? 'bg-green-500' : 'bg-blue-500'}`} />
          <span className="text-sm font-medium">
            {mapMode === 'add' ? 'Click to add locations' : 'Viewing optimized route'}
          </span>
        </div>
      </div>
    </div>
  );
}