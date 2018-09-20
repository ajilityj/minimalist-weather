/**
 * Minimalist Weather App
 * Kudos to https://bit.ly/2vAmRbh
 */

import React, { Component } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { API_KEY } from "./utils/DarkSkyAPI";
import Weather from "./components/Weather";
import styles from "./styles/app";

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
          error: "Error fetching weather"
        });
      }
    );
  }

  fetchWeather(latitude, longitude) {
    fetch(
      `https://api.darksky.net/forecast/${API_KEY}/${latitude},${longitude}`
    )
      .then(res => res.json())
      .then(json => {
        // prevent flickering on fast connections
        setTimeout(() => {
          this.setState({
            temperature: Math.round(json.currently.temperature),
            weather: json.minutely
              ? json.minutely.summary
              : json.currently.summary,
            iconName: json.currently.icon,
            isLoading: false
          });
        }, 333);
      });
  }

  render() {
    const { isLoading, weather, temperature, iconName } = this.state;

    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>
              Fetching your local weather...
            </Text>
            <ActivityIndicator size="large" color="#333" />
          </View>
        ) : (
          <Weather
            weather={weather}
            temperature={temperature}
            iconName={iconName}
          />
        )}
      </View>
    );
  }
}
