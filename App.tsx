/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import TabView from './src/screens/TabView/TabView';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar
        barStyle="dark-content"
      />
      <TabView animated />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});

export default App;
