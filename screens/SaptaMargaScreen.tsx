import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Background from 'components/layout/Background';
import TopBarContent from 'components/layout/TopbarContent';
import Card from 'components/ui/Card';
import { RootStackParamList } from 'navigation';
import { ScrollView, Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

type ScreenNavigationProps = NativeStackScreenProps<RootStackParamList, 'SaptaMarga'>;

export default function SaptaMargaScreen() {
  const navigation = useNavigation<ScreenNavigationProps>();

  const saptaMargaItems = [
    'KAMI WARGA NEGARA KESATUAN REPUBLIK INDONESIA YANG BERSENDIKAN PANCASILA.',
    'KAMI PATRIOT INDONESIA, PENDUKUNG SERTA PEMBELA IDEOLOGI NEGARA YANG BERTANGGUNG JAWAB DAN TIDAK MENGENAL MENYERAH.',
    'KAMI KSATRIA INDONESIA, YANG BERTAQWA KEPADA TUHAN YANG MAHA ESA SERTA MEMBELA KEJUJURAN, KEBENARAN DAN KEADILAN.',
    'KAMI PRAJURIT TENTARA NASIONAL INDONESIA, ADALAH BHAYANGKARI NEGARA DAN BANGSA INDONESIA.',
    'KAMI PRAJURIT TENTARA NASIONAL INDONESIA, MEMEGANG TEGUH DISIPLIN, PATUH DAN TAAT KEPADA PIMPINAN, SERTA MENJUNJUNG TINGGI SIKAP DAN KEHORMATAN PRAJURIT.',
    'KAMI PRAJURIT TENTARA NASIONAL INDONESIA, MENGUTAMAKAN KEPERWIRAAN DI DALAM MELAKSANAKAN TUGAS, SERTA SENANTIASA SIAP SEDIA BERBAKTI KEPADA NEGARA DAN BANGSA.',
    'KAMI PRAJURIT TENTARA NASIONAL INDONESIA SETIA DAN MENEPATI JANJI SERTA SUMPAH PRAJURIT.',
  ];

  return (
    <Background>
      <TopBarContent navigation={navigation} title="Sapta Marga" />
      <ScrollView>
        <View style={styles.container}>
          <Card style={styles.card}>
            {saptaMargaItems.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.listNumber}>{index + 1}.</Text>
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </Card>
        </View>
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
    padding: '15@s',
  },
  card: {},
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10, // Menambah jarak antar item
  },
  listNumber: {
    fontSize: '16@s',
    marginRight: 5,
    color: '#000', // Memberi warna untuk nomor
    fontWeight: 'semibold',
  },
  listText: {
    flex: 1,
    fontSize: '16@s',
    color: '#000', // Memberi warna untuk teks
  },
});
