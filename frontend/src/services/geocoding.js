// Geocoding service using OpenStreetMap Nominatim API
export class GeocodingService {
  static BASE_URL = 'https://nominatim.openstreetmap.org';
  static HEADERS = {
    'User-Agent': 'RouteOptimizer/1.0'
  };

  static async geocodeAddress(address) {
    try {
      // Add India bias to search for better results within India
      const searchQuery = address.includes('India') ? address : `${address}, India`;
      const response = await fetch(
        `${this.BASE_URL}/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5&addressdetails=1&countrycodes=in&bounded=1&viewbox=68.1766451354,37.6884782906,97.4025614766,6.4627436529`,
        { headers: this.HEADERS }
      );
      
      if (!response.ok) {
        throw new Error('Geocoding failed');
      }
      
      const data = await response.json();
      
      return data.map((item) => ({
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
        address: item.display_name,
        displayName: item.display_name,
        importance: parseFloat(item.importance)
      }));
    } catch (error) {
      console.error('Geocoding error:', error);
      throw error;
    }
  }

  static async reverseGeocode(lat, lng) {
    try {
      const response = await fetch(
        `${this.BASE_URL}/reverse?format=json&lat=${lat}&lon=${lng}&zoom=16&addressdetails=1&accept-language=en`,
        { headers: this.HEADERS }
      );
      
      if (!response.ok) {
        throw new Error('Reverse geocoding failed');
      }
      
      const data = await response.json();
      
      return {
        lat,
        lng,
        address: data.display_name,
        displayName: data.display_name,
        importance: 1
      };
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      throw error;
    }
  }
}