import { buildApiUrl } from './environment';

// Auto-detect current page for source tracking
const getCurrentPageSource = () => {
  const currentPath = window.location.pathname;
  const pageMapping = {
    '/': 'login', // Root redirects to login when not authenticated
    '/dashboard': 'dashboard',
    '/chat': 'chat',
    '/peerFinder': 'peer-finder',
    '/login': 'login',
    '/signup': 'signup',
  };

  // Check for exact matches first
  if (pageMapping[currentPath]) {
    return pageMapping[currentPath];
  }

  // Check for partial matches
  if (currentPath.startsWith('/peerFinder')) return 'peer-finder';
  if (currentPath.startsWith('/chat')) return 'chat';
  if (currentPath.startsWith('/dashboard')) return 'dashboard';

  return 'unknown';
};

// Centralized API utility that automatically includes auth headers and source tracking
export const apiRequest = async (endpoint, options = {}) => {
  const url = buildApiUrl(endpoint);

  // Get auth token from localStorage
  const authToken = localStorage.getItem('authToken');

  // Auto-detect current page and component info
  const currentPage = getCurrentPageSource();
  const currentPath = window.location.pathname;

  // Prepare headers with source tracking
  const headers = {
    'Content-Type': 'application/json',
    'X-Page-Source': currentPage,
    'X-Current-Path': currentPath,
    'X-Endpoint': endpoint,
    ...options.headers,
  };

  // Add Authorization header if token exists
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
    console.log('🔑 API Request - Using stored auth token for:', endpoint);
  }

  // Default configuration
  const { headers: optionHeaders, ...otherOptions } = options;

  const config = {
    credentials: 'include', // Always include cookies
    headers,
    ...otherOptions, // Allow overriding defaults but NOT headers (use the merged ones)
  };

  try {
    console.log(
      `🌐 API Request: ${url} ${config.method || 'GET'} | From: ${currentPage} (${currentPath})`
    );
    const response = await fetch(url, config);

    // Log response status for debugging
    console.log(
      `📡 API Response: ${endpoint} | Status: ${response.status} | From: ${currentPage}`
    );

    return response;
  } catch (error) {
    console.error(
      `❌ API Request failed: ${endpoint} | From: ${currentPage} | Error:`,
      error
    );
    throw error;
  }
};

// Enhanced convenience methods with component tracking
export const apiGet = (endpoint, componentName = null, options = {}) => {
  const extraHeaders = componentName ? { 'X-Component': componentName } : {};
  return apiRequest(endpoint, {
    method: 'GET',
    ...options,
    headers: {
      ...extraHeaders,
      ...options.headers,
    },
  });
};

export const apiPost = (endpoint, data, componentName = null, options = {}) => {
  const extraHeaders = componentName ? { 'X-Component': componentName } : {};
  return apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    ...options,
    headers: {
      ...extraHeaders,
      ...options.headers, // This should come after to allow overriding
    },
  });
};

export const apiPut = (endpoint, data, componentName = null, options = {}) => {
  const extraHeaders = componentName ? { 'X-Component': componentName } : {};
  return apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
    ...options,
    headers: {
      ...extraHeaders,
      ...options.headers,
    },
  });
};

export const apiDelete = (endpoint, componentName = null, options = {}) => {
  const extraHeaders = componentName ? { 'X-Component': componentName } : {};
  return apiRequest(endpoint, {
    method: 'DELETE',
    ...options,
    headers: {
      ...extraHeaders,
      ...options.headers,
    },
  });
};
