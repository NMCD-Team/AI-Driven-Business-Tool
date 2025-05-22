import React, { createContext, useEffect, useState, ReactNode, useContext } from "react";
import auth from "../Firebase/Firebase.config";
import { 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  sendPasswordResetEmail, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  updateProfile,
  User,
  UserCredential,
  GoogleAuthProvider
} from "firebase/auth";

// Define types for context and props
export interface AuthContextType {
  userRegister: (email: string, password: string) => Promise<UserCredential>;
  userLogin: (email: string, password: string) => Promise<UserCredential>;
  userGoogleLogin: () => Promise<UserCredential>;
  userLogout: () => Promise<void>;
  UpdateUserProfile: (updateData: { displayName?: string; photoURL?: string }) => Promise<void>;
  userForgePassword: (email: string) => Promise<void>;
  user: User | null;
  loading: boolean;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

interface ProviderProps {
  children: ReactNode;
}

const provider = new GoogleAuthProvider();
export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');

  // user Register method
  const userRegister = (email: string, password: string): Promise<UserCredential> => {
    setLoading(false);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // User Login method
  const userLogin = (email: string, password: string): Promise<UserCredential> => {
    setLoading(false);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const userGoogleLogin = (): Promise<UserCredential> => {
    setLoading(false);
    return signInWithPopup(auth, provider);
  };

  const userLogout = (): Promise<void> => {
    setLoading(false);
    return signOut(auth);
  };

  const UpdateUserProfile = (updateData: { displayName?: string; photoURL?: string }): Promise<void> => {
    if (!auth.currentUser) {
      return Promise.reject(new Error("No user is signed in"));
    }
    return updateProfile(auth.currentUser, updateData);
  };

  const userForgePassword = (email: string): Promise<void> => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    
    // Cleanup function
    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo: AuthContextType = {
    userRegister,
    userLogin,
    user,
    userLogout,
    userGoogleLogin,
    loading,
    UpdateUserProfile,
    userForgePassword,
    setEmail,
    email,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default Provider;