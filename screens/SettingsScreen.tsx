import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Background from '../components/layout/Background';
import Topbar from '../components/layout/TopBar';
import BottomBar from '../components/layout/BottomBar';
import { useAuth } from 'context/AuthContext';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Colors from '../constants/Colors';

export default function SettingsScreen() {
  const { userSession, signOut, isLoading } = useAuth();

  return (
    <Background>
      <View style={styles.mainContainer}>
        <Topbar />
        <View style={styles.content}>
          <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
            <SimpleLineIcons name="logout" size={24} color={Colors.label} style={styles.icon} />
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <BottomBar />
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.card,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: Colors.label,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
