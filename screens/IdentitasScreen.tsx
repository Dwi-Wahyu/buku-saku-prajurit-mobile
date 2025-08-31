import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BackgroundLayout from 'components/layout/BackgroundLayout';
import { useAuth } from 'context/AuthContext';
import { RootStackParamList } from 'navigation';
import { Image } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'MainTabs'>;

export default function IdentitasScreen({ navigation }: Props) {
  const { userSession, signOut, isLoading } = useAuth();

  return (
    <BackgroundLayout>
      <Image source={require('../assets/LogoSplashScreen.png')} />
    </BackgroundLayout>
  );
}
