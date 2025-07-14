import { ReactNode } from 'react';
import { ImageBackground, View, StyleSheet } from 'react-native';

type BackgroundLayoutProps = {
  children: ReactNode;
};

export default function BackgroundLayout({ children }: BackgroundLayoutProps) {
  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.inner}>{children}</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
});
