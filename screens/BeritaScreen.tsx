import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Background from 'components/layout/Background';
import { RootStackParamList } from 'navigation';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { ScaledSheet } from 'react-native-size-matters';
import { useApi } from 'services/api';
import { useEffect, useState } from 'react';
import { Berita } from 'types/berita';
import BeritaItem from 'components/berita/BeritaItem';
import TopBarContent from 'components/layout/TopbarContent';

type Props = NativeStackScreenProps<RootStackParamList, 'Berita'>;

export default function BeritaScreen({ navigation }: Props) {
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
      <TopBarContent navigation={navigation} title="BERITA" />

      <ScrollView style={styles.container}>
        {loadingBerita ? (
          <Text>Loading Berita . . .</Text>
        ) : (
          <View style={ScaledSheet.create({ mt: { marginTop: '15@s' } }).mt}>
            {!beritaData ? (
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
    </Background>
  );
}

const styles = ScaledSheet.create({
  pageTitle: {
    fontSize: '20@s',
    fontWeight: 'bold',
  },
  container: {
    paddingHorizontal: '15@s',
  },
});
