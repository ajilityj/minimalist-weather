/**
 * Minimalist Weather App
 * Kudos to https://bit.ly/2vAmRbh
 */

import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  state = {
    isLoading: true
  };

  render() {
    const { isLoading } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <Text>Fetching the Weather</Text>
        ) : (
          <View>
            <Text>Minimalist Weather App</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
