import Colors from 'constants/Colors';
import { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

type CardProps = {
  children: ReactNode;
  style?: Object;
  padding?: number;
};

export default function Card({ children, style, padding = 35 }: CardProps) {
  return (
    <View className="w-full" style={[styles.card, style, { padding }]}>
      {children}
    </View>
  );
}

const styles = ScaledSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 28,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
});
