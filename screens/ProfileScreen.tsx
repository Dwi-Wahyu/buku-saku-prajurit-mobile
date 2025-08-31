import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Background from '../components/layout/Background'; // Sesuaikan path
import TopBar from '../components/layout/TopBar'; // Sesuaikan path
import BottomBar from '../components/layout/BottomBar'; // Sesuaikan path
import { useAuth } from '../context/AuthContext'; // Sesuaikan path
import Card from '../components/ui/Card'; // Sesuaikan path
import { ScaledSheet } from 'react-native-size-matters';
import Colors from '../constants/Colors'; // Sesuaikan path

const ADMIN_URL = process.env.EXPO_PUBLIC_ADMIN_URL;

export default function ProfileScreen() {
  const { userSession } = useAuth();

  if (!userSession) {
    return (
      <Background>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Silakan login terlebih dahulu untuk melihat profil.</Text>
        </View>
      </Background>
    );
  }

  const { name, username, role, avatar, profile } = userSession;

  const { berat_badan, golongan, jenis_kelamin, pangkat, tinggi_badan, umur } = profile;

  const avatarUrl = avatar
    ? `${ADMIN_URL}${avatar}`
    : `${ADMIN_URL}/uploads/avatar/default-avatar.jpg`;

  return (
    <Background>
      <View style={styles.mainContainer}>
        {/* <TopBar /> */}

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Card style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: avatarUrl }}
                style={styles.avatar}
                onError={(e) => console.log('Gagal memuat gambar avatar:', e.nativeEvent.error)}
              />
            </View>

            {role && (
              <View style={styles.roleBadgeContainer}>
                <Text style={styles.roleBadgeText}>{role}</Text>
              </View>
            )}

            <Text style={styles.userName}>{name}</Text>

            <View style={styles.detailGrid}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>NRP:</Text>
                <Text style={styles.detailValue}>{username}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Pangkat:</Text>
                <Text style={styles.detailValue}>{pangkat.name}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Umur:</Text>
                <Text style={styles.detailValue}>{umur} tahun</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Jenis Kelamin:</Text>
                <Text style={styles.detailValue}>{jenis_kelamin}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Golongan:</Text>
                <Text style={styles.detailValue}>{golongan}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Berat Badan:</Text>
                <Text style={styles.detailValue}>{berat_badan} kg</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Tinggi Badan:</Text>
                <Text style={styles.detailValue}>{tinggi_badan} cm</Text>
              </View>
            </View>

            {/* <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Profil</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>Logout</Text>
              </TouchableOpacity>
            </View> */}
          </Card>
        </ScrollView>

        <BottomBar />
      </View>
    </Background>
  );
}

const styles = ScaledSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  errorText: {
    fontSize: '16@s',
    color: Colors.danger,
    textAlign: 'center',
    paddingHorizontal: '20@s',
  },
  header: {
    backgroundColor: Colors.primary, // Warna primer untuk header
    paddingVertical: '20@s',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20@s', // Jarak antara header dan kartu profil
    shadowColor: Colors.black, // Efek bayangan pada header
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  headerTitle: {
    fontSize: '28@s',
    fontWeight: 'bold',
    color: Colors.white, // Teks putih di header
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: '15@s',
    paddingBottom: '20@s', // Tambahkan padding bawah agar BottomBar tidak menutupi konten
    paddingTop: '40@s', // Tambahkan padding bawah agar BottomBar tidak menutupi konten
  },
  profileCard: {
    backgroundColor: Colors.card, // Warna kartu
    padding: '25@s',
    borderRadius: '15@s', // Sudut membulat
    alignItems: 'center', // Pusatkan konten di dalam kartu
    shadowColor: Colors.black, // Efek bayangan pada kartu
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  avatarContainer: {
    marginBottom: '20@s',
    borderWidth: '4@s',
    borderColor: Colors.label, // Border warna label untuk avatar
    borderRadius: '60@s', // Setengah dari width/height untuk lingkaran sempurna
    overflow: 'hidden', // Penting untuk memastikan gambar mengikuti borderRadius
  },
  avatar: {
    width: '120@s',
    height: '120@s',
    borderRadius: '60@s', // Pastikan gambar juga bulat
  },
  roleBadgeContainer: {
    backgroundColor: Colors.label, // Warna label untuk badge role
    paddingHorizontal: '12@s',
    paddingVertical: '5@s',
    borderRadius: '20@s',
    marginBottom: '15@s',
  },
  roleBadgeText: {
    color: Colors.white,
    fontSize: '14@s',
    fontWeight: 'bold',
  },
  userName: {
    fontSize: '24@s',
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: '20@s',
    textAlign: 'center',
  },
  detailGrid: {
    width: '100%',
    marginBottom: '25@s',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '8@s',
    borderBottomWidth: '1@s',
    borderBottomColor: Colors.placeholder, // Garis pemisah tipis
  },
  detailLabel: {
    fontSize: '15@s',
    fontWeight: '600',
    color: Colors.primary, // Warna primer untuk label detail
    flex: 1,
  },
  detailValue: {
    fontSize: '15@s',
    color: Colors.text,
    flex: 2,
    textAlign: 'right',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '10@s',
  },
  editButton: {
    backgroundColor: Colors.primary,
    paddingVertical: '12@s',
    paddingHorizontal: '25@s',
    borderRadius: '10@s',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  editButtonText: {
    color: Colors.white,
    fontSize: '16@s',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: Colors.danger,
    paddingVertical: '12@s',
    paddingHorizontal: '25@s',
    borderRadius: '10@s',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  logoutButtonText: {
    color: Colors.white,
    fontSize: '16@s',
    fontWeight: 'bold',
  },
});
