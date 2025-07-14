import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AboutScreen from 'screens/AboutScreen';
import HomeScreen from 'screens/HomeScreen';
import LoginScreen from 'screens/LoginScreen';

// Tipe parameter untuk setiap route (opsional tapi direkomendasikan dengan TypeScript)
export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  About: undefined;
};

// Buat navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom',
        }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Beranda' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{ title: 'Tentang Aplikasi' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
