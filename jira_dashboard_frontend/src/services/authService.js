import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Configure axios defaults
axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// PUBLIC_INTERFACE
export const authService = {
  /**
   * Login with Jira credentials
   */
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.detail || 'Login failed');
      }
      throw new Error('Network error - please try again');
    }
  },

  /**
   * Logout and clear session
   */
  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  /**
   * Check current session status
   */
  async checkSession() {
    try {
      const response = await api.get('/auth/session');
      return response.data;
    } catch (error) {
      throw new Error('Session invalid');
    }
  },

  /**
   * Fetch Jira projects
   */
  async getProjects() {
    try {
      const response = await api.get('/jira/projects');
      return response.data.projects;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.detail || 'Failed to fetch projects');
      }
      throw new Error('Network error - please try again');
    }
  }
};
