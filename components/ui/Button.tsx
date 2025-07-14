import Colors from 'constants/Colors';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export default function Button({ title, onPress, style, textStyle }: ButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} activeOpacity={0.7}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderColor: Colors.primary,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  text: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
