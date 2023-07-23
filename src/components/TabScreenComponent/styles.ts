import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface IStyles {
  container: ViewStyle;
  heading: TextStyle;
  text: TextStyle;
  removeTabBtn: ViewStyle;
}

const styles = StyleSheet.create<IStyles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  heading: {
    fontSize: 24,
    lineHeight: 28,
    color: 'white',
    marginBottom: 12,
  },
  text: {
    fontSize: 20,
    lineHeight: 24,
    color: 'white',
  },
  removeTabBtn: {
    backgroundColor: '#2594E2',
    paddingHorizontal: 30,
    paddingVertical: 12,
    marginBottom: 12,
  },
});

export default styles;
