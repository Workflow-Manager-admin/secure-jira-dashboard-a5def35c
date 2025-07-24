import React, { useState } from 'react';
import { authService } from '../services/authService';
import './LoginForm.css';

// PUBLIC_INTERFACE
function LoginForm({ onLogin }) {
  const [formData, setFormData] = useState({
    jira_email: '',
    jira_domain: '',
    jira_api_token: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  // PUBLIC_INTERFACE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear general error
    if (error) {
      setError('');
    }
  };

  // PUBLIC_INTERFACE
  const validateForm = () => {
    const errors = {};
    
    if (!formData.jira_email.trim()) {
      errors.jira_email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.jira_email)) {
      errors.jira_email = 'Please enter a valid email address';
    }
    
    if (!formData.jira_domain.trim()) {
      errors.jira_domain = 'Jira domain is required';
    } else if (!formData.jira_domain.includes('.atlassian.net') && !formData.jira_domain.includes('.')) {
      errors.jira_domain = 'Please enter a valid Jira domain (e.g., your-domain.atlassian.net)';
    }
    
    if (!formData.jira_api_token.trim()) {
      errors.jira_api_token = 'API token is required';
    }
    
    return errors;
  };

  // PUBLIC_INTERFACE
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    setLoading(true);
    setError('');
    setValidationErrors({});
    
    try {
      const response = await authService.login(formData);
      onLogin(response);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Jira Dashboard</h1>
          <p>Sign in to access your Jira projects</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="jira_email">Email Address</label>
            <input
              type="email"
              id="jira_email"
              name="jira_email"
              value={formData.jira_email}
              onChange={handleChange}
              placeholder="your-email@company.com"
              className={validationErrors.jira_email ? 'error' : ''}
              disabled={loading}
            />
            {validationErrors.jira_email && (
              <span className="error-message">{validationErrors.jira_email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="jira_domain">Jira Domain</label>
            <input
              type="text"
              id="jira_domain"
              name="jira_domain"
              value={formData.jira_domain}
              onChange={handleChange}
              placeholder="your-domain.atlassian.net"
              className={validationErrors.jira_domain ? 'error' : ''}
              disabled={loading}
            />
            {validationErrors.jira_domain && (
              <span className="error-message">{validationErrors.jira_domain}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="jira_api_token">API Token</label>
            <input
              type="password"
              id="jira_api_token"
              name="jira_api_token"
              value={formData.jira_api_token}
              onChange={handleChange}
              placeholder="Your Jira API token"
              className={validationErrors.jira_api_token ? 'error' : ''}
              disabled={loading}
            />
            {validationErrors.jira_api_token && (
              <span className="error-message">{validationErrors.jira_api_token}</span>
            )}
            <small className="help-text">
              <a href="https://id.atlassian.com/manage-profile/security/api-tokens" target="_blank" rel="noopener noreferrer">
                Don't have an API token? Create one here
              </a>
            </small>
          </div>

          {error && (
            <div className="error-banner">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
