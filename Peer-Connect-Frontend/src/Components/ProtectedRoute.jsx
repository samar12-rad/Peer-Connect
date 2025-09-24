import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  console.log('🛡️ ProtectedRoute - isAuthenticated:', isAuthenticated);

  useEffect(() => {
    console.log('🛡️ ProtectedRoute - useEffect triggered, isAuthenticated:', isAuthenticated);
    if (isAuthenticated === false) {
      console.log('🛡️ ProtectedRoute - Redirecting to login because isAuthenticated is false');
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