import React, { useState } from 'react';
import './ResultsList.css';

function ResultsList({ results, onUniversityClick }) {
  const [sortBy, setSortBy] = useState('matchScore');
  const [filterProbability, setFilterProbability] = useState('all');

  if (!results || results.length === 0) {
    return (
      <div className="no-results">
        <p>No universities found matching your criteria.</p>
        <p>Try adjusting your search parameters.</p>
      </div>
    );
  }

  // Filter results
  let filteredResults = [...results];
  if (filterProbability !== 'all') {
    filteredResults = filteredResults.filter(
      r => r.admissionProbability === filterProbability
    );
  }

  // Sort results
  filteredResults.sort((a, b) => {
    if (sortBy === 'matchScore') {
      return b.matchScore - a.matchScore;
    } else if (sortBy === 'ranking') {
      return a.university.ranking - b.university.ranking;
    } else if (sortBy === 'tuition') {
      return a.university.tuition - b.university.tuition;
    }
    return 0;
  });

  const getProbabilityClass = (probability) => {
    const map = {
      'High': 'high',
      'Good': 'good',
      'Moderate': 'moderate',
      'Low': 'low',
      'Reach': 'reach'
    };
    return map[probability] || 'moderate';
  };

  const getProbabilityIcon = (probability) => {
    const map = {
      'High': '🎯',
      'Good': '✅',
      'Moderate': '⚖️',
      'Low': '📊',
      'Reach': '🎲'
    };
    return map[probability] || '📊';
  };

  return (
    <div className="results-section">
      <div className="results-header">
        <h2>Your Matches ({filteredResults.length})</h2>
        
        <div className="results-controls">
          <div className="control-group">
            <label>Filter by Probability:</label>
            <select 
              value={filterProbability} 
              onChange={(e) => setFilterProbability(e.target.value)}
            >
              <option value="all">All</option>
              <option value="High">High</option>
              <option value="Good">Good</option>
              <option value="Moderate">Moderate</option>
              <option value="Low">Low</option>
              <option value="Reach">Reach</option>
            </select>
          </div>

          <div className="control-group">
            <label>Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="matchScore">Match Score</option>
              <option value="ranking">Ranking</option>
              <option value="tuition">Tuition</option>
            </select>
          </div>
        </div>
      </div>

      <div className="results-grid">
        {filteredResults.map((result, index) => (
          <div 
            key={result.university._id} 
            className="university-card"
            onClick={() => onUniversityClick(result.university)}
          >
            <div className="card-header">
              <div className="card-rank">#{result.university.ranking}</div>
              <div className={`probability-badge ${getProbabilityClass(result.admissionProbability)}`}>
                {getProbabilityIcon(result.admissionProbability)} {result.admissionProbability}
              </div>
            </div>

            <h3 className="university-name">{result.university.name}</h3>
            <p className="university-location">📍 {result.university.location}</p>

            <div className="match-score">
              <div className="match-score-bar">
                <div 
                  className="match-score-fill" 
                  style={{ width: `${result.matchScore}%` }}
                ></div>
              </div>
              <span className="match-score-text">{result.matchScore}% Match</span>
            </div>

            <div className="university-stats">
              <div className="stat">
                <span className="stat-label">Avg GMAT</span>
                <span className="stat-value">{result.university.avgGMAT}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Avg GPA</span>
                <span className="stat-value">{result.university.avgGPA}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Acceptance</span>
                <span className="stat-value">{result.university.acceptanceRate}%</span>
              </div>
            </div>

            <div className="university-tuition">
              💰 ${result.university.tuition.toLocaleString()}/year
            </div>

            <div className="university-strengths">
              {result.university.strengths.slice(0, 3).map((strength, i) => (
                <span key={i} className="strength-tag">{strength}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultsList;