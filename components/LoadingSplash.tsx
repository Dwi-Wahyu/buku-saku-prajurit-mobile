import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import Background from './layout/Background';

export default function LoadingSplash() {
  return (
    <Background>
      <View style={styles.center}>
        <Image source={require('../assets/LogoSplashScreen.png')} />
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
