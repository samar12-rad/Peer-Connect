import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildApiUrl } from '../utils/environment';
import { toast } from 'react-toastify';

// Custom hook to check authentication status
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading, true/false = auth status
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const verifyUrl = buildApiUrl('/user/verify');
      console.log('🔍 Auth check URL:', verifyUrl);
      
      const response = await fetch(verifyUrl, {
        method: 'GET',
        credentials: 'include',
      });

      console.log('🔍 Auth check response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Auth check successful:', data);
        setIsAuthenticated(true);
      } else {
        console.log('❌ Auth check failed - not authenticated');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('❌ Auth check failed with error:', error);
      setIsAuthenticated(false);
    }
  };

  const requireAuth = () => {
    if (isAuthenticated === false) {
      navigate('/login');
      return false;
    }
    return isAuthenticated === true;
  };

  return { isAuthenticated, requireAuth, checkAuthStatus };
};

// Protected Route Component
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      toast.error('Please login to access this page');
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Show loading while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Show children if authenticated
  return isAuthenticated ? children : null;
};