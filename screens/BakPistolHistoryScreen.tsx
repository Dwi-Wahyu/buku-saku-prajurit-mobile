import { useNavigation } from '@react-navigation/native';
import Background from 'components/layout/Background';
import TopBarContent from 'components/layout/TopbarContent';
import Card from 'components/ui/Card';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Colors from '../constants/Colors'; // Sesuaikan path jika berbeda
import Button from 'components/ui/Button';
import { useEffect, useState } from 'react';
import { RootStackParamList } from 'navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Alert } from 'react-native';
import { BakPistol } from 'types/bak-pistol';
import { useApi } from 'services/api';
import LoadingSplash from 'components/LoadingSplash';
import { useAuth } from 'context/AuthContext';
import { BakPistolCard } from 'components/BakPistolCard';

type ScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'BakPistolHistory'>;

export default function BakPistolHistoryScreen() {
  const navigation = useNavigation<ScreenNavigationProps>();

  const { userSession, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSplash />;
  }

  if (!userSession) {
    return (
      <Background>
        <View>
          <Text>Anda Belum Login</Text>
        </View>
      </Background>
    );
  }

  const { fetchProtected } = useApi();
  const [latihanData, setLatihanData] = useState<BakPistol[] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatihan();
  }, [fetchProtected]);

  async function fetchLatihan() {
    setLoading(true);

    try {
      const result = await fetchProtected(`/${userSession?.id}/bak-pistol/history`);

      setLatihanData(result);
    } catch (error) {
      console.log(error);

      Alert.alert('Terjadi Error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Background>
      <TopBarContent title="REKAP NILAI BAK PISTOL" navigation={navigation} />

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Memuat Data Bak Pistol</Text>
        </View>
      )}

      {!loading && latihanData.length !== 0 && (
        <ScrollView>
          {latihanData.map((bakpistol, bakpistolIdx) => (
            <BakPistolCard latihanData={bakpistol} key={bakpistolIdx} />
          ))}
        </ScrollView>
      )}

      {!loading && latihanData.length === 0 && (
        <View style={styles.container}>
          <Card>
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
              Anda Belum Memiliki Penilaian Bak Pistol
            </Text>
          </Card>
        </View>
      )}

      <Button
        onPress={() => navigation.goBack()}
        title="Kembali"
        style={{ marginTop: 15, width: 150, alignSelf: 'center' }}
      />
    </Background>
  );
}

const styles = ScaledSheet.create({
  container: {
    paddingVertical: '20@s',
    paddingHorizontal: '15@s',
  },
  button: {
    width: 40,
  },
  dateCard: {
    marginBottom: '15@s',
    backgroundColor: Colors.card,
    paddingVertical: '15@s',
  },
  sectionCard: {
    marginBottom: '15@s',
    backgroundColor: Colors.card,
    paddingVertical: '15@s',
    paddingHorizontal: '15@s',
  },
  tanggalText: {
    fontWeight: 'bold',
    fontSize: '18@s',
    textAlign: 'center',
    color: Colors.text,
  },
  sectionTitle: {
    fontSize: '18@s',
    fontWeight: 'bold',
    marginBottom: '15@s',
    color: Colors.primary,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '8@s',
  },
  detailLabel: {
    fontSize: '14@s',
    color: Colors.text,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: '14@s',
    color: Colors.text,
    flexShrink: 1,
    textAlign: 'right',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
  },

  // modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
