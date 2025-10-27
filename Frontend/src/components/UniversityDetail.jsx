import React from "react";
import "./UniversityDetail.css";

function UniversityDetail({ university, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        <div className="detail-header">
          <div className="detail-rank">#{university.ranking}</div>
          <h2>{university.name}</h2>
          <p className="detail-location">📍 {university.location}</p>
        </div>

        <div className="detail-body">
          <div className="detail-section">
            <h3>Program Statistics</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-info">
                  <span className="stat-label">GMAT Range</span>
                  <span className="stat-value">
                    {university.gmatRange.min} - {university.gmatRange.max}
                  </span>
                  <span className="stat-avg">Avg: {university.avgGMAT}</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">🎓</div>
                <div className="stat-info">
                  <span className="stat-label">GPA Range</span>
                  <span className="stat-value">
                    {university.gpaRange.min} - {university.gpaRange.max}
                  </span>
                  <span className="stat-avg">Avg: {university.avgGPA}</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">💼</div>
                <div className="stat-info">
                  <span className="stat-label">Work Experience</span>
                  <span className="stat-value">
                    {university.workExpRange.min} -{" "}
                    {university.workExpRange.max} years
                  </span>
                  <span className="stat-avg">
                    Avg: {university.avgWorkExp} years
                  </span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-info">
                  <span className="stat-label">Acceptance Rate</span>
                  <span className="stat-value">
                    {university.acceptanceRate}%
                  </span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-info">
                  <span className="stat-label">Annual Tuition</span>
                  <span className="stat-value">
                    ${university.tuition.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <span className="stat-label">Class Size</span>
                  <span className="stat-value">{university.classSize}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>Program Strengths</h3>
            <div className="strengths-list">
              {university.strengths.map((strength, i) => (
                <div key={i} className="strength-item">
                  <span className="strength-bullet">•</span>
                  <span>{strength}</span>
                </div>
              ))}
            </div>
          </div>

          {university.website && (
            <div className="detail-section">
              <a
                href={university.website}
                target="_blank"
                rel="noopener noreferrer"
                className="website-btn"
              >
                Visit Official Website →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UniversityDetail;
