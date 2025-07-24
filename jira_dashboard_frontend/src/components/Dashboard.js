import React, { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import ProjectCard from './ProjectCard';
import './Dashboard.css';

// PUBLIC_INTERFACE
function Dashboard({ user, onLogout }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  // PUBLIC_INTERFACE
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError('');
      const projectData = await authService.getProjects();
      setProjects(projectData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // PUBLIC_INTERFACE
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // PUBLIC_INTERFACE
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.key.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1>Jira Dashboard</h1>
            <p>Welcome back, {user?.jira_email}</p>
          </div>
          <div className="header-right">
            <button onClick={onLogout} className="logout-button">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          <button onClick={fetchProjects} className="refresh-button" disabled={loading}>
            {loading ? '⟳' : '↻'} Refresh
          </button>
        </div>

        {error && (
          <div className="error-banner">
            <span className="error-icon">⚠️</span>
            {error}
            <button onClick={fetchProjects} className="retry-button">
              Try Again
            </button>
          </div>
        )}

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading your projects...</p>
          </div>
        ) : (
          <div className="projects-section">
            <div className="projects-header">
              <h2>Your Projects ({filteredProjects.length})</h2>
            </div>
            
            {filteredProjects.length === 0 ? (
              <div className="no-projects">
                {searchTerm ? (
                  <p>No projects found matching "{searchTerm}"</p>
                ) : (
                  <p>No projects found. You might not have access to any projects or they haven't loaded yet.</p>
                )}
              </div>
            ) : (
              <div className="projects-grid">
                {filteredProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
