import Colors from 'constants/Colors';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

// Menambahkan 'label' ke props standar TextInput
interface InputProps extends TextInputProps {
  label?: string;
  containerStyle?: object;
}

export default function Input({ label, containerStyle, style, ...props }: InputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, style, { paddingLeft: 12 }]}
        placeholderTextColor={Colors.primary}
        {...props} // Meneruskan semua props lain ke TextInput
      />
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    marginVertical: '12@s', // Memberi sedikit jarak vertikal
  },
  label: {
    color: Colors.primary,
    fontSize: '12@s',
    marginBottom: '8@s',
  },
  input: {
    color: Colors.primary,
    fontSize: '12@s',
    paddingBottom: '8@s',
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
  },
});
