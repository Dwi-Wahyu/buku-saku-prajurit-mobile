// src/components/BakPistolHomeIcon.tsx
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View } from 'react-native';

interface BakPistolHomeIconProps {
  color?: string; // Prop opsional untuk mengubah warna fill
}

const BakPistolHomeIcon: React.FC<BakPistolHomeIconProps> = ({ color = '#FFD32A' }) => {
  // Ukuran tetap 60x60
  const iconWidth = 60;
  const iconHeight = 60;

  return (
    <View style={{ width: iconWidth, height: iconHeight }}>
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 37 27" // ViewBox asli dari SVG Anda
        fill="none">
        <Path
          d="M10.653 2.05976H36.3845V8.49265H34.7763V10.1009H25.127C24.7005 10.1009 24.2914 10.2703 23.9898 10.5719C23.6882 10.8735 23.5188 11.2826 23.5188 11.7091V13.3173C23.5188 14.1704 23.1799 14.9885 22.5767 15.5917C21.9735 16.1949 21.1554 16.5338 20.3023 16.5338H14.8665C14.2554 16.5338 13.6925 16.8876 13.4191 17.4344L9.47899 25.2986C9.20559 25.8454 8.65879 26.1831 8.04767 26.1831H2.61188C2.61188 26.1831 -2.21279 26.1831 4.2201 16.5338C4.2201 16.5338 9.04477 10.1009 2.61188 10.1009V2.05976H4.2201L5.02421 0.451538H9.84888L10.653 2.05976ZM21.9105 13.3173V11.7091C21.9105 11.2826 21.7411 10.8735 21.4395 10.5719C21.1379 10.2703 20.7288 10.1009 20.3023 10.1009H18.6941C18.6941 10.1009 17.0859 11.7091 18.6941 13.3173C17.841 13.3173 17.0229 12.9784 16.4197 12.3752C15.8165 11.772 15.4777 10.9539 15.4777 10.1009C15.0511 10.1009 14.6421 10.2703 14.3405 10.5719C14.0389 10.8735 13.8694 11.2826 13.8694 11.7091V13.3173C13.8694 13.7438 14.0389 14.1529 14.3405 14.4545C14.6421 14.7561 15.0511 14.9255 15.4777 14.9255H20.3023C20.7288 14.9255 21.1379 14.7561 21.4395 14.4545C21.7411 14.1529 21.9105 13.7438 21.9105 13.3173Z"
          fill={color} // Menggunakan prop color di sini
        />
      </Svg>
    </View>
  );
};

export default BakPistolHomeIcon;
