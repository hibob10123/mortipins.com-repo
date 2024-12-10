const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(compression()); // Enable compression

// Redirect HTTP to HTTPS
app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    next();
});

// Disable caching for static files
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

// Serve static files with cache-control headers
app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.css') || path.endsWith('.js')) {
            res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
        }
    }
}));

// Serve the index.html file for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const pool = new Pool({
    user: 'postgres',
    host: '10.48.64.5',
    database: 'brawldle',
    password: 'Be101234!',
    port: 5432,
});

app.post('/api/guess', async (req, res) => {
    const { video_id, guess } = req.body;
    console.log(`Received guess: video_id=${video_id}, guess=${guess}`);
    try {
        const result = await pool.query(
            'INSERT INTO guesses (video_id, guess) VALUES ($1, $2) RETURNING *',
            [video_id, guess]
        );
        console.log(`Inserted guess: ${JSON.stringify(result.rows[0])}`);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(`Error inserting guess: ${err}`);
        res.status(500).send(err);
    }
});

app.get('/api/guesses', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM guesses');
        console.log(`Fetched guesses: ${JSON.stringify(result.rows)}`);
        res.json(result.rows);
    } catch (err) {
        console.error(`Error fetching guesses: ${err}`);
        res.status(500).send(err);
    }
});

app.get('/api/guess-distribution', async (req, res) => {
    try {
        const result = await pool.query('SELECT guess, COUNT(*) as count FROM guesses GROUP BY guess');
        console.log(`Fetched guess distribution: ${JSON.stringify(result.rows)}`);
        res.json(result.rows);
    } catch (err) {
        console.error(`Error fetching guess distribution: ${err}`);
        res.status(500).send(err);
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});