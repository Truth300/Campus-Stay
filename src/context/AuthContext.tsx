
import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "student" | "owner" | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Mock login function - would connect to backend in a real application
  const login = async (email: string, password: string) => {
    try {
      // Mock successful login
      console.log("Logging in with:", email, password);
      
      // For demo purposes, we'll set a mock user based on the email
      const isOwner = email.includes("owner");
      const mockUser: User = {
        id: "user-1",
        name: isOwner ? "Hostel Owner" : "Student User",
        email: email,
        role: isOwner ? "owner" : "student",
        avatar: isOwner ? "/owner-avatar.jpg" : "/student-avatar.jpg"
      };
      
      setUser(mockUser);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  // Mock signup function
  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    try {
      // Mock successful signup
      console.log("Signing up:", email, password, name, role);
      
      const mockUser: User = {
        id: "new-user-1",
        name: name,
        email: email,
        role: role
      };
      
      setUser(mockUser);
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
