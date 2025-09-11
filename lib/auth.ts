'use client';

import { useState, useEffect, createContext, useContext } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Mock authentication - in production, replace with real auth service
export class AuthService {
  private static readonly USERS_KEY = 'freelance_dash_users';
  private static readonly CURRENT_USER_KEY = 'freelance_dash_current_user';

  static async login(email: string, password: string): Promise<User | null> {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
      return userWithoutPassword;
    }
    
    return null;
  }

  static async register(email: string, password: string, name: string): Promise<User | null> {
    const users = this.getUsers();
    
    if (users.find(u => u.email === email)) {
      return null; // User already exists
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name
    };

    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = newUser;
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  }

  static logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  static getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.CURRENT_USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  private static getUsers(): Array<{ id: string; email: string; password: string; name: string }> {
    const usersStr = localStorage.getItem(this.USERS_KEY);
    return usersStr ? JSON.parse(usersStr) : [];
  }
}

export { AuthContext };