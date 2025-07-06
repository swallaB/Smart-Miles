import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Truck, 
  Route, 
  BarChart3, 
  Shield, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  Navigation,
  Users,
  Globe,
  Mail,
  Lock,
  User,
  X,
  Menu,
  Timer,
  TrendingDown,
  Compass,
  Activity,
  Target,
  Layers,
  Cpu,
  Star,
  Award,
  Play
} from 'lucide-react';

export default function EcoRouteApp() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  const LoginPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 relative overflow-hidden">
      {/* Geometric Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-orange-400 rounded-full transform rotate-45"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-red-400 rounded-lg transform rotate-12"></div>
        <div className="absolute bottom-32 left-32 w-40 h-40 bg-pink-400 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-orange-500 rounded-lg transform -rotate-12"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md shadow-2xl border border-orange-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl mb-6 shadow-lg">
              <Navigation className="text-white" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Access your dispatch dashboard</p>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400" size={20} />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-4 bg-white/70 border border-orange-200 rounded-xl text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400" size={20} />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-4 bg-white/70 border border-orange-200 rounded-xl text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-600">
                <input type="checkbox" className="mr-2 rounded accent-orange-400" />
                Remember me
              </label>
              <a href="#" className="text-orange-500 hover:text-orange-600 transition-colors">
                Forgot password?
              </a>
            </div>

            <button className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white py-4 rounded-xl font-medium hover:from-orange-500 hover:to-red-600 transform hover:scale-105 transition-all duration-200 shadow-lg">
              Sign In
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              New dispatcher?{' '}
              <button
                onClick={() => setCurrentPage('signup')}
                className="text-orange-500 hover:text-orange-600 font-medium transition-colors"
              >
                Create Account
              </button>
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('landing')}
            className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowRight className="rotate-180" size={24} />
          </button>
        </div>
      </div>
    </div>
  );

  const SignupPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 relative overflow-hidden">
      {/* Geometric Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-32 right-32 w-36 h-36 bg-purple-400 rounded-full"></div>
        <div className="absolute top-20 left-40 w-20 h-20 bg-indigo-400 rounded-lg transform rotate-45"></div>
        <div className="absolute bottom-40 left-20 w-32 h-32 bg-blue-400 rounded-full"></div>
        <div className="absolute bottom-20 right-40 w-24 h-24 bg-purple-500 rounded-lg transform -rotate-30"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md shadow-2xl border border-purple-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-2xl mb-6 shadow-lg">
              <Route className="text-white" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Join EcoRoute</h1>
            <p className="text-gray-600">Start optimizing your routes</p>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full pl-12 pr-4 py-4 bg-white/70 border border-purple-200 rounded-xl text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-4 bg-white/70 border border-purple-200 rounded-xl text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              />
            </div>

            <div className="relative">
              <Truck className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
              <input
                type="text"
                placeholder="Company Name"
                className="w-full pl-12 pr-4 py-4 bg-white/70 border border-purple-200 rounded-xl text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-4 bg-white/70 border border-purple-200 rounded-xl text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              />
            </div>

            <div className="text-sm">
              <label className="flex items-start text-gray-600">
                <input type="checkbox" className="mr-3 mt-1 rounded accent-purple-400" />
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>

            <button className="w-full bg-gradient-to-r from-purple-400 to-indigo-600 text-white py-4 rounded-xl font-medium hover:from-purple-500 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
              Create Account
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => setCurrentPage('login')}
                className="text-purple-500 hover:text-purple-600 font-medium transition-colors"
              >
                Sign In
              </button>
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('landing')}
            className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowRight className="rotate-180" size={24} />
          </button>
        </div>
      </div>
    </div>
  );

  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 overflow-hidden">
      {/* Interactive Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-orange-300/20 to-red-300/20 rounded-full blur-3xl transition-all duration-1000"
          style={{
            transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`
          }}
        />
        <div 
          className="absolute top-1/2 right-20 w-64 h-64 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-3xl transition-all duration-1000"
          style={{
            transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)`
          }}
        />
        <div 
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-yellow-300/20 to-orange-300/20 rounded-full blur-3xl transition-all duration-1000"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${scrollY > 50 ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-white/80 backdrop-blur-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                <Navigation className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold text-gray-800">EcoRoute</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">

              <button
                onClick={() => setCurrentPage('login')}
                className="text-gray-600 hover:text-orange-500 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => setCurrentPage('signup')}
                className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-2 rounded-xl hover:from-orange-500 hover:to-red-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Get Started
              </button>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8 shadow-lg border border-orange-200">
              <Cpu className="text-orange-500 mr-2" size={20} />
              <span className="text-sm font-medium text-gray-700">Next-Gen Route Intelligence</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-gray-800 mb-6 leading-tight">
              Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Routes</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">Smarter</span> Business
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Revolutionary dispatch platform that transforms how you manage deliveries. 
              Intelligent algorithms, real-time optimization, and actionable insights for modern logistics.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={() => setCurrentPage('signup')}
                className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-8 py-4 rounded-2xl font-medium hover:from-orange-500 hover:to-red-600 transform hover:scale-105 transition-all duration-200 shadow-xl flex items-center group"
              >
                Start Optimizing
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              
              <button className="bg-white/80 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-2xl font-medium hover:bg-white transition-all duration-200 shadow-lg border border-gray-200 flex items-center group">
                <Play className="mr-2 group-hover:scale-110 transition-transform" size={20} />
                Watch Demo
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16">
              <div className="flex flex-col items-center">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={20} />
                  ))}
                  <span className="ml-2 text-gray-600 font-medium">5.0 from 200+ reviews</span>
                </div>
                
                <div className="flex items-center space-x-8 opacity-70">
                  <div className="flex items-center space-x-2">
                    <Award className="text-orange-500" size={16} />
                    <span className="text-sm text-gray-600">Industry Leading</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="text-green-500" size={16} />
                    <span className="text-sm text-gray-600">Secure & Reliable</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="text-blue-500" size={16} />
                    <span className="text-sm text-gray-600">Lightning Fast</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">
              Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">EcoRoute</span> Wins
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced features designed for the modern dispatch professional
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: Route,
                title: "AI Route Optimization",
                description: "Machine learning algorithms analyze patterns and optimize routes in real-time for maximum efficiency.",
                color: "from-orange-400 to-red-500",
                bgColor: "from-orange-50 to-red-50"
              },
              {
                icon: Target,
                title: "Smart Fleet Management",
                description: "Comprehensive fleet tracking with predictive maintenance and performance optimization.",
                color: "from-purple-400 to-pink-500",
                bgColor: "from-purple-50 to-pink-50"
              },
              {
                icon: BarChart3,
                title: "Advanced Analytics",
                description: "Deep insights into your operations with customizable dashboards and predictive reports.",
                color: "from-yellow-400 to-orange-500",
                bgColor: "from-yellow-50 to-orange-50"
              },
              {
                icon: Zap,
                title: "Real-Time Updates",
                description: "Live tracking and instant notifications keep you informed of every delivery milestone.",
                color: "from-green-400 to-emerald-500",
                bgColor: "from-green-50 to-emerald-50"
              },
              {
                icon: Layers,
                title: "Multi-Platform Integration",
                description: "Seamlessly connect with your existing tools and systems for unified operations.",
                color: "from-blue-400 to-cyan-500",
                bgColor: "from-blue-50 to-cyan-50"
              },
              {
                icon: Compass,
                title: "Dynamic Routing",
                description: "Adaptive route planning that responds to traffic, weather, and real-time conditions.",
                color: "from-indigo-400 to-purple-500",
                bgColor: "from-indigo-50 to-purple-50"
              }
            ].map((feature, index) => (
              <div key={index} className={`group p-8 bg-gradient-to-br ${feature.bgColor} rounded-3xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border border-gray-100`}>
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-orange-100 to-red-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Revolutionize</span> Your Routes?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join the next generation of intelligent dispatch management.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('signup')}
              className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-8 py-4 rounded-2xl font-medium hover:from-orange-500 hover:to-red-600 transform hover:scale-105 transition-all duration-200 shadow-xl flex items-center justify-center group"
            >
              Start Your Journey
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                <Navigation className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold">EcoRoute Optimizer</span>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2025 EcoRoute Optimizer. Intelligent logistics for modern dispatchers.</p>
          </div>
        </div>
      </footer>
    </div>
  );

  if (currentPage === 'login') return <LoginPage />;
  if (currentPage === 'signup') return <SignupPage />;
  return <LandingPage />;
}