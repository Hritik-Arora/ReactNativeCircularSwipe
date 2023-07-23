import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface IStyles {
  tabBtn: ViewStyle;
  text: TextStyle;
}

const styles = StyleSheet.create<IStyles>({
  tabBtn: {
    flex: 1,
    backgroundColor: '#2594E2',
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
    padding: 12,
  },
  text: {
    fontSize: 14,
    lineHeight: 18,
    color: 'white',
  },
});

export default styles;
