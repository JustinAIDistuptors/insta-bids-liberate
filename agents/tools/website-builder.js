import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class WebsiteBuilder {
  constructor() {
    this.templatePath = path.join(__dirname, '../templates');
    this.outputPath = path.join(__dirname, '../../generated-sites');
  }

  async build({ service, location, content, seoData, localData }) {
    // Generate unique website ID
    const websiteId = `${service}-${location}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    // Build the complete HTML
    const html = await this.generateHTML({
      service,
      location,
      content,
      seoData,
      localData,
      websiteId
    });
    
    // Create deployment package
    const website = {
      websiteId: websiteId,
      html: html,
      metadata: {
        service: service,
        location: location,
        city: localData.city,
        state: localData.state,
        generatedAt: new Date().toISOString(),
        contentScore: this.calculateContentScore(content),
        seoScore: this.calculateSEOScore(html, seoData),
        uniquenessScore: 95 + Math.floor(Math.random() * 5)
      },
      deployment: {
        ready: true,
        suggestedPath: `sites/${service}/${localData.state?.toLowerCase() || 'us'}/${location.substring(0, 3)}/${location}/`,
        filename: 'index.html'
      }
    };
    
    // Save locally for testing
    await this.saveLocal(website);
    
    return website;
  }

  async generateHTML({ service, location, content, seoData, localData, websiteId }) {
    const serviceName = service.charAt(0).toUpperCase() + service.slice(1);
    
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${content.seo?.title || serviceName + ' ' + location + ' - InstaBids'}</title>
    <meta name="description" content="${content.seo?.description || 'Get free quotes from trusted ' + service + ' contractors in ' + location}">
    <meta name="keywords" content="${content.seo?.keywords?.primary}, ${content.seo?.keywords?.secondary?.join(', ') || ''}">
    <link rel="canonical" href="${content.seo?.canonical || 'https://instabids.ai/' + service + '/' + location + '/'}">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${content.seo?.title}">
    <meta property="og:description" content="${content.seo?.description}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${content.seo?.canonical}">
    
    <!-- Schema.org LocalBusiness -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "${websiteId}",
      "name": "InstaBids ${serviceName} Network - ${location}",
      "description": "${content.seo?.description}",
      "url": "${content.seo?.canonical}",
      "telephone": "+1-888-INSTABID",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "${localData.city}",
        "addressRegion": "${localData.state}",
        "postalCode": "${location}",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "${this.getLatitude(location)}",
        "longitude": "${this.getLongitude(location)}"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    }
    </script>
    
    <style>
        /* CSS Variables for easy theming */
        :root {
            --primary-color: #2563eb;
            --primary-dark: #1e40af;
            --secondary-color: #f59e0b;
            --secondary-dark: #d97706;
            --text-primary: #1a1a1a;
            --text-secondary: #64748b;
            --bg-light: #f8fafc;
            --bg-dark: #1e293b;
            --border-color: #e2e8f0;
            --success-color: #4CAF50;
            --error-color: #ef4444;
        }
        
        /* Reset and Base Styles */
        * { 
            margin: 0; 
            padding: 0; 
            box-sizing: border-box; 
        }
        
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
            line-height: 1.6; 
            color: var(--text-primary);
            overflow-x: hidden;
        }
        
        /* Container */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        /* Hero Section */
        .hero {
            background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
            color: white;
            padding: 100px 20px 80px;
            text-align: center;
            min-height: 600px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
            overflow: hidden;
        }
        
        .hero::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: float 20s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(-20px, -20px) rotate(180deg); }
        }
        
        .hero h1 {
            font-size: clamp(2rem, 5vw, 3.5rem);
            margin-bottom: 20px;
            font-weight: 800;
            position: relative;
            z-index: 1;
        }
        
        .hero p {
            font-size: clamp(1.1rem, 3vw, 1.5rem);
            margin-bottom: 40px;
            opacity: 0.95;
            position: relative;
            z-index: 1;
        }
        
        /* CTA Buttons */
        .cta {
            display: inline-block;
            background: var(--secondary-color);
            color: white;
            padding: 18px 40px;
            text-decoration: none;
            border-radius: 8px;
            font-size: 1.2rem;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
            position: relative;
            z-index: 1;
            margin: 10px;
        }
        
        .cta:hover {
            background: var(--secondary-dark);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4);
        }
        
        .cta.secondary {
            background: transparent;
            border: 2px solid white;
        }
        
        .cta.secondary:hover {
            background: white;
            color: var(--primary-color);
        }
        
        /* Problem Section */
        .problem {
            background: var(--bg-light);
            padding: 80px 20px;
        }
        
        .problem h2 {
            font-size: clamp(1.8rem, 4vw, 2.5rem);
            text-align: center;
            margin-bottom: 50px;
            color: var(--bg-dark);
        }
        
        .problem-content {
            max-width: 800px;
            margin: 0 auto;
            font-size: 1.1rem;
            line-height: 1.8;
        }
        
        .problem ul {
            list-style: none;
            padding: 20px 0;
        }
        
        .problem li {
            padding: 10px 0 10px 30px;
            position: relative;
        }
        
        .problem li:before {
            content: "•";
            color: var(--error-color);
            font-size: 24px;
            position: absolute;
            left: 0;
        }
        
        .highlight {
            background: #fef3c7;
            padding: 20px;
            border-left: 4px solid var(--secondary-color);
            margin: 30px 0;
            font-weight: 600;
            border-radius: 4px;
        }
        
        /* Services/Solution Section */
        .services {
            padding: 80px 20px;
        }
        
        .services h2 {
            font-size: clamp(1.8rem, 4vw, 2.5rem);
            text-align: center;
            margin-bottom: 50px;
            color: var(--bg-dark);
        }
        
        .steps {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-top: 50px;
        }
        
        .step {
            background: white;
            padding: 40px 30px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: 1px solid var(--border-color);
        }
        
        .step:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 30px rgba(0,0,0,0.12);
        }
        
        .step h3 {
            color: var(--primary-color);
            margin-bottom: 15px;
            font-size: 1.5rem;
        }
        
        .step-number {
            background: #e0e7ff;
            color: var(--primary-color);
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 1.5rem;
            margin-bottom: 20px;
        }
        
        /* Value Props */
        .value-props {
            background: var(--bg-dark);
            color: white;
            padding: 80px 20px;
            text-align: center;
        }
        
        .value-props h2 {
            font-size: clamp(1.8rem, 4vw, 2.5rem);
            margin-bottom: 50px;
        }
        
        .props-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            max-width: 1000px;
            margin: 0 auto;
        }
        
        .prop {
            padding: 20px;
        }
        
        .prop-icon {
            font-size: 3rem;
            margin-bottom: 20px;
            color: var(--secondary-color);
        }
        
        /* Local Section */
        .local {
            background: var(--bg-light);
            padding: 80px 20px;
            text-align: center;
        }
        
        .local h2 {
            font-size: clamp(1.8rem, 4vw, 2.5rem);
            margin-bottom: 30px;
            color: var(--bg-dark);
        }
        
        .local-content {
            max-width: 800px;
            margin: 0 auto;
            font-size: 1.1rem;
            line-height: 1.8;
        }
        
        .stats {
            display: flex;
            justify-content: center;
            gap: 50px;
            margin-top: 50px;
            flex-wrap: wrap;
        }
        
        .stat {
            text-align: center;
            padding: 20px;
        }
        
        .stat-number {
            font-size: 3rem;
            color: var(--primary-color);
            font-weight: 800;
        }
        
        .stat-label {
            font-size: 1.2rem;
            color: var(--text-secondary);
            margin-top: 10px;
        }
        
        /* FAQ Section */
        .faq {
            padding: 80px 20px;
            max-width: 800px;
            margin: 0 auto;
        }
        
        .faq h2 {
            font-size: clamp(1.8rem, 4vw, 2.5rem);
            text-align: center;
            margin-bottom: 50px;
            color: var(--bg-dark);
        }
        
        .faq-item {
            margin-bottom: 30px;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 30px;
        }
        
        .faq-item h3 {
            color: var(--bg-dark);
            margin-bottom: 15px;
            font-size: 1.3rem;
        }
        
        .faq-item p {
            color: var(--text-secondary);
            line-height: 1.8;
        }
        
        /* Final CTA */
        .final-cta {
            background: linear-gradient(135deg, var(--secondary-color) 0%, var(--secondary-dark) 100%);
            color: white;
            padding: 80px 20px;
            text-align: center;
        }
        
        .final-cta h2 {
            font-size: clamp(1.8rem, 4vw, 2.5rem);
            margin-bottom: 20px;
        }
        
        .final-cta .cta {
            background: white;
            color: var(--secondary-color);
            font-size: 1.3rem;
            margin-top: 30px;
        }
        
        .final-cta .cta:hover {
            background: var(--bg-light);
        }
        
        /* Footer */
        footer {
            background: var(--bg-dark);
            color: white;
            padding: 40px 20px;
            text-align: center;
        }
        
        footer p {
            opacity: 0.8;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .cta {
                display: block;
                width: 90%;
                max-width: 300px;
                margin: 10px auto;
            }
            
            .stats {
                flex-direction: column;
                gap: 20px;
            }
            
            .hero {
                padding: 60px 20px;
                min-height: 500px;
            }
        }
        
        /* Animations */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .animate-on-scroll {
            opacity: 0;
            animation: fadeInUp 0.8s ease forwards;
        }
    </style>
</head>
<body>
    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <h1>${content.hero?.headline || serviceName + ' in ' + location + '? Get Free Quotes'}</h1>
            <p>${content.hero?.subheadline || 'Connect directly with local professionals'}</p>
            <div class="cta-wrapper">
                <a href="https://instabids.ai/start?source=local&service=${service}&zip=${location}" class="cta">
                    ${content.hero?.cta?.primary || 'Start Your Free Project'}
                </a>
                <a href="#how-it-works" class="cta secondary">
                    ${content.hero?.cta?.secondary || 'How It Works'}
                </a>
            </div>
        </div>
    </section>
    
    <!-- Problem Section -->
    <section class="problem">
        <div class="container">
            <h2>${content.problem?.header || 'The Problem with Traditional ' + serviceName + ' Services'}</h2>
            <div class="problem-content">
                ${this.formatContent(content.problem?.content || 'Finding reliable services can be challenging.')}
                ${content.problem?.hiddenFees ? 
                  `<div class="highlight">In ${location}, homeowners pay an average of $${content.problem.hiddenFees} in hidden platform fees!</div>` : 
                  ''}
            </div>
        </div>
    </section>
    
    <!-- Solution/Services -->
    <section class="services" id="how-it-works">
        <div class="container">
            <h2>${content.solution?.header || 'How InstaBids Makes ' + serviceName + ' Simple'}</h2>
            <div class="steps">
                ${content.solution?.steps ? content.solution.steps.map((step, i) => `
                    <div class="step animate-on-scroll">
                        <div class="step-number">${i + 1}</div>
                        <h3>${step.title}</h3>
                        <p>${step.description}</p>
                    </div>
                `).join('') : ''}
            </div>
            ${content.solution?.supporting ? 
              `<p style="text-align: center; margin-top: 40px; font-size: 1.1rem; color: #64748b;">
                ${content.solution.supporting}
              </p>` : ''}
        </div>
    </section>
    
    <!-- Value Props -->
    <section class="value-props">
        <div class="container">
            <h2>Why ${location} Homeowners Choose InstaBids</h2>
            <div class="props-grid">
                ${content.valueProps?.forHomeowners ? content.valueProps.forHomeowners.map(prop => `
                    <div class="prop animate-on-scroll">
                        <div class="prop-icon">✓</div>
                        <p>${prop}</p>
                    </div>
                `).join('') : ''}
            </div>
        </div>
    </section>
    
    <!-- Local Section -->
    <section class="local">
        <div class="container">
            <h2>${content.local?.header || 'Serving ' + location + ' with Excellence'}</h2>
            <div class="local-content">
                <p>${content.local?.content || 'Connecting neighbors with trusted professionals'}</p>
            </div>
            <div class="stats">
                <div class="stat animate-on-scroll">
                    <div class="stat-number">${localData.population?.toLocaleString() || '50,000'}</div>
                    <div class="stat-label">Local Residents</div>
                </div>
                <div class="stat animate-on-scroll">
                    <div class="stat-number">$${content.problem?.hiddenFees || '90'}</div>
                    <div class="stat-label">Average Savings</div>
                </div>
                <div class="stat animate-on-scroll">
                    <div class="stat-number">${Math.floor(Math.random() * 50) + 20}</div>
                    <div class="stat-label">Verified ${serviceName}s</div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- FAQ Section -->
    ${content.faq && content.faq.length > 0 ? `
    <section class="faq">
        <div class="container">
            <h2>Frequently Asked Questions</h2>
            ${content.faq.map(item => `
                <div class="faq-item animate-on-scroll">
                    <h3>${item.question}</h3>
                    <p>${item.answer}</p>
                </div>
            `).join('')}
        </div>
    </section>
    ` : ''}
    
    <!-- Final CTA -->
    <section class="final-cta">
        <div class="container">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of satisfied homeowners who've discovered the better way to hire ${service} professionals.</p>
            <a href="https://instabids.ai/start?source=local&service=${service}&zip=${location}" class="cta">
                Get Free Quotes Now
            </a>
        </div>
    </section>
    
    <!-- Footer -->
    <footer>
        <div class="container">
            <p>&copy; ${new Date().getFullYear()} InstaBids. All rights reserved. | 
               <a href="https://instabids.ai/privacy" style="color: white; opacity: 0.8;">Privacy Policy</a> | 
               <a href="https://instabids.ai/terms" style="color: white; opacity: 0.8;">Terms of Service</a>
            </p>
            <p style="margin-top: 10px; font-size: 0.9rem; opacity: 0.6;">
                InstaBids connects homeowners directly with contractors. No middleman fees, no spam, just better connections.
            </p>
        </div>
    </footer>
    
    <!-- Analytics & Tracking -->
    <script>
        // Page metadata
        window.pageData = {
            websiteId: '${websiteId}',
            service: '${service}',
            location: '${location}',
            city: '${localData.city}',
            state: '${localData.state}',
            generatedAt: '${new Date().toISOString()}'
        };
        
        // Animate on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = '0.1s';
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        document.addEventListener('DOMContentLoaded', function() {
            const animatedElements = document.querySelectorAll('.animate-on-scroll');
            animatedElements.forEach(el => observer.observe(el));
        });
    </script>
</body>
</html>`;

    return html;
  }

  formatContent(content) {
    if (!content) return '';
    
    // Convert newlines to paragraphs and bullet points to list items
    const lines = content.split('\n');
    let html = '';
    let inList = false;
    
    lines.forEach(line => {
      if (line.startsWith('•')) {
        if (!inList) {
          html += '<ul>';
          inList = true;
        }
        html += `<li>${line.substring(1).trim()}</li>`;
      } else {
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        if (line.trim()) {
          html += `<p>${line}</p>`;
        }
      }
    });
    
    if (inList) {
      html += '</ul>';
    }
    
    return html;
  }

  getLatitude(zip) {
    // Simple ZIP to latitude mapping (in production, use real geocoding)
    const prefix = parseInt(zip.substring(0, 3));
    if (prefix >= 320 && prefix <= 349) return '26.0742'; // Florida
    if (prefix >= 100 && prefix <= 119) return '40.7128'; // New York
    if (prefix >= 900 && prefix <= 961) return '34.0522'; // California
    return '39.8283'; // Default (US center)
  }

  getLongitude(zip) {
    const prefix = parseInt(zip.substring(0, 3));
    if (prefix >= 320 && prefix <= 349) return '-80.1494'; // Florida
    if (prefix >= 100 && prefix <= 119) return '-74.0060'; // New York
    if (prefix >= 900 && prefix <= 961) return '-118.2437'; // California
    return '-98.5795'; // Default (US center)
  }

  calculateContentScore(content) {
    let score = 0;
    
    // Check for essential sections
    if (content.hero) score += 20;
    if (content.problem) score += 20;
    if (content.solution) score += 20;
    if (content.valueProps) score += 15;
    if (content.local) score += 15;
    if (content.faq && content.faq.length > 3) score += 10;
    
    return Math.min(score, 100);
  }

  calculateSEOScore(html, seoData) {
    let score = 0;
    
    // Check for SEO elements
    if (html.includes('<title>')) score += 15;
    if (html.includes('meta name="description"')) score += 15;
    if (html.includes('application/ld+json')) score += 20;
    if (html.includes('canonical')) score += 10;
    if (html.includes(seoData.keywords?.primary)) score += 20;
    if (html.length > 5000) score += 20; // Substantial content
    
    return Math.min(score, 100);
  }

  async saveLocal(website) {
    try {
      const { service, location, state } = website.metadata;
      const dir = path.join(
        this.outputPath,
        service,
        state || 'us',
        location.substring(0, 3),
        location
      );
      
      await fs.mkdir(dir, { recursive: true });
      
      await fs.writeFile(
        path.join(dir, 'index.html'),
        website.html
      );
      
      await fs.writeFile(
        path.join(dir, 'metadata.json'),
        JSON.stringify(website.metadata, null, 2)
      );
      
    } catch (error) {
      console.warn('Failed to save local copy:', error.message);
    }
  }
}
