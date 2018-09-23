import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Ionicons";
import WeatherIcons from "../utils/WeatherIcons";
import styles from "../styles/weather";

const Weather = ({ iconName, temperature, weatherDescription }) => {
  if (typeof WeatherIcons[iconName] === "undefined") {
    iconName = "undefined";
  }

  return (
    <View style={styles.weatherContainer}>
      <View style={styles.temperatureContainer}>
        <Icon name={WeatherIcons[iconName].icon} size={90} color={"#000"} />
        <Text style={styles.temperatureText}>{temperature}˚</Text>
      </View>
      <View style={styles.weatherDescriptionContainer}>
        <Text style={styles.weatherDescription}>{weatherDescription}</Text>
      </View>
    </View>
  );
};

Weather.propTypes = {
  iconName: PropTypes.string,
  temperature: PropTypes.number.isRequired,
  weatherDescription: PropTypes.string.isRequired
};

export default Weather;
