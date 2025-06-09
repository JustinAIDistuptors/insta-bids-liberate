import fetch from 'node-fetch';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class SEOResearcher {
  constructor() {
    this.serpApiKey = process.env.SERP_API_KEY;
    this.cacheDir = path.join(__dirname, '../../data/research');
  }

  async research(location, service) {
    // Check cache first
    const cached = await this.checkCache(location, service);
    if (cached) {
      console.log('    📋 Using cached SEO data');
      return cached;
    }
    
    // Fetch fresh data
    const competitors = await this.getTopCompetitors(location, service);
    const patterns = await this.analyzeSEOPatterns(competitors);
    const keywords = await this.getKeywordData(location, service);
    const localSearchTerms = await this.getLocalSearchTerms(location, service);
    
    const seoData = {
      competitors,
      patterns,
      keywords,
      localSearchTerms,
      recommendations: this.generateRecommendations(patterns, keywords),
      cachedAt: new Date().toISOString()
    };
    
    // Save to cache
    await this.saveCache(location, service, seoData);
    
    return seoData;
  }

  async getTopCompetitors(location, service) {
    if (!this.serpApiKey) {
      // Return mock data if no API key
      return this.getMockCompetitors(location, service);
    }
    
    try {
      const response = await fetch(
        `https://serpapi.com/search.json?` + new URLSearchParams({
          api_key: this.serpApiKey,
          q: `${service} near ${location}`,
          location: `${location}, United States`,
          hl: 'en',
          gl: 'us',
          num: 10
        })
      );
      
      if (!response.ok) {
        throw new Error(`SerpAPI error: ${response.status}`);
      }
      
      const data = await response.json();
      
      return data.organic_results?.map(result => ({
        title: result.title,
        url: result.link,
        snippet: result.snippet,
        position: result.position
      })) || [];
      
    } catch (error) {
      console.warn('    ⚠️  SerpAPI failed, using mock data:', error.message);
      return this.getMockCompetitors(location, service);
    }
  }

  getMockCompetitors(location, service) {
    // Realistic mock data for testing
    const companies = [
      'Ace', 'Best', 'Pro', 'Expert', 'Quality', 
      'Reliable', 'Fast', 'Local', 'Premier', 'Top'
    ];
    
    return companies.slice(0, 5).map((company, i) => ({
      title: `${company} ${service.charAt(0).toUpperCase() + service.slice(1)} in ${location} - 24/7 Service`,
      url: `https://example${i+1}.com`,
      snippet: `Professional ${service} services in ${location}. Licensed, insured, and available 24/7. Call now for free estimate.`,
      position: i + 1
    }));
  }

  async analyzeSEOPatterns(competitors) {
    const patterns = {
      titleFormulas: [],
      commonKeywords: {},
      avgTitleLength: 0,
      avgDescriptionLength: 0,
      commonPhrases: []
    };
    
    // Analyze titles
    let totalTitleLength = 0;
    const allWords = [];
    
    competitors.forEach(comp => {
      totalTitleLength += comp.title.length;
      
      // Extract words
      const words = comp.title.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 2);
      
      allWords.push(...words);
      
      // Extract patterns
      if (comp.title.includes('24/7')) patterns.commonPhrases.push('24/7');
      if (comp.title.includes('Free')) patterns.commonPhrases.push('Free Estimate');
      if (comp.title.includes('Licensed')) patterns.commonPhrases.push('Licensed & Insured');
    });
    
    // Count word frequency
    allWords.forEach(word => {
      patterns.commonKeywords[word] = (patterns.commonKeywords[word] || 0) + 1;
    });
    
    // Sort keywords by frequency
    patterns.commonKeywords = Object.entries(patterns.commonKeywords)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {});
    
    patterns.avgTitleLength = Math.round(totalTitleLength / competitors.length);
    patterns.commonPhrases = [...new Set(patterns.commonPhrases)];
    
    // Generate title formulas
    patterns.titleFormulas = [
      `[Service] in [Location] - 24/7 Emergency Service`,
      `Best [Service] in [Location] | Licensed & Insured`,
      `[Location] [Service] - Free Estimates | Same Day Service`,
      `#1 [Service] Near [Location] | [Company Name]`
    ];
    
    return patterns;
  }

  async getKeywordData(location, service) {
    // In production, this would call SEMrush or Ahrefs API
    // For now, generate intelligent keyword suggestions
    
    const baseKeywords = {
      primary: `${service} ${location}`,
      secondary: [
        `${service} near me ${location}`,
        `best ${service} in ${location}`,
        `emergency ${service} ${location}`,
        `24 hour ${service} ${location}`,
        `${service} service ${location}`,
        `local ${service} ${location}`,
        `affordable ${service} ${location}`,
        `${service} contractor ${location}`
      ],
      longTail: [
        `how much does ${service} cost in ${location}`,
        `${service} available today in ${location}`,
        `licensed ${service} near ${location}`,
        `${service} free estimate ${location}`
      ]
    };
    
    // Add service-specific keywords
    const serviceSpecific = {
      plumber: ['leak repair', 'drain cleaning', 'water heater', 'pipe replacement'],
      electrician: ['panel upgrade', 'outlet installation', 'wiring repair', 'lighting'],
      hvac: ['ac repair', 'furnace', 'duct cleaning', 'thermostat'],
      roofer: ['roof repair', 'shingle replacement', 'leak', 'storm damage'],
      painter: ['interior painting', 'exterior', 'cabinet', 'deck staining']
    };
    
    if (serviceSpecific[service]) {
      serviceSpecific[service].forEach(term => {
        baseKeywords.secondary.push(`${term} ${location}`);
      });
    }
    
    // Estimate search volumes (mock data)
    const searchVolume = {
      primary: Math.floor(Math.random() * 500) + 100,
      local: Math.floor(Math.random() * 200) + 50,
      mobile: Math.floor(Math.random() * 300) + 100
    };
    
    return {
      ...baseKeywords,
      searchVolume,
      difficulty: Math.floor(Math.random() * 50) + 30, // 30-80 difficulty
      cpc: (Math.random() * 20 + 5).toFixed(2) // $5-25 CPC
    };
  }

  async getLocalSearchTerms(location, service) {
    // Generate location-specific search terms
    return [
      `${service} ${location} reviews`,
      `${service} companies in ${location}`,
      `hire ${service} ${location}`,
      `${service} cost ${location}`,
      `${location} ${service} recommendations`
    ];
  }

  generateRecommendations(patterns, keywords) {
    return {
      title: {
        optimal: `${keywords.primary} - 24/7 Service | Licensed & Insured`,
        length: '50-60 characters',
        mustInclude: [keywords.primary, ...patterns.commonPhrases.slice(0, 2)]
      },
      meta: {
        description: `Get free quotes from trusted ${keywords.primary} contractors. Licensed, insured, available 24/7. No middleman fees.`,
        length: '150-160 characters'
      },
      content: {
        primaryKeywordDensity: '1-2%',
        useKeywords: keywords.secondary.slice(0, 5),
        includeLocalReferences: true,
        minWordCount: 1500
      },
      schema: {
        types: ['LocalBusiness', 'Service', 'Organization'],
        required: ['name', 'address', 'telephone', 'openingHours']
      }
    };
  }

  async checkCache(location, service) {
    try {
      const cachePath = path.join(this.cacheDir, location, service, 'seo-data.json');
      const data = await fs.readFile(cachePath, 'utf8');
      const parsed = JSON.parse(data);
      
      // Check if cache is less than 30 days old
      const cacheAge = Date.now() - new Date(parsed.cachedAt).getTime();
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;
      
      if (cacheAge < thirtyDays) {
        return parsed;
      }
    } catch (error) {
      // No cache or error reading
    }
    
    return null;
  }

  async saveCache(location, service, data) {
    try {
      const cachePath = path.join(this.cacheDir, location, service);
      await fs.mkdir(cachePath, { recursive: true });
      
      await fs.writeFile(
        path.join(cachePath, 'seo-data.json'),
        JSON.stringify(data, null, 2)
      );
    } catch (error) {
      console.warn('Failed to save cache:', error.message);
    }
  }
}
