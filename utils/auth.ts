import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { User } from 'types/auth';

export interface DecodedToken {
  user_id: string;
  role: string;
  exp: number;
  iat: number;
}

export const saveUserSession = async (
  accessToken: string,
  refreshToken: string,
  userDetails: User
) => {
  try {
    await AsyncStorage.setItem('user_details', JSON.stringify(userDetails));
    await AsyncStorage.setItem('access_token', accessToken);
    await AsyncStorage.setItem('refresh_token', refreshToken);

    return userDetails;
  } catch (error) {
    console.error('Failed to save user session:', error);
    throw error;
  }
};

export const loadUserSession = async (): Promise<User | null> => {
  try {
    const accessToken = await AsyncStorage.getItem('access_token');
    const refreshToken = await AsyncStorage.getItem('refresh_token');
    const userDataString = await AsyncStorage.getItem('user_details');

    if (!accessToken || !refreshToken || !userDataString) {
      return null;
    }

    const userData = JSON.parse(userDataString);

    const decodedAccessToken: DecodedToken = jwtDecode(accessToken.toString());
    const currentTime = Date.now() / 1000;
    if (decodedAccessToken.exp < currentTime) {
      console.warn('Access Token has expired locally. Attempting to refresh.');
      return null;
    }

    return userData;
  } catch (error) {
    console.error('Failed to load user session:', error);
    await clearUserSession();
    return null;
  }
};

export const clearUserSession = async () => {
  try {
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('refresh_token');
    await AsyncStorage.removeItem('user_details');
  } catch (error) {
    console.error('Failed to clear user session:', error);
    throw error;
  }
};
