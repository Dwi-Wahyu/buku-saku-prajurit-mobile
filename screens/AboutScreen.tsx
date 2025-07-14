import { View, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'About'>;

export default function AboutScreen({ navigation }: Props) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold">Ini Halaman Tentang</Text>
      <Button title="Kembali" onPress={() => navigation.goBack()} />
    </View>
  );
}
