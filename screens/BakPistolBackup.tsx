import { useNavigation } from '@react-navigation/native';
import Background from 'components/layout/Background';
import TopBarContent from 'components/layout/TopbarContent';
import Card from 'components/ui/Card';
import { ScrollView, Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Colors from '../constants/Colors'; // Sesuaikan path jika berbeda
import Button from 'components/ui/Button';
import { useEffect, useState } from 'react';

interface Target {
  id: number;
  title: string;
  amunisi: number;
  nilai: number;
}

export default function BakPanScreen() {
  const navigation = useNavigation();

  const [targets, setTargets] = useState<Target[]>([]);
  const [totalAmunisi, setTotalAmunisi] = useState<number>(0); // State untuk total amunisi
  const [totalNilai, setTotalNilai] = useState<number>(0); // State untuk total nilai

  useEffect(() => {
    generateTargets();
  }, []);

  // Effect untuk menghitung total setiap kali targets berubah
  useEffect(() => {
    calculateTotals(targets);
  }, [targets]); // Dependency array: jalankan ulang effect jika targets berubah

  const generateTargets = () => {
    const generated: Target[] = [];
    for (let i = 10; i >= 1; i--) {
      const amunisi = Math.floor(Math.random() * 5) + 1; // Angka random dari 1 sampai 5
      const nilai = Math.floor(Math.random() * 10) + 1; // Angka random dari 1 sampai 10
      generated.push({
        id: i,
        title: `Sasaran ${i}`,
        amunisi: amunisi,
        nilai: nilai,
      });
    }
    setTargets(generated);
    // calculateTotals(generated); // Bisa juga langsung panggil di sini, tapi useEffect di atas lebih reaktif
  };

  const calculateTotals = (dataTargets: Target[]) => {
    let sumAmunisi = 0;
    let sumNilai = 0;

    dataTargets.forEach((target) => {
      sumAmunisi += target.amunisi;
      sumNilai += target.nilai;
    });

    setTotalAmunisi(sumAmunisi);
    setTotalNilai(sumNilai);
  };
  return (
    <Background>
      <TopBarContent title="BAK PISTOL - 15 M" navigation={navigation} />

      <ScrollView style={styles.container}>
        <Card style={styles.dateCard}>
          <Text style={styles.tanggalText}>22 Juli 2025</Text>
        </Card>

        {targets.map(
          (
            target: Target // Tentukan tipe untuk setiap item di map
          ) => (
            <Card key={target.id} style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>{target.title}</Text>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Amunisi :</Text>
                <Text style={styles.detailValue}>{target.amunisi}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Nilai :</Text>
                <Text style={styles.detailValue}>{target.nilai}</Text>
              </View>

              <Button
                onPress={() => {
                  console.log(`Rincian Nilai untuk ${target.title}`);
                }}
                title="Rincian Nilai"
                style={{
                  width: 150,
                  alignSelf: 'center',
                  marginTop: 10,
                }}
              />
            </Card>
          )
        )}

        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Total</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Jumlah Amunisi :</Text>
            <Text style={styles.detailValue}>{totalAmunisi}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Nilai :</Text>
            <Text style={styles.detailValue}>{totalNilai}</Text>
          </View>
        </Card>

        <View style={{ marginBottom: 40 }}></View>
      </ScrollView>
    </Background>
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
    marginBottom: '15@s', // Jarak antar card
    backgroundColor: Colors.card, // Warna card
    paddingVertical: '15@s',
  },
  sectionCard: {
    marginBottom: '15@s', // Jarak antar card
    backgroundColor: Colors.card, // Warna card
    paddingVertical: '15@s',
    paddingHorizontal: '15@s',
  },
  tanggalText: {
    fontWeight: 'bold',
    fontSize: '18@s',
    textAlign: 'center',
    color: Colors.text,
  },
  sectionTitle: {
    fontSize: '18@s',
    fontWeight: 'bold',
    marginBottom: '15@s',
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
});
