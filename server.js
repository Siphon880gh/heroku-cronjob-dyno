const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// GET / - Basic server status
app.get('/', (req, res) => {
    res.json({ status: 'Server is running' });
});

// POST /timestamps/ - Record timestamp
app.post('/timestamps/', (req, res) => {
    const timestamp = new Date().toISOString();
    const logFile = path.join(__dirname, 'timestamps.log');
    
    fs.appendFile(logFile, timestamp + '\n', (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
            return res.status(500).json({ error: 'Failed to record timestamp' });
        }
        res.json({ message: 'Timestamp recorded', timestamp });
    });
});

// GET /timestamps/ - List all timestamps
app.get('/timestamps/', (req, res) => {
    const logFile = path.join(__dirname, 'timestamps.log');
    
    fs.readFile(logFile, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.json({ message: 'No timestamps recorded yet', timestamps: [] });
            }
            console.error('Error reading log file:', err);
            return res.status(500).json({ error: 'Failed to read timestamps' });
        }
        
        const timestamps = data.trim().split('\n').filter(Boolean);
        res.json({ timestamps });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 