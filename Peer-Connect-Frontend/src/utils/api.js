import { buildApiUrl } from './environment';

// Centralized API utility that automatically includes auth headers
export const apiRequest = async (endpoint, options = {}) => {
  const url = buildApiUrl(endpoint);
  
  // Get auth token from localStorage
  const authToken = localStorage.getItem('authToken');
  
  // Prepare headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  // Add Authorization header if token exists
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
    console.log('🔑 API Request - Using stored auth token for:', endpoint);
  }
  
  // Default configuration
  const config = {
    credentials: 'include', // Always include cookies
    headers,
    ...options, // Allow overriding defaults
  };
  
  try {
    console.log('🌐 API Request:', url, config.method || 'GET');
    const response = await fetch(url, config);
    return response;
  } catch (error) {
    console.error('❌ API Request failed:', endpoint, error);
    throw error;
  }
};

// Convenience methods
export const apiGet = (endpoint, options = {}) => 
  apiRequest(endpoint, { method: 'GET', ...options });

export const apiPost = (endpoint, data, options = {}) => 
  apiRequest(endpoint, { 
    method: 'POST', 
    body: JSON.stringify(data),
    ...options 
  });

export const apiPut = (endpoint, data, options = {}) => 
  apiRequest(endpoint, { 
    method: 'PUT', 
    body: JSON.stringify(data),
    ...options 
  });

export const apiDelete = (endpoint, options = {}) => 
  apiRequest(endpoint, { method: 'DELETE', ...options });