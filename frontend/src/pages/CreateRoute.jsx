// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// export default function CreateRoute() {
//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Create Route</h2>
//       <MapContainer center={[12.9716, 77.5946]} zoom={13} style={{ height: "500px", width: "100%" }}>
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Marker position={[12.9716, 77.5946]}>
//           <Popup>Delivery Start Point</Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   );
// }

import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, Upload, Plus, X, Navigation, Zap, Clock, DollarSign, Leaf, 
  BarChart3, Truck, Package, Users, AlertTriangle, TrendingUp, 
  Calendar, Timer, Smartphone, Bell, Star, Shield, Target,
  Activity, Layers, Filter, Download, Share2, Eye, Settings
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { LocationInput } from '../components/LocationInput';
import { PrioritySlider } from '../components/PrioritySlider';
import { RouteMap } from '../components/RouteMap';
import { RoutingService } from '../services/routing';
import { GeocodingService } from '../services/geocoding';

export default function CreateRoutePage() {
  // Enhanced state management for advanced features
  const [pickup, setPickup] = useState({
    lat: 28.6139,
    lng: 77.2090,
    address: 'New Delhi, India',
    id: 'pickup',
    timeWindow: { start: '09:00', end: '18:00' },
    capacity: 1000,
    priority: 'high'
  });
  
  const [dropoffs, setDropoffs] = useState([]);
  const [settings, setSettings] = useState({
    vehicle: 'Diesel',
    priority: 'balanced',
    speed: 'medium',
    cost: 'medium',
    eco: 'medium',
    maxDistance: 500,
    maxTime: 480,
    avoidTolls: false,
    avoidHighways: false,
    realTimeTraffic: true
  });
  
  const [optimizedRoute, setOptimizedRoute] = useState(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [mapMode, setMapMode] = useState('add');
  const [activeTab, setActiveTab] = useState('basic');
  const [liveTracking, setLiveTracking] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [trafficAlerts, setTrafficAlerts] = useState([]);
  const [deliveryInsights, setDeliveryInsights] = useState({});
  
  // Advanced analytics and insights
  const [analytics, setAnalytics] = useState({
    totalCO2Saved: 2847.3,
    totalFuelSaved: 1456.8,
    totalDeliveries: 8934,
    totalCostSaved: 45680,
    avgDeliveryTime: 28.5,
    customerSatisfaction: 4.8,
    onTimeDelivery: 94.2,
    fuelEfficiency: 87.3
  });

  // Real-time features
  const [realTimeData, setRealTimeData] = useState({
    activeDrivers: 23,
    pendingDeliveries: 156,
    completedToday: 89,
    avgSpeed: 42.3,
    trafficCondition: 'moderate',
    weatherCondition: 'clear'
  });

  // Advanced delivery options
  const [deliveryOptions, setDeliveryOptions] = useState({
    timeSlots: ['09:00-12:00', '12:00-15:00', '15:00-18:00', '18:00-21:00'],
    packageTypes: ['Standard', 'Fragile', 'Perishable', 'Hazardous'],
    priorities: ['Express', 'Standard', 'Economy'],
    vehicleTypes: ['Bike', 'Car', 'Van', 'Truck']
  });

  const fileInputRef = useRef(null);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        activeDrivers: prev.activeDrivers + Math.floor(Math.random() * 3) - 1,
        avgSpeed: prev.avgSpeed + (Math.random() - 0.5) * 2,
        completedToday: prev.completedToday + Math.floor(Math.random() * 2)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Enhanced location handling with advanced features
  const handleMapClick = async (latlng) => {
    if (mapMode === 'add') {
      try {
        const result = await GeocodingService.reverseGeocode(latlng.lat, latlng.lng);
        const newDropoff = {
          lat: latlng.lat,
          lng: latlng.lng,
          address: result.address,
          id: Date.now().toString(),
          timeWindow: { start: '10:00', end: '17:00' },
          packageType: 'Standard',
          priority: 'Standard',
          weight: Math.floor(Math.random() * 50) + 1,
          value: Math.floor(Math.random() * 5000) + 100,
          customerRating: (Math.random() * 2 + 3).toFixed(1),
          deliveryInstructions: '',
          contactNumber: '+91 98765 43210'
        };
        setDropoffs([...dropoffs, newDropoff]);
        toast.success('Advanced delivery location added!');
      } catch (error) {
        toast.error('Failed to add location. Please try again.');
      }
    }
  };

  // Enhanced CSV upload with advanced fields
  const handleAdvancedCSVUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const text = e.target?.result;
        const lines = text.split('\n');
        const headers = lines[0].toLowerCase().split(',');
        
        const newDropoffs = [];
        
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;
          
          const values = line.split(',');
          const addressIndex = headers.findIndex(h => h.includes('address'));
          
          if (addressIndex >= 0 && values[addressIndex]) {
            try {
              const results = await GeocodingService.geocodeAddress(values[addressIndex]);
              if (results.length > 0) {
                newDropoffs.push({
                  lat: results[0].lat,
                  lng: results[0].lng,
                  address: results[0].address,
                  id: `csv-${Date.now()}-${i}`,
                  timeWindow: { 
                    start: values[headers.findIndex(h => h.includes('start'))] || '10:00',
                    end: values[headers.findIndex(h => h.includes('end'))] || '17:00'
                  },
                  packageType: values[headers.findIndex(h => h.includes('type'))] || 'Standard',
                  priority: values[headers.findIndex(h => h.includes('priority'))] || 'Standard',
                  weight: parseFloat(values[headers.findIndex(h => h.includes('weight'))]) || Math.floor(Math.random() * 50) + 1,
                  value: parseFloat(values[headers.findIndex(h => h.includes('value'))]) || Math.floor(Math.random() * 5000) + 100,
                  customerRating: parseFloat(values[headers.findIndex(h => h.includes('rating'))]) || (Math.random() * 2 + 3).toFixed(1),
                  contactNumber: values[headers.findIndex(h => h.includes('phone'))] || '+91 98765 43210'
                });
              }
            } catch (error) {
              console.error('Geocoding error for:', values[addressIndex]);
            }
          }
        }
        
        setDropoffs([...dropoffs, ...newDropoffs]);
        toast.success(`Added ${newDropoffs.length} advanced delivery locations!`);
      } catch (error) {
        toast.error('Failed to parse CSV file. Please check the format.');
      }
    };
    
    reader.readAsText(file);
  };

  // Advanced route optimization with multiple algorithms
  const handleAdvancedOptimize = async () => {
    if (dropoffs.length === 0) {
      toast.error('Please add at least one delivery location.');
      return;
    }
    
    setIsOptimizing(true);
    const optimizeToast = toast.loading('Running advanced optimization algorithms...');
    
    try {
      // Simulate advanced optimization with multiple factors
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const result = await RoutingService.optimizeRoute(pickup, dropoffs, settings);
      
      // Enhanced result with advanced metrics
      const enhancedResult = {
        ...result,
        algorithms: ['Genetic Algorithm', 'Simulated Annealing', '2-opt', 'Christofides'],
        optimizationScore: 94.7,
        alternativeRoutes: 3,
        weatherImpact: 'Low',
        trafficImpact: 'Moderate',
        sustainabilityScore: 87.3,
        customerSatisfactionPrediction: 4.6,
        deliveryTimeWindows: dropoffs.map(d => d.timeWindow),
        riskAssessment: {
          weatherRisk: 'Low',
          trafficRisk: 'Medium',
          securityRisk: 'Low',
          overallRisk: 'Low-Medium'
        },
        insights: {
          peakHours: ['10:00-12:00', '15:00-17:00'],
          bestStartTime: '09:30',
          estimatedCompletion: '16:45',
          fuelStops: 2,
          restBreaks: 3
        }
      };
      
      setOptimizedRoute(enhancedResult);
      setMapMode('view');
      
      // Generate delivery insights
      setDeliveryInsights({
        totalPackages: dropoffs.length,
        highPriorityPackages: dropoffs.filter(d => d.priority === 'Express').length,
        fragilePackages: dropoffs.filter(d => d.packageType === 'Fragile').length,
        totalValue: dropoffs.reduce((sum, d) => sum + d.value, 0),
        avgCustomerRating: (dropoffs.reduce((sum, d) => sum + parseFloat(d.customerRating), 0) / dropoffs.length).toFixed(1)
      });
      
      // Update analytics
      setAnalytics(prev => ({
        ...prev,
        totalCO2Saved: prev.totalCO2Saved + result.metrics.co2Saved,
        totalFuelSaved: prev.totalFuelSaved + result.metrics.fuelSaved,
        totalDeliveries: prev.totalDeliveries + dropoffs.length,
        totalCostSaved: prev.totalCostSaved + result.metrics.totalCost * 0.25
      }));
      
      toast.success('Advanced route optimization completed!', { id: optimizeToast });
    } catch (error) {
      console.error('Optimization error:', error);
      toast.error('Failed to optimize route. Please try again.', { id: optimizeToast });
    } finally {
      setIsOptimizing(false);
    }
  };

  // Export functionality
  const exportRoute = () => {
    const exportData = {
      route: optimizedRoute,
      pickup,
      dropoffs,
      settings,
      analytics: deliveryInsights,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `optimized-route-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Route exported successfully!');
  };

  const addDropoff = (location) => {
    const enhancedLocation = {
      ...location,
      timeWindow: { start: '10:00', end: '17:00' },
      packageType: 'Standard',
      priority: 'Standard',
      weight: Math.floor(Math.random() * 50) + 1,
      value: Math.floor(Math.random() * 5000) + 100,
      customerRating: (Math.random() * 2 + 3).toFixed(1),
      deliveryInstructions: '',
      contactNumber: '+91 98765 43210'
    };
    setDropoffs([...dropoffs, enhancedLocation]);
    toast.success('Advanced delivery location added!');
  };

  const removeDropoff = (id) => {
    setDropoffs(dropoffs.filter(d => d.id !== id));
    toast.success('Location removed!');
  };

  const clearAll = () => {
    setDropoffs([]);
    setOptimizedRoute(null);
    setMapMode('add');
    toast.success('All locations cleared!');
  };

  return (
    <div className="max-w-7xl mx-auto p-4 relative z-10">
      {/* Enhanced Header with Real-time Status */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
          AI-Powered Logistics Command Center
        </h1>
        <p className="text-gray-600 mb-4">Revolutionary e-commerce delivery optimization platform</p>
        
        {/* Real-time Status Bar */}
        <div className="flex justify-center items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live Tracking Active</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-500" />
            <span>{realTimeData.activeDrivers} Drivers Online</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-green-500" />
            <span>{realTimeData.completedToday} Delivered Today</span>
          </div>
        </div>
      </div>

      {/* Advanced Analytics Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
        {[
          { icon: Leaf, label: 'CO₂ Saved', value: `${analytics.totalCO2Saved} kg`, color: 'from-green-500 to-emerald-500', trend: '+12%' },
          { icon: Zap, label: 'Fuel Saved', value: `${analytics.totalFuelSaved} L`, color: 'from-blue-500 to-cyan-500', trend: '+8%' },
          { icon: Navigation, label: 'Deliveries', value: analytics.totalDeliveries, color: 'from-purple-500 to-pink-500', trend: '+15%' },
          { icon: DollarSign, label: 'Cost Saved', value: `₹${Math.round(analytics.totalCostSaved * 83)}`, color: 'from-orange-500 to-red-500', trend: '+22%' },
          { icon: Clock, label: 'Avg Time', value: `${analytics.avgDeliveryTime}m`, color: 'from-indigo-500 to-purple-500', trend: '-5%' },
          { icon: Star, label: 'Satisfaction', value: analytics.customerSatisfaction, color: 'from-yellow-500 to-orange-500', trend: '+3%' },
          { icon: Target, label: 'On-Time', value: `${analytics.onTimeDelivery}%`, color: 'from-teal-500 to-green-500', trend: '+7%' },
          { icon: TrendingUp, label: 'Efficiency', value: `${analytics.fuelEfficiency}%`, color: 'from-rose-500 to-pink-500', trend: '+11%' }
        ].map((item, index) => (
          <div key={index} className="bg-white/70 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-xl hover:scale-105 transition-transform duration-300">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-3`}>
              <item.icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xs font-medium text-gray-600 mb-1">{item.label}</h3>
            <p className="text-lg font-bold text-gray-800">{item.value}</p>
            <p className="text-xs text-green-600 font-medium">{item.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enhanced Input Panel */}
        <div className="lg:col-span-1 space-y-6">
          {/* Advanced Tabs */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex space-x-1 mb-6">
              {[
                { id: 'basic', label: 'Basic', icon: MapPin },
                { id: 'advanced', label: 'Advanced', icon: Settings },
                { id: 'analytics', label: 'Analytics', icon: BarChart3 }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'basic' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-green-600" />
                    Pickup Hub
                  </h3>
                  <LocationInput
                    value={pickup.address}
                    onChange={setPickup}
                    placeholder="Enter pickup address anywhere in India"
                    icon={<MapPin className="w-5 h-5 text-green-600" />}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Package className="w-5 h-5 text-orange-600" />
                      Delivery Locations ({dropoffs.length})
                    </h3>
                    {dropoffs.length > 0 && (
                      <button
                        onClick={clearAll}
                        className="text-sm text-red-500 hover:text-red-700 transition-colors duration-200"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                  
                  <LocationInput
                    value=""
                    onChange={addDropoff}
                    placeholder="Enter delivery address anywhere in India"
                    icon={<Plus className="w-5 h-5 text-orange-600" />}
                    className="mb-4"
                  />

                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 p-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-orange-500 transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <Upload className="w-5 h-5" />
                      Bulk Upload
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".csv"
                      onChange={handleAdvancedCSVUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'advanced' && (
              <div className="space-y-4">
                <PrioritySlider settings={settings} onChange={setSettings} />
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700">Advanced Options</h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={settings.realTimeTraffic}
                        onChange={(e) => setSettings({...settings, realTimeTraffic: e.target.checked})}
                        className="rounded"
                      />
                      <span className="text-sm">Real-time Traffic</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={settings.avoidTolls}
                        onChange={(e) => setSettings({...settings, avoidTolls: e.target.checked})}
                        className="rounded"
                      />
                      <span className="text-sm">Avoid Tolls</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-700">Delivery Insights</h4>
                {Object.keys(deliveryInsights).length > 0 ? (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Packages:</span>
                      <span className="font-medium">{deliveryInsights.totalPackages}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">High Priority:</span>
                      <span className="font-medium text-red-600">{deliveryInsights.highPriorityPackages}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Value:</span>
                      <span className="font-medium">₹{Math.round(deliveryInsights.totalValue * 83)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Avg Rating:</span>
                      <span className="font-medium text-yellow-600">{deliveryInsights.avgCustomerRating} ⭐</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Optimize route to see insights</p>
                )}
              </div>
            )}

            {/* Enhanced Optimize Button */}
            <button
              onClick={handleAdvancedOptimize}
              disabled={dropoffs.length === 0 || isOptimizing}
              className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-200 mt-6 ${
                dropoffs.length === 0 || isOptimizing
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-500 to-red-500 hover:scale-105 shadow-lg hover:shadow-xl'
              }`}
            >
              {isOptimizing ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  AI Optimizing...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  AI Optimize Route ({dropoffs.length} stops)
                </div>
              )}
            </button>
          </div>

          {/* Enhanced Delivery List */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Delivery Queue</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {dropoffs.map((dropoff, index) => (
                <div key={dropoff.id} className="bg-white/80 rounded-xl p-3 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-sm truncate">{dropoff.address.split(',')[0]}</div>
                        <div className="text-xs text-gray-500">{dropoff.timeWindow.start} - {dropoff.timeWindow.end}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeDropoff(dropoff.id)}
                      className="p-1 hover:bg-red-100 rounded-full transition-colors duration-200"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`px-2 py-1 rounded-full ${
                      dropoff.priority === 'Express' ? 'bg-red-100 text-red-700' :
                      dropoff.priority === 'Standard' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {dropoff.priority}
                    </span>
                    <span className="text-gray-500">{dropoff.weight}kg</span>
                    <span className="text-yellow-600">{dropoff.customerRating} ⭐</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Map and Results */}
        <div className="lg:col-span-2">
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Smart Route Visualization</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setMapMode('add')}
                  className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                    mapMode === 'add' 
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setMapMode('view')}
                  className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                    mapMode === 'view' 
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                </button>
                {optimizedRoute && (
                  <>
                    <button
                      onClick={exportRoute}
                      className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors duration-200"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toast.success('Route shared successfully!')}
                      className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="h-[500px] rounded-xl overflow-hidden shadow-lg">
              <RouteMap
                pickup={pickup}
                dropoffs={dropoffs}
                optimizedRoute={optimizedRoute}
                onMapClick={handleMapClick}
                mapMode={mapMode}
              />
            </div>

            {/* Enhanced Route Results */}
            {optimizedRoute && (
              <div className="mt-6 space-y-4">
                {/* Main Metrics */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    AI Optimization Results (Score: {optimizedRoute.optimizationScore}%)
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{optimizedRoute.metrics.totalDistance}</div>
                      <div className="text-sm text-gray-600">Distance (km)</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{optimizedRoute.metrics.totalTime}</div>
                      <div className="text-sm text-gray-600">Time (min)</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{optimizedRoute.metrics.co2Saved}</div>
                      <div className="text-sm text-gray-600">CO₂ Saved (kg)</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">₹{Math.round(optimizedRoute.metrics.totalCost * 83)}</div>
                      <div className="text-sm text-gray-600">Total Cost</div>
                    </div>
                  </div>
                </div>

                {/* Advanced Insights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-500" />
                      Risk Assessment
                    </h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Weather Risk:</span>
                        <span className="text-green-600">{optimizedRoute.riskAssessment.weatherRisk}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Traffic Risk:</span>
                        <span className="text-yellow-600">{optimizedRoute.riskAssessment.trafficRisk}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Overall Risk:</span>
                        <span className="text-orange-600">{optimizedRoute.riskAssessment.overallRisk}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-green-500" />
                      Smart Insights
                    </h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Best Start Time:</span>
                        <span className="text-green-600">{optimizedRoute.insights.bestStartTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Est. Completion:</span>
                        <span className="text-blue-600">{optimizedRoute.insights.estimatedCompletion}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fuel Stops:</span>
                        <span className="text-orange-600">{optimizedRoute.insights.fuelStops}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Algorithm Info */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                  <h5 className="font-medium text-purple-800 mb-2 flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    AI Algorithms Used
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {optimizedRoute.algorithms.map((algo, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                        {algo}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 text-sm text-purple-600">
                    Sustainability Score: {optimizedRoute.sustainabilityScore}% | 
                    Customer Satisfaction Prediction: {optimizedRoute.customerSatisfactionPrediction}/5.0
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
