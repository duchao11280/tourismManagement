
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LogBox } from 'react-native';
import MainNavigator from './src/components/navigation/MainNavigator'
LogBox.ignoreAllLogs();
export default function App() {
  return (
    <MainNavigator></MainNavigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
