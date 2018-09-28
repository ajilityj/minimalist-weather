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
import Icon from 'react-native-vector-icons/Ionicons';
import { Constants, Location, Permissions } from 'expo';
import { API_KEY } from './utils/DarkSkyAPI';
import StateAbbreviations from './utils/StateAbbreviations';
import Weather from './components/Weather';
import styles from './styles/app';

export default class App extends Component {
  state = {
    currentLocation: null,
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
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        Expo.Location.reverseGeocodeAsync({
          latitude: latitude,
          longitude: longitude
        })
          .then(address => {
            // address: [{city, street, region, postalCode, country, name}]
            address = address[0];

            const location = !address.city
              ? `${address.region}, ${address.country}`
              : address.country === 'United States' || 'Canada'
                ? `${address.city}, ${this.getStateAbbreviation(
                    address.region
                  )}`
                : `${address.city}, ${address.region}`;

            this.getWeather(latitude, longitude, location);
          })
          .catch(() => {
            this.getWeather(latitude, longitude, null);
          });
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

  getStateAbbreviation(stateName) {
    return StateAbbreviations[stateName];
  }

  getWeather(latitude, longitude, location) {
    fetch(
      `https://api.darksky.net/forecast/${API_KEY}/${latitude},${longitude}`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Error getting weather.');
      })
      .then(weather => {
        console.log(weather);
        // prevent flickering on fast connections
        setTimeout(() => {
          this.setState({
            currentLocation: location,
            currentTime: new Date().toLocaleString(),
            weather: weather,
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
    const {
      currentLocation,
      currentTime,
      errorMessage,
      isLoading,
      weather
    } = this.state;

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
                <Weather weather={weather} location={currentLocation} />
                <Text style={styles.timeText}>Last updated: {currentTime}</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    );
  }
}
