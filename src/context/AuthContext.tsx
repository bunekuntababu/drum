// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: User & { password: string }) => 
      u.email === email && u.password === password
    );

    if (foundUser) {
      setUser({
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email
      });
      return true;
    }
    return false;
  };

  const signup = async (username: string, email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    if (users.some((u: User & { password: string }) => u.email === email)) {
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    setUser({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email
    });

    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};