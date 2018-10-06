import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Provider } from 'react-redux';
import store from './store'

import AppNavigator from './navigation/AppNavigator';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store()}>
        <View style={styles.container}>
          
          <AppNavigator />

        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

