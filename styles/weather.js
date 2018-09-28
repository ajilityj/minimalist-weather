import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  weatherContainer: {
    flex: 1
  },
  currentWeatherContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  descriptionText: {
    color: '#000',
    fontSize: 50
  },
  locationText: {
    color: '#7e7e7e',
    fontSize: 20
  },
  temperatureText: {
    color: '#000',
    flex: 1,
    fontSize: 125,
    textAlign: 'center'
  },
  alertsContainer: {
    borderColor: 'red',
    borderWidth: 2,
    display: 'none', // todo
    margin: 5
  },
  alertContainer: {
    flex: 1,
    padding: 10
  },
  alertText: {
    color: 'red',
    fontWeight: 'bold'
  }
});
