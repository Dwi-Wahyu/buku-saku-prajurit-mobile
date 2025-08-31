import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Background from 'components/layout/Background';
import TopBarContent from 'components/layout/TopbarContent';
import Card from 'components/ui/Card';
import { RootStackParamList } from 'navigation';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

type ScreenNavigationProps = NativeStackScreenProps<RootStackParamList, 'SumpahPrajurit'>;

export default function SumpahPrajuritScreen() {
  const navigation = useNavigation<ScreenNavigationProps>();

  const sumpahPrajuritItems = [
    'SETIA KEPADA NEGARA KESATUAN REPUBLIK INDONESIA YANG BERDASARKAN PANCASILA DAN UNDANG-UNDANG DASAR 1945.',
    'TUNDUK KEPADA HUKUM DAN MEMEGANG TEGUH DISIPLIN KEPRAJURITAN.',
    'TAAT KEPADA ATASAN DENGAN TIDAK MEMBANTAH PERINTAH ATAU PUTUSAN.',
    'MENJALANKAN SEGALA KEWAJIBAN DENGAN PENUH RASA TANGGUNG JAWAB KEPADA TENTARA DAN NEGARA REPUBLIK INDONESIA.',
    'MEMEGANG SEGALA RAHASIA TENTARA SEKERAS-KERASNYA.',
  ];

  return (
    <Background>
      <TopBarContent navigation={navigation} title="Sumpah Prajurit" />
      <ScrollView>
        <View style={styles.container}>
          <Card style={styles.card}>
            {sumpahPrajuritItems.map((item, index) => (
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
  card: {
    alignSelf: 'stretch',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  listNumber: {
    fontSize: '16@s',
    marginRight: 5,
    color: '#000',
  },
  listText: {
    flex: 1,
    fontSize: '16@s',
    color: '#000',
  },
});
