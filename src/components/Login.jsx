import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      setError('');
      setIsLoading(true);
      await login();
    } catch (error) {
      setError('Failed to sign in. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Mood Board</h1>
        <p className="login-text">Track your daily mood and reflect on your emotional journey</p>
        
        <button 
          className="google-signin-button" 
          onClick={handleLogin} 
          disabled={isLoading}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(1, 0, 0, 1, 0, 0)">
              <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1Z" fill="#4285F4"></path>
            </g>
          </svg>
          <span>{isLoading ? 'Signing in...' : 'Sign in with Google'}</span>
        </button>
        
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Login; 