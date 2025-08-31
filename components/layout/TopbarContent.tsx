import { Image, TouchableOpacity, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from 'react-native';

export default function TopBarContent({ navigation, title }: { navigation: any; title: string }) {
  return (
    <View style={styles.topbar}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={32} color="green" />
      </TouchableOpacity>

      <Text style={styles.pageTitle}>{title}</Text>

      <Ionicons className="opacity-0" name="chevron-back" size={32} color="green" />
    </View>
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
  topbar: {
    width: '100%',

    display: 'flex',
    flexDirection: 'row',

    backgroundColor: '#fff',

    paddingHorizontal: '15@s',
    paddingTop: '40@s',
    paddingBottom: '15@s',

    alignItems: 'center',
    justifyContent: 'space-between',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
