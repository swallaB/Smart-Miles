import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search, X, Clock } from 'lucide-react';
import { GeocodingService } from '../services/geocoding';

export function LocationInput({ 
  value, 
  onChange, 
  placeholder, 
  icon = <MapPin className="w-5 h-5" />,
  className = ""
}) {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const inputRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Debounce the search
    if (newValue.length > 2) {
      setIsLoading(true);
      timeoutRef.current = setTimeout(async () => {
        try {
          const results = await GeocodingService.geocodeAddress(newValue);
          setSuggestions(results);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Geocoding error:', error);
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      }, 300);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const location = {
      lat: suggestion.lat,
      lng: suggestion.lng,
      address: suggestion.address,
      id: Date.now().toString()
    };
    
    onChange(location);
    setInputValue(suggestion.address);
    setShowSuggestions(false);
    
    // Add to recent searches
    const updatedRecent = [suggestion.address, ...recentSearches.filter(s => s !== suggestion.address)].slice(0, 5);
    setRecentSearches(updatedRecent);
    localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));
  };

  const clearInput = () => {
    setInputValue('');
    setSuggestions([]);
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleFocus = () => {
    if (inputValue.length <= 2 && recentSearches.length > 0) {
      setShowSuggestions(true);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          {icon}
        </div>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-200"
          placeholder={placeholder}
        />
        {(isLoading || inputValue) && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <button
                onClick={clearInput}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50 max-h-80 overflow-y-auto">
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-start gap-3">
                  <Search className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 truncate">
                      {suggestion.displayName.split(',')[0]}
                    </div>
                    <div className="text-sm text-gray-500 truncate">
                      {suggestion.displayName}
                    </div>
                  </div>
                </div>
              </button>
            ))
          ) : inputValue.length <= 2 && recentSearches.length > 0 ? (
            <>
              <div className="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-50">
                Recent Searches
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleInputChange({ target: { value: search } })}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{search}</span>
                  </div>
                </button>
              ))}
            </>
          ) : inputValue.length > 2 ? (
            <div className="px-4 py-8 text-center text-gray-500">
              No locations found
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}