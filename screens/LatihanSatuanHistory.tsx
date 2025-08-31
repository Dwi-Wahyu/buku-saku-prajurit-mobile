import { useNavigation } from '@react-navigation/native';
import Background from 'components/layout/Background';
import TopBarContent from 'components/layout/TopbarContent';
import Card from 'components/ui/Card';
import { ActivityIndicator, Alert, Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Colors from '../constants/Colors'; // Sesuaikan path jika berbeda
import Button from 'components/ui/Button';
import { useApi } from 'services/api';
import { useEffect, useState } from 'react';
import LoadingSplash from 'components/LoadingSplash';
import { useAuth } from 'context/AuthContext';
import { LatihanSatuan } from 'types/nilai-latihan';
import { RootStackParamList } from 'navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { formatDate } from 'helper/format-date';

type ScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'LatihanSatuanHistory'>;

export default function LatihanSatuanHistoryScreen() {
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
  const [latihanData, setLatihanData] = useState<LatihanSatuan[] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatihan();
  }, [fetchProtected]);

  async function fetchLatihan() {
    setLoading(true);

    try {
      const result = await fetchProtected(`/${userSession?.id}/latihan-satuan/history`);

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
      <TopBarContent title="REKAP LATIHAN SATUAN" navigation={navigation} />

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Memuat Data Latihan Satuan</Text>
        </View>
      )}

      {!loading && latihanData.length !== 0 && (
        <View style={styles.container}>
          {latihanData.map((latihan_satuan, idx) => (
            <Card style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>{latihan_satuan.nama}</Text>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Tanggal :</Text>
                <Text style={styles.detailValue}>
                  {formatDate(new Date(latihan_satuan.tanggal))}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Nilai Capaian :</Text>
                <Text style={styles.detailValue}>{latihan_satuan.nilai}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Keterangan :</Text>
                <Text style={styles.detailValue}>{latihan_satuan.keterangan}</Text>
              </View>
            </Card>
          ))}

          <Button
            onPress={() => navigation.goBack()}
            title="Kembali"
            style={{ marginTop: 15, width: 150, alignSelf: 'center' }}
          />
        </View>
      )}
    </Background>
  );
}

const styles = ScaledSheet.create({
  container: {
    paddingVertical: '20@s',
    paddingHorizontal: '15@s',
  },
  dateCard: {
    marginBottom: '15@s',
    backgroundColor: Colors.card,
    paddingVertical: '15@s',
  },
  sectionCard: {
    marginBottom: '20@s',
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
});
