const express = require('express');
const mongoose = require('mongoose');
const movieRoutes = require('./routes/movie');
const reviewRoutes = require('./routes/review');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/movieDB');
