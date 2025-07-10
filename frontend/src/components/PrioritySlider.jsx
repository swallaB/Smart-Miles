import React from 'react';
import { Leaf, BarChart3, Clock, DollarSign, Zap } from 'lucide-react';

export function PrioritySlider({ settings, onChange }) {
  const priorities = [
    { 
      key: 'green', 
      label: 'Green', 
      icon: Leaf, 
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'Minimize environmental impact'
    },
    { 
      key: 'balanced', 
      label: 'Balanced', 
      icon: BarChart3, 
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      description: 'Balance all factors'
    },
    { 
      key: 'fast', 
      label: 'Fast', 
      icon: Clock, 
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'Minimize travel time'
    },
    { 
      key: 'cheap', 
      label: 'Cheap', 
      icon: DollarSign, 
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      description: 'Minimize costs'
    }
  ];

  const handlePriorityChange = (value) => {
    const priorityIndex = parseInt(value);
    const priority = priorities[priorityIndex];
    
    const newSettings = {
      ...settings,
      priority: priority.key,
      speed: priority.key === 'fast' ? 'fast' : priority.key === 'cheap' ? 'slow' : 'medium',
      cost: priority.key === 'cheap' ? 'cheap' : priority.key === 'fast' ? 'expensive' : 'medium',
      eco: priority.key === 'green' ? 'eco' : 'medium'
    };
    
    onChange(newSettings);
  };

  const currentPriorityIndex = priorities.findIndex(p => p.key === settings.priority);
  const currentPriority = priorities[currentPriorityIndex];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Route Priority</h3>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${currentPriority.bgColor}`}>
          <currentPriority.icon className={`w-4 h-4 ${currentPriority.color}`} />
          <span className={`text-sm font-medium ${currentPriority.color}`}>
            {currentPriority.label}
          </span>
        </div>
      </div>

      <div className="relative">
        <input
          type="range"
          min="0"
          max="3"
          step="1"
          value={currentPriorityIndex}
          onChange={(e) => handlePriorityChange(e.target.value)}
          className="w-full h-2 bg-gradient-to-r from-green-500 via-orange-500 via-blue-500 to-purple-500 rounded-lg appearance-none cursor-pointer slider"
        />
        
        {/* Priority markers */}
        <div className="flex justify-between mt-3">
          {priorities.map((priority, index) => (
            <button
              key={priority.key}
              onClick={() => handlePriorityChange(index.toString())}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 ${
                index === currentPriorityIndex
                  ? `${priority.bgColor} scale-110`
                  : 'hover:bg-gray-100'
              }`}
            >
              <priority.icon className={`w-4 h-4 ${
                index === currentPriorityIndex ? priority.color : 'text-gray-400'
              }`} />
              <span className={`text-xs font-medium ${
                index === currentPriorityIndex ? priority.color : 'text-gray-500'
              }`}>
                {priority.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-3">
        <p className="text-sm text-gray-600">{currentPriority.description}</p>
      </div>

      {/* Advanced Settings */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Advanced Settings</h4>
        
        {/* Vehicle Type */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Vehicle Type</label>
          <div className="grid grid-cols-3 gap-2">
            {(['EV', 'Diesel', 'Petrol']).map((type) => (
              <button
                key={type}
                onClick={() => onChange({ ...settings, vehicle: type })}
                className={`p-2 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                  settings.vehicle === type
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                {type === 'EV' && <Zap className="w-4 h-4 mx-auto mb-1" />}
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}