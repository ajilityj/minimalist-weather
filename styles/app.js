import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  loadingContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  loadingText: {
    fontSize: 30,
    marginBottom: 25
  },
  loadedContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 24
  },
  timeText: {
    color: '#aaa',
    fontSize: 15,
    textAlign: 'center'
  },
  errorMessage: {
    color: '#ff4136',
    fontSize: 25
  }
});
