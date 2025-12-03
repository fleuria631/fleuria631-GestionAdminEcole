'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { storageService, type User, type Profile } from '@/lib/storage';

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = storageService.getCurrentUser();
    setUser(currentUser);

    if (currentUser) {
      loadProfile(currentUser.id);
    } else {
      setLoading(false);
    }
  }, []);

  function loadProfile(userId: string) {
    try {
      const profiles = storageService.getProfiles();
      const userProfile = profiles.find(p => p.id === userId);
      setProfile(userProfile || null);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
