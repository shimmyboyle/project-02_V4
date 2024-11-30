import express from 'express';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';

let port = process.env.PORT || 3000;

const app = express();
const __dirname = path.resolve();

// DB - Connect to the DB
const defaultData = {
  visits: 0,
  copyExamples: [
    [
      "We use tech to create",
      "face-melting, holy shit,",
      "one-of-a-kind experiences."
    ],
    [
      "Our tech turns imagination",
      "into reality with experiences",
      "that push limits."
    ],
    [
      "We build the future,",
      "one interactive moment",
      "at a time."
    ]
  ],
};
const adapter = new JSONFile(path.join(__dirname, 'db.json'));
const db = new Low(adapter, defaultData);

// Initialize the database
await db.read();
if (!db.data) {
  db.data = defaultData;
  await db.write();
}

// Middleware to parse incoming JSON
app.use(express.json());

// Middleware to set cache control headers
app.use((req, res, next) => {
  res.set({
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Surrogate-Control': 'no-store'
  });
  next();
});

// Serve static assets
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the main page
app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Route to get copy examples and increment visit counter
app.get('/get-copy', async (req, res) => {
  try {
    // Read latest state
    await db.read();
    
    // Increment visit counter
    db.data.visits = (db.data.visits + 1) % db.data.copyExamples.length;
    
    // Get current copy
    const currentCopy = db.data.copyExamples[db.data.visits];
    
    // Save updated visit counter
    await db.write();
    
    console.log('Updated visits to:', db.data.visits);
    console.log('Serving copy:', currentCopy);
    
    res.json({ copy: currentCopy });
  } catch (error) {
    console.error('Error in /get-copy:', error);
    res.status(500).send('Error fetching copy');
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});