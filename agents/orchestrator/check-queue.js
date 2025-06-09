import { QueueManager } from './queue-manager.js';

async function checkQueue() {
  const queue = new QueueManager();
  const stats = await queue.getStats();
  
  // Output JSON for GitHub Actions
  console.log(JSON.stringify(stats));
}

// Run check
checkQueue().catch(error => {
  console.error(JSON.stringify({ error: error.message }));
  process.exit(1);
});
