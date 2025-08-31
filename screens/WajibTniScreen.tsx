import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Background from 'components/layout/Background';
import TopBarContent from 'components/layout/TopbarContent';
import Card from 'components/ui/Card';
import { RootStackParamList } from 'navigation';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

type ScreenNavigationProps = NativeStackScreenProps<RootStackParamList, 'WajibTNI'>;

export default function WajibTniScreen() {
  const navigation = useNavigation<ScreenNavigationProps>();

  const wajibTNIItems = [
    'BERSIKAP RAMAH TAMAH TERHADAP RAKYAT.',
    'BERSIKAP SOPAN SANTUN TERHADAP RAKYAT.',
    'MENJUNJUNG TINGGI KEHORMATAN WANITA.',
    'MENJAGA KEHORMATAN DIRI DI MUKA UMUM.',
    'SENANTIASA MENJADI CONTOH DALAM SIKAP DAN KESEDERHANAANNYA.',
    'TIDAK SEKALI-KALI MERUGIKAN RAKYAT.',
    'TIDAK SEKALI-KALI MENAKUTI DAN MENYAKITI HATI RAKYAT.',
    'MENJADI CONTOH DAN MEMELOPORI USAHA-USAHA UNTUK MENGATASI KESULITAN RAKYAT SEKELILINGNYA.',
  ];

  return (
    <Background>
      <TopBarContent navigation={navigation} title="Wajib TNI" />
      <ScrollView>
        <View style={styles.container}>
          <Card style={styles.card}>
            {wajibTNIItems.map((item, index) => (
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
