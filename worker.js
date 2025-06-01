require('dotenv').config();
import cron from 'node-cron';
import fetch from 'node-fetch';

let BASE_URL = process.env.SERVER_URL || 'http://localhost:3000';
BASE_URL = BASE_URL.replace(/\/$/, '');

cron.schedule('* * * * *', () => {
  console.log('Timestamping every minute');
  fetch(`${BASE_URL}/timestamps/`, {
    method: 'POST'
  });
});
