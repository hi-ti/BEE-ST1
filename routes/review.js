const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

// Add a new review to a movie
router.post('/:movieId/reviews', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    movie.reviews.push(req.body);
    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all reviews for a specific movie with pagination
router.get('/:movieId/reviews', async (req, res) => {
  const page = parseInt(req.query.page || 1);
  const pageSize = parseInt(req.query.pageSize || 10);
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    const reviews = movie.reviews.slice((page - 1) * pageSize, page * pageSize);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a review by ID within a movie
router.put('/:movieId/reviews/:reviewId', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    const review = movie.reviews.id(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    Object.assign(review, req.body);
    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a review by ID within a movie
router.delete('/:movieId/reviews/:reviewId', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    movie.reviews.pull(req.params.reviewId);
    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
