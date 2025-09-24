// Environment configuration utility
// In Vite, import.meta.env.DEV is true during development, import.meta.env.PROD is true in production
const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

// API Base URLs - corrected port to 3000 based on backend config
const API_BASE_URLS = {
  development: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  production: import.meta.env.VITE_PROD_API_BASE_URL || 'https://peer-connect-production.up.railway.app'
};

// Socket URLs - corrected port to 3000 based on backend config
const SOCKET_URLS = {
  development: import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000',
  production: import.meta.env.VITE_PROD_SOCKET_URL || 'https://peer-connect-production.up.railway.app'
};

// Get current environment
export const getCurrentEnvironment = () => {
  // Check if we're running on localhost (most reliable for development)
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'development';
    }
  }
  
  // Check Vite's built-in environment variables
  if (isDevelopment) return 'development';
  if (isProduction) return 'production';
  
  // Check our custom environment variable
  if (import.meta.env.VITE_NODE_ENV === 'development') return 'development';
  if (import.meta.env.VITE_NODE_ENV === 'production') return 'production';
  
  // Default to development for safety during local testing
  return 'development';
};

// Get API base URL based on current environment
export const getApiBaseUrl = () => {
  const env = getCurrentEnvironment();
  const baseUrl = API_BASE_URLS[env];
  console.log(`🔗 Using API Base URL: ${baseUrl} (Environment: ${env})`);
  return baseUrl;
};

// Get Socket URL based on current environment
export const getSocketUrl = () => {
  const env = getCurrentEnvironment();
  const socketUrl = SOCKET_URLS[env];
  console.log(`🔌 Using Socket URL: ${socketUrl} (Environment: ${env})`);
  return socketUrl;
};

// Build full API endpoint URL
export const buildApiUrl = (endpoint) => {
  const baseUrl = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}/api/v1${cleanEndpoint}`;
};

// Environment info for debugging
export const getEnvironmentInfo = () => {
  return {
    current: getCurrentEnvironment(),
    isDevelopment,
    isProduction,
    apiBaseUrl: getApiBaseUrl(),
    socketUrl: getSocketUrl(),
    allEnvVars: import.meta.env
  };
};

// Log environment info in development
console.log('🌍 Environment Detection:');
console.log('  - import.meta.env.DEV:', import.meta.env.DEV);
console.log('  - import.meta.env.PROD:', import.meta.env.PROD);
console.log('  - Current Environment:', getCurrentEnvironment());
console.log('  - API Base URL:', getApiBaseUrl());
console.log('  - Socket URL:', getSocketUrl());

if (isDevelopment) {
  console.log('🌍 Full Environment Info:', getEnvironmentInfo());
}