require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const connectDB = require('./utils/db');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// ---- Connect to MongoDB ----
connectDB();

// ---- Global Middleware ----
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // set true when using HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// Serve static files from the root storage folder
app.use('/storage', express.static(path.join(__dirname, '../../storage')));

// ---- Health Check ----
app.get('/api/v1/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// ---- Routes (will be added one by one) ----
// app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/clients', require('./routes/clients'));
app.use('/api/v1/content', require('./routes/content'));
app.use('/api/v1/platforms', require('./routes/platforms'));
app.use('/api/v1/categories', require('./routes/categories'));
app.use('/api/v1/tags', require('./routes/tags'));
app.use('/api/v1/search', require('./routes/search'));
app.use('/api/v1/dashboard', require('./routes/dashboard'));
app.use('/api/v1/timeline', require('./routes/timeline'));
app.use('/api/v1/storage', require('./routes/storage'));
app.use('/api/v1/backups', require('./routes/backups'));
app.use('/api/v1/snapshots', require('./routes/snapshots'));
app.use('/api/v1/recycle-bin', require('./routes/recycleBin'));

// ---- Start Server ----
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
