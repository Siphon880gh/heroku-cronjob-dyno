# Heroku Cronjob Dyno
![Last Commit](https://img.shields.io/github/last-commit/Siphon880gh/heroku-cronjob-dyno/main)
<a target="_blank" href="https://github.com/Siphon880gh" rel="nofollow"><img src="https://img.shields.io/badge/GitHub--blue?style=social&logo=GitHub" alt="Github"></a>
<a target="_blank" href="https://www.linkedin.com/in/weng-fung/" rel="nofollow"><img src="https://img.shields.io/badge/LinkedIn-blue?style=flat&logo=linkedin&labelColor=blue" alt="Linked-In"></a>
<a target="_blank" href="https://www.youtube.com/@WayneTeachesCode/" rel="nofollow"><img src="https://img.shields.io/badge/Youtube-red?style=flat&logo=youtube&labelColor=red" alt="Youtube"></a>

---

## 📝 Overview

By Weng Fei Fung (Weng). This project sets up a simple API endpoint (POST /timestamps) to verify that a Heroku worker dyno running in the background is functioning correctly. Instead of using Heroku Scheduler, we use a separate worker.js process powered by node-cron to send a request to the server every minute. Each hit is logged by the server. After 5 successful hits, the worker stops. You can view all the timestamps at `timestamps.log` or visit `GET /timestamps` confirming that the cron job and worker dyno are both running as expected.

> ⚠️ **Important Note**: For production use, do not use Heroku's free or eco dynos for critical cron jobs. These dynos will sleep after 30 minutes of inactivity and cannot be woken up by your own scripts. They can only be activated by user visits or external server pings. For reliable cron jobs, use at least a Basic dyno or consider alternative hosting solutions.

---

## 🚀 How It Works

1. Deploy the app to Heroku.
2. Use the [Heroku Scheduler add-on](https://devcenter.heroku.com/articles/scheduler) to run a scheduled dyno.
3. The dyno makes a request to the API endpoint.
4. Each request is logged and stored.
5. After 5 total hits, logging stops to prevent unnecessary storage.

## 📡 API Endpoints

### GET /
Returns the server status.
```json
{
    "status": "Server is running"
}
```

![screenshot](docs/verify-server.png)

### POST /timestamps/
Records a new timestamp in the timestamps.log file.
```json
{
    "message": "Timestamp recorded",
    "timestamp": "2024-03-21T12:34:56.789Z"
}
```

![screenshot](docs/timestamps-add.png)

### GET /timestamps/
Lists all recorded timestamps from the timestamps.log file.
```json
{
    "timestamps": [
        "2024-03-21T12:34:56.789Z",
        "2024-03-21T12:35:00.123Z"
    ]
}
```

![screenshot](docs/timestamps-get.png)

## 🔧 Setup

1. Install dependencies:
```bash
npm install express
```

2. Start the server:
```bash
node server.js
```

The server will run on port 3000 by default, or use the PORT environment variable if set (as on Heroku).

## 🚀 Heroku Deployment

1. Create a new Heroku app:
```bash
heroku create your-app-name
```

2. Set the required config variable:
```bash
heroku config:set BASE_URL=https://your-app-name.herokuapp.com
```
> 💡 **Note**: Replace `your-app-name` with your actual Heroku app name. You can find your app's URL by clicking "Open App" in the Heroku dashboard.

3. Deploy to Heroku:
```bash
git push heroku main
```

4. Add the Heroku Scheduler add-on:

   **Method 1 - Web Dashboard** (recommended for most users):
   - Go to your app's dashboard on [Heroku](https://dashboard.heroku.com)
   - Click on your app
   - Go to the "Resources" tab
   - In the "Add-ons" section, search for "Heroku Scheduler"
   - Click "Submit Order Form" to add the scheduler


   **Method 2 - Command Line** (only if you have the local repo connected to Heroku):
   ```bash
   heroku addons:create scheduler:standard
   ```


5. Configure the scheduler in the Heroku dashboard:
   - Go to Resources → Heroku Scheduler
   - Click "Add Job"
   - Set the command to: `curl -X POST $BASE_URL/timestamps/`
   - Choose your desired frequency (e.g., every 10 minutes)

## 🧪 Local Testing

To test the application locally:

1. Run the development server:
```bash
npm run dev
```

This will start both `server.js` and `worker.js` concurrently. The worker will make a POST request to `/timestamps/` every minute, and the server will write the timestamps to `timestamps.log`. You can make sure the read/write timestamp server is running by visiting http://localhost:3000/ and see if you get the message "Server is running".

To monitor the changes:
- Keep `timestamps.log` open in your editor to see the new timestamps being added every minute

1. Create a new Heroku app:
```bash
heroku c
   **Method 1 - Command Line** (only if you have the repo connected to Heroku):
   ```bash
   heroku addons:create scheduler:standard
   ```
reate your-ap2-name
```
   ```
reate your-ap2-name
```

2. Configure environment variables:
```bash
heroku config:set BASE_URL=https://your-app-name.herokuapp.com
```

3. Deploy the application:
```bash
git push heroku main
```

### Scheduler Configuration

1. Add the Heroku Scheduler add-on:

   **Meth  **Method 2 - Command Line** (only if you have the local repo connected to Heroku):
   ```bash
   heroku addons:create scheduler:standard
   ```

2. Configure the scheduler in the Heroku dashboard:
   - Go to Resources → Heroku Scheduler
   - Click "Add Job"
   - Set the command to: `curl -X POST $BASE_URL/timestamps/`
   - Choose your desired frequency (e.g., every 10 minutes)

## 🧪 Local Development

1. Start the development server:
```bash
npm run dev
```

This launches both the server and worker processes. The worker will:
- Make POST requests to `/timestamps/` every minute
- Log timestamps to `timestamps.log`
- Stop after 5 successful executions

2. Monitor execution:
- Visit `http://localhost:3000/` to verify server status
- Check `timestamps.log` for execution records

## ⚠️ Important Notes

- Do not use free or eco dynos for critical cron jobs
- These dynos sleep after 30 minutes of inactivity
- Consider using at least a Basic dyno for production
- Alternative hosting solutions may be more suitable for critical tasks

## 🔍 Troubleshooting

### Common Issues

1. **Scheduler Not Running**
   - Verify Heroku Scheduler add-on is installed
   - Check scheduler configuration
   - Ensure BASE_URL is set correctly

2. **API Endpoints Not Responding**
   - Confirm server is running
   - Check port configuration
   - Verify environment variables

3. **Worker Not Executing**
   - Check worker logs
   - Verify API connectivity
   - Ensure proper scheduling

For additional help, please open an issue on GitHub.