import { QueueManager } from './queue-manager.js';
import { RateLimiter } from './rate-limiter.js';
import { SEOResearcher } from '../tools/seo-researcher.js';
import { ContentGenerator } from '../tools/content-generator.js';
import { LocalDataFetcher } from '../tools/local-data-fetcher.js';
import { WebsiteBuilder } from '../tools/website-builder.js';
import { GitHubDeployer } from '../deployment/github-deployer.js';
import { ProgressTracker } from '../monitoring/progress-tracker.js';
import dotenv from 'dotenv';

dotenv.config();

class BatchProcessor {
  constructor() {
    this.queue = new QueueManager();
    this.limiter = new RateLimiter({
      openai: { limit: 50, window: 60000 },      // 50 per minute
      serpapi: { limit: 100, window: 3600000 },  // 100 per hour
      github: { limit: 5000, window: 3600000 }   // 5000 per hour
    });
    
    this.tools = {
      seo: new SEOResearcher(),
      content: new ContentGenerator(),
      localData: new LocalDataFetcher(),
      builder: new WebsiteBuilder(),
      deployer: new GitHubDeployer()
    };
    
    this.tracker = new ProgressTracker();
  }

  async run(options = {}) {
    console.log('🚀 Starting batch processing...');
    console.log(`📅 ${new Date().toISOString()}`);
    
    // Get command line arguments
    const args = process.argv.slice(2);
    const config = {
      size: 50,
      service: null,
      location: null
    };
    
    // Parse arguments
    args.forEach(arg => {
      const [key, value] = arg.split('=');
      if (key === '--size') config.size = parseInt(value);
      if (key === '--service') config.service = value;
      if (key === '--location') config.location = value;
    });
    
    try {
      const batch = await this.queue.getNextBatch(config);
      
      if (batch.length === 0) {
        console.log('✅ No pending jobs in queue!');
        return;
      }
      
      console.log(`📦 Processing ${batch.length} jobs`);
      
      const results = {
        successful: [],
        failed: []
      };
      
      const startTime = Date.now();
      
      for (const job of batch) {
        const jobStartTime = Date.now();
        
        try {
          console.log(`\n🔧 Processing: ${job.service} in ${job.location}`);
          
          // 1. Research Phase
          console.log('  📊 Researching SEO data...');
          await this.limiter.wait('serpapi');
          const seoData = await this.tools.seo.research(job.location, job.service);
          
          // 2. Get Local Data
          console.log('  📍 Fetching local data...');
          const localData = await this.tools.localData.fetch(job.location);
          
          // 3. Generate Content
          console.log('  ✍️  Generating content...');
          await this.limiter.wait('openai');
          const content = await this.tools.content.generate({
            service: job.service,
            location: job.location,
            seoData: seoData,
            localData: localData
          });
          
          // 4. Build Website
          console.log('  🏗️  Building website...');
          const website = await this.tools.builder.build({
            service: job.service,
            location: job.location,
            content: content,
            seoData: seoData,
            localData: localData
          });
          
          // 5. Deploy to GitHub
          console.log('  🚀 Deploying to GitHub...');
          await this.limiter.wait('github');
          const deployment = await this.tools.deployer.deploy(website);
          
          // 6. Record Success
          await this.queue.markCompleted([job.id]);
          
          const duration = ((Date.now() - jobStartTime) / 1000).toFixed(2);
          console.log(`  ✅ Success in ${duration}s: ${deployment.url}`);
          
          results.successful.push({
            jobId: job.id,
            url: deployment.url,
            path: deployment.path,
            duration: duration
          });
          
          // Update progress
          await this.tracker.recordCompletion(job);
          
        } catch (error) {
          console.error(`  ❌ Failed: ${error.message}`);
          
          await this.queue.markFailed(job.id, error.message);
          results.failed.push({
            jobId: job.id,
            error: error.message
          });
          
          await this.tracker.recordFailure(job, error);
        }
        
        // Small delay between jobs
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      // Print summary
      console.log('\n' + '='.repeat(60));
      console.log('📊 BATCH SUMMARY');
      console.log('='.repeat(60));
      console.log(`✅ Successful: ${results.successful.length}`);
      console.log(`❌ Failed: ${results.failed.length}`);
      console.log(`⏱️  Total time: ${((Date.now() - startTime) / 1000 / 60).toFixed(2)} minutes`);
      
      // Update stats
      const stats = await this.queue.getStats();
      console.log('\n📈 OVERALL PROGRESS');
      console.log(`Total: ${stats.total}`);
      console.log(`Completed: ${stats.completed} (${stats.completionRate}%)`);
      console.log(`Remaining: ${stats.pending}`);
      console.log(`Rate: ${stats.pagesPerHour} pages/hour`);
      console.log(`ETA: ${stats.estimatedHoursRemaining} hours`);
      
      return results;
      
    } catch (error) {
      console.error('Fatal error:', error);
      throw error;
    }
  }
}

// Auto-run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const processor = new BatchProcessor();
  processor.run()
    .then(() => {
      console.log('\n✅ Batch processing complete!');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n❌ Batch processing failed:', error);
      process.exit(1);
    });
}
