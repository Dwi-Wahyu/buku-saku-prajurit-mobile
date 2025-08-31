// screens/DetailBeritaScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
  useWindowDimensions,
} from 'react-native'; // Tambahkan useWindowDimensions
import { RouteProp, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RenderHtml from 'react-native-render-html'; // Import RenderHtml

import { RootStackParamList } from 'navigation';
import { Berita } from 'types/berita';
import { useApi } from 'services/api';
import Button from 'components/ui/Button';
import Background from 'components/layout/Background';

type DetailBeritaScreenRouteProp = RouteProp<RootStackParamList, 'DetailBerita'>;
type DetailBeritaScreenProps = NativeStackScreenProps<RootStackParamList, 'DetailBerita'>;

const ADMIN_URL = process.env.EXPO_PUBLIC_ADMIN_URL;

export default function DetailBeritaScreen({ navigation }: DetailBeritaScreenProps) {
  const route = useRoute<DetailBeritaScreenRouteProp>();
  const { beritaId } = route.params;
  const { fetchProtected } = useApi();
  const { width } = useWindowDimensions(); // Hook untuk mendapatkan lebar layar, penting untuk RenderHtml

  const [beritaDetail, setBeritaDetail] = useState<Berita | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBeritaDetail() {
      try {
        setLoading(true);
        const result = await fetchProtected(`/berita/${beritaId}`);
        setBeritaDetail(result.berita);
      } catch (err) {
        console.error('Failed to fetch berita detail:', err);
        setError('Gagal memuat detail berita.');
        Alert.alert('Error', 'Gagal memuat detail berita. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    }

    if (beritaId) {
      fetchBeritaDetail();
    }
  }, [beritaId, fetchProtected]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#194863" />
        <Text style={styles.loadingText}>Memuat detail berita...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!beritaDetail) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Berita tidak ditemukan.</Text>
      </View>
    );
  }

  const imageUrl = beritaDetail.thumbnail ? `${ADMIN_URL}${beritaDetail.thumbnail}` : null;
  const formatDate = (dateString: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // HTML content yang akan di-render
  // Pastikan content dari API Anda berupa string HTML
  const source = {
    html: beritaDetail.content || '<p>Tidak ada konten.</p>',
  };

  return (
    <Background>
      <ScrollView style={styles.container}>
        {imageUrl && (
          <Image source={{ uri: imageUrl }} style={styles.thumbnail} resizeMode="cover" />
        )}
        <View style={styles.contentContainer}>
          <Button
            title="Kembali"
            onPress={() => navigation.replace('MainTabs')}
            style={{ marginBottom: 10 }}
          />

          <Text style={styles.title}>{beritaDetail.judul}</Text>
          <Text style={styles.meta}>
            Oleh {beritaDetail.penulis} • {formatDate(beritaDetail.createdAt)}
          </Text>
          {/* Mengganti Text dengan RenderHtml */}
          <RenderHtml
            contentWidth={width - 30} // Lebar konten (lebar layar - padding horizontal 2*15)
            source={source}
            // Anda bisa mengatur default gaya untuk tag HTML di sini
            // Anda bisa menambahkan renderers kustom untuk tag tertentu
            // renderers={{
            //   img: (props) => <Image source={{ uri: props.source.uri }} style={{ width: props.width, height: props.height }} />,
            // }}
          />
          {/* Anda bisa menambahkan tombol Like/Dislike di sini */}
          <View style={styles.likeDislikeContainer}>
            <Text style={styles.likeText}>Likes: {beritaDetail.like}</Text>
            <Text style={styles.dislikeText}>Dislikes: {beritaDetail.dislike}</Text>
          </View>
        </View>
      </ScrollView>
    </Background>
  );
}

const htmlStyles = {
  p: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 10,
  },
  strong: {
    fontWeight: 700,
  },
  em: {
    fontStyle: 'italic',
  },
  h1: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 10,
  },
  h2: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 8,
  },
  img: {
    // Styling untuk gambar di dalam konten HTML
    // Perhatikan bahwa untuk gambar lokal di HTML, Anda mungkin perlu custom renderer
    // atau memastikan URL gambar di HTML sudah absolut atau sesuai

    maxWidth: '100%', // Pastikan gambar tidak melebihi lebar layar
    height: 'auto', // Tinggi disesuaikan otomatis
  },
  ul: {
    marginBottom: 10,
  },
  li: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  a: {
    color: '#194863',
    textDecorationLine: 'underline',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  thumbnail: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingTop: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 10,
    color: '#333',
  },
  meta: {
    fontSize: 14,
    color: '#888',
    marginBottom: 15,
  },

  likeDislikeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  likeText: {
    fontSize: 14,
    color: 'green',
  },
  dislikeText: {
    fontSize: 14,
    color: 'red',
  },
});
