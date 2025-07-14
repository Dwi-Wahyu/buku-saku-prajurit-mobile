import { View, Text, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'navigation';
import { ScaledSheet } from 'react-native-size-matters';
import Colors from 'constants/Colors';
import Card from 'components/ui/Card';
import Input from 'components/ui/Input';
import Button from 'components/ui/Button';
import BackgroundLayout from 'components/layout/BackgroundLayout';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  return (
    <BackgroundLayout>
      <View style={styles.center}>
        <Image source={require('../assets/login-logo.png')} />

        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Login</Text>
          <Text style={styles.cardSubtitle}>
            Silahkan masukkan Username dan Password untuk masuk ke aplikasi.
          </Text>

          <Input label="NRP" placeholder="Masukkan NRP" />
          <Input label="Password" placeholder="Masukkan Password" secureTextEntry />

          <Button
            style={{ width: 100, alignSelf: 'center', marginTop: 20 }}
            title="Login"
            onPress={() => navigation.push('Home')}
          />
        </Card>
      </View>
    </BackgroundLayout>
  );
}

const styles = ScaledSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
  },
  card: { alignSelf: 'stretch', padding: '30@s', marginTop: 30 },
  cardTitle: {
    color: Colors.primary,
    fontSize: '20@s',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardSubtitle: {
    color: Colors.white,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 5,
    lineHeight: 25,
  },
});
