import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Background from 'components/layout/Background';
import TopBarContent from 'components/layout/TopbarContent';
import Card from 'components/ui/Card';
import { RootStackParamList } from 'navigation';
import { ScrollView, Text, View } from 'react-native';
import { Image } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

type ScreenNavigationProps = NativeStackScreenProps<RootStackParamList, 'Pancasila'>;

export default function PancasilaScreen() {
  const navigation = useNavigation<ScreenNavigationProps>();

  const pancasilaItems = [
    'KETUHANAN YANG MAHA ESA. KEMANUSIAAN YANG ADIL DAN BERADAB.',
    'PERSATUAN INDONESIA. KERAKYATAN YANG DIPIMPIN OLEH HIKMAT',
    'KEBIJAKSANAAN DALAM PERMUSYAWARATAN/ PERWAKILAN.',
    'KEADILAN SOSIAL BAGI SELURUH RAKYATINDONESIA.',
  ];

  return (
    <Background>
      <TopBarContent navigation={navigation} title="PANCASILA" />

      <View style={styles.container}>
        <Card style={styles.card}>
          <Image source={require('../assets/garuda.png')} />

          {pancasilaItems.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.listNumber}>{index + 1}.</Text>
              <Text style={styles.listText}>{item}</Text>
            </View>
          ))}
        </Card>
      </View>
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
  card: { alignItems: 'center' },

  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  listNumber: {
    fontSize: 16,
    marginRight: 5,
  },
  listText: {
    flex: 1,
    fontSize: 16,
  },
});
