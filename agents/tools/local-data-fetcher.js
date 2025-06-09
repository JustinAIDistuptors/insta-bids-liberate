export class LocalDataFetcher {
  constructor() {
    // In production, this would connect to Census API, Google Places, etc.
    this.zipDatabase = this.loadZipDatabase();
  }

  async fetch(location) {
    // Get data from our database
    const localData = this.zipDatabase[location] || this.getDefaultData(location);
    
    // Add computed fields
    localData.state = this.getStateFromZip(location);
    localData.region = this.getRegionFromZip(location);
    localData.marketSize = this.calculateMarketSize(localData.population);
    
    return localData;
  }

  loadZipDatabase() {
    // Comprehensive ZIP code database
    // In production, this would be loaded from a real database
    return {
      // Florida
      '33442': {
        city: 'Deerfield Beach',
        county: 'Broward County',
        population: 80863,
        medianIncome: 58547,
        medianHomeValue: 285000,
        avgHomeAge: 35,
        topEmployers: ['JM Family Enterprises', 'Broward Health', 'Publix'],
        climate: 'tropical',
        commonIssues: {
          plumber: ['Salt water corrosion', 'Hurricane damage', 'High water table'],
          hvac: ['Constant AC usage', 'High humidity', 'Salt air corrosion'],
          roofer: ['Hurricane damage', 'Sun damage', 'Heavy rain']
        },
        landmarks: ['Deerfield Beach Pier', 'Quiet Waters Park', 'Hillsboro Inlet']
      },
      '33441': {
        city: 'Deerfield Beach',
        county: 'Broward County',
        population: 25346,
        medianIncome: 61234,
        medianHomeValue: 295000,
        avgHomeAge: 30,
        climate: 'tropical'
      },
      '33064': {
        city: 'Pompano Beach',
        county: 'Broward County',
        population: 27938,
        medianIncome: 52341,
        medianHomeValue: 265000,
        avgHomeAge: 40,
        climate: 'tropical'
      },
      
      // New York
      '10001': {
        city: 'New York',
        area: 'Manhattan - Chelsea',
        population: 21102,
        medianIncome: 95243,
        medianHomeValue: 1250000,
        avgHomeAge: 87,
        topEmployers: ['Google', 'Facebook', 'NYU'],
        climate: 'humid continental',
        commonIssues: {
          plumber: ['Old pipe corrosion', 'Frozen pipes', 'High-rise pressure'],
          electrician: ['Old wiring', 'High demand loads', 'Code updates'],
          hvac: ['Radiator issues', 'Window units', 'Space constraints']
        },
        landmarks: ['Madison Square Garden', 'High Line', 'Hudson Yards']
      },
      
      // California
      '90210': {
        city: 'Beverly Hills',
        county: 'Los Angeles County',
        population: 21548,
        medianIncome: 195000,
        medianHomeValue: 3500000,
        avgHomeAge: 55,
        topEmployers: ['Entertainment Industry', 'Retail', 'Healthcare'],
        climate: 'mediterranean',
        commonIssues: {
          plumber: ['Earthquake damage', 'Drought restrictions', 'Pool systems'],
          hvac: ['Mild climate needs', 'Air quality', 'Energy efficiency'],
          landscaper: ['Drought-resistant plants', 'Water restrictions', 'Fire safety']
        },
        landmarks: ['Rodeo Drive', 'Beverly Gardens Park', 'Greystone Mansion']
      },
      
      // Texas
      '77001': {
        city: 'Houston',
        area: 'Downtown',
        population: 12879,
        medianIncome: 45234,
        medianHomeValue: 225000,
        avgHomeAge: 45,
        climate: 'humid subtropical',
        commonIssues: {
          plumber: ['Foundation shifts', 'Heavy rain flooding', 'Clay soil'],
          hvac: ['High humidity', 'Energy costs', 'Extreme heat'],
          roofer: ['Hurricane damage', 'Hail damage', 'Heat damage']
        },
        landmarks: ['Downtown Houston', 'Buffalo Bayou', 'Discovery Green']
      },
      
      // Illinois
      '60601': {
        city: 'Chicago',
        area: 'The Loop',
        population: 23456,
        medianIncome: 78234,
        medianHomeValue: 385000,
        avgHomeAge: 65,
        climate: 'humid continental',
        commonIssues: {
          plumber: ['Frozen pipes', 'Old infrastructure', 'High-rise issues'],
          hvac: ['Extreme temperature swings', 'Old boilers', 'Energy efficiency'],
          roofer: ['Snow load', 'Ice dams', 'Wind damage']
        },
        landmarks: ['Willis Tower', 'Millennium Park', 'Art Institute']
      }
    };
  }

  getDefaultData(location) {
    // Generate reasonable defaults based on ZIP patterns
    const stateData = this.getStateDefaults(this.getStateFromZip(location));
    
    return {
      city: `City ${location}`,
      county: 'Local County',
      population: Math.floor(Math.random() * 50000) + 10000,
      medianIncome: stateData.avgIncome + Math.floor(Math.random() * 20000) - 10000,
      medianHomeValue: stateData.avgHomeValue + Math.floor(Math.random() * 50000) - 25000,
      avgHomeAge: Math.floor(Math.random() * 40) + 20,
      climate: stateData.climate,
      commonIssues: stateData.commonIssues,
      landmarks: ['City Center', 'Main Street', 'Local Park']
    };
  }

  getStateFromZip(zip) {
    const prefix = parseInt(zip.substring(0, 3));
    
    // ZIP code prefix to state mapping
    if (prefix >= 10 && prefix <= 27) return 'NY';
    if (prefix >= 70 && prefix <= 71) return 'LA';
    if (prefix >= 90 && prefix <= 96) return 'CA';
    if (prefix >= 320 && prefix <= 349) return 'FL';
    if (prefix >= 750 && prefix <= 799) return 'TX';
    if (prefix >= 600 && prefix <= 629) return 'IL';
    if (prefix >= 480 && prefix <= 489) return 'MI';
    if (prefix >= 430 && prefix <= 459) return 'OH';
    if (prefix >= 190 && prefix <= 197) return 'PA';
    if (prefix >= 200 && prefix <= 212) return 'VA';
    if (prefix >= 300 && prefix <= 319) return 'GA';
    if (prefix >= 270 && prefix <= 289) return 'NC';
    
    return 'US'; // Default
  }

  getRegionFromZip(zip) {
    const state = this.getStateFromZip(zip);
    const regions = {
      'NY': 'Northeast',
      'PA': 'Northeast',
      'FL': 'Southeast',
      'GA': 'Southeast',
      'TX': 'South',
      'LA': 'South',
      'CA': 'West',
      'IL': 'Midwest',
      'MI': 'Midwest',
      'OH': 'Midwest'
    };
    
    return regions[state] || 'United States';
  }

  getStateDefaults(state) {
    const defaults = {
      'FL': {
        avgIncome: 55000,
        avgHomeValue: 275000,
        climate: 'tropical/subtropical',
        commonIssues: {
          plumber: ['Corrosion', 'Hurricane damage', 'High water table'],
          hvac: ['Constant AC', 'Humidity', 'Salt air'],
          roofer: ['Hurricane damage', 'Sun damage', 'Heavy rain']
        }
      },
      'NY': {
        avgIncome: 75000,
        avgHomeValue: 450000,
        climate: 'humid continental',
        commonIssues: {
          plumber: ['Frozen pipes', 'Old infrastructure', 'High-rise issues'],
          electrician: ['Old wiring', 'High loads', 'Code compliance'],
          hvac: ['Extreme seasons', 'Old systems', 'Space limits']
        }
      },
      'CA': {
        avgIncome: 80000,
        avgHomeValue: 650000,
        climate: 'mediterranean',
        commonIssues: {
          plumber: ['Earthquake damage', 'Drought', 'Old pipes'],
          hvac: ['Mild climate', 'Air quality', 'Energy codes'],
          landscaper: ['Water restrictions', 'Fire safety', 'Drought plants']
        }
      },
      'TX': {
        avgIncome: 60000,
        avgHomeValue: 250000,
        climate: 'varied',
        commonIssues: {
          plumber: ['Foundation shifts', 'Clay soil', 'Extreme weather'],
          hvac: ['Extreme heat', 'Energy costs', 'Humidity'],
          roofer: ['Hail damage', 'Heat damage', 'Storm damage']
        }
      }
    };
    
    return defaults[state] || {
      avgIncome: 55000,
      avgHomeValue: 250000,
      climate: 'temperate',
      commonIssues: {
        plumber: ['General repairs', 'Maintenance'],
        hvac: ['Seasonal needs', 'Efficiency'],
        roofer: ['Weather damage', 'Age']
      }
    };
  }

  calculateMarketSize(population) {
    // Estimate number of households and service frequency
    const households = Math.floor(population / 2.5); // Average household size
    const serviceFrequency = {
      annual: households * 0.3,  // 30% need service annually
      emergency: households * 0.05, // 5% have emergencies
      total: households * 0.35
    };
    
    return {
      households,
      potentialCustomers: serviceFrequency.total,
      annualServiceNeeds: serviceFrequency.annual,
      emergencyNeeds: serviceFrequency.emergency
    };
  }
}
