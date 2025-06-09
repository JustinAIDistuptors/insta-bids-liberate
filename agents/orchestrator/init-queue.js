import { QueueManager } from './queue-manager.js';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function question(prompt) {
  return new Promise(resolve => {
    rl.question(prompt, resolve);
  });
}

async function initializeQueue() {
  console.log('🚀 InstaBids Autonomous Website Builder - Queue Initializer');
  console.log('='.repeat(60));
  
  const queue = new QueueManager();
  
  // Check if queue already exists
  try {
    const stats = await queue.getStats();
    if (stats.total > 0) {
      console.log('\n⚠️  WARNING: Queue already contains jobs!');
      console.log(`Current stats: ${stats.completed} completed, ${stats.pending} pending`);
      
      const answer = await question('\nDo you want to reset and reinitialize? (yes/no): ');
      
      if (answer.toLowerCase() !== 'yes') {
        console.log('❌ Initialization cancelled');
        process.exit(0);
      }
      
      await queue.reset();
    }
  } catch (error) {
    // Queue doesn't exist yet, continue
  }
  
  console.log('\n📋 Initializing job queue...');
  console.log('This will create jobs for:');
  console.log('- 10 service types');
  console.log('- ~100 ZIP codes (expandable to 40,000+)');
  console.log('- Total: ~1,000 initial jobs');
  
  const answer = await question('\nProceed with initialization? (yes/no): ');
  
  if (answer.toLowerCase() !== 'yes') {
    console.log('❌ Initialization cancelled');
    process.exit(0);
  }
  
  console.log('\n⏳ Creating jobs...');
  const totalJobs = await queue.initialize();
  
  console.log(`\n✅ Queue initialized successfully!`);
  console.log(`📊 Total jobs created: ${totalJobs}`);
  console.log('\nNext steps:');
  console.log('1. Run "npm run process-batch" to start processing');
  console.log('2. Or push to GitHub and let Actions handle it automatically');
  
  rl.close();
}

// Run initialization
initializeQueue().catch(error => {
  console.error('❌ Initialization failed:', error);
  process.exit(1);
});
