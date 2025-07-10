// Routing service using OSRM API
export class RoutingService {
  static OSRM_BASE_URL = 'https://router.project-osrm.org';
  
  static async getRoute(points) {
    try {
      const coordinates = points.map(p => `${p.lng},${p.lat}`).join(';');
      const response = await fetch(
        `${this.OSRM_BASE_URL}/route/v1/driving/${coordinates}?geometries=geojson&overview=full&steps=false`
      );
      
      if (!response.ok) {
        throw new Error('Routing failed');
      }
      
      const data = await response.json();
      
      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        return {
          coordinates: route.geometry.coordinates,
          distance: route.distance,
          duration: route.duration,
          geometry: JSON.stringify(route.geometry)
        };
      }
      
      throw new Error('No route found');
    } catch (error) {
      console.error('Routing error:', error);
      throw error;
    }
  }

  static async optimizeRoute(pickup, dropoffs, settings) {
    try {
      // For optimization, we'll use a combination of nearest neighbor and 2-opt
      // In a real app, you'd use a proper TSP solver or services like Google OR-Tools
      
      const optimizedOrder = await this.solveTSP(pickup, dropoffs, settings);
      const orderedWaypoints = [pickup, ...optimizedOrder];
      
      // Get the actual route with real coordinates
      const route = await this.getRoute(orderedWaypoints);
      
      // Calculate metrics based on real route data and settings
      const metrics = this.calculateMetrics(route, settings);
      
      return {
        route,
        waypoints: orderedWaypoints,
        metrics
      };
    } catch (error) {
      console.error('Route optimization error:', error);
      throw error;
    }
  }

  static async solveTSP(pickup, dropoffs, settings) {
    // Simple nearest neighbor with 2-opt improvement
    // This is a basic implementation - in production, use proper TSP solvers
    
    const unvisited = [...dropoffs];
    const visited = [];
    let current = pickup;
    
    // Nearest neighbor construction
    while (unvisited.length > 0) {
      let nearest = unvisited[0];
      let minDistance = this.calculateDistance(current, nearest);
      let nearestIndex = 0;
      
      for (let i = 1; i < unvisited.length; i++) {
        const distance = this.calculateDistance(current, unvisited[i]);
        const priority = this.getPriorityWeight(settings, distance);
        
        if (distance * priority < minDistance) {
          minDistance = distance * priority;
          nearest = unvisited[i];
          nearestIndex = i;
        }
      }
      
      visited.push(nearest);
      unvisited.splice(nearestIndex, 1);
      current = nearest;
    }
    
    // 2-opt improvement
    return this.twoOptImprove(visited, settings);
  }

  static twoOptImprove(route, settings) {
    let improved = true;
    let bestRoute = [...route];
    
    while (improved) {
      improved = false;
      
      for (let i = 0; i < bestRoute.length - 1; i++) {
        for (let j = i + 1; j < bestRoute.length; j++) {
          const newRoute = this.twoOptSwap(bestRoute, i, j);
          
          if (this.calculateRouteScore(newRoute, settings) < this.calculateRouteScore(bestRoute, settings)) {
            bestRoute = newRoute;
            improved = true;
          }
        }
      }
    }
    
    return bestRoute;
  }

  static twoOptSwap(route, i, j) {
    const newRoute = [...route];
    const segment = newRoute.slice(i, j + 1).reverse();
    newRoute.splice(i, j - i + 1, ...segment);
    return newRoute;
  }

  static calculateRouteScore(route, settings) {
    let totalDistance = 0;
    
    for (let i = 0; i < route.length - 1; i++) {
      totalDistance += this.calculateDistance(route[i], route[i + 1]);
    }
    
    return totalDistance * this.getPriorityWeight(settings, totalDistance);
  }

  static getPriorityWeight(settings, distance) {
    switch (settings.priority) {
      case 'fast':
        return 0.7; // Prefer shorter routes
      case 'cheap':
        return 1.2; // Allow longer routes for cost savings
      case 'green':
        return 0.8; // Moderate preference for shorter routes
      case 'balanced':
      default:
        return 1.0;
    }
  }

  static calculateDistance(p1, p2) {
    // Haversine formula for great circle distance
    const R = 6371; // Earth's radius in km
    const dLat = this.toRadians(p2.lat - p1.lat);
    const dLng = this.toRadians(p2.lng - p1.lng);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRadians(p1.lat)) * Math.cos(this.toRadians(p2.lat)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  static toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  static calculateMetrics(route, settings) {
    const distanceKm = route.distance / 1000;
    const timeMinutes = route.duration / 60;
    
    // Base calculations
    const baseFuelConsumption = distanceKm * 0.08; // 8L/100km average
    const baseCO2 = distanceKm * 0.18; // 180g CO2/km average
    const baseCost = distanceKm * 0.15; // $0.15/km base cost
    
    // Vehicle-specific multipliers
    const vehicleMultipliers = {
      EV: { fuel: 0.0, co2: 0.05, cost: 0.05 },
      Diesel: { fuel: 0.9, co2: 0.9, cost: 1.0 },
      Petrol: { fuel: 1.0, co2: 1.0, cost: 1.1 }
    };
    
    // Priority-specific adjustments
    const priorityMultipliers = {
      green: { fuel: 0.85, co2: 0.8, cost: 1.1 },
      balanced: { fuel: 1.0, co2: 1.0, cost: 1.0 },
      fast: { fuel: 1.2, co2: 1.15, cost: 1.3 },
      cheap: { fuel: 0.95, co2: 1.05, cost: 0.85 }
    };
    
    const vMultiplier = vehicleMultipliers[settings.vehicle];
    const pMultiplier = priorityMultipliers[settings.priority];
    
    const fuelUsed = baseFuelConsumption * vMultiplier.fuel * pMultiplier.fuel;
    const co2Emissions = baseCO2 * vMultiplier.co2 * pMultiplier.co2;
    const totalCost = baseCost * vMultiplier.cost * pMultiplier.cost;
    
    // Calculate savings compared to unoptimized route
    const unoptimizedFuel = baseFuelConsumption * 1.3; // 30% more fuel without optimization
    const unoptimizedCO2 = baseCO2 * 1.25; // 25% more CO2 without optimization
    
    return {
      totalDistance: Math.round(distanceKm * 10) / 10,
      totalTime: Math.round(timeMinutes),
      totalCost: Math.round(totalCost * 100) / 100,
      co2Emissions: Math.round(co2Emissions * 100) / 100,
      co2Saved: Math.round((unoptimizedCO2 - co2Emissions) * 100) / 100,
      fuelSaved: Math.round((unoptimizedFuel - fuelUsed) * 100) / 100,
      fuelUsed: Math.round(fuelUsed * 100) / 100
    };
  }
}