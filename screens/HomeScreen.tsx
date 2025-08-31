import { View, Text, Image, ScrollView, Alert, TouchableOpacity } from 'react-native'; // Import ScrollView
import { ScaledSheet } from 'react-native-size-matters';
import { useAuth } from '../context/AuthContext';
import Colors from 'constants/Colors';
import Background from 'components/layout/Background';
import Card from 'components/ui/Card';
import GasjarHomeIcon from 'components/icons/GasjarHomeIcon';
import NilaiLatihanHomeIcon from 'components/icons/NilaiLatihanHomeIcon';
import BakPanHomeIcon from 'components/icons/BakPanHomeIcon';
import BakPistolHomeIcon from 'components/icons/BakPistolHomeIcon';
import LoadingSplash from 'components/LoadingSplash';
import BottomBar from 'components/layout/BottomBar';
import TopBar from 'components/layout/TopBar';
import { useApi } from 'services/api';
import { useEffect, useState } from 'react';
import { Berita } from 'types/berita';
import BeritaItem from 'components/berita/BeritaItem';
import { RootStackParamList } from 'navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import NavigationBar from 'components/layout/NavigationBar';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const { fetchProtected } = useApi();
  const [beritaData, setBeritaData] = useState<Berita[] | []>([]);
  const [loadingBerita, setLoadingBerita] = useState(true);

  useEffect(() => {
    fetchBerita();
  }, [fetchProtected]);

  async function fetchBerita() {
    try {
      const result = await fetchProtected('/berita/terbaru');

      setBeritaData(result);
    } catch (error) {
      console.log(error);

      Alert.alert('Terjadi Error');
    } finally {
      setLoadingBerita(false);
    }
  }

  return (
    <Background>
      <TopBar />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card>
          <Text style={{ color: Colors.primary }} className="text-xl font-semibold">
            Menu Utama
          </Text>

          <View className="mt-10 flex flex-row flex-wrap justify-between">
            <TouchableOpacity className="w-1/2 p-2" onPress={() => navigation.push('NilaiLatihan')}>
              <View className="h-36 items-center justify-center rounded">
                <View style={styles.menuUtamaIcon} className="p-6">
                  <NilaiLatihanHomeIcon />
                </View>
                <Text style={styles.menuUtamaText}>Nilai Latihan</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="w-1/2 p-2" onPress={() => navigation.push('Garjas')}>
              <View className="h-36 items-center justify-center rounded">
                <View style={styles.menuUtamaIcon} className="p-6">
                  <GasjarHomeIcon />
                </View>
                <Text style={styles.menuUtamaText}>Garjas</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="mt-12 w-1/2 p-2" onPress={() => navigation.push('BakPan')}>
              <View className="h-36 items-center justify-center rounded">
                <View style={styles.menuUtamaIcon} className="p-6">
                  <BakPanHomeIcon />
                </View>
                <Text style={styles.menuUtamaText}>Bak Pan</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              className="mt-12 w-1/2 p-2"
              onPress={() => navigation.push('BakPistol')}>
              <View className="h-36 items-center justify-center rounded">
                <View style={styles.menuUtamaIcon} className="p-6">
                  <BakPistolHomeIcon />
                </View>
                <Text style={styles.menuUtamaText}>Bak pistol</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Card>

        <View className="mb-5 mt-12 flex flex-row items-center justify-between">
          <Text style={{ color: Colors.primary }} className="text-2xl font-semibold">
            Berita Terbaru
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate('Berita')}>
            <Text style={{ textDecorationLine: 'underline' }}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>

        {loadingBerita ? (
          <Text>Loading Berita . . .</Text>
        ) : (
          <View>
            {beritaData.length == 0 ? (
              <Text>Belum ada berita terbaru</Text>
            ) : (
              <View>
                {beritaData.map((berita) => (
                  <BeritaItem key={berita.id} berita={berita} />
                ))}
              </View>
            )}
          </View>
        )}
      </ScrollView>

      <BottomBar />
    </Background>
  );
}

const styles = ScaledSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContent: {
    paddingHorizontal: '15@s',
    paddingBottom: '90@s',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textColor: {
    color: 'white',
  },
  title: {
    fontSize: '20@s',
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    fontWeight: '600',
    marginBottom: 5,
  },
  menuUtamaIcon: { borderRadius: 100, borderWidth: 8, borderColor: '#194863' },
  menuUtamaText: { fontSize: 20, fontWeight: 'semibold', marginTop: '10@s' },
});
