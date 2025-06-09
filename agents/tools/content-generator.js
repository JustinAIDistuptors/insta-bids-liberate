import OpenAI from 'openai';

export class ContentGenerator {
  constructor() {
    this.openai = process.env.OPENAI_API_KEY ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    }) : null;
  }

  async generate({ service, location, seoData, localData }) {
    if (!this.openai) {
      // Return high-quality mock content if no API key
      return this.generateMockContent(service, location, seoData, localData);
    }
    
    try {
      // Generate each section with AI
      const sections = {};
      
      // Build comprehensive context
      const context = this.buildContext(service, location, seoData, localData);
      
      // Generate sections
      sections.hero = await this.generateSection('hero', context);
      sections.problem = await this.generateSection('problem', context);
      sections.solution = await this.generateSection('solution', context);
      sections.local = await this.generateSection('local', context, localData);
      sections.valueProps = await this.generateValueProps(context);
      sections.faq = await this.generateFAQ(service, location, localData);
      
      // Generate metadata
      sections.seo = await this.generateSEO(service, location, seoData);
      
      return {
        ...sections,
        metadata: {
          generatedAt: new Date().toISOString(),
          model: 'gpt-4',
          location: location,
          service: service
        }
      };
      
    } catch (error) {
      console.warn('    ⚠️  OpenAI failed, using enhanced mock content:', error.message);
      return this.generateMockContent(service, location, seoData, localData);
    }
  }

  buildContext(service, location, seoData, localData) {
    return {
      service: service,
      location: location,
      city: localData.city || 'your city',
      state: localData.state || 'FL',
      population: localData.population || 50000,
      medianIncome: localData.medianIncome || 60000,
      competitors: seoData.competitors?.length || 10,
      primaryKeyword: seoData.keywords?.primary || `${service} ${location}`,
      searchVolume: seoData.keywords?.searchVolume?.primary || 200,
      commonIssues: this.getCommonIssues(service),
      pricing: this.getAveragePricing(service),
      urgency: this.getUrgencyFactors(service)
    };
  }

  async generateSection(sectionType, context, additionalData = {}) {
    const prompts = {
      hero: `Create a compelling hero section for a ${context.service} landing page in ${context.location}.
             Include: Strong headline mentioning location and service, subheadline about no middleman fees.
             Tone: Professional but approachable. Focus on direct contractor connections.`,
      
      problem: `Write about the hidden costs of finding ${context.service} services through traditional platforms.
                Include specific pain points: high advertising costs passed to customers, endless phone calls, 
                unclear pricing, and middleman markups. Use specific numbers where possible.`,
      
      solution: `Explain how InstaBids solves these problems for ${context.service} needs in ${context.location}.
                 Focus on: direct connections, transparent bidding, AI-powered matching, and cost savings.`,
      
      local: `Write locally-relevant content for ${context.location} (${context.city}).
              Include references to local areas, common ${context.service} issues in the area,
              and why local contractors are important. Population: ${context.population}.`
    };
    
    if (!this.openai) {
      return this.getMockSection(sectionType, context);
    }
    
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a expert copywriter for InstaBids, a platform that connects homeowners directly with contractors.'
        },
        {
          role: 'user',
          content: prompts[sectionType]
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });
    
    return response.choices[0].message.content;
  }

  generateMockContent(service, location, seoData, localData) {
    const serviceName = service.charAt(0).toUpperCase() + service.slice(1);
    const city = localData.city || 'Your City';
    const hiddenFees = Math.round(this.getAveragePricing(service) * 0.2);
    
    return {
      hero: {
        headline: `${serviceName} in ${location}? Use the InstaBids Agent System FREE`,
        subheadline: `From ${this.getCommonIssues(service)[0]} to multiple qualified bids - without a single phone call`,
        cta: {
          primary: "Start Your Free Project",
          secondary: "How It Works"
        }
      },
      
      problem: {
        header: `The Hidden Tax on Every ${serviceName} Project`,
        content: `When you search for '${service} near me', you're entering a system designed to extract money, not solve problems:\n\n` +
                 `• Contractors pay $300-$3,000 per customer in ads and leads\n` +
                 `• YOU pay for those costs in inflated quotes\n` +
                 `• Endless phone tag, unclear pricing, and wasted time\n` +
                 `• Lead-selling platforms profit while you overpay\n\n` +
                 `In ${location}, homeowners unknowingly pay an extra $${hiddenFees} just in hidden marketing fees.`,
        hiddenFees: hiddenFees
      },
      
      solution: {
        header: `The InstaBids Agent System: ${serviceName} Made Simple`,
        steps: [
          {
            title: "Define Your Project",
            description: `Snap a photo, chat with AI, or describe your needs. Our agents understand ${this.getCommonIssues(service).join(', ')}`
          },
          {
            title: "Receive Standardized Bids",
            description: `Get 3-5 quotes from pre-vetted ${service} professionals - all bidding on YOUR exact project`
          },
          {
            title: "Choose with Confidence",
            description: "Compare apples-to-apples pricing, see AI Confidence Scores, select your contractor"
          }
        ],
        supporting: `No phone calls. No sales pressure. No hidden fees. Just transparent connections with ${location}'s best ${service} professionals.`
      },
      
      valueProps: {
        forHomeowners: [
          `Save 15-30% by eliminating middleman markups`,
          `Get multiple bids without multiple meetings`,
          `AI Confidence Scores ensure quality matches`,
          `Keep dollars in ${location}'s economy`,
          `Zero cost to use - forever`
        ],
        trustIndicators: [
          "Contractors pay only when you choose them",
          "Your project, your terms, your timeline",
          "No spam, no data selling, no tricks"
        ]
      },
      
      local: {
        header: `Built for ${location} Homeowners`,
        content: `From ${city} and surrounding areas, we're connecting neighbors with trusted professionals. ` +
                 `Whether you're dealing with ${this.getLocalIssues(service, localData).join(' or ')}, ` +
                 `our ${service} network has you covered.\n\n` +
                 `Average ${service} project in ${location}: $${this.getAveragePricing(service)}. ` +
                 `Hidden platform fees you're currently paying: $${hiddenFees}`
      },
      
      faq: [
        {
          question: `How quickly can I get ${service} bids?`,
          answer: `Most homeowners receive 3-5 bids within 24-72 hours. For ${this.getUrgencyFactors(service)}, we can expedite to same-day responses.`
        },
        {
          question: `What if I need emergency ${service}?`,
          answer: `Our system prioritizes emergency requests. Just indicate urgency when starting your project, and available contractors are notified immediately.`
        },
        {
          question: `Are ${service} contractors vetted?`,
          answer: `All contractors must provide proof of ${this.getCertifications(service)}, insurance, and pass our AI-powered reputation analysis.`
        },
        {
          question: `How much can I save with InstaBids?`,
          answer: `By cutting out middleman fees and advertising costs, homeowners typically save 15-30% compared to traditional platforms.`
        }
      ],
      
      seo: {
        title: `${serviceName} ${location} - FREE Quotes from Local Contractors | InstaBids`,
        description: `Get 3-5 bids from trusted ${service} contractors in ${location} using the FREE InstaBids Agent System. Save 15-30% by cutting out the middleman.`,
        h1: `${serviceName} in ${location}? Get Free Bids from Trusted Local Pros`,
        keywords: seoData.keywords || {
          primary: `${service} ${location}`,
          secondary: [`${service} near me`, `best ${service} ${location}`, `emergency ${service}`]
        }
      },
      
      metadata: {
        generatedAt: new Date().toISOString(),
        model: 'mock-generator',
        location: location,
        service: service
      }
    };
  }

  getMockSection(sectionType, context) {
    const sections = {
      hero: {
        headline: `${context.service} in ${context.location}? Get Free Bids Now`,
        subheadline: 'Connect directly with local pros. No middleman fees.'
      },
      problem: `Hidden fees, endless calls, inflated quotes - the traditional way is broken.`,
      solution: `InstaBids connects you directly with ${context.service} professionals.`,
      local: `Serving ${context.city} with ${context.competitors} trusted ${context.service} contractors.`
    };
    
    return sections[sectionType] || '';
  }

  async generateValueProps(context) {
    const props = [
      `Save 15-30% by eliminating middleman markups`,
      `Get multiple bids without multiple meetings`,
      `AI Confidence Scores ensure quality matches`,
      `Keep dollars in ${context.location}'s economy`,
      `Zero cost to use - forever`,
      `Verified licenses and insurance`,
      `24/7 emergency availability`,
      `Transparent pricing upfront`
    ];
    
    return {
      forHomeowners: props.slice(0, 5),
      trustIndicators: props.slice(5)
    };
  }

  async generateFAQ(service, location, localData) {
    const commonQuestions = [
      {
        question: `How quickly can I get ${service} bids in ${location}?`,
        answer: `Most homeowners receive 3-5 bids within 24-72 hours. For emergencies, we can expedite to same-day responses.`
      },
      {
        question: `What areas do you serve near ${location}?`,
        answer: `We serve ${localData.city || location} and all surrounding areas within a 25-mile radius.`
      },
      {
        question: `Are the ${service} contractors licensed and insured?`,
        answer: `Yes, all contractors must provide proof of valid licenses, insurance, and pass our verification process.`
      },
      {
        question: `How much does InstaBids cost to use?`,
        answer: `InstaBids is completely free for homeowners. Contractors pay only when they win a job.`
      },
      {
        question: `Can I get same-day ${service} service?`,
        answer: `Yes, many of our contractors offer emergency and same-day service. Just indicate urgency in your request.`
      }
    ];
    
    return commonQuestions;
  }

  async generateSEO(service, location, seoData) {
    const serviceName = service.charAt(0).toUpperCase() + service.slice(1);
    
    return {
      title: seoData.recommendations?.title?.optimal || 
             `${serviceName} ${location} - FREE Quotes | Licensed & Insured | InstaBids`,
      description: seoData.recommendations?.meta?.description ||
                   `Get free ${service} quotes in ${location}. Compare 3-5 bids from licensed contractors. No middleman fees. Available 24/7.`,
      h1: `${serviceName} in ${location}? Get Free Bids from Trusted Local Pros`,
      canonical: `https://instabids.ai/${service}/${location}/`,
      keywords: seoData.keywords || {
        primary: `${service} ${location}`,
        secondary: [`${service} near me`, `${service} contractor ${location}`]
      }
    };
  }

  getCommonIssues(service) {
    const issues = {
      plumber: ['burst pipes', 'leaky faucets', 'clogged drains', 'water heater failure'],
      electrician: ['power outages', 'faulty wiring', 'circuit breaker issues', 'outlet problems'],
      hvac: ['no cooling', 'no heat', 'high energy bills', 'poor air quality'],
      roofer: ['roof leaks', 'storm damage', 'missing shingles', 'gutter problems'],
      painter: ['peeling paint', 'water damage', 'faded colors', 'preparation needs'],
      landscaper: ['overgrown yards', 'dead grass', 'drainage issues', 'tree removal'],
      cleaner: ['deep cleaning', 'move-out cleaning', 'construction cleanup', 'regular maintenance'],
      handyman: ['home repairs', 'fixture installation', 'drywall repair', 'general maintenance'],
      locksmith: ['lockouts', 'broken keys', 'lock replacement', 'security upgrades'],
      'pest-control': ['ant infestations', 'termites', 'rodents', 'bed bugs']
    };
    
    return issues[service] || ['general repairs', 'maintenance', 'installations'];
  }

  getLocalIssues(service, localData) {
    // Location-specific issues based on climate/region
    const state = localData.state || 'FL';
    
    if (state === 'FL') {
      return {
        plumber: ['hurricane damage', 'salt water corrosion', 'high water table issues'],
        hvac: ['constant AC usage', 'humidity control', 'salt air damage'],
        roofer: ['hurricane damage', 'intense sun damage', 'heavy rain wear']
      }[service] || ['weather-related damage', 'coastal wear'];
    }
    
    return ['seasonal damage', 'weather-related issues'];
  }

  getAveragePricing(service) {
    const pricing = {
      plumber: 450,
      electrician: 500,
      hvac: 600,
      roofer: 800,
      painter: 400,
      landscaper: 300,
      cleaner: 200,
      handyman: 250,
      locksmith: 150,
      'pest-control': 300
    };
    
    return pricing[service] || 350;
  }

  getUrgencyFactors(service) {
    const urgency = {
      plumber: 'burst pipes, major leaks, or sewage backups',
      electrician: 'power outages, sparking, or electrical fires',
      hvac: 'no heat in winter or AC failure in summer',
      roofer: 'active leaks or storm damage',
      locksmith: 'lockouts or security breaches'
    };
    
    return urgency[service] || 'emergency situations';
  }

  getCertifications(service) {
    const certs = {
      plumber: 'state plumbing license',
      electrician: 'master electrician license',
      hvac: 'EPA certification and HVAC license',
      roofer: 'roofing contractor license',
      painter: 'contractor license'
    };
    
    return certs[service] || 'appropriate licenses';
  }
}
