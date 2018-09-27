/**
 * Minimalist Weather App
 * Kudos to https://bit.ly/2vAmRbh
 */

import React, { Component } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View
} from 'react-native';
import { API_KEY } from './utils/DarkSkyAPI';
import Weather from './components/Weather';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles/app';

export default class App extends Component {
  state = {
    currentTime: null,
    errorMessage: '',
    isLoading: true,
    refreshing: false,
    weather: null
  };

  componentDidMount() {
    this.getLocation();
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.getWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          isLoading: false,
          refreshing: false,
          errorMessage: 'Error getting location.'
        });
      }
    );
  }

  getWeather(latitude, longitude) {
    fetch(
      `https://api.darksky.net/forecast/${API_KEY}/${latitude},${longitude}`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Error getting weather.');
      })
      .then(json => {
        console.log(json);
        // prevent flickering on fast connections
        setTimeout(() => {
          this.setState({
            currentTime: new Date().toLocaleString(),
            weather: json,
            isLoading: false,
            refreshing: false
          });
        }, 333);
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          refreshing: false,
          errorMessage: error.message
        });
      });
  }

  // refresh app on pull
  refreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={() => {
          this.setState({
            refreshing: true
          });
          this.getLocation();
        }}
      />
    );
  }

  render() {
    const { currentTime, errorMessage, isLoading, weather } = this.state;

    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={this.refreshControl()}
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>
              Fetching your local weather...
            </Text>
            <ActivityIndicator size="large" color="#333" />
          </View>
        ) : (
          <View style={styles.loadedContainer}>
            {errorMessage.length > 0 ? (
              <Text style={styles.errorMessage}>
                <Icon name={'ios-alert'} size={23} /> {errorMessage}
              </Text>
            ) : (
              <View>
                <Weather weather={weather} />
                <Text style={styles.timeText}>Last updated: {currentTime}</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    );
  }
}
