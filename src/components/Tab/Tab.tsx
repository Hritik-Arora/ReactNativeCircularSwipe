import React from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';

interface IProps {
  id: number;
  onPress: () => void;
  isActive: boolean;
}

const Tab: React.FC<IProps> = (props) => {
  const {
    id,
    onPress,
    isActive,
  } = props;

  return (
    <TouchableOpacity
      style={[
        styles.tabBtn,
        isActive ? { backgroundColor: 'red' } : {},
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{`Tab ${id}`}</Text>
    </TouchableOpacity>
  );
};

export default Tab;
