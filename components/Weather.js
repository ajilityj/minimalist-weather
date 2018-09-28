import React, { Component } from 'react';
import { FlatList, List, ListItem, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import WeatherIcons from '../utils/WeatherIcons';
import styles from '../styles/weather';

class Weather extends Component {
  state = {
    alerts: this.props.weather.alerts ? this.props.weather.alerts : null,
    description: this.props.weather.currently.summary,
    icon: this.props.weather.currently.icon,
    location: this.props.location,
    temperature: Math.round(this.props.weather.currently.temperature)
  };

  render() {
    const { alerts, location, description, icon, temperature } = this.state;

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
                      {item.title.toUpperCase()}
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
          console.log('no weather alerts exist')
        )}

        <View style={styles.currentWeatherContainer}>
          {WeatherIcons[icon] ? (
            <Icon name={WeatherIcons[icon]} size={125} color={'#000'} />
          ) : (
            console.log('no usable icon exists')
          )}
          <Text style={styles.descriptionText}>
            {description.toUpperCase()}
          </Text>
          <Text style={styles.locationText}>{location.toUpperCase()}</Text>
        </View>
        <Text style={styles.temperatureText}>
          {temperature}
          <Text style={{ fontSize: 115 }}>˚</Text>
        </Text>
      </View>
    );
  }
}

Weather.propTypes = {
  weather: PropTypes.object.isRequired
};

export default Weather;
