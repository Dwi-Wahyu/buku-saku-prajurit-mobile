// LoginScreen.tsx
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Background from 'components/layout/Background';
import LoadingSplash from 'components/LoadingSplash';
import Button from 'components/ui/Button';
import Card from 'components/ui/Card';
import Input from 'components/ui/Input';
import Colors from 'constants/Colors';
import { useAuth } from 'context/AuthContext';
import { RootStackParamList } from 'navigation';
import React, { useState, useEffect } from 'react'; // Import useEffect
import { View, Text, ActivityIndicator, Image, Alert } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, isLoading, userSession } = useAuth();

  if (isLoading) {
    return <LoadingSplash />;
  }

  useEffect(() => {
    if (!isLoading && userSession) {
      console.log('Session found on LoginScreen, navigating to Home.');
      navigation.replace('MainTabs');
    }
  }, [isLoading, userSession, navigation]);

  const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Username dan password harus diisi.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      console.log(response);

      const data = await response.json();

      const { access_token, refresh_token, user_details } = data;

      if (response.ok) {
        console.log(access_token);

        await signIn(access_token, refresh_token, user_details);

        Alert.alert('Sukses', 'Login berhasil!');
      } else {
        Alert.alert('Login Gagal', 'Terjadi kesalahan.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Tidak dapat terhubung ke server. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Background>
      <View className="mb-10 mt-20 flex w-full items-center">
        <Image source={require('../assets/logo-login.png')} />
      </View>

      <View style={styles.container}>
        <Card padding={44}>
          <Text style={{ color: Colors.primary }} className="mb-2 text-center text-4xl font-bold">
            Login
          </Text>
          <Text style={{ color: Colors.label }} className="mb-7 text-center text-xl">
            Silahkan masukkan Username dan Password untuk masuk ke aplikasi.
          </Text>

          <Input
            label="Username"
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <Input
            label="Password"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* <View>
            <Text style={styles.label}>Kode Captcha</Text>

            <View className="flex gap-2">
              <Image source={require('../assets/captcha.png')} />

              <Input
                placeholder="Masukkan Kode"
                id="captcha-input"
                value={password}
                // onChangeText={setCaptchaCode}
              />
            </View>
          </View> */}

          <Button style={{ width: 100, alignSelf: 'center', marginTop: 20 }} onPress={handleLogin}>
            {loading ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
              <Text className="text-lg font-bold" style={{ color: Colors.primary }}>
                Login
              </Text>
            )}
          </Button>
        </Card>
      </View>
    </Background>
  );
}

const styles = ScaledSheet.create({
  label: {
    color: Colors.primary,
    fontSize: '12@s',
    marginBottom: '8@s',
  },
  container: {
    paddingHorizontal: '15@s',
  },
});
