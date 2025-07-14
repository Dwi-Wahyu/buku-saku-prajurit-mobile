import { Image, ImageBackground, StyleSheet, View } from 'react-native';

export default function LoadingSplash() {
  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.center}>
        <Image source={require('../assets/LogoSplashScreen.png')} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
