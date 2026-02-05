import { createContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

interface AuthContextType {
  authenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setAuthenticated(true);
    }
    
    setLoading(false);
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setAuthenticated(true);
    navigate('/dashboard'); // Redireciona após login
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};