import cron from 'node-cron';
import fetch from 'node-fetch';

cron.schedule('0 * * * *', () => {
  console.log('Timestamping every minute');
  fetch('/timestamps/', {
    method: 'POST'
  });
});
