import { View, Text, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'navigation';
import Button from 'components/ui/Button';
import BackgroundLayout from 'components/layout/BackgroundLayout';
import { ScaledSheet } from 'react-native-size-matters';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <BackgroundLayout>
      <Image source={require('../assets/LogoSplashScreen.png')} />

      <View style={styles.row}>
        <View>
          <Text style={[styles.textColor, styles.title]}>Halo!</Text>
          <Text style={[styles.textColor, styles.subtitle]}>Login untuk akses semua fitur!</Text>
        </View>

        <Button title="Login" onPress={() => navigation.push('Login')} style={{ width: 100 }} />
      </View>
    </BackgroundLayout>
  );
}

const styles = ScaledSheet.create({
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
    marginBottom: 20,
  },
});
