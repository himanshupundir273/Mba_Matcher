import React, { useState } from 'react';
import './SearchForm.css';

function SearchForm({ onSearch, loading }) {
  const [formData, setFormData] = useState({
    gmat_score: '',
    gpa: '',
    work_experience: '',
    target_program: 'MBA'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.gmat_score) {
      newErrors.gmat_score = 'GMAT score is required';
    } else if (formData.gmat_score < 200 || formData.gmat_score > 800) {
      newErrors.gmat_score = 'GMAT score must be between 200 and 800';
    }

    if (!formData.gpa) {
      newErrors.gpa = 'GPA is required';
    } else if (formData.gpa < 0 || formData.gpa > 4.0) {
      newErrors.gpa = 'GPA must be between 0.0 and 4.0';
    }

    if (formData.work_experience && formData.work_experience < 0) {
      newErrors.work_experience = 'Work experience cannot be negative';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSearch(formData);
  };

  return (
    <div className="search-form-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="gmat_score">
              GMAT Score <span className="required">*</span>
            </label>
            <input
              type="number"
              id="gmat_score"
              name="gmat_score"
              value={formData.gmat_score}
              onChange={handleChange}
              placeholder="e.g., 720"
              min="200"
              max="800"
              className={errors.gmat_score ? 'error' : ''}
            />
            {errors.gmat_score && (
              <span className="error-text">{errors.gmat_score}</span>
            )}
            <small className="help-text">Score range: 200-800</small>
          </div>

          <div className="form-group">
            <label htmlFor="gpa">
              GPA <span className="required">*</span>
            </label>
            <input
              type="number"
              id="gpa"
              name="gpa"
              value={formData.gpa}
              onChange={handleChange}
              placeholder="e.g., 3.8"
              step="0.01"
              min="0"
              max="4.0"
              className={errors.gpa ? 'error' : ''}
            />
            {errors.gpa && (
              <span className="error-text">{errors.gpa}</span>
            )}
            <small className="help-text">Scale: 0.0-4.0</small>
          </div>

          <div className="form-group">
            <label htmlFor="work_experience">Work Experience (years)</label>
            <input
              type="number"
              id="work_experience"
              name="work_experience"
              value={formData.work_experience}
              onChange={handleChange}
              placeholder="e.g., 5"
              min="0"
              max="20"
            />
            <small className="help-text">Optional</small>
          </div>

          <div className="form-group">
            <label htmlFor="target_program">Program Type</label>
            <select
              id="target_program"
              name="target_program"
              value={formData.target_program}
              onChange={handleChange}
            >
              <option value="MBA">MBA</option>
              <option value="Executive MBA">Executive MBA</option>
              <option value="Part-time MBA">Part-time MBA</option>
              <option value="MS">MS Programs</option>
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Find My Matches'}
        </button>
      </form>
    </div>
  );
}

export default SearchForm;