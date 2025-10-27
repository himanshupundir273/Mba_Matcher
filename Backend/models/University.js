const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['MBA', 'MS', 'Executive MBA', 'Part-time MBA'],
    default: 'MBA'
  },
  avgGMAT: {
    type: Number,
    required: true
  },
  gmatRange: {
    min: Number,
    max: Number
  },
  avgGPA: {
    type: Number,
    required: true
  },
  gpaRange: {
    min: Number,
    max: Number
  },
  avgWorkExp: {
    type: Number,
    required: true
  },
  workExpRange: {
    min: Number,
    max: Number
  },
  acceptanceRate: {
    type: Number,
    required: true
  },
  tuition: {
    type: Number,
    required: true
  },
  classSize: {
    type: Number,
    required: true
  },
  ranking: {
    type: Number,
    required: true
  },
  strengths: [{
    type: String
  }],
  website: String,
  description: String
}, {
  timestamps: true
});

module.exports = mongoose.model('University', universitySchema);