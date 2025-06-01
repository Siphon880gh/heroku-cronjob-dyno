# Heroku Cronjob Dyno
![Last Commit](https://img.shields.io/github/last-commit/Siphon880gh/heroku-cronjob-dyno/main)
<a target="_blank" href="https://github.com/Siphon880gh" rel="nofollow"><img src="https://img.shields.io/badge/GitHub--blue?style=social&logo=GitHub" alt="Github"></a>
<a target="_blank" href="https://www.linkedin.com/in/weng-fung/" rel="nofollow"><img src="https://img.shields.io/badge/LinkedIn-blue?style=flat&logo=linkedin&labelColor=blue" alt="Linked-In"></a>
<a target="_blank" href="https://www.youtube.com/@WayneTeachesCode/" rel="nofollow"><img src="https://img.shields.io/badge/Youtube-red?style=flat&logo=youtube&labelColor=red" alt="Youtube"></a>

---

## 📝 Overview

By Weng Fei Fung (Weng). This sets up a simple API endpoint to test and verify that a scheduled **Heroku dyno** (cron job) is running correctly. Every time the dyno pings the endpoint, the server logs the hit. After 5 successful hits, the job stops—helping confirm that your Heroku Scheduler is working as expected.

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