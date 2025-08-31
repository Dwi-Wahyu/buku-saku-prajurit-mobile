import Colors from 'constants/Colors';
import { ReactNode } from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

type ButtonProps = {
  title?: string;
  disabled?: boolean;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: ReactNode;
  variant?: 'outline' | 'link';
};

export default function Button({
  title = '',
  onPress,
  style,
  textStyle,
  disabled = false,
  children,
  variant = 'outline',
}: ButtonProps) {
  if (children) {
    return (
      <TouchableOpacity
        disabled={disabled}
        style={[styles.outlineButton, style]}
        onPress={onPress}
        activeOpacity={0.7}>
        {children}
      </TouchableOpacity>
    );
  }

  if (variant === 'link') {
    return (
      <TouchableOpacity disabled={disabled} style={[style]} onPress={onPress} activeOpacity={0.7}>
        <Text
          style={[
            styles.text,
            textStyle,
            { textDecorationLine: 'underline', textAlign: 'center' },
          ]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.outlineButton, style]}
      onPress={onPress}
      activeOpacity={0.7}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  outlineButton: {
    borderColor: Colors.primary,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  linkButton: {
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
