import React, { useRef, useEffect } from 'react';
import { Text, View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Card from 'components/ui/Card'; // Impor komponen Card Anda

import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'navigation'; // Sesuaikan path jika perlu
import Colors from 'constants/Colors'; // Pastikan path ini benar
import Icon from 'react-native-vector-icons/FontAwesome';

type BottomBarNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const menuItems = [
  { name: 'Home', icon: 'home', route: 'Home' },
  { name: 'Profile', icon: 'user', route: 'Profile' },
  { name: 'Pengaturan', icon: 'cog', route: 'Pengaturan' },
];

export default function BottomBar() {
  const navigation = useNavigation<BottomBarNavigationProp>();
  const route = useRoute();

  const animatedValues = useRef(menuItems.map(() => new Animated.Value(1))).current;

  useEffect(() => {
    menuItems.forEach((item, index) => {
      // Perhatikan: 'route.name' di sini akan merujuk pada nama tab (Home, Profile, Pengaturan)
      // bukan nama Stack Screen (MainTabs)
      const isActive = route.name === item.name; // Menggunakan item.name untuk perbandingan dengan route.name
      Animated.spring(animatedValues[index], {
        toValue: isActive ? 1.1 : 1,
        friction: 5,
        useNativeDriver: true,
      }).start();
    });
  }, [route.name, animatedValues]);

  const handlePress = (targetRoute: keyof RootStackParamList, index: number) => {
    Animated.sequence([
      Animated.timing(animatedValues[index], {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(animatedValues[index], {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Navigasi ke MainTabs, lalu secara spesifik ke tab yang diinginkan.
      // Ini penting karena BottomBar Anda berada di dalam MainTabs.
      // Jika Anda ingin navigasi antar tab, Anda perlu melakukan ini:
      if (route.name !== targetRoute) {
        // Karena 'targetRoute' di sini adalah nama tab (Home, Profile, Pengaturan)
        // dan navigator di 'index.tsx' adalah Tab.Navigator,
        // kita perlu menggunakan 'navigate' langsung ke nama tab.
        // Pastikan 'targetRoute' sesuai dengan 'name' di Tab.Screen pada MainTabs.
        navigation.navigate('MainTabs', { screen: targetRoute as any });
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Card di sini akan memiliki background dan shadow-nya sendiri */}
      <Card padding={10}>
        <View style={styles.menuWrapper}>
          {menuItems.map((item, index) => {
            const isActive = route.name === item.name; // Menggunakan item.name
            const iconColor = isActive ? Colors.primary : '#888'; // Gunakan Colors.primary dari constants
            const textColor = isActive ? Colors.primary : '#888'; // Gunakan Colors.primary dari constants

            return (
              <TouchableOpacity
                key={item.name}
                style={styles.menuItem}
                onPress={() => handlePress(item.route as keyof RootStackParamList, index)} // route di sini adalah nama Stack Screen, bukan nama tab
                activeOpacity={0.7}>
                <Animated.View style={{ transform: [{ scale: animatedValues[index] }] }}>
                  {/* Anda perlu memastikan Icon ini sudah diimpor dengan benar, misalnya dari 'react-native-vector-icons/FontAwesome' */}
                  <Icon name={item.icon} size={24} color={iconColor} />
                </Animated.View>
                <Text style={[styles.menuText, { color: textColor }]}>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Card>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    // Background ini transparan agar konten di bawah BottomBar terlihat
    backgroundColor: 'transparent',
    // Position absolute dan bottom: 0 agar BottomBar selalu berada di bagian bawah layar
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width, // Lebar penuh layar
    // Tambahkan padding horizontal agar Card tidak menempel di sisi layar
    paddingHorizontal: '15@s',
    paddingBottom: '20@s', // Padding bawah agar konten tidak terlalu dekat dengan tepi bawah
    alignSelf: 'center', // Agar Card di tengah jika width tidak 100%
  },
  menuWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  menuItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: '5@s',
  },
  menuText: {
    fontSize: '12@s',
    marginTop: '5@s',
    fontWeight: '600',
  },
});
