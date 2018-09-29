import React, { Component } from 'react';
import { FlatList, List, ListItem, Text, View } from 'react-native';
import { Font } from 'expo';
import PropTypes from 'prop-types';
import WeekDays from '../utils/WeekDays';
import WeatherIcons from '../utils/WeatherIcons';
import styles from '../styles/weather';

// custom weather icons from Font (http://adamwhitcroft.com/climacons/)
import { createIconSetFromFontello } from '@expo/vector-icons';
import fontelloConfig from '../config.json';
const Icon = createIconSetFromFontello(fontelloConfig, 'climacons');

class Weather extends Component {
  state = {
    fontLoaded: false,
    alerts: this.props.weather.alerts ? this.props.weather.alerts : null,
    description: this.props.weather.currently.summary,
    icon: this.props.weather.currently.icon,
    location: this.props.location,
    temperature: Math.round(this.props.weather.currently.temperature),
    localDay: this.getLocalDay(this.props.weather.currently.time),
    localTime: this.getLocalTime(this.props.weather.currently.time)
  };

  async componentDidMount() {
    await Font.loadAsync({
      'climacons': require('../assets/fonts/climacons.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  getLocalDay(time) {
    const date = new Date(time * 1000);
    const day = WeekDays[date.getDay()];

    return day;
  }

  getLocalTime(time) {
    const date = new Date(time * 1000);
    const hours = date.getHours();
    const minutes = ("0" + date.getMinutes()).substr(-2);

    return `${hours}:${minutes}`;
  }

  render() {
    const { alerts, location, description, icon, temperature, localDay, localTime } = this.state;

    return (
      <View style={styles.weatherContainer}>
        {alerts ? (
          <View style={styles.alertsContainer}>
            <FlatList
              data={alerts}
              renderItem={({ item }) => {
                return (
                  <View style={styles.alertContainer}>
                    <Text style={styles.alertText}>
                      {item.title ? item.title.toUpperCase() : null}
                    </Text>
                    {/* <Text>{item.description}</Text> */}
                    {/* <Text>{item.expires}</Text> */}
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        ) : (
          null
        )}

        <View style={styles.weatherDetailsContainer}>
          {this.state.fontLoaded && WeatherIcons[icon] ? (
            <Icon type="climacons" name={WeatherIcons[icon]} size={250} color={'#000'} />
          ) : (
            null
          )}
          <Text style={styles.descriptionText}>
            {description ? description.toUpperCase() : null}
          </Text>
          <Text style={styles.locationText}>
            {location ? location.toUpperCase() : null}
          </Text>
          <Text style={styles.locationTime}>
            {localDay} {localTime}
          </Text>
          <Text style={styles.temperatureText}>
            {temperature}
            <Text style={{ fontSize: 115 }}>˚</Text>
          </Text>
        </View>
      </View>
    );
  }
}

Weather.propTypes = {
  location: PropTypes.string,
  weather: PropTypes.object.isRequired
};

export default Weather;
