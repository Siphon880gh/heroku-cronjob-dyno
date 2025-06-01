import 'dotenv/config';
import cron from 'node-cron';
import fetch from 'node-fetch';

let BASE_URL = process.env.SERVER_URL || 'http://localhost:3000';
BASE_URL = BASE_URL.replace(/\/$/, '');

let recordedCount = 0;

cron.schedule('* * * * *', () => {
  recordedCount++;
  if (recordedCount >= 5) {
    console.log('Recorded 5 timestamps, stopping cron job');
    cron.destroy();
  }
  
  console.log('Timestamping every minute');
  fetch(`${BASE_URL}/timestamps/`, {
    method: 'POST'
  });
});
