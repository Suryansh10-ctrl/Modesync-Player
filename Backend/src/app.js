const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));

const authRoutes = require('./routes/auth.routes')
const songRoutes = require('./routes/song.routes')

app.use('/api/auth', authRoutes);
app.use('/api/songs', songRoutes);
app.use(express.static(path.join(__dirname, '../public')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
});

module.exports = app