import { useAuth } from 'context/AuthContext';
import { useCallback } from 'react';

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export const useApi = () => {
  const { getAccessToken, signOut } = useAuth();

  const fetchProtected = useCallback(
    async (endpoint: string, options?: RequestInit) => {
      try {
        const accessToken = await getAccessToken();

        if (!accessToken) {
          throw new Error('No active session. Please log in.');
        }

        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          ...(options?.headers || {}),
        };

        const response = await fetch(`${BACKEND_URL}${endpoint}`, {
          ...options,
          headers,
        });

        console.log(response);

        if (response.status === 401) {
          console.warn('Received 401 after token refresh attempt. Forcing logout.');
          await signOut();
          throw new Error('Session expired. Please log in again.');
        }

        if (!response.ok) {
          throw new Error('Something went wrong with the API call.');
        }

        const data = await response.json();

        return data;
      } catch (error) {
        console.error('API call error:', error);
        throw error;
      }
    },
    [getAccessToken, signOut]
  );

  return { fetchProtected };
};

// Contoh penggunaan di dalam komponen React Native:
// import { useApi } from '../services/api';

// const MyProtectedScreen = () => {
//   const { fetchProtected } = useApi();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await fetchProtected('/protected'); // Panggil API yang dilindungi
//         setData(result);
//       } catch (error) {
//         Alert.alert('Error', error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [fetchProtected]);

//   if (loading) {
//     return <ActivityIndicator />;
//   }

//   return (
//     <View>
//       <Text>Protected Data:</Text>
//       <Text>{JSON.stringify(data, null, 2)}</Text>
//     </View>
//   );
// };
