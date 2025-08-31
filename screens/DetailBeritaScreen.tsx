// screens/DetailBeritaScreen.tsx
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
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
import Background from 'components/layout/Background';
import TopBarContent from 'components/layout/TopbarContent';
import { ScaledSheet } from 'react-native-size-matters';

type DetailBeritaScreenRouteProp = RouteProp<RootStackParamList, 'DetailBerita'>;
type DetailBeritaScreenProps = NativeStackScreenProps<RootStackParamList, 'DetailBerita'>;

const ADMIN_URL = process.env.EXPO_PUBLIC_ADMIN_URL;

export default function DetailBeritaScreen({ navigation }: DetailBeritaScreenProps) {
  const route = useRoute<DetailBeritaScreenRouteProp>();
  const { beritaId } = route.params;
  const { fetchProtected } = useApi();
  const { width } = useWindowDimensions();

  const [beritaDetail, setBeritaDetail] = useState<Berita | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBeritaDetail() {
      try {
        setLoading(true);
        const result = await fetchProtected(`/berita/${beritaId}`);
        setBeritaDetail(result);
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
        <Text style={styles.loadingText}>Memuat detail berita</Text>
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
      <TopBarContent navigation={navigation} title="BERITA" />

      <ScrollView style={styles.container}>
        <Text style={styles.title}>{beritaDetail.judul}</Text>
        <Text style={styles.meta}>
          Oleh {beritaDetail.penulis} • {formatDate(beritaDetail.created_at)}
        </Text>
        {imageUrl && (
          <Image source={{ uri: imageUrl }} style={styles.thumbnail} resizeMode="cover" />
        )}
        <RenderHtml
          contentWidth={width - 30}
          source={source}
          // tagsStyles={htmlStyles}
          // Anda bisa menambahkan renderers kustom untuk tag tertentu
          // renderers={{
          //   img: (props: any) => (
          //     <Image
          //       source={{ uri: props.source.uri }}
          //       style={{ width: props.width, height: props.height }}
          //     />
          //   ),
          // }}
        />

        <View style={{ marginBottom: 20 }}></View>
      </ScrollView>
    </Background>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '15@s',
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
    marginBottom: '15@s',
    borderRadius: '10@s',
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: '10@s',
    marginTop: '10@s',
    color: '#333',
  },
  meta: {
    fontSize: 14,
    color: '#888',
    marginBottom: 15,
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
