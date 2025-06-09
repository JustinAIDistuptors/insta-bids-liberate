export class RateLimiter {
  constructor(config) {
    this.limits = config;
    this.usage = {};
    
    // Initialize usage tracking
    for (const [service, limits] of Object.entries(this.limits)) {
      this.usage[service] = {
        requests: [],
        window: limits.window || 60000 // Default 1 minute
      };
    }
  }

  async wait(service) {
    if (!this.limits[service]) {
      return; // No limit configured
    }
    
    const now = Date.now();
    const limit = this.limits[service].limit;
    const window = this.limits[service].window;
    
    // Clean old requests
    this.usage[service].requests = this.usage[service].requests
      .filter(timestamp => now - timestamp < window);
    
    // Check if we're at limit
    if (this.usage[service].requests.length >= limit) {
      // Calculate wait time
      const oldestRequest = this.usage[service].requests[0];
      const waitTime = (oldestRequest + window) - now;
      
      if (waitTime > 0) {
        console.log(`  ⏳ Rate limit reached for ${service}, waiting ${(waitTime / 1000).toFixed(1)}s...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        
        // Clean again after waiting
        this.usage[service].requests = this.usage[service].requests
          .filter(timestamp => Date.now() - timestamp < window);
      }
    }
    
    // Record this request
    this.usage[service].requests.push(Date.now());
  }

  getUsage(service) {
    if (!this.usage[service]) return null;
    
    const now = Date.now();
    const window = this.limits[service].window;
    
    // Clean old requests
    this.usage[service].requests = this.usage[service].requests
      .filter(timestamp => now - timestamp < window);
    
    return {
      current: this.usage[service].requests.length,
      limit: this.limits[service].limit,
      window: window,
      percentage: (this.usage[service].requests.length / this.limits[service].limit) * 100
    };
  }

  getAllUsage() {
    const usage = {};
    for (const service of Object.keys(this.limits)) {
      usage[service] = this.getUsage(service);
    }
    return usage;
  }
}
