// AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { loadUserSession, saveUserSession, clearUserSession, DecodedToken } from '../utils/auth'; // Perbaiki path jika perlu
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from 'types/auth';

interface AuthContextType {
  userSession: User | null;
  isLoading: boolean;
  signIn: (accessToken: string, refreshToken: string, userDetails: User) => Promise<void>;
  signOut: () => Promise<void>;
  getAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userSession, setUserSession] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshAndSetSession = useCallback(async (refreshToken: string) => {
    console.log('Attempting to refresh token during initialization...');
    try {
      const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Gagal memperbarui token.');
      }

      const newAccessToken = data.access_token;
      const newRefreshToken = data.refresh_token;
      const userDetails = data.user_details;

      const userSession = await saveUserSession(newAccessToken, newRefreshToken, userDetails);
      setUserSession(userSession);
      console.log('Access Token refreshed successfully during initialization.');
    } catch (error) {
      console.error('Failed to refresh token during initialization:', error);
      await clearUserSession();
      setUserSession(null);
    }
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const session = await loadUserSession();
        if (session) {
          setUserSession(session);
        } else {
          const refreshTokenFromStorage = await AsyncStorage.getItem('refresh_token');
          if (refreshTokenFromStorage) {
            await refreshAndSetSession(refreshTokenFromStorage);
          } else {
            setUserSession(null);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        await clearUserSession();
        setUserSession(null);
      } finally {
        setIsLoading(false);
      }
    };
    initializeAuth();
  }, [refreshAndSetSession]);

  const signIn = useCallback(async (accessToken: string, refreshToken: string, user: User) => {
    const session = await saveUserSession(accessToken, refreshToken, user);
    setUserSession(session);
  }, []);

  const signOut = useCallback(async () => {
    if (userSession) {
      const refreshToken = await AsyncStorage.getItem('refresh_token');

      try {
        const response = await fetch(`${BACKEND_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken: refreshToken }),
        });

        if (!response.ok) {
          console.error('Failed to revoke refresh token on server:', await response.json());
        } else {
          console.log('Refresh token successfully revoked on server.');
        }
      } catch (error) {
        console.error('Error calling logout API:', error);
      }
    }

    await clearUserSession();
    setUserSession(null);
  }, [userSession]);

  const getAccessToken = useCallback(async (): Promise<string | null> => {
    const accessToken = await AsyncStorage.getItem('access_token');

    if (!accessToken) {
      return null;
    }

    if (typeof accessToken !== 'string') {
      console.error('Invalid access token stored:', accessToken);
      return null;
    }

    const decodedAccessToken: DecodedToken = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;

    if (decodedAccessToken.exp > currentTime) {
      return accessToken;
    }

    const refreshToken = await AsyncStorage.getItem('refresh_token');

    if (!refreshToken) {
      return null;
    }

    await refreshAndSetSession(refreshToken);

    return null;
  }, [userSession, refreshAndSetSession]);

  return (
    <AuthContext.Provider value={{ userSession, isLoading, signIn, signOut, getAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
