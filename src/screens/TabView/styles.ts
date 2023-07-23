import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface IStyles {
  container: ViewStyle;
  ctaContainer: ViewStyle;
  addNewTabBtn: ViewStyle;
  tabScreenContainer: ViewStyle;
  ctaText: TextStyle;
  tabCtaContainer: ViewStyle;
  tabScrollView: ViewStyle;
  noTabText: TextStyle;
  tabScreensSwipeContainer: ViewStyle;
}

const styles = StyleSheet.create<IStyles>({
  container: {
    flex: 1,
  },
  ctaContainer: {
    flex: 0.2,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  addNewTabBtn: {
    maxWidth: '40%',
    backgroundColor: '#2594E2',
    padding: 14,
    marginBottom: 12,
  },
  tabScreenContainer: {
    flex: 0.8,
  },
  ctaText: {
    fontSize: 14,
    lineHeight: 18,
    color: 'white',
  },
  tabCtaContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-between'
  },
  tabScrollView: {
    flex: 1,
  },
  noTabText: {
    alignSelf: 'center',
    fontSize: 26,
    lineHeight: 28,
    fontWeight: 'bold',
  },
  tabScreensSwipeContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default styles;
