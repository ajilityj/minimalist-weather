/**
 * Minimalist Weather App
 * Kudos to https://bit.ly/2vAmRbh
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { API_KEY } from './utils/DarkSkyAPI';
import Weather from './components/Weather';

export default class App extends Component {
  state = {
    isLoading: true,
    temperature: 0,
    weather: null,
    iconName: null,
    error: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'Error Getting Weather Conditions'
        });
      }
    );
  }

  fetchWeather(latitude = 25, longitude = 25) {
    fetch (
      `https://api.darksky.net/forecast/${API_KEY}/${latitude},${longitude}`
    )
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({
          temperature: Math.round(json.currently.temperature),
          weather: json.minutely ? json.minutely.summary 
            : json.currently.summary,
          iconName: json.currently.icon,
          isLoading: false
        })
      });
  }

  render() {
    const { isLoading, weather, temperature, iconName } = this.state;
    
    return (
      <View style={styles.container}>
        {isLoading ? <Text>Fetching the Weather</Text> 
          : <Weather weather={weather} temperature={temperature} iconName={iconName} />
        } 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
