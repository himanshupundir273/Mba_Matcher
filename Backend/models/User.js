const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  profile: {
    gmatScore: Number,
    gpa: Number,
    workExperience: Number,
    targetProgram: {
      type: String,
      enum: ['MBA', 'MS', 'Executive MBA', 'Part-time MBA']
    },
    preferredLocations: [String],
    budgetMax: Number
  },
  savedUniversities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'University'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);