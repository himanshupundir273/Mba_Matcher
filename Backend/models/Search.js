const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  searchParams: {
    gmatScore: Number,
    gpa: Number,
    workExperience: Number,
    targetProgram: String
  },
  results: [{
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'University'
    },
    matchScore: Number,
    admissionProbability: String
  }],
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Search', searchSchema);