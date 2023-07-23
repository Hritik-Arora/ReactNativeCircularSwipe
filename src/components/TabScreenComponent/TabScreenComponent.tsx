import React from 'react';
import {
  Animated,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import styles from './styles';

interface IProps {
  id: number;
  color: string;
  removeTab: () => void;
  containerStyle?: ViewStyle;
}

const TabScreenComponent: React.FC<IProps> = (props) => {
  const {
    id,
    color,
    removeTab,
    containerStyle = {},
  } = props;

  return (
    <Animated.View style={[
      styles.container,
      {
        backgroundColor: color,
      },
      containerStyle,
    ]}>
      <Text style={styles.heading}>{`Screen - ${id}`}</Text>
      <TouchableOpacity
        style={styles.removeTabBtn}
        onPress={removeTab}
      >
        <Text style={styles.text}>Remove Tab</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default TabScreenComponent;
