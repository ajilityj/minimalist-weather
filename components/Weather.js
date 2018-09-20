import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import WeatherIcons from '../utils/WeatherIcons';
import styles from '../styles/weather';

const Weather = ({ weather, temperature, iconName }) => {

    if (typeof WeatherIcons[iconName] === 'undefined') {
        iconName = 'undefined';
    }

    return (
        <View style={styles.weatherContainer}>
            <View style={styles.headerContainer}>
                <Icon name={WeatherIcons[iconName].icon} size={90} color={'#000'} />
                <Text style={styles.temperatureText}>
                    {temperature}˚
                </Text>
            </View>
            <View style={styles.bodyContainer}>
                <Text style={styles.weatherText}>
                    {weather}
                </Text>
            </View>
        </View>
    );
};

Weather.propTypes = {
  iconName: PropTypes.string,
  temperature: PropTypes.number.isRequired,
  weather: PropTypes.string
};

export default Weather;