import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import SlopeDetector from './components/SlopeDetector';
import SignDetector from './components/SignDetector';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
       {/* <SignDetector /> */}
      <SlopeDetector />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
