const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

// Create a new movie
router.post('/', async (req, res) => {
  try {
    const newMovie = await Movie.create(req.body);
    res.json(newMovie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all movies with pagination
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page || 1);
  const pageSize = parseInt(req.query.pageSize || 10);
  try {
    const movies = await Movie.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific movie by ID
router.get('/:movieId', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a movie by ID
router.put('/:movieId', async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.movieId, req.body, { new: true });
    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(updatedMovie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a movie by ID
router.delete('/:movieId', async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.movieId);
    if (!deletedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json({ message: 'Movie deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
