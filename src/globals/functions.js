import {
  Dimensions,
  PixelRatio,
  Platform
} from 'react-native';

// To Find Display wise font pixel size

export const getFontontSize = (size) => {
  const {
    width : SCREEN_WIDTH,
    height : SCREEN_HEIGHT
  } = Dimensions.get('window');
  const scale = SCREEN_WIDTH / 375;
  const newSize = size * scale ;
  if( Platform.OS === 'ios'){
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else{
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
};