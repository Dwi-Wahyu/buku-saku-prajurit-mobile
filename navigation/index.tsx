import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';

import { useAuth } from '../context/AuthContext';
import LoadingSplash from '../components/LoadingSplash';
import SettingsScreen from 'screens/SettingsScreen';
import DetailBeritaScreen from 'screens/DetailBeritaScreen';
import BeritaScreen from 'screens/BeritaScreen';
import GarjasScreen from 'screens/GarjasScreen';
import BakPistolScreen from 'screens/BakPistolScreen';
import BakPanScreen from 'screens/BakPanScreen';
import NilaiLatihanScreen from 'screens/NilaiLatihanScreen';
import UtpHistoryScreen from 'screens/UtpHistory';
import LatihanSatuanHistoryScreen from 'screens/LatihanSatuanHistory';
import PancasilaScreen from 'screens/PancasilaScreen';
import SaptaMargaScreen from 'screens/SaptaMargaScreen';
import SumpahPrajuritScreen from 'screens/SumpahPrajuritScreen';
import WajibTniScreen from 'screens/WajibTniScreen';

export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  Berita: undefined;
  DetailBerita: { beritaId: string };
  Garjas: undefined;
  NilaiLatihan: undefined;
  UtpHistory: undefined;
  LatihanSatuanHistory: undefined;
  BakPan: undefined;
  BakPistol: undefined;
  Pancasila: undefined;
  SaptaMarga: undefined;
  SumpahPrajurit: undefined;
  WajibTNI: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Profile: undefined;
  Pengaturan: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: 0, display: 'none' },
      }}
      tabBar={() => null}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Pengaturan" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  const { userSession, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSplash />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userSession ? (
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />

            <Stack.Screen name="Berita" component={BeritaScreen} />

            <Stack.Screen name="Garjas" component={GarjasScreen} />

            <Stack.Screen name="NilaiLatihan" component={NilaiLatihanScreen} />

            <Stack.Screen name="UtpHistory" component={UtpHistoryScreen} />

            <Stack.Screen name="LatihanSatuanHistory" component={LatihanSatuanHistoryScreen} />

            <Stack.Screen name="BakPan" component={BakPanScreen} />

            <Stack.Screen name="BakPistol" component={BakPistolScreen} />

            <Stack.Screen name="Pancasila" component={PancasilaScreen} />

            <Stack.Screen name="SaptaMarga" component={SaptaMargaScreen} />

            <Stack.Screen name="SumpahPrajurit" component={SumpahPrajuritScreen} />

            <Stack.Screen name="WajibTNI" component={WajibTniScreen} />

            <Stack.Screen name="DetailBerita" component={DetailBeritaScreen} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
