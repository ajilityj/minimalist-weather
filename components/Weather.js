import React, { Component } from 'react';
import { FlatList, List, ListItem, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import WeatherIcons from '../utils/WeatherIcons';
import styles from '../styles/weather';

class Weather extends Component {
  state = {
    alerts: this.props.weather.alerts ? this.props.weather.alerts : null,
    description: this.props.weather.minutely
      ? this.props.weather.minutely.summary
      : this.props.weather.currently.summary,
    icon: this.getWeatherIcon(this.props.weather.currently.icon),
    temperature: Math.round(this.props.weather.currently.temperature)
  };

  getWeatherIcon(icon) {
    if (typeof WeatherIcons[icon] !== 'object') {
      icon = 'undefined';
    }
    return icon;
  }

  render() {
    const { alerts, description, icon, temperature } = this.state;

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
                      {item.severity.toUpperCase()}: {item.title}
                    </Text>
                    <Text style={styles.alertText}>{item.regions}</Text>
                    {/* <Text>{item.description}</Text> */}
                    {/* <Text>{item.expires}</Text> */}
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        ) : (
          console.log('no weather alerts exist')
        )}

        <View style={styles.temperatureContainer}>
          <Icon name={WeatherIcons[icon].icon} size={90} color={'#000'} />
          <Text style={styles.temperatureText}>{temperature}˚</Text>
        </View>
        <View style={styles.weatherDescriptionContainer}>
          <Text style={styles.weatherDescription}>{description}</Text>
        </View>
      </View>
    );
  }
}

Weather.propTypes = {
  weather: PropTypes.object.isRequired
};

export default Weather;
