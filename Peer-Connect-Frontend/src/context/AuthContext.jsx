import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiGet } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading, true/false = auth status

  const checkAuthStatus = async () => {
    try {
      console.log('🔍 AuthContext - Current auth state:', isAuthenticated);
      
      const response = await apiGet('/user/verify');

      console.log('🔍 AuthContext - Auth check response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('✅ AuthContext - Auth check successful:', data);
        console.log('✅ AuthContext - Setting isAuthenticated to TRUE');
        setIsAuthenticated(true);
        return true;
      } else {
        console.log('❌ AuthContext - Auth check failed - not authenticated');
        console.log('❌ AuthContext - Setting isAuthenticated to FALSE');
        setIsAuthenticated(false);
        return false;
      }
    } catch (error) {
      console.error('❌ AuthContext - Auth check failed with error:', error);
      console.log('❌ AuthContext - Setting isAuthenticated to FALSE due to error');
      setIsAuthenticated(false);
      return false;
    }
  };

  const refreshAuth = async () => {
    return await checkAuthStatus();
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const value = {
    isAuthenticated,
    checkAuthStatus,
    refreshAuth,
    setIsAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};