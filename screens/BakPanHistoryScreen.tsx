import { useNavigation } from '@react-navigation/native';
import Background from 'components/layout/Background';
import TopBarContent from 'components/layout/TopbarContent';
import Card from 'components/ui/Card';
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Colors from '../constants/Colors'; // Sesuaikan path jika berbeda
import { useApi } from 'services/api';
import { useEffect, useState } from 'react';
import { BakPan } from 'types/bak-pan';
import { RootStackParamList } from 'navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from 'context/AuthContext';
import LoadingSplash from 'components/LoadingSplash';
import { EachBakPan } from 'components/EachBakPan';
import Button from 'components/ui/Button';

type ScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'BakPanHistory'>;

export default function BakPanHistoryScreen() {
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
  const [latihanData, setLatihanData] = useState<BakPan[] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatihan();
  }, [fetchProtected]);

  async function fetchLatihan() {
    setLoading(true);

    try {
      const result = await fetchProtected(`/${userSession?.id}/bak-pan/history`);

      console.log(result);

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
      <TopBarContent title="REKAP NILAI BAK PAN" navigation={navigation} />

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Memuat Data Bak Pan</Text>
        </View>
      )}

      {!loading && latihanData.length && (
        <ScrollView>
          {latihanData.map((bakpan, bakpanIdx) => (
            <EachBakPan latihanData={bakpan} key={bakpanIdx} />
          ))}
        </ScrollView>
      )}

      {!loading && !latihanData && (
        <View style={styles.container}>
          <Card>
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
              Anda Belum Memiliki Penilaian Bak Pan
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
