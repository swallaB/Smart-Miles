// export default function Dashboard() {
//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold">Dashboard</h2>
//       <p>Analytics coming soon...</p>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { 
  Plus, 
  TrendingUp, 
  Fuel, 
  Package, 
  DollarSign, 
  MapPin, 
  Calendar, 
  Filter,
  Navigation,
  User,
  Bell,
  Search,
  Settings,
  LogOut,
  ChevronDown,
  Route,
  Truck,
  Activity,
  Target,
  Zap,
  Timer,
  Globe,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  RefreshCw,
  Download,
  Eye,
  TrendingDown
} from 'lucide-react';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Demo data with more realistic values
  const kpiData = {
    co2Saved: { value: 2847, unit: 'kg', change: '+12.5%', trend: 'up' },
    fuelSaved: { value: 1256, unit: 'L', change: '+8.3%', trend: 'up' },
    deliveries: { value: 342, unit: 'routes', change: '+15.7%', trend: 'up' },
    costSaved: { value: 18420, unit: '$', change: '+10.2%', trend: 'up' }
  };

  const co2ChartData = [
    { date: 'Jan', co2: 180, target: 200 },
    { date: 'Feb', co2: 320, target: 250 },
    { date: 'Mar', co2: 280, target: 300 },
    { date: 'Apr', co2: 450, target: 350 },
    { date: 'May', co2: 380, target: 400 },
    { date: 'Jun', co2: 520, target: 450 },
    { date: 'Jul', co2: 680, target: 500 }
  ];

  const fuelChartData = [
    { month: 'Jan', fuel: 850, efficiency: 75 },
    { month: 'Feb', fuel: 1200, efficiency: 82 },
    { month: 'Mar', fuel: 950, efficiency: 78 },
    { month: 'Apr', fuel: 1800, efficiency: 85 },
    { month: 'May', fuel: 1500, efficiency: 88 },
    { month: 'Jun', fuel: 2200, efficiency: 92 }
  ];

  const routeDistribution = [
    { name: 'Optimized', value: 68, color: '#10b981' },
    { name: 'Standard', value: 22, color: '#f59e0b' },
    { name: 'Manual', value: 10, color: '#ef4444' }
  ];

  const deliveryZones = [
    { id: 1, name: 'Downtown Core', deliveries: 45, efficiency: 94, x: 35, y: 40, status: 'high' },
    { id: 2, name: 'North District', deliveries: 32, efficiency: 88, x: 60, y: 25, status: 'medium' },
    { id: 3, name: 'South Bay Area', deliveries: 28, efficiency: 82, x: 45, y: 70, status: 'medium' },
    { id: 4, name: 'East Industrial', deliveries: 38, efficiency: 91, x: 75, y: 55, status: 'high' },
    { id: 5, name: 'West Suburbs', deliveries: 24, efficiency: 76, x: 20, y: 60, status: 'low' }
  ];

  const recentRoutes = [
    { id: 'RT001', destination: 'Downtown Core', status: 'completed', time: '2h 15m', savings: '$45' },
    { id: 'RT002', destination: 'North District', status: 'active', time: '1h 30m', savings: '$32' },
    { id: 'RT003', destination: 'South Bay', status: 'pending', time: '3h 45m', savings: '$67' },
    { id: 'RT004', destination: 'East Industrial', status: 'completed', time: '2h 50m', savings: '$53' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 overflow-hidden">
      {/* Interactive Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-orange-300/20 to-red-300/20 rounded-full blur-3xl transition-all duration-1000"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div 
          className="absolute top-1/2 right-20 w-64 h-64 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-3xl transition-all duration-1000"
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`
          }}
        />
        <div 
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-yellow-300/20 to-orange-300/20 rounded-full blur-3xl transition-all duration-1000"
          style={{
            transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`
          }}
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/80 backdrop-blur-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                <Navigation className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold text-gray-800">EcoRoute</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search routes..."
                  className="pl-10 pr-4 py-2 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all w-64"
                />
              </div>
              
              <button className="relative p-2 text-gray-600 hover:text-orange-500 transition-colors">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-2 rounded-xl hover:bg-white/60 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                    <User className="text-white" size={16} />
                  </div>
                  <span className="text-gray-700 font-medium">Sarah Wilson</span>
                  <ChevronDown className="text-gray-400" size={16} />
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-md rounded-xl shadow-xl border border-gray-200 py-2">
                    <a href="#" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100/60 transition-colors">
                      <Settings size={16} />
                      <span>Settings</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100/60 transition-colors">
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-2">
              Route <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Intelligence</span>
            </h1>
            <p className="text-gray-600 text-lg">Real-time insights for smarter dispatch decisions</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-gray-200 shadow-sm">
              <Calendar className="w-5 h-5 text-gray-600" />
              <select 
                value={selectedPeriod} 
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-transparent border-none outline-none text-gray-700 font-medium"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
            
            <button className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 group">
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              Create Route
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { 
              title: 'CO₂ Emissions Saved', 
              value: kpiData.co2Saved.value, 
              unit: kpiData.co2Saved.unit, 
              change: kpiData.co2Saved.change,
              icon: TrendingDown,
              gradient: 'from-green-400 to-emerald-500',
              bgGradient: 'from-green-50 to-emerald-50',
              description: 'Environmental impact reduction'
            },
            { 
              title: 'Fuel Efficiency', 
              value: kpiData.fuelSaved.value, 
              unit: kpiData.fuelSaved.unit, 
              change: kpiData.fuelSaved.change,
              icon: Fuel,
              gradient: 'from-blue-400 to-cyan-500',
              bgGradient: 'from-blue-50 to-cyan-50',
              description: 'Total fuel consumption saved'
            },
            { 
              title: 'Route Optimization', 
              value: kpiData.deliveries.value, 
              unit: kpiData.deliveries.unit, 
              change: kpiData.deliveries.change,
              icon: Route,
              gradient: 'from-purple-400 to-pink-500',
              bgGradient: 'from-purple-50 to-pink-50',
              description: 'Successfully optimized routes'
            },
            { 
              title: 'Cost Savings', 
              value: kpiData.costSaved.value, 
              unit: kpiData.costSaved.unit, 
              change: kpiData.costSaved.change,
              icon: DollarSign,
              gradient: 'from-orange-400 to-red-500',
              bgGradient: 'from-orange-50 to-red-50',
              description: 'Total operational savings'
            }
          ].map((kpi, index) => (
            <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-200 hover:bg-white/90 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl bg-gradient-to-r ${kpi.gradient} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  <kpi.icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1">
                  <ArrowUp className="w-4 h-4 text-green-500" />
                  <span className="text-green-600 font-semibold text-sm">{kpi.change}</span>
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{kpi.title}</h3>
              <p className="text-gray-500 text-xs mb-3">{kpi.description}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">{kpi.value.toLocaleString()}</span>
                <span className="text-gray-500 text-sm font-medium">{kpi.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* CO2 Savings Chart */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Environmental Impact</h3>
                <p className="text-gray-600">CO₂ emissions reduction over time</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <RefreshCw size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Download size={16} />
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={co2ChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: 'none', 
                    borderRadius: '16px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="co2" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, fill: '#059669' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#94a3b8" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Route Distribution */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Route Distribution</h3>
            <p className="text-gray-600 mb-6">Optimization breakdown</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={routeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {routeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 mt-4">
              {routeDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-700 font-medium">{item.name}</span>
                  </div>
                  <span className="text-gray-900 font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Enhanced Map */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Delivery Zones</h3>
                <p className="text-gray-600">Live performance heatmap</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100/60 backdrop-blur-sm rounded-xl border border-gray-200 hover:bg-gray-200/60 transition-all duration-300">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Filter</span>
              </button>
            </div>
            
            <div className="relative bg-gradient-to-br from-slate-100 to-gray-200 rounded-2xl h-80 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-green-50/50"></div>
              
              {deliveryZones.map((zone) => (
                <div
                  key={zone.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
                >
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300 ${
                      zone.status === 'high' ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                      zone.status === 'medium' ? 'bg-gradient-to-r from-yellow-400 to-orange-400' :
                      'bg-gradient-to-r from-red-400 to-pink-500'
                    }`}>
                      {zone.deliveries}
                    </div>
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900/90 text-white px-3 py-2 rounded-xl text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      <div className="font-medium">{zone.name}</div>
                      <div className="text-gray-300">{zone.deliveries} deliveries • {zone.efficiency}% efficiency</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Routes */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Recent Routes</h3>
                <p className="text-gray-600">Latest optimization results</p>
              </div>
              <button className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium transition-colors">
                <Eye className="w-4 h-4" />
                <span className="text-sm">View All</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {recentRoutes.map((route) => (
                <div key={route.id} className="flex items-center justify-between p-4 bg-gray-50/60 rounded-2xl hover:bg-gray-100/60 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      route.status === 'completed' ? 'bg-green-100 text-green-600' :
                      route.status === 'active' ? 'bg-blue-100 text-blue-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{route.id}</div>
                      <div className="text-sm text-gray-600">{route.destination}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">{route.savings}</div>
                    <div className="text-sm text-gray-600">{route.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;