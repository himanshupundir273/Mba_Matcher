const express = require('express');
const router = express.Router();
const Search = require('../models/Search');

// Save search
router.post('/', async (req, res) => {
  try {
    const search = new Search(req.body);
    const newSearch = await search.save();
    res.status(201).json(newSearch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user's search history
router.get('/user/:userId', async (req, res) => {
  try {
    const searches = await Search.find({ userId: req.params.userId })
      .populate('results.university')
      .sort({ timestamp: -1 })
      .limit(10);
    res.json(searches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;