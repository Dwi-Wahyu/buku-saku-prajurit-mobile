import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { formatDate } from 'helper/format-date';
import { RootStackParamList } from 'navigation';
import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Berita } from 'types/berita';

const ADMIN_URL = process.env.EXPO_PUBLIC_ADMIN_URL;

interface BeritaItemProps {
  berita: Berita;
}

type BeritaItemNavigationProp = NativeStackNavigationProp<RootStackParamList, 'DetailBerita'>;

const BeritaItem: React.FC<BeritaItemProps> = ({ berita }) => {
  const imageUrl = berita.thumbnail ? `${ADMIN_URL}${berita.thumbnail}` : null;
  const navigation = useNavigation<BeritaItemNavigationProp>();

  const handlePress = () => {
    navigation.navigate('DetailBerita', { beritaId: berita.id });
  };

  return (
    <TouchableOpacity style={styles.beritaItemContainer} onPress={handlePress} activeOpacity={0.8}>
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={styles.thumbnailFullWidth}
          resizeMode="cover"
          onError={(e) => console.log('Gagal memuat gambar:', e.nativeEvent.error)}
        />
      )}
      <View
        style={{
          padding: 15,
        }}>
        <Text style={styles.beritaTitle}>{berita.judul}</Text>
        <View className="flex flex-row justify-between">
          <Text style={styles.beritaSub}>
            Oleh {berita.penulis} • {formatDate(berita.created_at)}
          </Text>

          <Text style={styles.beritaSub}>{formatDate(berita.created_at)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  beritaItemContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  thumbnailFullWidth: {
    width: '100%',
    height: 200,
  },
  beritaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  beritaSub: {
    fontSize: 12,
    color: '#666',
  },
});

export default BeritaItem;
