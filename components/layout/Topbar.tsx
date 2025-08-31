import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from 'components/ui/Button';
import { RootStackParamList } from 'navigation';
import { useState } from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

import Icon from 'react-native-vector-icons/Entypo';

type ScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

export default function TopBar() {
  const navigation = useNavigation<ScreenNavigationProps>();

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View
      style={styles.container}
      className="flex flex-row items-center justify-between bg-transparent">
      <Image style={styles.image} source={require('../../assets/topbar.png')} />

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Icon name="dots-three-vertical" size={25} color="#478D4B" />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Button
              title="PANCASILA"
              style={{ alignSelf: 'center', marginBottom: 20, width: '100%' }}
              onPress={() => navigation.push('Pancasila')}
            />

            <Button
              title="SAPTA MARGA"
              style={{ alignSelf: 'center', marginBottom: 20, width: '100%' }}
              onPress={() => navigation.push('SaptaMarga')}
            />

            <Button
              title="SUMPAH PRAJURIT"
              style={{ alignSelf: 'center', marginBottom: 20, width: '100%' }}
              onPress={() => navigation.push('SumpahPrajurit')}
            />

            <Button
              title="8 WAJIB TNI"
              style={{ alignSelf: 'center', marginBottom: 20, width: '100%' }}
              onPress={() => navigation.push('WajibTNI')}
            />

            <Button
              title="Tutup"
              style={{ width: '100%', alignSelf: 'center' }}
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '15@s',
    paddingTop: '25@s',
  },

  image: {
    width: 316,
    height: 50,
    marginTop: '15@s',
    marginBottom: '15@s',
  },

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
