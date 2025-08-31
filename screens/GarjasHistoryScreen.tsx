import { useNavigation } from '@react-navigation/native';
import Background from 'components/layout/Background';
import TopBarContent from 'components/layout/TopbarContent';
import Card from 'components/ui/Card';
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Colors from '../constants/Colors'; // Sesuaikan path jika berbeda
import { useApi } from 'services/api';
import { useEffect, useState } from 'react';
import { Garjas } from 'types/garjas';
import { useAuth } from 'context/AuthContext';
import LoadingSplash from 'components/LoadingSplash';
import { formatDate } from 'helper/format-date';
import Button from 'components/ui/Button';

export default function GarjasHistoryScreen() {
  const navigation = useNavigation();

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
  const [garjasData, setGarjasData] = useState<Garjas[] | []>([]);
  const [loadingGarjas, setLoadingGarjas] = useState(true);

  useEffect(() => {
    fetchGarjas();
  }, [fetchProtected]);

  async function fetchGarjas() {
    try {
      const result = await fetchProtected(`/${userSession?.id}/kesegaran-jasmani/history`);

      setGarjasData(result);
    } catch (error) {
      console.log(error);

      Alert.alert('Terjadi Error');
    } finally {
      setLoadingGarjas(false);
    }
  }

  return (
    <Background>
      <TopBarContent title="REKAP NILAI GARJAS" navigation={navigation} />

      {loadingGarjas && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Memuat Data Garjas</Text>
        </View>
      )}

      {!loadingGarjas && garjasData.length === 0 && (
        <View style={styles.container}>
          <Card>
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
              Anda Belum Memiliki Penilaian Kesegaran Jasmani
            </Text>
          </Card>
        </View>
      )}

      {!loadingGarjas && garjasData.length !== 0 && (
        <ScrollView style={styles.container}>
          {garjasData.map((garjas, garjasIdx) => (
            <Card key={garjasIdx}>
              <Text style={styles.tanggalText}>{formatDate(new Date(garjas.tanggal))}</Text>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Kategori :</Text>
                <Text style={styles.detailValue}>{garjas.golongan}</Text>
              </View>

              <Text style={styles.sectionTitle}>Kesegaran Jasmani A</Text>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Materi :</Text>
                <Text style={styles.detailValue}>Lari 12 Menit</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Jarak :</Text>
                <Text style={styles.detailValue}>{garjas.lari}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Nilai :</Text>
                <Text style={styles.detailValue}>{garjas.garjas_a}</Text>
              </View>

              <Text style={styles.sectionTitle}>Kesegaran Jasmani B</Text>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Pull Up :</Text>
                <Text style={styles.detailValue}>
                  {garjas.pullup} Repetisi (Nilai : {garjas.skor_b1})
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Sit Up :</Text>
                <Text style={styles.detailValue}>
                  {garjas.situp} Repetisi (Nilai : {garjas.skor_b2})
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Push Up :</Text>
                <Text style={styles.detailValue}>
                  {garjas.pushup} Repetisi (Nilai : {garjas.skor_b3})
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Shuttle Run :</Text>
                <Text style={styles.detailValue}>
                  {garjas.shuttle_run} Detik (Nilai : {garjas.skor_b4})
                </Text>
              </View>

              <Text style={styles.sectionTitle}>Nilai Renang</Text>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Materi :</Text>
                <Text style={styles.detailValue}>Renang Militer Dasar (Gaya Dada)</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Waktu :</Text>
                <Text style={styles.detailValue}>{garjas.renang} Detik</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Nilai :</Text>
                <Text style={styles.detailValue}>{garjas.skor_renang}</Text>
              </View>

              <Text style={styles.sectionTitle}>Hasil Akumulasi</Text>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Nilai Garjas A :</Text>
                <Text style={styles.detailValue}>{garjas.garjas_a}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Nilai Garjas B :</Text>
                <Text style={styles.detailValue}>{garjas.garjas_b}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Nilai Akhir :</Text>
                <Text style={styles.detailValue}>{garjas.nilai_akhir}</Text>
              </View>

              <View style={{ marginBottom: 20 }}></View>
            </Card>
          ))}

          <Button
            onPress={() => navigation.goBack()}
            title="Kembali"
            style={{ marginTop: 15, width: 150, alignSelf: 'center' }}
          />
        </ScrollView>
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
    marginBottom: '15@s', // Jarak antar card
    backgroundColor: Colors.card, // Warna card
    paddingVertical: '15@s',
  },
  sectionCard: {
    marginBottom: '15@s', // Jarak antar card
    backgroundColor: Colors.card, // Warna card
    paddingVertical: '15@s',
    paddingHorizontal: '15@s',
  },
  tanggalText: {
    fontWeight: 'bold',
    fontSize: '18@s',
    textAlign: 'center',
    color: Colors.text,
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
});
