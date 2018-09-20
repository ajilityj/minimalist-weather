import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

const weatherIcon = {
    'clear-day': {
        icon: 'ios-sunny'
    },
    'clear-night': {
        icon: 'ios-moon'
    },
    'rain': {
        icon: 'ios-rainy'
    },
    'snow': {
        icon: 'ios-snow'
    },
    'cloudy': {
        icon: 'ios-cloudy'
    },
    'partly-cloudy-day': {
        icon: 'ios-partly-sunny'
    },
    'partly-cloudy-night': {
        icon: 'ios-cloudy-night'
    },
    'undefined': {
        icon: 'ios-help'
    }
};

const Weather = ({ weather = "Sunny", temperature = 89, iconName }) => {

    if (typeof weatherIcon[iconName] === 'undefined') {
        iconName = 'undefined';
    }

    return (
        <View style={styles.weatherContainer}>
            <View style={styles.headerContainer}>
                <Icon name={weatherIcon[iconName].icon} size={90} color={'#000'} />
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
  temperature: PropTypes.number.isRequired,
  weather: PropTypes.string
};

const styles = StyleSheet.create({
    weatherContainer: {
        flex: 1,
        backgroundColor: '#eee'
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    temperatureText: {
        fontSize: 80,
        color: '#000'
    },
    bodyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        textAlign: 'center'
    },
    weatherText: {
        fontSize: 32,
        color: '#000'
    }
});

export default Weather;