import { useState } from 'react';
import { Modal, ScrollView, Text, View } from 'react-native';
import { BakPistol } from 'types/bak-pistol';
import Card from './ui/Card';
import Button from './ui/Button';
import Colors from 'constants/Colors';
import { ScaledSheet } from 'react-native-size-matters';
import { BakPan, SikapBakPan } from 'types/bak-pan';

export function EachBakPan({ latihanData }: { latihanData: BakPan }) {
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.dateCard}>
        <Text style={styles.sectionTitle}>22 Juli 2025</Text>
      </Card>

      {latihanData.sikap_bak_pan.map((sikap, sikapIdx) => (
        <EachSikap sikapData={sikap} key={sikapIdx} />
      ))}

      <Card>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Jumlah Amunisi :</Text>
          <Text style={styles.detailValue}>{latihanData.amunisi}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Nilai Akhir :</Text>
          <Text style={styles.detailValue}>{latihanData.nilai_akhir}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Keterangan :</Text>
          <Text style={styles.detailValue}>{latihanData.keterangan}</Text>
        </View>
      </Card>

      <View style={{ marginBottom: 40 }}></View>
    </ScrollView>
  );
}

function EachSikap({ sikapData }: { sikapData: SikapBakPan }) {
  const [modalVisible, setModalVisible] = useState(false);

  const totalNilai = sikapData.sasaran_bak_pan.reduce((sum, sasaran) => {
    return sum + sasaran.nilai;
  }, 0);

  return (
    <Card style={styles.dateCard}>
      <Text style={styles.sectionTitle}>Sikap {sikapData.nama}</Text>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Amunisi Awal :</Text>
        <Text style={styles.detailValue}>{sikapData.amunisi}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Amunisi Terkena Sasaran :</Text>
        <Text style={styles.detailValue}>{sikapData.amunisi_kena_sasaran}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Nilai :</Text>
        <Text style={styles.detailValue}>{totalNilai}</Text>
      </View>

      <Button
        title="Rincian Sasaran"
        style={{ width: 170, alignSelf: 'center', marginTop: 5 }}
        onPress={() => setModalVisible(true)}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {sikapData.sasaran_bak_pan.map((sasaran, idx) => (
              <View key={idx} style={{ marginBottom: 10 }}>
                <Text style={styles.sasaranText}>Sasaran {sasaran.urutan}</Text>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Amunisi :</Text>
                  <Text style={styles.detailValue}>{sasaran.amunisi}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Nilai :</Text>
                  <Text style={styles.detailValue}>{sasaran.nilai}</Text>
                </View>
              </View>
            ))}

            <Button
              title="Tutup"
              style={{ width: 100, alignSelf: 'center', marginTop: 10 }}
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </Modal>
    </Card>
  );
}

const styles = ScaledSheet.create({
  container: {
    paddingVertical: '20@s',
    paddingHorizontal: '15@s',
  },
  button: {
    width: 40,
  },
  dateCard: {
    marginBottom: '15@s',
    backgroundColor: Colors.card,
    paddingVertical: '15@s',
  },
  sectionCard: {
    marginBottom: '15@s',
    backgroundColor: Colors.card,
    paddingVertical: '15@s',
    paddingHorizontal: '15@s',
  },
  sasaranText: {
    fontWeight: 'bold',
    fontSize: '15@s',
    marginBottom: 5,
    color: Colors.text,
  },
  sectionTitle: {
    fontSize: '18@s',
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '8@s',
  },
  detailLabel: {
    fontSize: '14@s',
    color: Colors.text,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: '14@s',
    color: Colors.text,
    flexShrink: 1,
    textAlign: 'right',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
  },

  // modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
