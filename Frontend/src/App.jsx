import React, { useState, useEffect } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import ResultsList from './components/ResultsList';
import UniversityDetail from './components/UniversityDetail';
import Header from './components/Header';
import { searchUniversities, getAllUniversities } from './services/api';

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async (searchParams) => {
    setLoading(true);
    setError(null);
    setSearchPerformed(true);
    
    try {
      const data = await searchUniversities(searchParams);
      setResults(data.results || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch results');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUniversityClick = (university) => {
    setSelectedUniversity(university);
  };

  const handleCloseDetail = () => {
    setSelectedUniversity(null);
  };

  return (
    <div className="App">
      <Header />
      
      <main className="main-content">
        <div className="container">
          {/* Hero Section */}
          <section className="hero-section">
            <h1 className="hero-title">Find Your Perfect MBA Program</h1>
            <p className="hero-subtitle">
              Match with top business schools based on your profile. 
              Get personalized recommendations and admission probabilities.
            </p>
          </section>

          {/* Search Form */}
          <SearchForm onSearch={handleSearch} loading={loading} />

          {/* Error Message */}
          {error && (
            <div className="error-message">
              <p>⚠️ {error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Finding your perfect matches...</p>
            </div>
          )}

          {/* Results */}
          {!loading && searchPerformed && (
            <ResultsList 
              results={results} 
              onUniversityClick={handleUniversityClick}
            />
          )}
        </div>
      </main>

      {/* University Detail Modal */}
      {selectedUniversity && (
        <UniversityDetail 
          university={selectedUniversity}
          onClose={handleCloseDetail}
        />
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Right Fit Matcher. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;