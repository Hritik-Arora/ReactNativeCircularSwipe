import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const SCREEN_DIMENSIONS = {
  height: Math.max(width, height),
  width: Math.min(width, height),
}