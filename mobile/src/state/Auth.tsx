import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type AuthState = {
  isLoading: boolean;
  isOnboarded: boolean;
  isSignedIn: boolean;
  completeOnboarding: () => Promise<void>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem('playpal_auth');
        if (raw) {
          const s = JSON.parse(raw);
          setIsOnboarded(!!s.isOnboarded);
          setIsSignedIn(!!s.isSignedIn);
        }
      } catch {}
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(
          'playpal_auth',
          JSON.stringify({ isOnboarded, isSignedIn })
        );
      } catch {}
    })();
  }, [isOnboarded, isSignedIn]);

  const completeOnboarding = async () => {
    setIsOnboarded(true);
  };

  const signIn = async () => {
    setIsSignedIn(true);
  };

  const signOut = async () => {
    setIsSignedIn(false);
  };

  const value = useMemo<AuthState>(
    () => ({ isLoading, isOnboarded, isSignedIn, completeOnboarding, signIn, signOut }),
    [isLoading, isOnboarded, isSignedIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
