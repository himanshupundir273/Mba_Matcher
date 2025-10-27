const express = require('express');
const router = express.Router();
const University = require('../models/University');

// Get all universities
router.get('/', async (req, res) => {
  try {
    const universities = await University.find().sort({ ranking: 1 });
    res.json(universities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get university by ID
router.get('/:id', async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) {
      return res.status(404).json({ message: 'University not found' });
    }
    res.json(university);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Match universities (Main matching algorithm)
router.post('/match', async (req, res) => {
  try {
    const { gmat_score, gpa, work_experience, target_program } = req.body;

    // Validation
    if (!gmat_score || !gpa) {
      return res.status(400).json({ 
        message: 'GMAT score and GPA are required' 
      });
    }

    if (gmat_score < 200 || gmat_score > 800) {
      return res.status(400).json({ 
        message: 'GMAT score must be between 200 and 800' 
      });
    }

    if (gpa < 0 || gpa > 4.0) {
      return res.status(400).json({ 
        message: 'GPA must be between 0.0 and 4.0' 
      });
    }

    // Get all universities
    let universities = await University.find();

    // Filter by program type if specified
    if (target_program) {
      universities = universities.filter(u => u.type === target_program);
    }

    // Calculate match score and admission probability
    const results = universities.map(uni => {
      const matchScore = calculateMatchScore(
        gmat_score,
        gpa,
        work_experience || 0,
        uni
      );

      const admissionProbability = calculateAdmissionProbability(
        gmat_score,
        gpa,
        work_experience || 0,
        uni
      );

      return {
        university: uni,
        matchScore: matchScore,
        admissionProbability: admissionProbability
      };
    });

    // Sort by match score (descending)
    results.sort((a, b) => b.matchScore - a.matchScore);

    res.json({
      total: results.length,
      results: results
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Matching Algorithm Helper Functions
function calculateMatchScore(gmat, gpa, workExp, university) {
  let score = 0;

  // GMAT Score (40% weight)
  const gmatDiff = Math.abs(gmat - university.avgGMAT);
  const gmatScore = Math.max(0, 100 - (gmatDiff / 10));
  score += gmatScore * 0.4;

  // GPA (30% weight)
  const gpaDiff = Math.abs(gpa - university.avgGPA);
  const gpaScore = Math.max(0, 100 - (gpaDiff * 25));
  score += gpaScore * 0.3;

  // Work Experience (30% weight)
  if (workExp > 0) {
    const workExpDiff = Math.abs(workExp - university.avgWorkExp);
    const workExpScore = Math.max(0, 100 - (workExpDiff * 10));
    score += workExpScore * 0.3;
  } else {
    score += 50 * 0.3; // Neutral score if no work exp provided
  }

  return Math.round(score);
}

function calculateAdmissionProbability(gmat, gpa, workExp, university) {
  const matchScore = calculateMatchScore(gmat, gpa, workExp, university);

  // Check if within range
  const withinGMATRange = gmat >= university.gmatRange.min && 
                          gmat <= university.gmatRange.max;
  const withinGPARange = gpa >= university.gpaRange.min && 
                         gpa <= university.gpaRange.max;

  let probability = 0;

  if (withinGMATRange && withinGPARange) {
    if (matchScore >= 85) probability = 'High';
    else if (matchScore >= 70) probability = 'Good';
    else probability = 'Moderate';
  } else if (withinGMATRange || withinGPARange) {
    if (matchScore >= 75) probability = 'Moderate';
    else probability = 'Low';
  } else {
    if (matchScore >= 60) probability = 'Low';
    else probability = 'Reach';
  }

  // Adjust based on acceptance rate
  if (university.acceptanceRate < 10 && probability === 'High') {
    probability = 'Good';
  }

  return probability;
}

module.exports = router;