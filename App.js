import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Router from './Router';
import OxContentProvider from './contexts/OxContext';

export default function App() {

  return (
    // <View style={styles.container}>
    <OxContentProvider>
      <Router />
    </OxContentProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8e44ad',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
