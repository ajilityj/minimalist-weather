import { StyleSheet } from "react-native";

export default StyleSheet.create({
  weatherContainer: {
    flex: 1
  },
  temperatureContainer: {
    alignItems: "center",
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  temperatureText: {
    color: "#111",
    fontSize: 80
  },
  weatherDescriptionContainer: {
    alignItems: "center",
    flex: 1
  },
  weatherDescription: {
    color: "#111",
    fontSize: 32
  }
});
