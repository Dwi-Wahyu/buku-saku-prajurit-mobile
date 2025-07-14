import { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

type CardProps = {
  children: ReactNode;
  style?: Object;
};

export default function Card({ children, style }: CardProps) {
  return (
    <View style={[styles.card, style]} className="bg-[#172B4D]/60">
      {children}
    </View>
  );
}

const styles = ScaledSheet.create({
  card: {
    borderRadius: 28,
    padding: 16,

    // 💡 Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    // 💡 Elevation for Android
    // elevation: 5,
    backgroundColor: 'rgba(23, 43, 77, 0.6)', // diperlukan agar shadow muncul di Android
  },
});
