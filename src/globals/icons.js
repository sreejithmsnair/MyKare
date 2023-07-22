import React from 'react';
import { Image, View } from 'react-native';

//importing icons
import close from '../asset/icons/close.png';
import back from '../asset/icons/back.png';


import colours from './colours';

const showIcon = (icon, color = colours.black, size = 24, TAB) => {

  let src;
  switch (icon) {
    case 'close':
      src = close;
      break;
    case 'back':
      src = back;
      break;
    default:
      src = back;
  }
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}>
      <Image
        source={src}
        style={{
          height: size,
          width: size,
          tintColor: color,
          resizeMode: 'contain',
        }}
      />
    </View>
  );
};
export default showIcon;
